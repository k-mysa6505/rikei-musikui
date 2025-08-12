import React, { useState, useEffect, useRef } from "react";
import { Question, QuestionResult } from "../types/index";
import { generateQuestion } from "../utils/questions/generateQuestion";

type GameScreenProps ={
	onComplete: () => void;
	onRecordResult: (stage: number, question: Question, userAnswer: string) => QuestionResult;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete, onRecordResult }) => {
	const [currentStage, setCurrentStage] = useState(1);
	const [startTime] = useState(() => Date.now());
	const [elapsedTime, setElapsedTime] = useState(0);
	const [question, setQuestion] = useState<Question>(() => generateQuestion(currentStage));
	const [userAnswer, setUserAnswer] = useState("");
	const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

	const formatElapsedTime = () => {
		const ms = Math.floor((elapsedTime % 1000) / 10);
		const s = Math.floor((elapsedTime % 60000) / 1000);
		const m = Math.floor(elapsedTime / 60000);
		return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
	};

	useEffect(() => {
		timerIntervalRef.current = setInterval(() => {
			setElapsedTime(Date.now() - startTime);
		}, 10);

		return () => {
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, [startTime]);

	const handleButtonClick = (value: string) => {
		if (value === "←") {
			setUserAnswer((prev) => prev.slice(0, -1));
			return;
		}
		if (value === "-") {
			if (userAnswer === "" || userAnswer === "0") {
				setUserAnswer("-");
			}
			return;
		}
		if (value === "0") {
			if (userAnswer === "0" || userAnswer === "-") {
				return;
			}
			setUserAnswer((prev) => prev + value);
			return;
		}
		if (value !== "0") {
			if (userAnswer === "0") {
				setUserAnswer(value);
				return;
			}
			setUserAnswer((prev) => prev + value);
			return;
		}
	}

	const renderMathJax = async (elementId: string) => {
		try {
			if (!window.MathJax) {
				return;
			}

			const element = document.getElementById(elementId);
			if (!element) {
				return;
			}

			const rect = element.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) {
				return;
			}

			const hasContent = element.children.length > 0 || element.textContent?.trim();
			if (!hasContent) {
				return;
			}

			const maxRetries = 3;
			let retryCount = 0;

			while (retryCount < maxRetries) {
				try {
					const currentElement = document.getElementById(elementId);
					if (!currentElement) {
						return;
					}

					window.MathJax.typeset([currentElement]);
					break;
				} catch (error: any) {
					if (error?.message?.includes('MathJax retry')) {
						retryCount++;
						await new Promise(resolve => setTimeout(resolve, 200));
					} else {
						throw error;
					}
				}
			}

		} catch (error) {
			console.error("MathJax rendering failed:", error);
		}
	};

	useEffect(() => {
		const timer = setTimeout(async () => {
			await renderMathJax("question-formula-container");
		}, 100);

		return () => clearTimeout(timer);
	}, [question.formula, question.subformula]);

	const explanation = (question: Question): Question => {
		const regex = /\\text{□}/g;
		const newFormula = question.formula.replace(regex, `\\textcolor{red}{${question.answer}}`);
		const newSubformula = question.subformula.replace(regex, `\\textcolor{red}{${question.answer}}`);
		return { ...question, formula: newFormula, subformula: newSubformula };
	}

	const handleAnswerButtonClick = () => {
		const result = onRecordResult(currentStage, question, userAnswer);

		const questionWithExplanation = explanation(question);
		const modalSection = document.getElementById("modal-section")!;
		const modalExplanation = document.getElementById("modal-question-explanation")!;

		modalSection.classList.add("active");

		modalExplanation.innerHTML = `
			<div class="question-formula">${questionWithExplanation.formula}</div>
			<div class="question-sub-formula">${questionWithExplanation.subformula}</div>
		`;

		if (result.isCorrect) {
			document.querySelector(".modal-title")!.textContent = "正解！";
		} else {
			document.querySelector(".modal-title")!.textContent = "不正解...";
		}

		const renderModalMathJax = async () => {
			try {
				const modal = document.getElementById("modal-section");
				const explanation = document.getElementById("modal-question-explanation");

				if (modal && explanation && modal.classList.contains("active")) {
					const rect = explanation.getBoundingClientRect();
					if (rect.width > 0 && rect.height > 0) {
						await renderMathJax("modal-question-explanation");
						return;
					}
				}

				setTimeout(renderModalMathJax, 100);
			} catch (error) {
				console.error("Modal MathJax rendering failed:", error);
			}
		};

		setTimeout(renderModalMathJax, 300);
	}

	function onNext() {
		document.getElementById("modal-section")!.classList.remove("active");
		setCurrentStage((prevStage) => prevStage + 1);
		if (currentStage < 7) {
			setQuestion(generateQuestion(currentStage + 1));
			setUserAnswer("");
		}
	}

	useEffect(() => {
		if (currentStage > 7) {
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
			onComplete();
		}
	}, [currentStage, onComplete]);

	return (
		<div className="game-screen">
			<div className="game-header-container">
				<p className="game-stage">LEVEL {currentStage}</p>
				<p className="elapsed-time">TIME {formatElapsedTime()}</p>
			</div>
			<div id="question-formula-container" className="question-formula-container">
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
					<div id="modal-question-explanation" className="modal-question-explanation"></div>
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
