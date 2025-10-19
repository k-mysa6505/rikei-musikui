// src/utils/questions/differentialEquationQuestion.ts
// 第7問 微分方程式の問題生成

import { Question } from "../../types";

const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

// 分数を既約分数にする関数
const reduceFraction = (numerator: number, denominator: number): { num: number, den: number } => {
  const divisor = gcd(numerator, denominator);
  return {
    num: numerator / divisor,
    den: denominator / divisor
  };
};

// 平方根の中身を最も簡単な形にする関数
const simplifySquareRoot = (n: number): { coefficient: number, inside: number } => {
  let coefficient = 1;
  let inside = n;

  for (let i = 2; i * i <= inside; i++) {
    while (inside % (i * i) === 0) {
      coefficient *= i;
      inside /= (i * i);
    }
  }

  return { coefficient, inside };
};

export const generateDifferentialEquationQuestion = (): Question => {
  const patterns = [
    () => {
      const pairs = [
        { a: 2, b: 4 }, // 4/2 = 2
        { a: 3, b: 6 }, // 6/3 = 2
        { a: 4, b: 8 }, // 8/4 = 2
        { a: 5, b: 10 } // 10/5 = 2
      ];
      const selected = pairs[Math.floor(Math.random() * pairs.length)];
      const result = selected.b / selected.a;
      const positions = [
        {
          formula: `\\[\\frac{dy}{dx} + \\text{□}y = ${selected.b}\\]`,
          subformula: `\\[y = Ce^{-${selected.a}x} + ${result}\\]`,
          answer: selected.a
        },
        {
          formula: `\\[\\frac{dy}{dx} + ${selected.a}y = \\text{□}\\]`,
          subformula: `\\[y = Ce^{-${selected.a}x} + ${result}\\]`,
          answer: selected.b
        },
        {
          formula: `\\[\\frac{dy}{dx} + ${selected.a}y = ${selected.b}\\]`,
          subformula: `\\[y_p = \\text{□}\\]`,
          answer: result
        },
        {
          formula: `\\[\\frac{dy}{dx} + ${selected.a}y = ${selected.b}\\]`,
          subformula: `\\[y = Ce^{-${selected.a}x} + \\text{□}\\]`,
          answer: result
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: selectedPos.subformula || "",
        answer: selectedPos.answer
      };
    },
    () => {
      const k = Math.floor(Math.random() * 3) + 2;
      const fraction = reduceFraction(k, 2);

      // 指数部分の表示形式を決定
      let exponentDisplay;
      if (fraction.num % fraction.den === 0) {
        // 整数の場合
        if (fraction.num === 1) {
          exponentDisplay = "x^2"; // 1x^2 → x^2
        } else {
          exponentDisplay = `${fraction.num / fraction.den}x^2`;
        }
      } else {
        // 分数の場合
        exponentDisplay = `\\frac{${fraction.num}}{${fraction.den}}x^2`;
      }

      const positions = [
        {
          formula: `\\[\\frac{dy}{dx} = \\text{□}xy\\]`,
          subformula: `\\[y = Ce^{${exponentDisplay}}\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{dy}{dx} = ${k}xy\\]`,
          subformula: `\\[y = Ce^{${k % 2 ? `\\frac{${k}}{2}` : `${k / 2}`}x^2}\\]`,
          answer: k % 2 ? k : k / 2
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: selectedPos.subformula || "",
        answer: selectedPos.answer
      };
    },
    () => {
      // 完全平方数でない値を選択してルートを最簡形にする
      const nonPerfectSquares = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];
      const k = nonPerfectSquares[Math.floor(Math.random() * nonPerfectSquares.length)];
      const simplifiedRoot = simplifySquareRoot(k);

      const rootExpression = simplifiedRoot.coefficient === 1
        ? `\\sqrt{${simplifiedRoot.inside}}`
        : `${simplifiedRoot.coefficient}\\sqrt{${simplifiedRoot.inside}}`;

      const positions = [
        {
          formula: `\\[\\frac{d^2y}{dx^2} + \\text{□}y = 0\\]`,
          subformula: `\\[y = C_1 \\cos(${rootExpression}x) + C_2 \\sin(${rootExpression}x)\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d^2y}{dx^2} + ${k}y = 0\\]`,
          subformula: `\\[y = C_1 \\cos(\\sqrt{\\text{□}}x) + C_2 \\sin(\\sqrt{\\text{□}}x)\\]`,
          answer: k
        },
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: selectedPos.subformula || "",
        answer: selectedPos.answer
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
