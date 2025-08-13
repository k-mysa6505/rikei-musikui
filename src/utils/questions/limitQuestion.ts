import { Question } from "../../types";

export const generateLimitQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な極限
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5
      const n = Math.floor(Math.random() * 4) + 2; // 2-5
      return {
        formula: `\\[\\lim_{x \\to ${a}} \\frac{x^${n} - ${Math.pow(a, n)}}{x - ${a}} = \\text{□}\\]`,
        subformula: "",
        answer: n * Math.pow(a, n - 1)
      };
    },
    // パターン2: 指数関数の極限
    () => {
      return {
        formula: `\\[\\lim_{x \\to 0} \\frac{2^x - 1}{x} = \\text{□}\\]`,
        subformula: "",
        answer: 2 // 1を避けて2に設定
      };
    },
    // パターン3: 三角関数の極限
    () => {
      return {
        formula: `\\[\\lim_{x \\to 0} \\frac{\\sin 2x}{x} = \\text{□}\\]`,
        subformula: "",
        answer: 2 // sin(2x)/x = 2 * sin(2x)/(2x) = 2 * 1 = 2
      };
    },
    // パターン4: 無限大への極限
    () => {
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const b = Math.floor(Math.random() * 3) + 2; // 2-4 (係数1を避ける)
      return {
        formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${b}x}{x^2 + 2} = \\text{□}\\]`,
        subformula: "",
        answer: a
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
