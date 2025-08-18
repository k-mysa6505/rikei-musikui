// バグレポートの送信サービス（React用）

export interface BugReport {
  issues: string[];
  description: string;
}

export interface BugReportResponse {
  success: boolean;
  error?: string;
}

export class BugReportService {
  private readonly apiEndpoint = '/api/send-bug-report';
  private readonly requestTimeout = 10000; // 10秒

  /**
   * バグレポートを送信する
   * @param report バグレポート内容
   * @returns Promise<void>
   * @throws Error 送信に失敗した場合
   */
  async sendBugReport(report: BugReport): Promise<void> {
    // バリデーション
    this.validateReport(report);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
      }

      const result: BugReportResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'サーバーでエラーが発生しました');
      }

      console.log('バグレポートを送信しました');
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('送信がタイムアウトしました。ネットワーク接続を確認して再試行してください。');
        }

        if (error.message.includes('Failed to fetch')) {
          throw new Error('ネットワークエラーが発生しました。インターネット接続を確認してください。');
        }
      }

      console.error('バグレポート送信エラー:', error);
      throw error instanceof Error ? error : new Error('不明なエラーが発生しました');
    }
  }

  /**
   * バグレポートの内容を検証する
   * @param report 検証対象のレポート
   * @throws Error バリデーションエラー
   */
  private validateReport(report: BugReport): void {
    if (!report) {
      throw new Error('バグレポートが指定されていません');
    }

    if (!Array.isArray(report.issues)) {
      throw new Error('問題の種類が正しく指定されていません');
    }

    if (report.issues.length === 0) {
      throw new Error('少なくとも1つの問題を選択してください');
    }

    if (typeof report.description !== 'string') {
      throw new Error('説明が正しく入力されていません');
    }

    // 説明文の長さ制限（例: 1000文字）
    if (report.description.length > 1000) {
      throw new Error('説明文が長すぎます（1000文字以内で入力してください）');
    }

    // 無効な問題タイプのチェック
    const validIssues = this.getValidIssueTypes();
    const invalidIssues = report.issues.filter(issue => !validIssues.includes(issue));
    if (invalidIssues.length > 0) {
      throw new Error(`無効な問題タイプが含まれています: ${invalidIssues.join(', ')}`);
    }
  }

  /**
   * 有効な問題タイプを取得する（内部用）
   * @returns 有効な問題タイプの配列
   */
  private getValidIssueTypes(): string[] {
    return [
      'calculation',
      'display',
      'input',
      'timer',
      'freeze',
      'button',
      'peaceful',
      'other'
    ];
  }

  /**
   * 利用可能な問題の種類を取得する（UI用）
   * @returns 問題の種類の配列（ラベル付き）
   */
  getAvailableIssueTypes(): Array<{ value: string; label: string }> {
    return [
      { value: 'calculation', label: '計算結果が間違っている' },
      { value: 'display', label: '数式が正しく表示されない' },
      { value: 'input', label: '数字入力ができない' },
      { value: 'timer', label: 'タイマーが正しく動作しない' },
      { value: 'freeze', label: 'アプリが固まる・動かない' },
      { value: 'button', label: 'ボタンが反応しない' },
      { value: 'peaceful', label: '簡単すぎる' },
      { value: 'other', label: 'その他' }
    ];
  }

  /**
   * 送信状況をチェックする（デバッグ用）
   * @returns API エンドポイントの情報
   */
  getServiceInfo(): { endpoint: string; timeout: number } {
    return {
      endpoint: this.apiEndpoint,
      timeout: this.requestTimeout
    };
  }
}

// シングルトンインスタンス
export const bugReportService = new BugReportService();

// 後方互換性のための関数エクスポート（既存コードとの互換性維持）
export async function sendBugReport(report: BugReport): Promise<void> {
  return bugReportService.sendBugReport(report);
}
