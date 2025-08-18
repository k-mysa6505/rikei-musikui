// バグレポートの送信サービス（最小限の実装）

export interface BugReport {
  issues: string[];
  description: string;
}

// Vercel API でメール送信（CORS対応）
export async function sendBugReport(report: BugReport): Promise<void> {
  try {
    const response = await fetch('/api/send-bug-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report)
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
