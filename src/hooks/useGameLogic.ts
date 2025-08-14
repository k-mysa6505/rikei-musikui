import { useState, useCallback } from "react";
import { Question, QuestionResult, GameResult, Rank } from "../types/index";
import { calculateRank } from "../utils/rankCalculator";

export function useGameLogic() {
  const [gameResult, setGameResult] = useState<GameResult>({
    totalQuestions: 0,
    correctAnswers: 0,
    totalTime: 0,
    questionResults: [],
    rank: Rank.D
  });

  const [gameStartTime, setGameStartTime] = useState<number>(0);

  const initializeGame = useCallback(() => {
    setGameResult({
      totalQuestions: 0,
      correctAnswers: 0,
      totalTime: 0,
      questionResults: [],
      rank: Rank.D
    });
    setGameStartTime(Date.now());
  }, []);

  const recordQuestionResult = useCallback((
    stage: number,
    question: Question,
    userAnswer: string,
  ) => {
    const isCorrect = userAnswer === question.answer.toString();

    const questionResult: QuestionResult = {
      stage,
      question,
      userAnswer,
      isCorrect,
    };

    setGameResult(prev => ({
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalTime: Date.now() - gameStartTime,
      questionResults: [...prev.questionResults, questionResult],
      rank: prev.rank
    }));

    return questionResult;
  }, [gameStartTime]);

  const finalizeGame = useCallback(() => {
    setGameResult(prev => {
      const finalTime = Date.now() - gameStartTime;
      const rank = calculateRank(prev.correctAnswers, prev.totalQuestions, finalTime);
      return {
        ...prev,
        totalTime: finalTime,
        rank
      };
    });
  }, [gameStartTime]);

  return {
    gameResult,
    initializeGame,
    recordQuestionResult,
    finalizeGame
  };
}
