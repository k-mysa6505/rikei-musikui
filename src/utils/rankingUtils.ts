// ランキング機能のユーティリティ関数
import { saveRankingEntry, RankingEntry } from './rankingDB';

/**
 * ゲーム終了時にランキングを保存する便利な関数
 */
export const handleGameComplete = async (
  username: string,
  rank: string,
  answerTime: number
): Promise<boolean> => {
  // データの検証
  if (!username || username.trim().length === 0) {
    console.error('ユーザー名が入力されていません');
    return false;
  }

  if (username.length > 20) {
    console.error('ユーザー名が長すぎます（20文字以内）');
    return false;
  }

  const validRanks = ['SS', 'S', 'A', 'B', 'C', 'D'];
  if (!validRanks.includes(rank)) {
    console.error('無効なランクです');
    return false;
  }

  if (answerTime <= 0) {
    console.error('無効な時間です');
    return false;
  }

  try {
    const success = await saveRankingEntry(username, rank, answerTime);
    
    if (success) {
      console.log(`ランキング保存成功: ${username} - ${rank}ランク - ${answerTime.toFixed(2)}秒`);
      return true;
    } else {
      console.error('ランキング保存に失敗しました');
      return false;
    }
  } catch (error) {
    console.error('ランキング保存中にエラーが発生しました:', error);
    return false;
  }
};/**
 * スコアからランクを計算する関数（例）
 */
export const calculateRank = (correctAnswers: number, totalQuestions: number): string => {
  const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
  
  if (accuracy >= 0.95) return 'SS';
  if (accuracy >= 0.9) return 'S';
  if (accuracy >= 0.8) return 'A';
  if (accuracy >= 0.7) return 'B';
  if (accuracy >= 0.6) return 'C';
  return 'D';
};

/**
 * ランキングエントリの表示用フォーマット
 */
export const formatRankingEntry = (entry: RankingEntry): string => {
  return `${entry.username} - ${entry.rank}ランク - ${entry.time.toFixed(2)}秒`;
};

/**
 * プレイヤー名のバリデーション
 */
export const validatePlayerName = (name: string): { valid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'ユーザー名を入力してください' };
  }

  if (name.length > 20) {
    return { valid: false, error: 'ユーザー名は20文字以内で入力してください' };
  }

  if (name.includes('<') || name.includes('>') || name.includes('&')) {
    return { valid: false, error: '特殊文字（<, >, &）は使用できません' };
  }

  return { valid: true };
};
