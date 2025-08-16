// バグレポートの送信サービス（最小限の実装）

export interface BugReport {
  issues: string[];
  description: string;
}

// Resend API でメール送信（最小限の実装）
export async function sendBugReport(report: BugReport): Promise<void> {
  const apiKey = process.env.REACT_APP_RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('バグレポート（メール送信無効）:', report);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  const emailData = {
    from: 'onboarding@resend.dev',
    to: 'kota.mysa6505@gmail.com',
    subject: '数学クイズ - バグレポート',
    text: `発生した問題:\n${report.issues.join('\n')}\n\n詳細:\n${report.description || 'なし'}`
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('バグレポートを送信しました');
  } catch (error) {
    console.error('メール送信エラー:', error);
    throw error;
  }
}
