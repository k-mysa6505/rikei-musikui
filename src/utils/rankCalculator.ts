import { Rank } from '../types/index';

interface RankCriteria {
  minAccuracy: number;
  maxTime: number;
}

const RANK_CRITERIA: Record<Rank, RankCriteria> = {
  [Rank.SS]: { minAccuracy: 100, maxTime: 60 },
  [Rank.S]: { minAccuracy: 100, maxTime: 60 },
  [Rank.A]: { minAccuracy: 85, maxTime: 90 },
  [Rank.B]: { minAccuracy: 70, maxTime: 120 },
  [Rank.C]: { minAccuracy: 50, maxTime: 240 },
  [Rank.D]: { minAccuracy: 0, maxTime: Infinity }
};

export function calculateRank(
  correctAnswers: number,
  totalQuestions: number,
  totalTimeMs: number,
  questionResults?: { stage: number; isCorrect: boolean }[]
): Rank {
  if (totalQuestions === 0) {
    return Rank.D;
  }

  // まず7問目までの基本ランクを計算
  const basicCorrectAnswers = Math.min(correctAnswers, 7);
  const basicTotalQuestions = Math.min(totalQuestions, 7);
  const accuracy = (basicCorrectAnswers / basicTotalQuestions) * 100;
  const totalTimeSeconds = totalTimeMs / 1000;

  const ranks = [Rank.S, Rank.A, Rank.B, Rank.C, Rank.D];
  let baseRank = Rank.D;

  for (const rank of ranks) {
    const criteria = RANK_CRITERIA[rank];
    if (accuracy >= criteria.minAccuracy && totalTimeSeconds <= criteria.maxTime) {
      baseRank = rank;
      break;
    }
  }

  // ハイレベル問題（8問目）の結果をチェック
  if (questionResults && questionResults.length >= 8) {
    const highLevelResult = questionResults.find(result => result.stage === 8);
    if (highLevelResult && highLevelResult.isCorrect) {
      // ハイレベル問題正解時のランクアップ
      switch (baseRank) {
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
          return baseRank;
      }
    }
  }

  return baseRank;
}
