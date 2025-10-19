// api/send-bug-report.js - Vercel サーバーレス関数
export default async function handler(req, res) {
  // CORS ヘッダー設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { issues, description, currentQuestion } = req.body;

    // 現在の日時を取得
    const now = new Date();
    const timestamp = now.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // 問題の種類をより分かりやすい形に変換
    const issueLabels = {
      'calculation': '計算結果が間違っている',
      'display': '数式が正しく表示されない',
      'input': '数字入力ができない',
      'timer': 'タイマーが正しく動作しない',
      'freeze': 'アプリが固まる・動かない',
      'button': 'ボタンが反応しない',
      'peaceful': '簡単すぎる',
      'other': 'その他'
    };

    const formattedIssues = issues.map(issue => `• ${issueLabels[issue] || issue}`).join('\n');

    // 充実したメール内容
    const questionInfo = currentQuestion
      ? currentQuestion === 8
        ? 'ハイレベル問題'
        : `第${currentQuestion}問目`
      : '不明';

    const emailText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
　　　　　　　　理系虫食い算 - バグレポート
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【報告日時】
${timestamp}

【発生場所】
${questionInfo}

【発生した問題】
${formattedIssues}

【詳細説明】
${description || '詳細な説明はありません'}

【システム情報】
- アプリケーション: 理系虫食い算 (rikei-musikui)
- 報告元: Webアプリケーション
- User Agent: ${req.headers['user-agent'] || '不明'}

【対応について】
このバグレポートは自動送信されました。
内容を確認して適切な対応を検討してください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

※ このメールは自動送信です。返信の必要はありません。
`.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: process.env.TO_EMAIL_ADDRESS,
        subject: `【バグレポート】理系虫食い算 - ${questionInfo} - ${issues.length}件の問題報告 (${timestamp})`,
        text: emailText
      })
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Bug report error:', error);
    res.status(500).json({ error: 'Failed to send bug report' });
  }
}
