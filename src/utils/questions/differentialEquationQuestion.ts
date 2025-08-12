//  utils/questions/differentialEquationQuestion.ts
//  微分方程式問題

import { Question } from "../../types";

function generateVariableSeparationQuestion(): Question {
  const patterns = [
    () => {
      // dy/dx = ay の形 → y = Ce^(ax)
      const a = Math.floor(Math.random() * 4) + 1;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = \\text{□}y\\]`;
      const subformula = `\\[y = Ce^{${a}x}\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = x の形 → y = x²/2 + C
      const coeffs = [2];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = x\\]`;
      const subformula = `\\[y = \\frac{x^2}{\\text{□}} + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = ax の形 → y = ax²/2 + C
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, 2];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      let formula, subformula;
      if (bitedPosition === 0) {
        formula = `\\[\\frac{dy}{dx} = \\text{□}x\\]`;
        subformula = `\\[y = \\frac{${a}x^2}{2} + C\\]`;
      } else {
        formula = `\\[\\frac{dy}{dx} = ${a}x\\]`;
        subformula = `\\[y = \\frac{${a}x^2}{\\text{□}} + C\\]`;
      }
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = a/x の形 → y = a ln|x| + C
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = \\frac{\\text{□}}{x}\\]`;
      const subformula = `\\[y = ${a} \\ln|x| + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = y/x の形 → y = Cx
      const coeffs = [1];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = \\frac{y}{x}\\]`;
      const subformula = `\\[y = Cx^{\\text{□}}\\]`;
      return { formula, subformula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: pattern.subformula, answer: pattern.answer };
}

function generateLinearDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // dy/dx + ay = 0 の形 → y = Ce^(-ax)
      const a = Math.floor(Math.random() * 4) + 1;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} + ${a}y = 0\\]`;
      const subformula = `\\[y = Ce^{-\\text{□}x}\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx - ay = 0 の形 → y = Ce^(ax)
      const a = Math.floor(Math.random() * 4) + 1;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} - ${a}y = 0\\]`;
      const subformula = `\\[y = Ce^{\\text{□}x}\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // d²y/dx² + a²y = 0 の形 → y = C₁cos(ax) + C₂sin(ax)
      const a = Math.floor(Math.random() * 3) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      let formula, subformula;
      if (bitedPosition === 0) {
        formula = `\\[\\frac{d^2y}{dx^2} + ${a*a}y = 0\\]`;
        subformula = `\\[y = C_1\\cos(\\text{□}x) + C_2\\sin(${a}x)\\]`;
      } else {
        formula = `\\[\\frac{d^2y}{dx^2} + ${a*a}y = 0\\]`;
        subformula = `\\[y = C_1\\cos(${a}x) + C_2\\sin(\\text{□}x)\\]`;
      }
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // d²y/dx² - a²y = 0 の形 → y = C₁e^(ax) + C₂e^(-ax)
      const a = Math.floor(Math.random() * 3) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      let formula, subformula;
      if (bitedPosition === 0) {
        formula = `\\[\\frac{d^2y}{dx^2} - ${a*a}y = 0\\]`;
        subformula = `\\[y = C_1e^{\\text{□}x} + C_2e^{-\\text{□}x}\\]`;
      } else {
        formula = `\\[\\frac{d^2y}{dx^2} - ${a*a}y = 0\\]`;
        subformula = `\\[y = C_1e^{${a}x} + C_2e^{-\\text{□}x}\\]`;
      }
      return { formula, subformula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: pattern.subformula, answer: pattern.answer };
}

function generateSpecialFormQuestion(): Question {
  const patterns = [
    () => {
      // dy/dx = e^x の形 → y = e^x + C
      const coeffs = [1];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = e^x\\]`;
      const subformula = `\\[y = \\text{□}e^x + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = ae^x の形 → y = ae^x + C
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = ${a}e^x\\]`;
      const subformula = `\\[y = \\text{□}e^x + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = sin(x) の形 → y = -cos(x) + C
      const coeffs = [1];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = \\sin x\\]`;
      const subformula = `\\[y = -\\text{□}\\cos x + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = cos(x) の形 → y = sin(x) + C
      const coeffs = [1];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\frac{dy}{dx} = \\cos x\\]`;
      const subformula = `\\[y = \\text{□}\\sin x + C\\]`;
      return { formula, subformula, answer: bitedValue };
    },
    () => {
      // dy/dx = a sin(bx) の形 → y = -(a/b)cos(bx) + C
      const a = Math.floor(Math.random() * 3) + 2;
      const b = Math.floor(Math.random() * 3) + 2;
      const answer = Math.floor(a / b);
      if (answer * b !== a) return generateSpecialFormQuestion(); // 整数解でない場合は再生成

      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula, subformula;
      if (bitedPosition === 0) {
        formula = `\\[\\frac{dy}{dx} = \\text{□} \\sin ${b}x\\]`;
        subformula = `\\[y = -\\frac{${a}}{${b}}\\cos ${b}x + C\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\frac{dy}{dx} = ${a} \\sin \\text{□}x\\]`;
        subformula = `\\[y = -\\frac{${a}}{${b}}\\cos ${b}x + C\\]`;
      } else {
        formula = `\\[\\frac{dy}{dx} = ${a} \\sin ${b}x\\]`;
        subformula = `\\[y = -\\frac{\\text{□}}{${b}}\\cos ${b}x + C\\]`;
      }
      return { formula, subformula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: pattern.subformula, answer: pattern.answer };
}

export const generateDifferentialEquationQuestion = (): Question => {
  const generators = [
    generateVariableSeparationQuestion,
    generateLinearDifferentialQuestion,
    generateSpecialFormQuestion
  ];

  return generators[Math.floor(Math.random() * generators.length)]();
};
