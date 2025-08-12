import React from "react";
import { GameResult } from "../types/index";

type ResultScreenProps = {
  gameResult: GameResult;
  onReplay: () => void;
  onTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ gameResult, onReplay, onTitle }) => {
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };

  const accuracy = gameResult.totalQuestions > 0
    ? Math.round((gameResult.correctAnswers / gameResult.totalQuestions) * 100)
    : 0;

  return (
    <div className="result-screen">
      <h1>RESULTS</h1>
      <div className="result-summary-section">
        <div className="result-status">
          <p>正解数: {gameResult.correctAnswers} / {gameResult.totalQuestions}</p>
          <p>正答率: {accuracy}%</p>
          <p>TIME: {formatTime(gameResult.totalTime)}</p>
        </div>
      </div>
      <div className="result-details-section">
        <div className="result-details">
          {gameResult.questionResults.map((result, index) => (
            <div key={index} className="question-result">
              <div className="question-status">
                レベル {result.stage}:
                {result.isCorrect ? "✓ 正解" : "✗ 不正解"}
              </div>
              <div className="question-container">
                <div className="question-formula-container">
                  <div className="question-formula">
                    {result.question.formula}
                  </div>
                  <div className="question-sub-formula">
                    {result.question.subformula}
                  </div>
                </div>
                <div className="question-answer-container">
                  <div className="question-user-answer">
                    回答：{result.userAnswer}
                  </div>
                  <div className="question-answer">
                    解答：{result.question.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="result-buttons">
        <button className="btn replay-btn" onClick={onReplay}>もう一度</button>
        <button className="btn title-btn"  onClick={onTitle}>タイトルへ戻る</button>
      </div>
    </div>
  );
};

export default ResultScreen;
