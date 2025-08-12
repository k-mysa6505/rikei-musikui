import React, { useState, useEffect } from "react";
import { Question } from "../types/index";
import { generateQuestion } from "../utils/questions/generateQuestion";

type GameScreenProps ={
  onComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [startTime] = useState(() => Date.now());
  const [elapsedTime, setElapsedTime] = useState(startTime);
  const [question, setQuestion] = useState<Question>(() => generateQuestion(currentStage));
  const [userAnswer, setUserAnswer] = useState("");

  //  タイマー
  const formatElapsedTime = () => {
    const ms = Math.floor((elapsedTime % 1000) / 10);
    const s = Math.floor((elapsedTime % 60000) / 1000);
    const m = Math.floor(elapsedTime / 60000);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };
  const timerInterval = setInterval(() => {
    setElapsedTime(Date.now() - startTime);
  }, 10);

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

  //  結果表示
  const handleAnswerButtonClick = () => {
    document.getElementById("modal-section")!.classList.add("active");
    if (userAnswer === question.answer.toString()) {
      document.querySelector(".modal-title")!.textContent = "正解！";
    } else {
      document.querySelector(".modal-title")!.textContent = "不正解...";
    }
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

  //  回答数チェック
  useEffect(() => {
    if (currentStage > 7) {
      onComplete();
      clearInterval(timerInterval);
    }
  }, [currentStage, timerInterval, onComplete]);

  return (
    <div className="game-screen">
      <h1>プレイ中</h1>
      <div className="game-header-container">
        <p className="game-stage">LEVEL {currentStage}</p>
        <p className="elapsed-time">TIME {formatElapsedTime()}</p>
      </div>
      <div className="question-formula-container">
        <div className="question-formula">{question.formula}</div>
        <div className="question-sub-formula">{question.subformula}</div>
      </div>
      <div className="user-answer-container">
        <div className="user-answer">{userAnswer}</div>
      </div>
      <div className="keypad-container">
        <div className="grid">
          <div className="grid-item">
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("1")}>1</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("2")}>2</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("3")}>3</button>
          </div>
          <div className="grid-item">
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("4")}>4</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("5")}>5</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("6")}>6</button>
          </div>
          <div className="grid-item">
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("7")}>7</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("8")}>8</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("9")}>9</button>
          </div>
          <div className="grid-item">
            <button className="btn keypad-bks-btn" onClick={() => handleButtonClick("←")}>←</button>
            <button className="btn keypad-num-btn" onClick={() => handleButtonClick("0")}>0</button>
            <button className="btn keypad-mns-btn" onClick={() => handleButtonClick("-")}>-</button>
          </div>
        </div>
      </div>
      <div className="answer-btn-container">
        <button className="answer-btn" onClick={() => handleAnswerButtonClick()}>回答</button>
      </div>
      <div id="modal-section" className="modal-section-overlay">
        <div className="modal-container">
          <p className="modal-title"></p>
          <div className="question-formula">{question.formula}</div>
          <div className="question-sub-formula">{question.subformula}</div>
          <div className="user-answer">あなたの回答: {userAnswer}</div>
          <div className="modal-button-section">
            <button className="next-btn" onClick={() => onNext()}>次へ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
