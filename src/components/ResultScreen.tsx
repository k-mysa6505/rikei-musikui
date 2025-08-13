import React, { useEffect, useState, useMemo } from "react";
import { GameResult, Question } from "../types/index";
import { useMathJax } from "../hooks/useMathJax";

type ResultScreenProps = {
  gameResult: GameResult;
  onReplay: () => void;
  onTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ gameResult, onReplay, onTitle }) => {
  // 各問題の展開状態を管理
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const { renderBySelector } = useMathJax();

  // 問題の展開/折りたたみを切り替える
  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };
  // 解説バージョンの数式を作成する関数
  const explanation = (question: Question): Question => {
    const regex = /\\text{□}/g;
    const newFormula = question.formula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    const newSubformula = question.subformula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    return { ...question, formula: newFormula, subformula: newSubformula };
  };

  // 最適化されたMathJaxレンダリング
  useEffect(() => {
    // 少し遅延を入れてからレンダリング（DOM更新完了を待つ）
    const timeoutId = setTimeout(() => {
      renderBySelector('.math-content');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [gameResult, expandedQuestions, renderBySelector]);

  // 時間フォーマット関数をメモ化
  const formatTime = useMemo(() => (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }, []);

  // 正解率の計算をメモ化
  const accuracy = useMemo(() => 
    gameResult.totalQuestions > 0
      ? Math.round((gameResult.correctAnswers / gameResult.totalQuestions) * 100)
      : 0, 
    [gameResult.correctAnswers, gameResult.totalQuestions]
  );

  return (
    <div className="result-screen">
      <h1>RESULTS</h1>
      <div className="result-details-section">
        <div className="result-details">
          {gameResult.questionResults.map((result, index) => {
            // 解説バージョンの数式を取得
            const explanationQuestion = explanation(result.question);
            const isExpanded = expandedQuestions.has(index);
            
            return (
              <div key={index} className="question-result">
                <div 
                  className="question-header"
                  onClick={() => toggleQuestion(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleQuestion(index);
                    }
                  }}
                >
                  <div className="question-status">
                    <span className="level">LEVEL {result.stage}</span>
                    <span className={`status ${result.isCorrect ? "correct" : "incorrect"}`}>
                      {result.isCorrect ? "正解！" : "不正解"}
                    </span>
                  </div>
                  <div className="expand-indicator">
                    <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="question-details">
                    <div className="question-container">
                      <div className="question-formula-container">
                        <div className="question-formula math-content">
                          {explanationQuestion.formula}
                        </div>
                        {explanationQuestion.subformula && (
                          <div className="question-sub-formula math-content">
                            {explanationQuestion.subformula}
                          </div>
                        )}
                      </div>
                      <div className="question-answer-container">
                        <div className="your-answer">あなたの回答</div>
                        <div className="user-answer">{result.userAnswer}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="result-summary-section">
        <div className="result-status">
          <p>正解数: {gameResult.correctAnswers}/{gameResult.totalQuestions}（{accuracy}%）</p>
          <p>TIME: {formatTime(gameResult.totalTime)}</p>
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
