import React, { useState, useEffect, useMemo } from "react";
import { Question, QuestionResult } from "../types/index";
import { generateQuestion } from "../utils/questions/generateQuestion";
import { useMathJax } from "../hooks/useMathJax";

type GameScreenProps = {
  onComplete: () => void;
  onRecordResult: (stage: number, question: Question, userAnswer: string) => QuestionResult;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete, onRecordResult }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [startTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(startTime);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(currentStage));
  const [userAnswer, setUserAnswer] = useState("");
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const { renderElement } = useMathJax();

  useEffect(() => {
    const interval = setInterval(() => setElapsedTime(Date.now() - startTime), 10);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatElapsedTime = useMemo(() => {
    const ms = Math.floor((elapsedTime % 1000) / 10);
    const s = Math.floor((elapsedTime % 60000) / 1000);
    const m = Math.floor(elapsedTime / 60000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }, [elapsedTime]);

  const handleButtonClick = (value: string) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;

      button.style.transform = 'translateY(0) scale(0.95)';
      button.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        button.style.transform = '';
        button.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 100);

      if (value === "←") {
        setUserAnswer(prev => prev.slice(0, -1));
      } else if (value === "-") {
        if (userAnswer === "" || userAnswer === "0") setUserAnswer("-");
      } else if (value === "0") {
        if (userAnswer === "0" || userAnswer === "-") {
          return;
        }
        if (userAnswer !== "0" && userAnswer !== "-") setUserAnswer(prev => prev + "0");
      } else {
        setUserAnswer(prev => prev === "0" ? value : prev + value);
      }
    };
  };

  useEffect(() => {
    const formulaContainer = document.getElementById("question-formula-container");
    if (formulaContainer) renderElement(formulaContainer);
    //  DEBUG
    console.log(question.answer);
  }, [question, renderElement]);

  const explanation = (question: Question): Question => {
    const regex = /\\text{□}/g;
    const newFormula = question.formula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    const newSubformula = question.subformula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    return { ...question, formula: newFormula, subformula: newSubformula };
  };

  const onNext = () => {
    document.getElementById("modal-section")!.classList.remove("active");

    // 7問目完了後の判定（グローバル変数を使用）
    if (currentStage === 7 && (window as any).isAllCorrectAfter7th) {
      setTimeout(() => {
        document.getElementById("high-level-modal-section")!.classList.add("active");
      }, 300);
      return;
    }

    setCurrentStage(prev => prev + 1);
    if (currentStage < 7 || (currentStage === 7 && (window as any).isAllCorrectAfter7th)) {
      setQuestion(generateQuestion(currentStage + 1));
      setUserAnswer("");
    } else if (currentStage === 7 && !(window as any).isAllCorrectAfter7th) {
      setCurrentStage(prev => prev + 1);
      setUserAnswer("");
    }
  };

  const onHighLevelStart = () => {
    document.getElementById("high-level-modal-section")!.classList.remove("active");
    setCurrentStage(prev => prev + 1);
    setQuestion(generateQuestion(8));
    setUserAnswer("");
  };

  const handleAnswerButtonClick = () => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      // DOM要素への参照を保存
      const button = e.currentTarget;

      // ボタンの視覚的フィードバック
      button.style.transform = 'translateY(0) scale(0.98)';
      button.style.transition = 'all 0.1s ease';

      setTimeout(() => {
        button.style.transform = '';
        button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }, 100);

      // 実際の処理
      setTimeout(() => {
        const result = onRecordResult(currentStage, question, userAnswer);

        // 7問目の判定を即座に行う（状態更新を待たない）
        if (currentStage === 7) {
          const allCorrectIncludingCurrent = [...questionResults, result].every(r => r.isCorrect);

          // グローバル変数として保存（onNextで使用）
          (window as any).isAllCorrectAfter7th = allCorrectIncludingCurrent;
        }

        // 結果を状態に追加
        setQuestionResults(prev => [...prev, result]);
        const questionWithExplanation = explanation(question);

        const modalSection = document.getElementById("modal-section")!;
        const modalQuestionExplanation = document.getElementById("modal-question-explanation")!;
        const modalTitle = document.querySelector(".modal-title")! as HTMLElement;

        modalSection.scrollTop = 0;
        modalQuestionExplanation.innerHTML = `
          <div class="question-formula">${questionWithExplanation.formula}</div>
          ${questionWithExplanation.subformula ? `<div class="question-sub-formula">${questionWithExplanation.subformula}</div>` : ''}
        `;

        let phrases: string[];
        if (currentStage === 8) {
          // ハイレベル問題用のフィードバック
          phrases = result.isCorrect
            ? ["驚異的！！", "天才的！", "完璧！", "神業！", "圧巻！"]
            : ["素晴らしい挑戦！", "勇敢でした！", "よく頑張った！", "挑戦者の誇り！", "感動的でした！"];
        } else {
          // 通常問題用のフィードバック
          phrases = result.isCorrect
            ? ["やった！！", "すばらしい！", "最高！", "正解！"]
            : ["もう少し！", "惜しい！", "次はできるよ！", "不正解..."];
        }

        modalTitle.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        modalTitle.style.color = result.isCorrect ? "#4CAF50" : "#e74c3c";
        modalSection.classList.add("active");

        setTimeout(() => renderElement(modalQuestionExplanation), 50);

        const modalNextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
        if (modalNextBtn) {
          const newBtn = modalNextBtn.cloneNode(true) as HTMLButtonElement;
          modalNextBtn.parentNode?.replaceChild(newBtn, modalNextBtn);
          newBtn.addEventListener("click", (btnEvent) => {
            const btn = btnEvent.currentTarget as HTMLButtonElement;
            btn.style.transform = 'translateY(0) scale(0.98)';
            btn.style.transition = 'all 0.1s ease';

            setTimeout(() => {
              btn.style.transform = '';
              btn.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 100);

            setTimeout(() => {
              modalSection.classList.remove("active");
              onNext();
            }, 150);
          });
        }
      }, 150);
    };
  };

  useEffect(() => {
    if (currentStage > 8) onComplete();
  }, [currentStage, onComplete]);

  return (
    <div className="game-container">
      <div className="game-screen">
        <div className="game-header-container">
          <p className="game-stage">
            {currentStage === 8 ? "HIGH LEVEL" : `LEVEL ${currentStage}`}
          </p>
          <p className="elapsed-time">
            {currentStage === 8 ? "BONUS TIME" : `TIME ${formatElapsedTime}`}
          </p>
        </div>
        <div id="question-formula-container" className="question-formula-container">
          <div className="question-formula">{question.formula}</div>
          {question.subformula && <div className="question-sub-formula">{question.subformula}</div>}
        </div>
        <div className="user-answer-container">
          <div className={`user-answer ${userAnswer === "" ? "empty" : ""}`}>
            {userAnswer || "□に入る数字は？"}
          </div>
        </div>
      <div className="keypad-container">
        <div className="keypad-grid">
          <button className="btn keypad-num-btn" onClick={handleButtonClick('1')}>1</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('2')}>2</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('3')}>3</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('4')}>4</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('5')}>5</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('6')}>6</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('7')}>7</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('8')}>8</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('9')}>9</button>
          <button className="btn keypad-bks-btn" onClick={handleButtonClick('←')}>←</button>
          <button className="btn keypad-num-btn" onClick={handleButtonClick('0')}>0</button>
          <button className="btn keypad-mns-btn" onClick={handleButtonClick('-')}>ー</button>
        </div>
      </div>
        <button
          className="answer-btn"
          onClick={handleAnswerButtonClick()}
          disabled={userAnswer === '' || userAnswer === '-'}
        >
          OK
        </button>
        <div id="modal-section" className="modal-section-overlay">
          <div className="modal-container">
            <p className="modal-title"></p>
            <div id="modal-question-explanation" className="modal-question-explanation"></div>
            <div className="modal-user-answer">あなたの回答: <strong>{userAnswer}</strong></div>
            <div className="modal-button-section">
              <button className="next-btn">次へ</button>
            </div>
          </div>
        </div>

        {/* ハイレベル問題案内モーダル */}
        <div id="high-level-modal-section" className="modal-section-overlay">
          <div className="modal-container">
            <p className="modal-title" style={{ color: "#FFD700", fontSize: "1.5em" }}>
              7問連続正解すごいね！
            </p>
            <div className="modal-button-section">
              <button
                className="next-btn"
                onClick={() => {
                  const button = document.querySelector('#high-level-modal-section .next-btn') as HTMLButtonElement;
                  button.style.transform = 'translateY(0) scale(0.98)';
                  button.style.transition = 'all 0.1s ease';

                  setTimeout(() => {
                    button.style.transform = '';
                    button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                  }, 100);

                  setTimeout(() => {
                    onHighLevelStart();
                  }, 150);
                }}
              >
                ハイレベル問題に進む
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
