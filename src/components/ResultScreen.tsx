import React, { useEffect, useState, useMemo, useRef } from "react";
import { GameResult, Question } from "../types/index";
import { useMathJax } from "../hooks/useMathJax";
import RankingModal from "./RankingModal";
import { saveRankingEntry } from "../utils/rankingDB";

type ResultScreenProps = {
  gameResult: GameResult;
  onReplay: () => void;
  onTitle: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ gameResult, onReplay, onTitle }) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [animatingQuestions, setAnimatingQuestions] = useState<Set<number>>(new Set());
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | null>(null);
  const hasRegistered = useRef(false); // 登録済みフラグ
  const { renderBySelector } = useMathJax();

  useEffect(() => {
    // 既に登録済みの場合は何もしない
    if (hasRegistered.current) return;

    const register = async () => {
      hasRegistered.current = true; // 重複実行を防ぐ
      const playerName = `Player${Math.floor(Math.random() * 9999) + 1}`;
      const id = await saveRankingEntry(playerName, gameResult.rank, gameResult.basicTime / 1000);
      if (id) setRegisteredId(id);
    };
    register();
  }, [gameResult.rank, gameResult.basicTime]); // registeredIdを依存配列から除去

  const handleButtonClick = (callback: () => void) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;

      button.style.transform = 'translateY(-1px) scale(0.98)';
      button.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        button.style.transform = '';
        button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 100);

      setTimeout(callback, 150);
    };
  };

  const toggleQuestion = (index: number) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      const element = e.currentTarget;

      element.style.transform = 'scale(0.98)';
      element.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        element.style.transform = '';
        element.style.transition = 'all 0.2s ease';
      }, 100);

      setTimeout(() => {
        const isCurrentlyExpanded = expandedQuestions.has(index);

        if (isCurrentlyExpanded) {
          setAnimatingQuestions(prev => new Set(prev).add(index));

          setTimeout(() => {
            setExpandedQuestions(prev => {
              const newExpanded = new Set(prev);
              newExpanded.delete(index);
              return newExpanded;
            });
            setAnimatingQuestions(prev => {
              const newAnimating = new Set(prev);
              newAnimating.delete(index);
              return newAnimating;
            });
          }, 400);
        } else {
          setExpandedQuestions(prev => new Set(prev).add(index));
        }
      }, 50);
    };
  };

  const explanation = (question: Question): Question => {
    const regex = /\\text{□}/g;
    const newFormula = question.formula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    const newSubformula = question.subformula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    return { ...question, formula: newFormula, subformula: newSubformula };
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      renderBySelector('.math-content');
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [gameResult, expandedQuestions, renderBySelector]);

  const formatTime = useMemo(() => (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }, []);

  const accuracy = useMemo(() =>
    gameResult.totalQuestions > 0
      ? Math.round((gameResult.correctAnswers / gameResult.totalQuestions) * 100)
      : 0,
    [gameResult.correctAnswers, gameResult.totalQuestions]
  );

  // ランキング表示（保存なし）
  const handleShowRanking = () => {
    setShowRankingModal(true);
  };

  return (
    <div className="result-screen">
      <h1>RESULTS</h1>
      <div className="result-details-section">
        <div className="result-details">
          {gameResult.questionResults.map((result, index) => {
            const explanationQuestion = explanation(result.question);
            const isExpanded = expandedQuestions.has(index);
            const isAnimating = animatingQuestions.has(index);

            return (
              <div key={index} className="question-result">
                <div
                  className="question-header"
                  onClick={toggleQuestion(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleQuestion(index)(e as any);
                    }
                  }}
                >
                  <div className="question-status">
                    <span className="level">
                      {result.stage === 8 ? "HIGH LEVEL" : `LEVEL ${result.stage}`}
                    </span>
                    <span className={`status ${result.isCorrect ? "correct" : "incorrect"}`}>
                      {result.isCorrect ? "正解！" : "不正解"}
                    </span>
                  </div>
                  <div className="expand-indicator">
                    <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                  </div>
                </div>

                {(isExpanded || isAnimating) && (
                  <div className={`question-details ${isExpanded && !isAnimating ? 'expanding' : isAnimating ? 'collapsing' : ''}`}>
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
        <div className="rank-display">
          <div className="result-status">
            <p>正解数：{gameResult.correctAnswers}/{gameResult.totalQuestions} ({accuracy}%)</p>
            <p>TIME：{formatTime(gameResult.basicTime)}</p>
            {gameResult.hasHighLevelBonus && (
              <div className="bonus-text">＋ハイレベルボーナス</div>
            )}
          </div>
          <div className="rank-container">
            <span className="rank-label">rank</span>
            <span className={`rank-value rank-grade rank-${gameResult.rank.toLowerCase()}`}>
              {gameResult.rank}
            </span>
          </div>
        </div>

        {/* ランキングボタン */}
        <div className="ranking-buttons">
          <button
            className="btn ranking-view-btn"
            onClick={handleButtonClick(handleShowRanking)}
            title="ランキングを表示"
          >
            📊 ランキング表示
          </button>
        </div>
      </div>
      <div className="result-buttons">
        <button
          className="btn replay-btn"
          onClick={handleButtonClick(onReplay)}
        >
          もう一度
        </button>
        <button
          className="btn title-btn"
          onClick={handleButtonClick(onTitle)}
        >
          タイトルへ戻る
        </button>
      </div>

      {/* ランキングモーダル */}
      <RankingModal
        isOpen={showRankingModal}
        onClose={() => setShowRankingModal(false)}
        autoRegisteredId={registeredId || undefined}
      />
    </div>
  );
};

export default ResultScreen;
