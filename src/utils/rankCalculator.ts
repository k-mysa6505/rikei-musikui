import { Rank } from '../types/index';

/**
 * ランク判定のための計算ユーティリティ
 */

interface RankCriteria {
  minAccuracy: number;  // 最低正答率（%）
  maxTime: number;      // 最大時間（秒）
}

// ランク判定基準
const RANK_CRITERIA: Record<Rank, RankCriteria> = {
  [Rank.S]: { minAccuracy: 100, maxTime: 60 },
  [Rank.A]: { minAccuracy: 85, maxTime: 90 },
  [Rank.B]: { minAccuracy: 70, maxTime: 120 },
  [Rank.C]: { minAccuracy: 50, maxTime: 240 },
  [Rank.D]: { minAccuracy: 0, maxTime: Infinity }
};

/**
 * 正答率と回答時間からランクを計算する
 * @param correctAnswers 正解数
 * @param totalQuestions 総問題数
 * @param totalTimeMs 総回答時間（ミリ秒）
 * @returns ランク
 */
export function calculateRank(
  correctAnswers: number,
  totalQuestions: number,
  totalTimeMs: number
): Rank {
  if (totalQuestions === 0) {
    return Rank.D;
  }

  const accuracy = (correctAnswers / totalQuestions) * 100;
  const totalTimeSeconds = totalTimeMs / 1000;

  // ランクを順番にチェック（S → A → B → C → D）
  const ranks = [Rank.S, Rank.A, Rank.B, Rank.C, Rank.D];
  
  for (const rank of ranks) {
    const criteria = RANK_CRITERIA[rank];
    if (accuracy >= criteria.minAccuracy && totalTimeSeconds <= criteria.maxTime) {
      return rank;
    }
  }

  return Rank.D;
}

/**
 * ランクに対応する色を取得する
 * @param rank ランク
 * @returns CSS色値
 */
export function getRankColor(rank: Rank): string {
  switch (rank) {
    case Rank.S:
      return '#FFD700'; // ゴールド
    case Rank.A:
      return '#C0C0C0'; // シルバー
    case Rank.B:
      return '#CD7F32'; // ブロンズ
    case Rank.C:
      return '#90EE90'; // ライトグリーン
    case Rank.D:
      return '#FFB6C1'; // ライトピンク
    default:
      return '#FFFFFF';
  }
}
