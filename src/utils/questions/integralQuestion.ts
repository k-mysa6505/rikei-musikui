//  utils/questions/integralQuestion.ts
//  積分問題

import { Question } from "../../types";

function generateTrigonometricIntegralQuestion(): Question {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\sin \\text{□}x \\, dx = -\\frac{1}{${a}} \\cos ${a}x + C\\]`
        : `\\[\\int \\sin ${a}x \\, dx = -\\frac{1}{\\text{□}} \\cos ${a}x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\cos \\text{□}x \\, dx = \\frac{1}{${a}} \\sin ${a}x + C\\]`
        : `\\[\\int \\cos ${a}x \\, dx = \\frac{1}{\\text{□}} \\sin ${a}x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, b];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\text{□} \\sin ${b}x \\, dx = -\\frac{${a}}{${b}} \\cos ${b}x + C\\]`
        : `\\[\\int ${a} \\sin \\text{□}x \\, dx = -\\frac{${a}}{${b}} \\cos ${b}x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, b];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\text{□} \\cos ${b}x \\, dx = \\frac{${a}}{${b}} \\sin ${b}x + C\\]`
        : `\\[\\int ${a} \\cos \\text{□}x \\, dx = \\frac{${a}}{${b}} \\sin ${b}x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int \\sec^2 \\text{□}x \\, dx = \\frac{1}{${a}} \\tan ${a}x + C\\]`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateLogarithmicIntegralQuestion(): Question {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\frac{\\text{□}}{x} \\, dx = ${a} \\log |x| + C\\]`
        : `\\[\\int \\frac{${a}}{x} \\, dx = \\text{□} \\log |x| + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, b, a];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];
      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int \\frac{1}{\\text{□}x + ${b}} \\, dx = \\frac{1}{${a}} \\log |${a}x + ${b}| + C\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int \\frac{1}{${a}x + \\text{□}} \\, dx = \\frac{1}{${a}} \\log |${a}x + ${b}| + C\\]`;
      } else {
        formula = `\\[\\int \\frac{1}{${a}x + ${b}} \\, dx = \\frac{1}{\\text{□}} \\log |${a}x + ${b}| + C\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, b];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\frac{\\text{□}}{x + ${b}} \\, dx = ${a} \\log |x + ${b}| + C\\]`
        : `\\[\\int \\frac{${a}}{x + \\text{□}} \\, dx = ${a} \\log |x + ${b}| + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int \\text{□} \\log x \\, dx = ${a}(x \\log x - x) + C\\]`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateExponentialIntegralQuestion(): Question {
  const patterns = [
    () => {
      const n = Math.floor(Math.random() * 6) + 2;
      const coeffs = [n, n + 1];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int x^{\\text{□}} \\, dx = \\frac{x^{${n+1}}}{${n+1}} + C\\]`
        : `\\[\\int x^${n} \\, dx = \\frac{x^{${n+1}}}{\\text{□}} + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\text{□} e^x \\, dx = ${a} e^x + C\\]`
        : `\\[\\int ${a} e^x \\, dx = \\text{□} e^x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int e^{\\text{□}x} \\, dx = \\frac{1}{${a}} e^{${a}x} + C\\]`
        : `\\[\\int e^{${a}x} \\, dx = \\frac{1}{\\text{□}} e^{${a}x} + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, b, a];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];
      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int \\text{□} e^{${b}x} \\, dx = \\frac{${a}}{${b}} e^{${b}x} + C\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int ${a} e^{\\text{□}x} \\, dx = \\frac{${a}}{${b}} e^{${b}x} + C\\]`;
      } else {
        formula = `\\[\\int ${a} e^{${b}x} \\, dx = \\frac{\\text{□}}{${b}} e^{${b}x} + C\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      const n = Math.floor(Math.random() * 4) + 2;
      const coeffs = [n, n - 1];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int x^{-\\text{□}} \\, dx = -\\frac{1}{${n-1}} x^{-${n-1}} + C\\]`
        : `\\[\\int x^{-${n}} \\, dx = -\\frac{1}{\\text{□}} x^{-${n-1}} + C\\]`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generatePartialIntegrationQuestion(): Question {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int x e^x \\, dx = (x - \\text{□}) e^x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int x^2 e^x \\, dx = (x^2 - 2x + \\text{□}) e^x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 3) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int ${a}x \\sin x \\, dx = ${a}(\\sin x - x \\cos x) + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 3) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int ${a}x \\cos x \\, dx = ${a}(\\cos x + x \\sin x) + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 6) + 3;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int x \\log x \\, dx = \\frac{x^2}{2} \\log x - \\frac{x^2}{\\text{□}} + C\\]`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateSubstitutionQuestion(): Question {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 6) + 4;
      const coeffs = [a, b];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\text{□} x(x^2 + 1)^3 \\, dx = \\frac{${a}}{${b}}(x^2 + 1)^4 + C\\]`
        : `\\[\\int ${a} x(x^2 + 1)^3 \\, dx = \\frac{${a}}{\\text{□}}(x^2 + 1)^4 + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int \\frac{x}{\\sqrt{x^2 + \\text{□}}} \\, dx = \\sqrt{x^2 + ${a}} + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 6) + 4;
      const coeffs = [a, b];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int x(x^2 + \\text{□})^2 \\, dx = \\frac{1}{${b}}(x^2 + ${a})^3 + C\\]`
        : `\\[\\int x(x^2 + ${a})^2 \\, dx = \\frac{1}{\\text{□}}(x^2 + ${a})^3 + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];
      const formula = `\\[\\int \\sin x \\cos x \\, dx = \\frac{1}{\\text{□}} \\sin^2 x + C\\]`;
      return { formula, answer: bitedValue };
    },
    () => {
      const n = Math.floor(Math.random() * 4) + 3;
      const coeffs = [n, n + 1];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];
      const formula = bitedPosition === 0
        ? `\\[\\int \\sin^{\\text{□}} x \\cos x \\, dx = \\frac{1}{${n+1}} \\sin^{${n+1}} x + C\\]`
        : `\\[\\int \\sin^${n} x \\cos x \\, dx = \\frac{1}{\\text{□}} \\sin^{${n+1}} x + C\\]`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

export const generateIntegralQuestion = (): Question => {
  const generators = [
    generateTrigonometricIntegralQuestion,
    generateLogarithmicIntegralQuestion,
    generateExponentialIntegralQuestion,
    generatePartialIntegrationQuestion,
    generateSubstitutionQuestion
  ];

  return generators[Math.floor(Math.random() * generators.length)]();
};
