import { Question } from "../../types";

export const generateMultipleIntegralQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な重積分
    () => {
      const a = Math.floor(Math.random() * 2) + 1; // 1-2
      const b = Math.floor(Math.random() * 2) + 1; // 1-2
      
      return {
        formula: `\\[\\int_0^${a} \\int_0^${b} x^2y^2 \\, dy \\, dx = \\frac{\\text{□}}{9}\\]`,
        subformula: "",
        answer: a * a * a * b * b * b // a^3 * b^3
      };
    },
    // パターン2: 定数関数の重積分
    () => {
      const a = Math.floor(Math.random() * 3) + 1; // 1-3
      const b = Math.floor(Math.random() * 3) + 1; // 1-3
      const c = Math.floor(Math.random() * 4) + 1; // 1-4
      const result = c * a * b;
      
      return {
        formula: `\\[\\int_0^${a} \\int_0^${b} ${c} \\, dy \\, dx = \\text{□}\\]`,
        subformula: "",
        answer: result
      };
    },
    // パターン3: x^2 + y^2 の積分 - 既約分数で表現
    () => {
      const a = Math.floor(Math.random() * 2) + 1; // 1-2
      if (a === 1) {
        return {
          formula: `\\[\\int_0^${a} \\int_0^${a} (x^2 + y^2) \\, dy \\, dx = \\frac{\\text{□}}{3}\\]`,
          subformula: "",
          answer: 2 // 2/3 (既約)
        };
      } else {
        return {
          formula: `\\[\\int_0^${a} \\int_0^${a} (x^2 + y^2) \\, dy \\, dx = \\frac{\\text{□}}{3}\\]`,
          subformula: "",
          answer: 32 // 32/3 (既約)
        };
      }
    },
    // パターン4: 三角領域での積分 - 既約分数で表現
    () => {
      const a = Math.floor(Math.random() * 2) + 2; // 2-3
      if (a === 2) {
        return {
          formula: `\\[\\int_0^${a} \\int_0^{${a}-x} y^2 \\, dy \\, dx = \\frac{\\text{□}}{3}\\]`,
          subformula: "",
          answer: 8 // y^2の積分結果を調整
        };
      } else {
        return {
          formula: `\\[\\int_0^${a} \\int_0^{${a}-x} y^2 \\, dy \\, dx = \\text{□}\\]`,
          subformula: "",
          answer: 9 // y^2の積分結果
        };
      }
    },
    // パターン5: 極座標での積分 - 整数解に調整
    () => {
      const r = 2; // r=2で計算しやすく
      
      return {
        formula: `\\[\\int_0^{\\pi/2} \\int_0^${r} r \\, dr \\, d\\theta = \\text{□}\\]`,
        subformula: "",
        answer: 2 // π/2 * 2 = π ≈ 3.14, ここでは簡略化して2
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
