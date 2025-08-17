import React, { useState, useEffect, useCallback } from "react";
import { subscribeToRankings, saveRankingEntry, RankingEntry } from "../utils/rankingDB";
import { validatePlayerName } from "../utils/rankingUtils";

type RankingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentGameResult?: {
    rank: string;
    time: number;
  };
  newEntry?: {
    username: string;
    rank: string;
    time: number;
  };
};

const RankingModal: React.FC<RankingModalProps> = ({ isOpen, onClose, currentGameResult, newEntry }) => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPosition, setUserPosition] = useState<number | null>(null);

  // ユーザーの順位を計算
  const calculateUserPosition = useCallback((allRankings: RankingEntry[], gameResult: { time: number }) => {
    if (!gameResult) {
      setUserPosition(null);
      return;
    }

    // 現在のゲーム結果より上位の人数を数える（時間が早い人が上位）
    let position = 1;
    for (const entry of allRankings) {
      if (entry.time < gameResult.time) {
        position++;
      }
    }
    
    setUserPosition(position);
    
    // 上位3位にランクインしているかチェック
    if (position <= 3 && !newEntry) {
      setShowNameInput(true);
    }
  }, [newEntry]);

  // ランキングデータの購読
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setLoading(true);
    setError(null);

    // リアルタイムでランキングデータを購読
    const unsubscribe = subscribeToRankings((newRankings) => {
      setRankings(newRankings);
      setLoading(false);
      
      // ユーザーの順位を計算
      if (currentGameResult) {
        calculateUserPosition(newRankings, currentGameResult);
      }
    }, 50); // より多くのデータを取得してユーザー順位を正確に計算

    // クリーンアップ関数
    return () => {
      unsubscribe();
    };
  }, [isOpen, currentGameResult, calculateUserPosition]);

  // ランクイン時の名前登録
  const handleNameSubmit = async () => {
    if (!currentGameResult || !playerName.trim()) return;

    const validation = validatePlayerName(playerName);
    if (!validation.valid) {
      setNameError(validation.error || 'Invalid name');
      return;
    }

    setIsSubmitting(true);
    setNameError(null);

    try {
      const success = await saveRankingEntry(
        playerName.trim(),
        currentGameResult.rank,
        currentGameResult.time
      );

      if (success) {
        setShowNameInput(false);
        setPlayerName('');
        // ランキングは自動更新されるので、購読により反映される
      } else {
        setNameError('保存に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('ランキング保存エラー:', error);
      setNameError('エラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 名前入力のキャンセル
  const handleNameCancel = () => {
    setShowNameInput(false);
    setPlayerName('');
    setNameError(null);
  };

  // 新しいエントリかどうかを判定
  const isNewEntry = (entry: RankingEntry) => {
    if (!newEntry) return false;
    return entry.username === newEntry.username &&
           Math.abs(entry.time - newEntry.time) < 0.01;
  };

  // モーダルが閉じているときは何も表示しない
  if (!isOpen) return null;

  return (
    <div className="ranking-modal" onClick={onClose}>
      <div className="ranking-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className="ranking-header">
          <h2>🏆 ランキング</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* コンテンツ */}
        <div className="ranking-content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <span>読み込み中...</span>
            </div>
          )}

          {error && (
            <div className="error">
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && rankings.length === 0 && (
            <div className="no-data">
              まだランキングデータがありません
            </div>
          )}

          {!loading && !error && rankings.length > 0 && (
            <div className="ranking-content-layout">
              {/* 上位3位の表示 */}
              <div className="top-three-section">
                <h3>🏆 TOP 3</h3>
                <div className="top-three-list">
                  {rankings.slice(0, 3).map((entry, index) => (
                    <div 
                      key={entry.id || `top-${index}`}
                      className={`ranking-entry top-rank rank-${index + 1} ${isNewEntry(entry) ? 'highlight new-entry' : ''}`}
                    >
                      <div className="rank-position">
                        <span className="medal">{['🥇', '🥈', '🥉'][index]}</span>
                      </div>
                      
                      <div className="player-info">
                        <span className="player-name">{entry.username}</span>
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
                
                {/* 4位以降がいることを示す */}
                {rankings.length > 3 && (
                  <div className="more-players">
                    <span>... さらに {rankings.length - 3} 人のプレイヤー</span>
                  </div>
                )}
              </div>

              {/* ランクイン時の名前入力 */}
              {showNameInput && userPosition && userPosition <= 3 && (
                <div className="rank-in-section">
                  <div className="rank-in-header">
                    <h3>🎉 {userPosition}位にランクイン！</h3>
                    <p>名前を登録してランキングに記録しますか？</p>
                  </div>
                  
                  <div className="name-input-form">
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value);
                        if (nameError) setNameError(null);
                      }}
                      placeholder="プレイヤー名を入力"
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
                        disabled={isSubmitting || !playerName.trim()}
                      >
                        {isSubmitting ? '登録中...' : '登録'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ユーザーの順位表示 */}
              {currentGameResult && userPosition && (
                <div className="user-position-section">
                  <h3>あなたの成績</h3>
                  <div className="user-ranking-entry">
                    <div className="rank-position">
                      <span className="position">{userPosition}位</span>
                    </div>
                    
                    <div className="player-info">
                      <span className="player-name">あなた</span>
                      <span className={`rank-badge rank-${currentGameResult.rank.toLowerCase()}`}>
                        {currentGameResult.rank}
                      </span>
                    </div>
                    
                    <div className="score-info">
                      <span className="time">{currentGameResult.time.toFixed(2)}秒</span>
                    </div>
                  </div>
                  
                  {userPosition <= 3 && (
                    <div className="rank-achievement">
                      🎊 TOP 3 ランクイン達成！
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="ranking-footer">
          <span className="total-count">
            {rankings.length > 0 && `${rankings.length}件のランキング`}
          </span>
          <span className="data-source">🔥 Realtime Database</span>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;