import React, { useState } from 'react';

type PauseModalProps = {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onBackToTitle: () => void;
  onBugReport: () => void;
};

type BugIssue = {
  id: string;
  label: string;
};

const bugIssues: BugIssue[] = [
  { id: 'calculation', label: '計算結果が間違っている' },
  { id: 'display', label: '数式が正しく表示されない' },
  { id: 'input', label: '数字入力ができない' },
  { id: 'timer', label: 'タイマーが正しく動作しない' },
  { id: 'freeze', label: 'アプリが固まる・動かない' },
  { id: 'button', label: 'ボタンが反応しない' },
  { id: 'difficult', label: '難しすぎる' },
  { id: 'other', label: 'その他' }
];

const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestart,
  onBackToTitle,
  onBugReport
}) => {
  const [showBugForm, setShowBugForm] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [bugDescription, setBugDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleBugReportClick = () => {
    setShowBugForm(true);
  };

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleBugSubmit = async () => {
    if (selectedIssues.length === 0 && bugDescription.trim() === '') {
      alert('問題を選択するか、具体的な内容を入力してください。');
      return;
    }

    setIsSubmitting(true);

    // 簡単な送信処理（実際の実装では適切なAPIに送信）
    try {
      const bugReport = {
        issues: selectedIssues,
        description: bugDescription,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      // コンソールにログ出力（実際の実装ではAPI送信）
      console.log('Bug Report Submitted:', bugReport);

      // 送信完了状態に変更
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // 3秒後にフォームを閉じる
        setTimeout(() => {
          setShowBugForm(false);
          setIsSubmitted(false);
          setSelectedIssues([]);
          setBugDescription('');
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error('Error submitting bug report:', error);
      setIsSubmitting(false);
      alert('送信に失敗しました。もう一度お試しください。');
    }
  };

  const handleBackFromBugForm = () => {
    setShowBugForm(false);
    setSelectedIssues([]);
    setBugDescription('');
    setIsSubmitted(false);
  };
  if (!isOpen) return null;

  if (showBugForm) {
    return (
      <div className="pause-modal-overlay">
        <div className="pause-modal bug-report-modal">
          <div className="pause-modal-header">
            <h2>バグレポート</h2>
            <button className="back-button" onClick={handleBackFromBugForm}>
              ← 戻る
            </button>
          </div>

          <div className="bug-form-content">
            {isSubmitted ? (
              <div className="submission-success">
                <div className="success-icon">✓</div>
                <h3>レポートを送信しました</h3>
                <p>ご協力ありがとうございます！<br/>改善に活用させていただきます。</p>
              </div>
            ) : (
              <>
                <div className="form-section">
                  <h3>該当する問題を選択してください（複数選択可）</h3>
                  <div className="issue-checkboxes">
                    {bugIssues.map(issue => (
                      <label key={issue.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedIssues.includes(issue.id)}
                          onChange={() => handleIssueToggle(issue.id)}
                        />
                        <span className="checkmark"></span>
                        {issue.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <h3>具体的な問題（任意）</h3>
                  <textarea
                    className="bug-description"
                    placeholder="問題の詳細や発生状況をお聞かせください..."
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="submit-button"
                    onClick={handleBugSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送信中...' : '送信'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pause-modal-overlay">
      <div className="pause-modal">
        <div className="pause-modal-header">
          <h2>ポーズ</h2>
        </div>

        <div className="pause-modal-content">
          <button className="pause-button pause-button-resume" onClick={onResume}>
            <span className="icon">▶</span>
            <span className="text">つづける</span>
          </button>

          <button className="pause-button pause-button-restart" onClick={onRestart}>
            <span className="icon">↻</span>
            <span className="text">やりなおす</span>
          </button>

          <button className="pause-button pause-button-home" onClick={onBackToTitle}>
            <span className="icon">🏠</span>
            <span className="text">タイトルへ戻る</span>
          </button>

          <button className="pause-button pause-button-bug" onClick={handleBugReportClick}>
            <span className="icon">🐛</span>
            <span className="text">バグレポート</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
