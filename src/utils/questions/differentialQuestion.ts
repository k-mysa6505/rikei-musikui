import { Question } from "../../types";

export const generateDifferentialQuestion = (): Question => {
  const patterns = [
    () => {
      const k = Math.floor(Math.random() * 4) + 2;
      const a = Math.floor(Math.random() * 3) + 2;
      const result = k * a;
      const positions = [
        {
          formula: `\\[\\frac{d}{dx}(\\text{□}e^{${a}x}) = ${result}e^{${a}x}\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d}{dx}(${k}e^{\\text{□}x}) = ${result}e^{${a}x}\\]`,
          answer: a
        },
        {
          formula: `\\[\\frac{d}{dx}(${k}e^{${a}x}) = \\text{□}e^{${a}x}\\]`,
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
      const k = Math.floor(Math.random() * 4) + 2;
      const a = Math.floor(Math.random() * 3) + 2;
      const trigFunctions = [
        { func: `\\sin(${a}x)`, derivative: `\\cos(${a}x)`, answer: k * a },
        { func: `\\cos(${a}x)`, derivative: `\\sin(${a}x)`, answer: -k * a }
      ];
      const selected = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];
      const positions = [
        {
          formula: `\\[\\frac{d}{dx}(\\text{□}${selected.func}) = ${selected.answer} ${selected.derivative}\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d}{dx}(${k}${selected.func}) = \\text{□} ${selected.derivative}\\]`,
          answer: selected.answer
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
      const k = Math.floor(Math.random() * 4) + 2;
      const a = Math.floor(Math.random() * 3) + 2;
      const result = k * a;
      const positions = [
        {
          formula: `\\[\\frac{d}{dx}(\\text{□}\\ln(${a}x)) = \\frac{${result}}{x}\\]`,
          answer: k
        },
        {
          formula: `\\[\\frac{d}{dx}(${k}\\ln(\\text{□}x)) = \\frac{${result}}{x}\\]`,
          answer: a
        },
        {
          formula: `\\[\\frac{d}{dx}(${k}\\ln(${a}x)) = \\frac{\\text{□}}{x}\\]`,
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
