//  utils/questions/differentialQuestion.ts
//  微分問題

import { Question } from "../../types";

function generateBasicDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (x^n)' = nx^(n-1) の形
      const n = Math.floor(Math.random() * 6) + 2;
      const coeffs = [n, n, n - 1];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(x^{\\text{□}}) = ${n}x^{${n-1}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(x^${n}) = \\text{□}x^{${n-1}}`;
      } else {
        formula = `\\frac{d}{dx}(x^${n}) = ${n}x^{\\text{□}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (ax^n)' = anx^(n-1) の形
      const a = Math.floor(Math.random() * 5) + 2;
      const n = Math.floor(Math.random() * 5) + 2;
      const answer = a * n;
      const coeffs = [a, n, answer, n - 1];
      const bitedPosition = Math.floor(Math.random() * 4);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\text{□}x^${n}) = ${answer}x^{${n-1}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(${a}x^{\\text{□}}) = ${answer}x^{${n-1}}`;
      } else if (bitedPosition === 2) {
        formula = `\\frac{d}{dx}(${a}x^${n}) = \\text{□}x^{${n-1}}`;
      } else {
        formula = `\\frac{d}{dx}(${a}x^${n}) = ${answer}x^{\\text{□}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (x^(-n))' = -nx^(-n-1) の形
      const n = Math.floor(Math.random() * 4) + 2;
      const coeffs = [n, n, n + 1];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(x^{-\\text{□}}) = -${n}x^{-${n+1}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(x^{-${n}}) = -\\text{□}x^{-${n+1}}`;
      } else {
        formula = `\\frac{d}{dx}(x^{-${n}}) = -${n}x^{-\\text{□}}`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateTrigonometricDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (sin(ax))' = a*cos(ax) の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\sin \\text{□}x) = ${a} \\cos ${a}x`
        : `\\frac{d}{dx}(\\sin ${a}x) = \\text{□} \\cos ${a}x`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (cos(ax))' = -a*sin(ax) の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\cos \\text{□}x) = -${a} \\sin ${a}x`
        : `\\frac{d}{dx}(\\cos ${a}x) = -\\text{□} \\sin ${a}x`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (tan(ax))' = a*sec²(ax) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\tan \\text{□}x) = ${a} \\sec^2 ${a}x`
        : `\\frac{d}{dx}(\\tan ${a}x) = \\text{□} \\sec^2 ${a}x`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (a*sin(bx))' = ab*cos(bx) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const answer = a * b;
      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\text{□} \\sin ${b}x) = ${answer} \\cos ${b}x`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(${a} \\sin \\text{□}x) = ${answer} \\cos ${b}x`;
      } else {
        formula = `\\frac{d}{dx}(${a} \\sin ${b}x) = \\text{□} \\cos ${b}x`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (a*cos(bx))' = -ab*sin(bx) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const answer = a * b;
      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\text{□} \\cos ${b}x) = -${answer} \\sin ${b}x`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(${a} \\cos \\text{□}x) = -${answer} \\sin ${b}x`;
      } else {
        formula = `\\frac{d}{dx}(${a} \\cos ${b}x) = -\\text{□} \\sin ${b}x`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateExponentialDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (e^(ax))' = a*e^(ax) の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(e^{\\text{□}x}) = ${a} e^{${a}x}`
        : `\\frac{d}{dx}(e^{${a}x}) = \\text{□} e^{${a}x}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (a*e^(bx))' = ab*e^(bx) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 4) + 2;
      const answer = a * b;
      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\text{□} e^{${b}x}) = ${answer} e^{${b}x}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(${a} e^{\\text{□}x}) = ${answer} e^{${b}x}`;
      } else {
        formula = `\\frac{d}{dx}(${a} e^{${b}x}) = \\text{□} e^{${b}x}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (a^x)' = a^x * ln(a) の形（簡略化）
      const a = [2, 3, 5][Math.floor(Math.random() * 3)];
      const lnValues = { 2: 1, 3: 1, 5: 2 }; // 簡略化した値
      const answer = lnValues[a as keyof typeof lnValues];
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\text{□}^x) = ${a}^x \\ln ${a}`
        : `\\frac{d}{dx}(${a}^x) = ${a}^x \\ln \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (e^(ax²))' = 2ax*e^(ax²) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const answer = 2 * a;
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(e^{\\text{□}x^2}) = ${answer}x e^{${a}x^2}`
        : `\\frac{d}{dx}(e^{${a}x^2}) = \\text{□}x e^{${a}x^2}`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateLogarithmicDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (ln(ax))' = 1/x の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];

      const formula = `\\frac{d}{dx}(\\ln \\text{□}x) = \\frac{1}{x}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (a*ln(x))' = a/x の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\text{□} \\ln x) = \\frac{${a}}{x}`
        : `\\frac{d}{dx}(${a} \\ln x) = \\frac{\\text{□}}{x}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (ln(ax + b))' = a/(ax + b) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const coeffs = [a, b, a];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\ln(\\text{□}x + ${b})) = \\frac{${a}}{${a}x + ${b}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(\\ln(${a}x + \\text{□})) = \\frac{${a}}{${a}x + ${b}}`;
      } else {
        formula = `\\frac{d}{dx}(\\ln(${a}x + ${b})) = \\frac{\\text{□}}{${a}x + ${b}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (log_a(x))' = 1/(x ln(a)) の形（簡略化）
      const a = [2, 3, 10][Math.floor(Math.random() * 3)];
      const lnValues = { 2: 1, 3: 1, 10: 2 }; // 簡略化した値
      const answer = lnValues[a as keyof typeof lnValues];
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(\\log_{\\text{□}} x) = \\frac{1}{x \\ln ${a}}`
        : `\\frac{d}{dx}(\\log_${a} x) = \\frac{1}{x \\ln \\text{□}}`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateChainRuleDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (sin(ax + b))' = a*cos(ax + b) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const coeffs = [a, b, a];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(\\sin(\\text{□}x + ${b})) = ${a} \\cos(${a}x + ${b})`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(\\sin(${a}x + \\text{□})) = ${a} \\cos(${a}x + ${b})`;
      } else {
        formula = `\\frac{d}{dx}(\\sin(${a}x + ${b})) = \\text{□} \\cos(${a}x + ${b})`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // (e^(ax + b))' = a*e^(ax + b) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const coeffs = [a, b, a];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}(e^{\\text{□}x + ${b}}) = ${a} e^{${a}x + ${b}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}(e^{${a}x + \\text{□}}) = ${a} e^{${a}x + ${b}}`;
      } else {
        formula = `\\frac{d}{dx}(e^{${a}x + ${b}}) = \\text{□} e^{${a}x + ${b}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ((ax + b)^n)' = an*(ax + b)^(n-1) の形
      const a = Math.floor(Math.random() * 3) + 2;
      const b = Math.floor(Math.random() * 4) + 1;
      const n = Math.floor(Math.random() * 4) + 2;
      const answer = a * n;
      const coeffs = [a, b, n, answer, n - 1];
      const bitedPosition = Math.floor(Math.random() * 5);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\frac{d}{dx}((\\text{□}x + ${b})^${n}) = ${answer}(${a}x + ${b})^{${n-1}}`;
      } else if (bitedPosition === 1) {
        formula = `\\frac{d}{dx}((${a}x + \\text{□})^${n}) = ${answer}(${a}x + ${b})^{${n-1}}`;
      } else if (bitedPosition === 2) {
        formula = `\\frac{d}{dx}((${a}x + ${b})^{\\text{□}}) = ${answer}(${a}x + ${b})^{${n-1}}`;
      } else if (bitedPosition === 3) {
        formula = `\\frac{d}{dx}((${a}x + ${b})^${n}) = \\text{□}(${a}x + ${b})^{${n-1}}`;
      } else {
        formula = `\\frac{d}{dx}((${a}x + ${b})^${n}) = ${answer}(${a}x + ${b})^{\\text{□}}`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateProductRuleDifferentialQuestion(): Question {
  const patterns = [
    () => {
      // (x*e^(ax))' = e^(ax) + ax*e^(ax) = (1 + ax)*e^(ax) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];

      const formula = `\\frac{d}{dx}(x e^{\\text{□}x}) = (1 + ${a}x) e^{${a}x}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (x*sin(ax))' = sin(ax) + ax*cos(ax) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(x \\sin \\text{□}x) = \\sin ${a}x + ${a}x \\cos ${a}x`
        : `\\frac{d}{dx}(x \\sin ${a}x) = \\sin ${a}x + \\text{□}x \\cos ${a}x`;
      return { formula, answer: bitedValue };
    },
    () => {
      // (x*cos(ax))' = cos(ax) - ax*sin(ax) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\frac{d}{dx}(x \\cos \\text{□}x) = \\cos ${a}x - ${a}x \\sin ${a}x`
        : `\\frac{d}{dx}(x \\cos ${a}x) = \\cos ${a}x - \\text{□}x \\sin ${a}x`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

export const generateDifferentialQuestion = (): Question => {
  const generators = [
    generateBasicDifferentialQuestion,
    generateTrigonometricDifferentialQuestion,
    generateExponentialDifferentialQuestion,
    generateLogarithmicDifferentialQuestion,
    generateChainRuleDifferentialQuestion,
    generateProductRuleDifferentialQuestion
  ];

  return generators[Math.floor(Math.random() * generators.length)]();
};
