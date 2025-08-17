// 使用例とテスト用ファイル
import React, { useState } from 'react';
import RankingModal from '../components/RankingModal';
import { handleGameComplete, validatePlayerName } from '../utils/rankingUtils';

// ゲーム画面での使用例
const ExampleGameScreen: React.FC = () => {
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [lastEntry, setLastEntry] = useState<{
    username: string;
    rank: string;
    time: number;
  } | undefined>();
  const [playerName, setPlayerName] = useState('');

  // ゲーム終了時の処理例
  const handleGameEnd = async () => {
    const validation = validatePlayerName(playerName);
    
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    // ゲームの結果（例）
    const gameResult = {
      username: playerName.trim(),
      rank: 'A', // 実際にはスコアから計算
      time: 45.67 // 実際のゲーム時間
    };

    try {
      const success = await handleGameComplete(
        gameResult.username,
        gameResult.rank,
        gameResult.time
      );

      if (success) {
        setLastEntry(gameResult);
        setShowRankingModal(true);
      } else {
        alert('ランキングの保存に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('ゲーム終了処理でエラー:', error);
      alert('エラーが発生しました。');
    }
  };

  // テスト用のランキング表示
  const showRanking = () => {
    setShowRankingModal(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ゲーム画面（例）</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          プレイヤー名: 
          <input 
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="名前を入力してください"
            maxLength={20}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ gap: '10px', display: 'flex' }}>
        <button 
          onClick={handleGameEnd}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ゲーム終了（ランキング保存）
        </button>

        <button 
          onClick={showRanking}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ランキング表示
        </button>
      </div>

      {/* ランキングモーダル */}
      <RankingModal 
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        currentGameResult={lastEntry ? {
          rank: lastEntry.rank,
          time: lastEntry.time
        } : undefined}
        newEntry={lastEntry}
      />
    </div>
  );
};

export default ExampleGameScreen;
