import { Question } from "../../types";

export const generateDifferentialQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な冪乗の微分
    () => {
      const n = Math.floor(Math.random() * 6) + 3; // 3-8 (微分後も指数2以上)
      const resultExponent = n - 1 === 1 ? "" : `^${n - 1}`;
      return {
        formula: `\\[\\frac{d}{dx}(x^${n}) = \\text{□}x${resultExponent}\\]`,
        subformula: "",
        answer: n
      };
    },
    // パターン2: 多項式の微分
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5
      const n = Math.floor(Math.random() * 3) + 3; // 3-5 (微分後も指数2以上)
      const b = Math.floor(Math.random() * 4) + 2; // 2-5
      const m = Math.floor(Math.random() * 2) + 2; // 2-3
      const c = Math.floor(Math.random() * 9) + 1; // 1-9
      
      // 指数1の場合は表示しない
      const firstTerm = n - 1 === 1 ? `${a * n}x` : `${a * n}x^${n - 1}`;
      const secondTerm = m - 1 === 1 ? `\\text{□}x` : `\\text{□}x^${m - 1}`;
      
      return {
        formula: `\\[\\frac{d}{dx}(${a}x^${n} + ${b}x^${m} + ${c}) = ${firstTerm} + ${secondTerm}\\]`,
        subformula: "",
        answer: b * m
      };
    },
    // パターン3: 指数関数の微分
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      return {
        formula: `\\[\\frac{d}{dx}(${k}e^x) = \\text{□}e^x\\]`,
        subformula: "",
        answer: k // 係数kをつけて1を避ける
      };
    },
    // パターン4: 三角関数の微分
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      const trigFunctions = [
        { func: `${k}\\sin x`, derivative: "\\cos x", answer: k },
        { func: `${k}\\cos x`, derivative: "\\sin x", answer: -k }
      ];
      const selected = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];
      if (selected.answer > 0) {
        return {
          formula: `\\[\\frac{d}{dx}(${selected.func}) = \\text{□} \\cos x\\]`,
          subformula: "",
          answer: selected.answer
        };
      } else {
        return {
          formula: `\\[\\frac{d}{dx}(${selected.func}) = -\\text{□} \\sin x\\]`,
          subformula: "",
          answer: Math.abs(selected.answer)
        };
      }
    },
    // パターン5: 対数関数の微分
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      return {
        formula: `\\[\\frac{d}{dx}(${k}\\ln x) = \\frac{\\text{□}}{x}\\]`,
        subformula: "",
        answer: k
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
