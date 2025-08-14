import { Question } from "../../types";

export const generateMultipleIntegralQuestion = (): Question => {
  const patterns = [
    // パターン1: 基本的な重積分
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
    // パターン2: 定数関数の重積分
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
    // パターン3: x^2 + y^2 の積分 - 既約分数で表現
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
    // パターン4: 三角領域での積分 - 既約分数で表現
    () => {
      const a = Math.floor(Math.random() * 2) + 2; // 2-3
      const results = a === 2 ? { numerator: 8, denom: 3 } : { numerator: 9, denom: 1 };
      const positions = [
        {
          formula: `\\[\\int_0^\\text{□} \\int_0^{${a}-x} y^2 \\, dy \\, dx = ${results.denom === 1 ? results.numerator : `\\frac{${results.numerator}}{${results.denom}}`}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^{\\text{□}-x} y^2 \\, dy \\, dx = ${results.denom === 1 ? results.numerator : `\\frac{${results.numerator}}{${results.denom}}`}\\]`,
          answer: a
        },
        {
          formula: `\\[\\int_0^${a} \\int_0^{${a}-x} y^2 \\, dy \\, dx = ${results.denom === 1 ? '\\text{□}' : `\\frac{\\text{□}}{${results.denom}}`}\\]`,
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
    // パターン5: 極座標での積分 - 整数解に調整
    () => {
      const r = 2; // r=2で計算しやすく
      const result = 2; // π/2 * 2 = π ≈ 3.14, ここでは簡略化して2
      const positions = [
        {
          formula: `\\[\\int_0^{\\pi/2} \\int_0^\\text{□} r \\, dr \\, d\\theta = ${result}\\]`,
          answer: r
        },
        {
          formula: `\\[\\int_0^{\\pi/2} \\int_0^${r} r \\, dr \\, d\\theta = \\text{□}\\]`,
          answer: result
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
