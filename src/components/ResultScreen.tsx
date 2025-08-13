import React, { useEffect, useCallback, useState } from "react";
import { GameResult, Question } from "../types/index";

type ResultScreenProps = {
  gameResult: GameResult;
  onReplay: () => void;
  onTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ gameResult, onReplay, onTitle }) => {
  // 各問題の展開状態を管理
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

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

  // MathJax レンダリング関数
  const renderMathJax = useCallback(async (element: HTMLElement, retryCount = 0) => {
    if (!window.MathJax || retryCount > 3) return;

    try {
      await window.MathJax.typeset([element]);
      // レンダリング完了後に要素を表示
      element.classList.add('rendered');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('retry')) {
        setTimeout(() => renderMathJax(element, retryCount + 1), 100);
      } else {
        // エラーでも表示する
        element.classList.add('rendered');
      }
    }
  }, []);

  // コンポーネントマウント時とexpandedQuestionsが変更された時にMathJaxを適用
  useEffect(() => {
    const applyMathJax = async () => {
      if (!window.MathJax) return;

      // 全ての数式要素を取得してレンダリング
      const mathElements = document.querySelectorAll('.math-content');

      if (mathElements.length > 0) {
        // 全ての要素を一度にレンダリング（より高速）
        try {
          await window.MathJax.typeset(Array.from(mathElements) as HTMLElement[]);
          // レンダリング完了後に全ての要素を表示
          mathElements.forEach(element => {
            element.classList.add('rendered');
          });
        } catch (error) {
          // エラー時は個別に処理
          for (let i = 0; i < mathElements.length; i++) {
            await renderMathJax(mathElements[i] as HTMLElement);
          }
        }
      }
    };

    // 即座にMathJax適用を試行
    applyMathJax();

    // フォールバックとして少し遅延後にも実行
    const timeoutId = setTimeout(applyMathJax, 50);

    return () => clearTimeout(timeoutId);
  }, [gameResult, expandedQuestions, renderMathJax]);

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
                        <div className="question-sub-formula math-content">
                          {explanationQuestion.subformula}
                        </div>
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
