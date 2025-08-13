import { Question } from "../../types";

export const generateIntegralQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な冪乗の積分
    () => {
      const n = Math.floor(Math.random() * 6) + 2; // 2-7 (指数1を避ける)
      return {
        formula: `\\[\\int x^${n} dx = \\frac{x^{\\text{□}}}{${n + 1}} + C\\]`,
        subformula: "",
        answer: n + 1
      };
    },
    // パターン2: 係数付きの積分
    () => {
      // 確実に整数になる組み合わせを直接定義（指数1を避ける）
      const validCombinations = [
        { coeff: 6, power: 2, result: 2 }, // 6x^2 → 2x^3
        { coeff: 9, power: 2, result: 3 }, // 9x^2 → 3x^3
        { coeff: 8, power: 3, result: 2 }, // 8x^3 → 2x^4
        { coeff: 10, power: 4, result: 2 }, // 10x^4 → 2x^5
        { coeff: 12, power: 2, result: 4 } // 12x^2 → 4x^3
      ];
      
      const selected = validCombinations[Math.floor(Math.random() * validCombinations.length)];
      const resultExponent = selected.power + 1 === 1 ? "" : `^${selected.power + 1}`;
      
      return {
        formula: `\\[\\int ${selected.coeff}x^${selected.power} dx = \\text{□}x${resultExponent} + C\\]`,
        subformula: "",
        answer: selected.result
      };
    },
    // パターン3: 定積分
    () => {
      // 整数解になる組み合わせを事前定義
      const validCombinations = [
        { a: 0, b: 3, n: 2, result: 9, formula: "\\int_0^3 x^2 dx = \\text{□}" },   // ∫[0,3] x^2 dx = 9
        { a: 0, b: 2, n: 3, result: 4, formula: "\\int_0^2 x^3 dx = \\text{□}" },   // ∫[0,2] x^3 dx = 4
        { a: 1, b: 3, n: 3, result: 20, formula: "\\int_1^3 x^3 dx = \\text{□}" },  // ∫[1,3] x^3 dx = 20
        { a: 0, b: 4, n: 2, result: 64, formula: "\\int_0^4 x^2 dx = \\frac{\\text{□}}{3}" }, // 64/3
        { a: 0, b: 2, n: 2, result: 8, formula: "\\int_0^2 x^2 dx = \\frac{\\text{□}}{3}" }   // 8/3
      ];
      
      const selected = validCombinations[Math.floor(Math.random() * validCombinations.length)];
      
      return {
        formula: `\\[${selected.formula}\\]`,
        subformula: "",
        answer: selected.result
      };
    },
    // パターン4: 指数関数の積分
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      return {
        formula: `\\[\\int ${k}e^x dx = \\text{□} e^x + C\\]`,
        subformula: "",
        answer: k
      };
    },
    // パターン5: 三角関数の積分
    () => {
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      const trigIntegrals = [
        { func: `${k}\\sin x`, integral: "\\cos x", coeff: -k },
        { func: `${k}\\cos x`, integral: "\\sin x", coeff: k }
      ];
      const selected = trigIntegrals[Math.floor(Math.random() * trigIntegrals.length)];
      if (selected.coeff > 0) {
        return {
          formula: `\\[\\int ${selected.func} dx = \\text{□} \\sin x + C\\]`,
          subformula: "",
          answer: selected.coeff
        };
      } else {
        return {
          formula: `\\[\\int ${selected.func} dx = -\\text{□} \\cos x + C\\]`,
          subformula: "",
          answer: Math.abs(selected.coeff)
        };
      }
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
