import { Question } from "../../types";

export const generateIntegralQuestion = (): Question => {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const n = Math.floor(Math.random() * 3) + 2; // 2-4
      const positions = [
        {
          formula: `\\[\\int (\\text{□}x)^${n} dx = \\frac{1}{${a * (n + 1)}}(${a}x)^{${n + 1}} + C\\]`,
          answer: a
        },
        {
          formula: `\\[\\int (${a}x)^\\text{□} dx = \\frac{1}{${a * (n + 1)}}(${a}x)^{${n + 1}} + C\\]`,
          answer: n
        },
        {
          formula: `\\[\\int (${a}x)^${n} dx = \\frac{\\text{□}}{${a * (n + 1)}}(${a}x)^{${n + 1}} + C\\]`,
          answer: 1
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
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const positions = [
        {
          formula: `\\[\\int \\text{□}e^{${a}x} dx = \\frac{${k}}{${a}} e^{${a}x} + C\\]`,
          answer: k
        },
        {
          formula: `\\[\\int ${k}e^{\\text{□}x} dx = \\frac{${k}}{${a}} e^{${a}x} + C\\]`,
          answer: a
        },
        {
          formula: `\\[\\int ${k}e^{${a}x} dx = \\frac{\\text{□}}{${a}} e^{${a}x} + C\\]`,
          answer: k
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
      const k = Math.floor(Math.random() * 4) + 2; // 2-5
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const trigIntegrals = [
        { func: `\\sin(${a}x)`, integral: `\\cos(${a}x)`, coeff: -k, divisor: a, resultFunc: "\\cos" },
        { func: `\\cos(${a}x)`, integral: `\\sin(${a}x)`, coeff: k, divisor: a, resultFunc: "\\sin" }
      ];
      const selected = trigIntegrals[Math.floor(Math.random() * trigIntegrals.length)];
      const positions = [
        {
          formula: `\\[\\int \\text{□}${selected.func} dx = ${selected.coeff < 0 ? '-' : ''}\\frac{${Math.abs(selected.coeff)}}{${selected.divisor}} ${selected.resultFunc}(${a}x) + C\\]`,
          answer: k
        },
        {
          formula: `\\[\\int ${k}${selected.func} dx = ${selected.coeff < 0 ? '-' : ''}\\frac{\\text{□}}{${selected.divisor}} ${selected.resultFunc}(${a}x) + C\\]`,
          answer: Math.abs(selected.coeff)
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
