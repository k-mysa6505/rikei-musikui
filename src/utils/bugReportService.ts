// ReSend API用の設定とヘルパー関数

interface BugReportData {
  issues: string[];
  description: string;
  timestamp: string;
  userAgent: string;
}

// 環境変数からReSend設定を取得
const RESEND_API_KEY = process.env.REACT_APP_RESEND_API_KEY || '';
const RESEND_API_URL = 'https://api.resend.com/emails';
const BUG_REPORT_EMAIL = process.env.REACT_APP_BUG_REPORT_EMAIL;
const FROM_EMAIL = process.env.REACT_APP_FROM_EMAIL;

// バグレポートの問題IDを日本語に変換
const ISSUE_LABELS: Record<string, string> = {
  calculation: '計算結果が間違っている',
  display: '数式が正しく表示されない',
  input: '数字入力ができない',
  timer: 'タイマーが正しく動作しない',
  freeze: 'アプリが固まる・動かない',
  button: 'ボタンが反応しない',
  difficult: '難しすぎる',
  other: 'その他'
};

export const sendBugReport = async (bugReportData: BugReportData): Promise<boolean> => {
  if (!RESEND_API_KEY) {
    console.warn('ReSend API key not configured. Bug report will be logged to console.');
    console.log('Bug Report:', {
      ...bugReportData,
      formattedTimestamp: new Date(bugReportData.timestamp).toLocaleString('ja-JP'),
      selectedIssueLabels: bugReportData.issues.map(id => ISSUE_LABELS[id] || id)
    });

    // 開発環境では3秒の遅延を追加して実際の送信をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }

  try {
    // 選択された問題を日本語に変換
    const selectedIssueLabels = bugReportData.issues.map(id => ISSUE_LABELS[id] || id);

    // HTMLメール本文を作成
    const htmlContent = `
      <div style="font-family: 'Hiragino Maru Gothic ProN', 'YuGothic', 'Yu Gothic', sans-serif; max-width: 600px; margin: 0 auto; background: #f3f4f6; padding: 20px;">
        <div style="background: white; border-radius: 10px; padding: 30px; border: 2px solid #4caf50;">
          <h2 style="color: #4caf50; border-bottom: 2px solid #4caf50; padding-bottom: 10px;">🐛 理系虫食い算 - バグレポート</h2>

          <h3 style="color: #2c3e50; margin-top: 30px;">📋 報告された問題</h3>
          ${selectedIssueLabels.length > 0 ? `
            <ul style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #4caf50;">
              ${selectedIssueLabels.map(label => `<li style="margin: 8px 0;">${label}</li>`).join('')}
            </ul>
          ` : '<p style="background: #f8f9fa; padding: 15px; border-radius: 5px; color: #666;">特定の問題は選択されていません。</p>'}

          <h3 style="color: #2c3e50; margin-top: 30px;">📝 詳細説明</h3>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <pre style="white-space: pre-wrap; margin: 0; font-family: inherit; color: #2c3e50;">${bugReportData.description || '詳細説明はありません。'}</pre>
          </div>

          <h3 style="color: #2c3e50; margin-top: 30px;">🔧 技術情報</h3>
          <table style="width: 100%; background: #f8f9fa; border-radius: 5px; padding: 15px;">
            <tr><td style="font-weight: bold; color: #4caf50; padding: 8px 0;"><strong>報告日時:</strong></td><td style="padding: 8px 0;">${new Date(bugReportData.timestamp).toLocaleString('ja-JP')}</td></tr>
            <tr><td style="font-weight: bold; color: #4caf50; padding: 8px 0;"><strong>ユーザーエージェント:</strong></td><td style="padding: 8px 0; word-break: break-all; font-size: 12px;">${bugReportData.userAgent}</td></tr>
          </table>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px; text-align: center; margin: 0;">
            このメールは理系虫食い算アプリから自動送信されました。<br>
            返信する必要はありません。
          </p>
        </div>
      </div>
    `;

    // テキスト版メール本文を作成
    const textContent = `
理系虫食い算 - バグレポート
=================================

報告された問題:
${selectedIssueLabels.length > 0 ? selectedIssueLabels.map(label => `• ${label}`).join('\n') : '特定の問題は選択されていません。'}

詳細説明:
${bugReportData.description || '詳細説明はありません。'}

技術情報:
• 報告日時: ${new Date(bugReportData.timestamp).toLocaleString('ja-JP')}
• ユーザーエージェント: ${bugReportData.userAgent}

---------------------------------
このメールは理系ムジークイアプリから自動送信されました。
`;

    const emailData = {
      from: FROM_EMAIL,
      to: [BUG_REPORT_EMAIL],
      subject: `理系虫食い算 バグレポート - ${new Date().toLocaleDateString('ja-JP')}`,
      html: htmlContent,
      text: textContent
    };

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('ReSend API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return false;
    }

    const result = await response.json();
    console.log('Bug report sent successfully:', result.id);
    return true;

  } catch (error) {
    console.error('Failed to send bug report:', error);
    return false;
  }
};

// メール送信前の検証
export const validateBugReport = (bugReportData: BugReportData): string | null => {
  if (bugReportData.issues.length === 0 && !bugReportData.description.trim()) {
    return '問題を選択するか、具体的な内容を入力してください。';
  }

  if (bugReportData.description.trim().length > 2000) {
    return '詳細説明は2000文字以内で入力してください。';
  }

  return null; // 検証OK
};
