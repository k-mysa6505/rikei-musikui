import { Question } from "../../types";

export const generateDifferentialEquationQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な分離型微分方程式
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      return {
        formula: `\\[\\frac{dy}{dx} = ${k}y\\]`,
        subformula: `\\[y = Ce^{\\text{□}x}\\]`,
        answer: k
      };
    },
    // パターン2: 負の係数を持つ微分方程式
    () => {
      const k = Math.floor(Math.random() * 3) + 2; // 2-4 (1を避ける)
      return {
        formula: `\\[\\frac{dy}{dx} = -${k}y\\]`,
        subformula: `\\[y = Ce^{\\text{□}x}\\]`,
        answer: -k
      };
    },
    // パターン3: 1次線形微分方程式 - 整数解に調整
    () => {
      const pairs = [
        { a: 2, b: 4 }, // 4/2 = 2
        { a: 3, b: 6 }, // 6/3 = 2  
        { a: 4, b: 8 }, // 8/4 = 2
        { a: 5, b: 10 } // 10/5 = 2
      ];
      const selected = pairs[Math.floor(Math.random() * pairs.length)];
      
      return {
        formula: `\\[\\frac{dy}{dx} + ${selected.a}y = ${selected.b}\\]`,
        subformula: `\\[y_p = \\text{□}\\]`,
        answer: selected.b / selected.a
      };
    },
    // パターン4: 変数分離法
    () => {
      const k = Math.floor(Math.random() * 3) + 2; // 2-4 (1を避ける)
      return {
        formula: `\\[\\frac{dy}{dx} = ${k}xy\\]`,
        subformula: `\\[\\frac{dy}{y} = \\text{□}x dx\\]`,
        answer: k
      };
    },
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
