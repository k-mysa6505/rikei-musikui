import { Question } from "../../types";

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
      const positions = [
        {
          formula: `\\[\\frac{dy}{dx} = \\text{□}xy\\]`,
          subformula: `\\[y = Ce^{${k}x^2/2}\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{dy}{dx} = ${k}xy\\]`,
          subformula: `\\[\\frac{dy}{y} = \\text{□}x dx\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{dy}{dx} = ${k}xy\\]`,
          subformula: `\\[y = Ce^{\\text{□}x^2/2}\\]`,
          answer: k
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
      const k = Math.floor(Math.random() * 4) + 2;
      const positions = [
        {
          formula: `\\[\\frac{d^2y}{dx^2} + \\text{□}y = 0\\]`,
          subformula: `\\[y = C_1 \\cos(\\sqrt{${k}}x) + C_2 \\sin(\\sqrt{${k}}x)\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d^2y}{dx^2} + ${k}y = 0\\]`,
          subformula: `\\[y = C_1 \\cos(\\sqrt{\\text{□}}x) + C_2 \\sin(\\sqrt{\\text{□}}x)\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d^2y}{dx^2} + ${k}y = 0\\]`,
          subformula: `\\[y = C_1 \\cos(\\sqrt{${k}}x) + C_2 \\sin(\\sqrt{${k}}x)\\]`,
          answer: k
        }
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
