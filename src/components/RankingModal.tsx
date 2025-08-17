import React, { useState, useEffect } from "react";
import { subscribeToRankings, RankingEntry, updateRankingEntryName, validatePlayerName } from "../utils/rankingDB";

type RankingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  autoRegisteredId?: string;
};

const RankingModal: React.FC<RankingModalProps> = ({
  isOpen,
  onClose,
  autoRegisteredId
}) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChangedName, setHasChangedName] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    const unsubscribe = subscribeToRankings((data) => {
      setRankings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [isOpen]);

  // ランク優先度マップ
  const RANK_PRIORITY: { [key: string]: number } = { SS: 1, S: 2, A: 3, B: 4, C: 5, D: 6 };

  // 現在のユーザーエントリを取得
  const currentUserEntry = rankings.find(entry => entry.id === autoRegisteredId);

  // ユーザーの順位を計算
  const userPosition = currentUserEntry ?
    rankings.filter(entry => {
      const entryPriority = RANK_PRIORITY[entry.rank] || 999;
      const userPriority = RANK_PRIORITY[currentUserEntry.rank] || 999;
      return entryPriority < userPriority ||
        (entryPriority === userPriority && entry.time < currentUserEntry.time);
    }).length + 1 : null;

  // プレイヤー名表示
  const getDisplayName = (entry: RankingEntry) =>
    entry.id === autoRegisteredId ? `${entry.username}（あなた）` : entry.username;

  // 名前変更処理
  const handleNameEdit = () => {
    setShowNameEdit(true);
    setNewName('');
    setNameError(null);
  };

  const handleNameCancel = () => {
    setShowNameEdit(false);
    setNewName('');
    setNameError(null);
  };

  const handleNameSubmit = async () => {
    if (!autoRegisteredId || !newName.trim()) return;

    const validation = validatePlayerName(newName);
    if (!validation.valid) {
      setNameError(validation.error || 'Invalid name');
      return;
    }

    setIsSubmitting(true);
    setNameError(null);

    try {
      const success = await updateRankingEntryName(autoRegisteredId, newName.trim());
      if (success) {
        setShowNameEdit(false);
        setNewName('');
        setHasChangedName(true);
      } else {
        setNameError('保存に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('名前変更エラー:', error);
      setNameError('エラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ranking-modal" onClick={onClose}>
      <div className="ranking-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ranking-header">
          <h2>ランキング</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="ranking-content">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <span>読み込み中...</span>
            </div>
          ) : rankings.length === 0 ? (
            <div className="no-data">まだランキングデータがありません</div>
          ) : (
            <>
              <div className="top-three-section">
                <div className="top-three-list">
                  {rankings.slice(0, 3).map((entry, index) => (
                    <div key={entry.id} className={`ranking-entry top-rank rank-${index + 1}`}>
                      <div className="rank-position">
                        <span className="medal">{['1st', '2nd', '3rd'][index]}</span>
                      </div>
                      <div className="player-info">
                        <span className="player-name">
                          {getDisplayName(entry)}
                        </span>
                        <span className={`rank-badge rank-${entry.rank.toLowerCase()}`}>
                          {entry.rank}
                        </span>
                      </div>
                      <div className="score-info">
                        <span className="time">{entry.time.toFixed(2)}秒</span>
                      </div>
                    </div>
                  ))}
                </div>
                {rankings.length > 3 && (
                  <div className="more-players">
                    <span>... さらに {rankings.length - 3} 人のプレイヤー</span>
                  </div>
                )}
              </div>

              {currentUserEntry && (
                <div className="user-position-section">
                  {showNameEdit ? (
                    <div className="name-edit-section">
                      <h3>名前を変更</h3>
                      <div className="name-input-form">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => {
                            setNewName(e.target.value);
                            if (nameError) setNameError(null);
                          }}
                          placeholder="新しい名前を入力"
                          maxLength={20}
                          disabled={isSubmitting}
                          className={nameError ? 'error' : ''}
                        />
                        {nameError && <div className="error-message">{nameError}</div>}

                        <div className="name-input-buttons">
                          <button
                            onClick={handleNameCancel}
                            className="cancel-btn"
                            disabled={isSubmitting}
                          >
                            キャンセル
                          </button>
                          <button
                            onClick={handleNameSubmit}
                            className="submit-btn"
                            disabled={isSubmitting || !newName.trim()}
                          >
                            {isSubmitting ? '保存中...' : '保存'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="user-ranking-header">
                        <h3>あなたの成績</h3>
                        {!hasChangedName && (
                          <button
                            onClick={handleNameEdit}
                            className="name-edit-btn"
                            title="名前を変更"
                          >
                            ✏️ 名前変更
                          </button>
                        )}
                      </div>
                      <div className="user-ranking-entry">
                        <div className="rank-position">
                          <span className="position">{userPosition}位</span>
                        </div>
                        <div className="player-info">
                          <span className="player-name">
                            {`${currentUserEntry.username}（あなた）`}
                          </span>
                          <span className={`rank-badge rank-${currentUserEntry.rank.toLowerCase()}`}>
                            {currentUserEntry.rank}
                          </span>
                        </div>
                        <div className="score-info">
                          <span className="time">{currentUserEntry.time.toFixed(2)}秒</span>
                        </div>
                      </div>
                      {userPosition && userPosition <= 3 && (
                        <div className="rank-achievement">🎊 TOP 3 ランクイン達成！</div>
                      )}
                    </>
                  )}
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingModal;