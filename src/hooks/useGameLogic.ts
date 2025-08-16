import { useState, useCallback } from "react";
import { Question, QuestionResult, GameResult, Rank } from "../types/index";
import { calculateBasicRank, applyHighLevelBonus } from "../utils/rankCalculator";

export function useGameLogic() {
  const [gameResult, setGameResult] = useState<GameResult>({
    totalQuestions: 0,
    correctAnswers: 0,
    totalTime: 0,
    basicTime: 0,
    questionResults: [],
    rank: Rank.D,
    basicRank: undefined,
    hasHighLevelBonus: false
  });

  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [basicEndTime, setBasicEndTime] = useState<number>(0); // 7問目終了時刻

  const initializeGame = useCallback(() => {
    setGameResult({
      totalQuestions: 0,
      correctAnswers: 0,
      totalTime: 0,
      basicTime: 0,
      questionResults: [],
      rank: Rank.D,
      basicRank: undefined,
      hasHighLevelBonus: false
    });
    setGameStartTime(Date.now());
    setBasicEndTime(0);
  }, []);

  const recordQuestionResult = useCallback((
    stage: number,
    question: Question,
    userAnswer: string,
  ) => {
    const isCorrect = userAnswer === question.answer.toString();
    const currentTime = Date.now();

    // 7問目完了時に基本問題の終了時刻を記録
    if (stage === 7 && basicEndTime === 0) {
      setBasicEndTime(currentTime);
    }

    const questionResult: QuestionResult = {
      stage,
      question,
      userAnswer,
      isCorrect,
    };

    setGameResult(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalTime: currentTime - gameStartTime,
      basicTime: stage <= 7 ? (currentTime - gameStartTime) : (basicEndTime - gameStartTime),
      questionResults: [...prev.questionResults, questionResult],
    }));

    return questionResult;
  }, [gameStartTime, basicEndTime]);

  const finalizeGame = useCallback(() => {
    setGameResult(prev => {
      const finalTime = Date.now() - gameStartTime;
      const finalBasicTime = basicEndTime > 0 ? (basicEndTime - gameStartTime) : finalTime;
      
      // 基本ランクを計算（1-7問目のみ）
      const basicCorrectAnswers = Math.min(prev.correctAnswers, 7);
      const basicTotalQuestions = Math.min(prev.totalQuestions, 7);
      const basicRank = calculateBasicRank(basicCorrectAnswers, basicTotalQuestions, finalBasicTime);
      
      // ハイレベル問題の結果を確認
      const highLevelResult = prev.questionResults.find(result => result.stage === 8);
      const hasHighLevelBonus = !!(highLevelResult && highLevelResult.isCorrect);
      
      // 最終ランクを決定
      const finalRank = hasHighLevelBonus ? applyHighLevelBonus(basicRank) : basicRank;

      return {
        ...prev,
        totalTime: finalTime,
        basicTime: finalBasicTime,
        rank: finalRank,
        basicRank: basicRank,
        hasHighLevelBonus: hasHighLevelBonus
      };
    });
  }, [gameStartTime, basicEndTime]);

  return {
    gameResult,
    initializeGame,
    recordQuestionResult,
    finalizeGame
  };
}
