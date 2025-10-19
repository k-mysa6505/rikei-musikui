// src/utils/questions/multipleIntegralQuestion.ts
// 第6問 重積分の問題生成

import { Question } from "../../types";

export const generateMultipleIntegralQuestion = (): Question => {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 2) + 1; // 1-2
      const b = Math.floor(Math.random() * 2) + 1; // 1-2
      const result = a * a * a * b * b * b; // a^3 * b^3
      const positions = [
        {
          formula: `\\[\\int_0^\\text{□} \\int_0^${b} x^2y^2 \\, dy \\, dx = \\frac{${result}}{9}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^\\text{□} x^2y^2 \\, dy \\, dx = \\frac{${result}}{9}\\]`,
          answer: b
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^${b} x^2y^2 \\, dy \\, dx = \\frac{\\text{□}}{9}\\]`,
          answer: result
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    () => {
      const a = Math.floor(Math.random() * 3) + 1; // 1-3
      const b = Math.floor(Math.random() * 3) + 1; // 1-3
      const c = Math.floor(Math.random() * 4) + 1; // 1-4
      const result = c * a * b;
      const positions = [
        {
          formula: `\\[\\int_0^\\text{□} \\int_0^${b} ${c} \\, dy \\, dx = ${result}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^\\text{□} ${c} \\, dy \\, dx = ${result}\\]`,
          answer: b
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^${b} \\text{□} \\, dy \\, dx = ${result}\\]`,
          answer: c
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^${b} ${c} \\, dy \\, dx = \\text{□}\\]`,
          answer: result
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    () => {
      const a = Math.floor(Math.random() * 2) + 1; // 1-2
      const results = a === 1 ? { numerator: 2, a: 1 } : { numerator: 32, a: 2 };
      const positions = [
        {
          formula: `\\[\\int_0^\\text{□} \\int_0^${a} (x^2 + y^2) \\, dy \\, dx = \\frac{${results.numerator}}{3}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^\\text{□} (x^2 + y^2) \\, dy \\, dx = \\frac{${results.numerator}}{3}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^${a} (x^2 + y^2) \\, dy \\, dx = \\frac{\\text{□}}{3}\\]`,
          answer: results.numerator
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    () => {
      // ∫₀^a ∫₀^(a-x) y² dy dx = a⁴/12
      // a=6のとき、6⁴/12 = 1296/12 = 108（整数）
      const a = 6;
      const result = 108; // 6⁴/12 = 108
      const positions = [
        {
          formula: `\\[\\int_0^\\text{□} \\int_0^{6-x} y^2 \\, dy \\, dx = ${result}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^6 \\int_0^{\\text{□}-x} y^2 \\, dy \\, dx = ${result}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^6 \\int_0^{6-x} y^2 \\, dy \\, dx = \\text{□}\\]`,
          answer: result
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    () => {
      // ∫₀^(π/2) ∫₀^r r dr dθ = r²/2 * π/2 = πr²/4
      // r=2のとき、π*4/4 = π
      // r=4のとき、π*16/4 = 4π
      const r = Math.random() < 0.5 ? 2 : 4;
      const coefficient = r * r / 4; // 2→1, 4→4
      const positions = [
        {
          formula: `\\[\\int_0^{\\pi/2} \\int_0^\\text{□} r \\, dr \\, d\\theta = ${coefficient === 1 ? '\\pi' : `${coefficient}\\pi`}\\]`,
          answer: r
        },
        {
          formula: `\\[\\int_0^{\\pi/2} \\int_0^${r} r \\, dr \\, d\\theta = \\text{□}\\pi\\]`,
          answer: coefficient
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
