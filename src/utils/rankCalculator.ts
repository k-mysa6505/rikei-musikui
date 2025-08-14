import { Rank } from '../types/index';

interface RankCriteria {
  minAccuracy: number;
  maxTime: number;
}

const RANK_CRITERIA: Record<Rank, RankCriteria> = {
  [Rank.S]: { minAccuracy: 100, maxTime: 60 },
  [Rank.A]: { minAccuracy: 85, maxTime: 90 },
  [Rank.B]: { minAccuracy: 70, maxTime: 120 },
  [Rank.C]: { minAccuracy: 50, maxTime: 240 },
  [Rank.D]: { minAccuracy: 0, maxTime: Infinity }
};

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

  const ranks = [Rank.S, Rank.A, Rank.B, Rank.C, Rank.D];

  for (const rank of ranks) {
    const criteria = RANK_CRITERIA[rank];
    if (accuracy >= criteria.minAccuracy && totalTimeSeconds <= criteria.maxTime) {
      return rank;
    }
  }

  return Rank.D;
}
