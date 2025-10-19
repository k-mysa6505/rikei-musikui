import { Rank } from '../types/index';

interface RankCriteria {
  minAccuracy: number;
  maxTime: number;
}

const RANK_CRITERIA: Record<Rank, RankCriteria> = {
  [Rank.SS]: { minAccuracy: 100, maxTime: Infinity }, // SSは基本問題では到達不可
  [Rank.S]: { minAccuracy: 100, maxTime: 60 },
  [Rank.A]: { minAccuracy: 85, maxTime: 90 },
  [Rank.B]: { minAccuracy: 70, maxTime: 120 },
  [Rank.C]: { minAccuracy: 50, maxTime: 180 },
  [Rank.D]: { minAccuracy: 0, maxTime: Infinity }
};

// 基本問題（1-7問）のランクを計算
export function calculateBasicRank(
  correctAnswers: number,
  totalQuestions: number,
  basicTimeMs: number
): Rank {
  if (totalQuestions === 0) {
    return Rank.D;
  }

  // 7問以内での正答率と時間で評価
  const maxQuestions = Math.min(totalQuestions, 7);
  const maxCorrect = Math.min(correctAnswers, 7);
  const accuracy = (maxCorrect / maxQuestions) * 100;
  const basicTimeSeconds = basicTimeMs / 1000;

  const ranks = [Rank.S, Rank.A, Rank.B, Rank.C, Rank.D];

  for (const rank of ranks) {
    const criteria = RANK_CRITERIA[rank];
    if (accuracy >= criteria.minAccuracy && basicTimeSeconds <= criteria.maxTime) {
      return rank;
    }
  }

  return Rank.D;
}

// ハイレベルボーナスを適用
export function applyHighLevelBonus(basicRank: Rank): Rank {
  switch (basicRank) {
    case Rank.S:
      return Rank.SS;
    case Rank.A:
      return Rank.S;
    case Rank.B:
      return Rank.A;
    case Rank.C:
      return Rank.B;
    case Rank.D:
      return Rank.C;
    default:
      return basicRank;
  }
}

// 従来の関数も互換性のために残す（非推奨）
export function calculateRank(
  correctAnswers: number,
  totalQuestions: number,
  totalTimeMs: number,
  questionResults?: { stage: number; isCorrect: boolean }[]
): Rank {
  // 基本ランクを計算（7問までの時間は概算）
  const basicRank = calculateBasicRank(correctAnswers, totalQuestions, totalTimeMs);

  // ハイレベル問題の結果をチェック
  if (questionResults && questionResults.length >= 8) {
    const highLevelResult = questionResults.find(result => result.stage === 8);
    if (highLevelResult && highLevelResult.isCorrect) {
      return applyHighLevelBonus(basicRank);
    }
  }

  return basicRank;
}
