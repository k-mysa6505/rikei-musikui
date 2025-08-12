import { useState, useCallback } from "react";
import { Question, QuestionResult, GameResult } from "../types/index";

export function useGameLogic() {
  const [gameResult, setGameResult] = useState<GameResult>({
    totalQuestions: 0,
    correctAnswers: 0,
    totalTime: 0,
    questionResults: []
  });

  const [gameStartTime, setGameStartTime] = useState<number>(0);

  // ゲーム開始時の初期化
  const initializeGame = useCallback(() => {
    setGameResult({
      totalQuestions: 0,
      correctAnswers: 0,
      totalTime: 0,
      questionResults: []
    });
    setGameStartTime(Date.now());
  }, []);

  // 問題の回答を記録
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
      questionResults: [...prev.questionResults, questionResult]
    }));

    return questionResult;
  }, [gameStartTime]);

  // ゲーム完了時の最終結果を取得
  const finalizeGame = useCallback(() => {
    setGameResult(prev => ({
      ...prev,
      totalTime: Date.now() - gameStartTime
    }));
  }, [gameStartTime]);

  return {
    gameResult,
    initializeGame,
    recordQuestionResult,
    finalizeGame
  };
}
