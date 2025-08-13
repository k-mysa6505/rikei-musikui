import React, { useState, useEffect, useMemo } from "react";
import { Question, QuestionResult } from "../types/index";
import { generateQuestion } from "../utils/questions/generateQuestion";
import { useMathJax } from "../hooks/useMathJax";

type GameScreenProps ={
  onComplete: () => void;
  onRecordResult: (stage: number, question: Question, userAnswer: string) => QuestionResult;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete, onRecordResult }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [startTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(startTime);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(currentStage));
  const [userAnswer, setUserAnswer] = useState("");
  const { renderElement } = useMathJax();

  // タイマー効率化
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);
    return () => clearInterval(interval);
  }, [startTime]);

  // 時間フォーマット関数をメモ化
  const formatElapsedTime = useMemo(() => {
    const ms = Math.floor((elapsedTime % 1000) / 10);
    const s = Math.floor((elapsedTime % 60000) / 1000);
    const m = Math.floor(elapsedTime / 60000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  }, [elapsedTime]);

  //  入力処理
  const handleButtonClick = (value: string) => {
    //  BackSpace
    if (value === "←") {
      setUserAnswer((prev) => prev.slice(0, -1));
      return;
    }
    //  Minus（未入力のみ有効，0の後ろは0を上書き）
    if (value === "-") {
      if (userAnswer === "" || userAnswer === "0") {
        setUserAnswer("-");
      }
      return;
    }
    //  0（0, -の後ろは無効）
    if (value === "0") {
      if (userAnswer === "0" || userAnswer === "-") {
        return;
      }
      setUserAnswer((prev) => prev + value);
      return;
    }
    //  1～9（0の後ろは0を上書き）
    if (value !== "0") {
      if (userAnswer === "0") {
        setUserAnswer(value);
        return;
      }
      setUserAnswer((prev) => prev + value);
      return;
    }
  }

  //  プレースホルダー
  const userAnswerElement = document.querySelector(".user-answer");
  if (userAnswerElement) {
    if (userAnswer === "") {
      userAnswerElement.classList.add("empty");
      userAnswerElement.textContent = "□に入る数字は？";
    } else {
      userAnswerElement.classList.remove("empty");
      userAnswerElement.textContent = userAnswer;
    }
  }

  //  ボタンの有効化・無効化
  const submitButton = document.querySelector(".answer-btn") as HTMLButtonElement;
  if (submitButton) {
    submitButton.disabled = (userAnswer === '' || userAnswer === '-');
  }

  // 最適化されたMathJaxレンダリング
  useEffect(() => {
    const formulaContainer = document.getElementById("question-formula-container");
    if (formulaContainer) {
      renderElement(formulaContainer);
    }
  }, [question, renderElement]);

  //  解説
  const explanation = (question: Question): Question => {
    const regex = /\\text{□}/g;
    const newFormula = question.formula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    const newSubformula = question.subformula.replace(regex, `\\textcolor{red}{${question.answer}}`);
    return { ...question, formula: newFormula, subformula: newSubformula };
  }

  //  次へボタン
  function onNext() {
    document.getElementById("modal-section")!.classList.remove("active");
    setCurrentStage((prevStage) => prevStage + 1);
    if (currentStage < 7) {
      setQuestion(generateQuestion(currentStage + 1));
      setUserAnswer("");
    }
  }

  //  結果表示
  const handleAnswerButtonClick = () => {
    // 回答結果を記録
    const result = onRecordResult(currentStage, question, userAnswer);

    const questionWithExplanation = explanation(question);
    const modalSection = document.getElementById("modal-section");
    const modalQuestionExplanation = document.getElementById("modal-question-explanation");
    const modalTitle = document.querySelector(".modal-title");

    if (modalSection && modalQuestionExplanation && modalTitle) {
      modalSection.scrollTop = 0;
      modalQuestionExplanation.innerHTML = `
        <div class="question-formula">${questionWithExplanation.formula}</div>
        <div class="question-sub-formula">${questionWithExplanation.subformula}</div>
      `;

      const feedbackPhrases = [
        ["やった！！", "すばらしい！", "最高！", "正解！"],
        ["もう少し！", "惜しい！", "次はできるよ！", "不正解..."]
      ];
      if (result.isCorrect) {
        modalTitle.textContent = feedbackPhrases[0][Math.floor(Math.random() * feedbackPhrases[0].length)];
        (modalTitle as HTMLElement).style.color = "#4CAF50";
      } else {
        modalTitle.textContent = feedbackPhrases[1][Math.floor(Math.random() * feedbackPhrases[1].length)];
        (modalTitle as HTMLElement).style.color = "#e74c3c";
      }

      modalSection.classList.add("active");

      // MathJax で数式を描画（非同期処理）
      setTimeout(() => {
        if (window.MathJax) {
          renderElement(modalQuestionExplanation);
        }
      }, 50);

      // 既存のイベントリスナーをクリア
      const modalNextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
      if (modalNextBtn) {
        const newBtn = modalNextBtn.cloneNode(true) as HTMLButtonElement;
        modalNextBtn.parentNode?.replaceChild(newBtn, modalNextBtn);

        // 新しいイベントリスナーを追加
        newBtn.addEventListener("click", () => {
          modalSection.classList.remove("active");
          onNext();
        });
      }
    }
  }

  //  回答数チェック
  useEffect(() => {
    if (currentStage > 7) {
      onComplete();
    }
  }, [currentStage, onComplete]);

  return (
    <div className="game-container">
      <div className="game-screen">
        <div className="game-header-container">
          <p className="game-stage">LEVEL {currentStage}</p>
          <p className="elapsed-time">TIME {formatElapsedTime}</p>
        </div>
        <div id="question-formula-container" className="question-formula-container">
          <div className="question-formula">{question.formula}</div>
          <div className="question-sub-formula">{question.subformula}</div>
        </div>
        <div className="user-answer-container">
          <div className="user-answer">□に入る数字は？</div>
        </div>
      <div className="keypad-container">
        <div className="keypad-grid">
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('1')}>1</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('2')}>2</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('3')}>3</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('4')}>4</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('5')}>5</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('6')}>6</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('7')}>7</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('8')}>8</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('9')}>9</button>
          <button className="btn keypad-bks-btn" onClick={() => handleButtonClick('←')}>←</button>
          <button className="btn keypad-num-btn" onClick={() => handleButtonClick('0')}>0</button>
          <button className="btn keypad-mns-btn" onClick={() => handleButtonClick('-')}>ー</button>
        </div>
      </div>
        <button className="answer-btn" onClick={() => handleAnswerButtonClick()}>OK</button>
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
      </div>
    </div>
  );
};

export default GameScreen;
