//  utils/questions/limitQuestion.ts
//  極限

import { Question } from "../../types";

function generateBasicLimitQuestion(): Question {
  const patterns = [
    () => {
      // lim[x→a] (x^n - a^n)/(x - a) = n*a^(n-1) の形
      const a = Math.floor(Math.random() * 4) + 2;
      const n = Math.floor(Math.random() * 4) + 2;
      const answer = n * Math.pow(a, n - 1);
      const coeffs = [a, n, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\lim_{x \\to \\text{□}} \\frac{x^${n} - ${Math.pow(a, n)}}{x - ${a}} = ${answer}`;
      } else if (bitedPosition === 1) {
        formula = `\\lim_{x \\to ${a}} \\frac{x^{\\text{□}} - ${Math.pow(a, n)}}{x - ${a}} = ${answer}`;
      } else {
        formula = `\\lim_{x \\to ${a}} \\frac{x^${n} - ${Math.pow(a, n)}}{x - ${a}} = \\text{□}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] (a^x - 1)/x = ln(a) の形
      const a = [2, 3, 5][Math.floor(Math.random() * 3)];
      const lnValues = { 2: 1, 3: 1, 5: 2 }; // 簡略化した値
      const answer = lnValues[a as keyof typeof lnValues];
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{\\text{□}^x - 1}{x} = \\ln ${a}`
        : `\\lim_{x \\to 0} \\frac{${a}^x - 1}{x} = \\ln \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→∞] (ax + b)/(cx + d) = a/c の形
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const c = Math.floor(Math.random() * 4) + 2;
      const d = Math.floor(Math.random() * 5) + 1;
      const answer = Math.floor(a / c);
      if (answer * c !== a) return generateBasicLimitQuestion(); // 整数解でない場合は再生成

      const coeffs = [a, c, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\lim_{x \\to \\infty} \\frac{\\text{□}x + ${b}}{${c}x + ${d}} = \\frac{${a}}{${c}}`;
      } else if (bitedPosition === 1) {
        formula = `\\lim_{x \\to \\infty} \\frac{${a}x + ${b}}{\\text{□}x + ${d}} = \\frac{${a}}{${c}}`;
      } else {
        formula = `\\lim_{x \\to \\infty} \\frac{${a}x + ${b}}{${c}x + ${d}} = \\frac{\\text{□}}{${c}}`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateTrigonometricLimitQuestion(): Question {
  const patterns = [
    () => {
      // lim[x→0] sin(ax)/x = a の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{\\sin \\text{□}x}{x} = ${a}`
        : `\\lim_{x \\to 0} \\frac{\\sin ${a}x}{x} = \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] sin(ax)/bx = a/b の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 3) + 2;
      const answer = Math.floor(a / b);
      if (answer * b !== a) return generateTrigonometricLimitQuestion(); // 整数解でない場合は再生成

      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\lim_{x \\to 0} \\frac{\\sin \\text{□}x}{${b}x} = \\frac{${a}}{${b}}`;
      } else if (bitedPosition === 1) {
        formula = `\\lim_{x \\to 0} \\frac{\\sin ${a}x}{\\text{□}x} = \\frac{${a}}{${b}}`;
      } else {
        formula = `\\lim_{x \\to 0} \\frac{\\sin ${a}x}{${b}x} = \\frac{\\text{□}}{${b}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] (1-cos(ax))/x² = a²/2 の形
      const a = Math.floor(Math.random() * 4) + 2;
      const answer = Math.floor((a * a) / 2);
      if (answer * 2 !== a * a) return generateTrigonometricLimitQuestion(); // 整数解でない場合は再生成

      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{1 - \\cos \\text{□}x}{x^2} = \\frac{${a * a}}{2}`
        : `\\lim_{x \\to 0} \\frac{1 - \\cos ${a}x}{x^2} = \\frac{\\text{□}}{2}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] tan(ax)/x = a の形
      const a = Math.floor(Math.random() * 4) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{\\tan \\text{□}x}{x} = ${a}`
        : `\\lim_{x \\to 0} \\frac{\\tan ${a}x}{x} = \\text{□}`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateExponentialLimitQuestion(): Question {
  const patterns = [
    () => {
      // lim[x→0] (e^(ax) - 1)/x = a の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{e^{\\text{□}x} - 1}{x} = ${a}`
        : `\\lim_{x \\to 0} \\frac{e^{${a}x} - 1}{x} = \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→∞] (1 + a/x)^x = e^a の形（簡略化）
      const a = Math.floor(Math.random() * 4) + 1;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];

      const formula = `\\lim_{x \\to \\infty} \\left(1 + \\frac{\\text{□}}{x}\\right)^x = e^${a}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] (ln(1+ax))/x = a の形
      const a = Math.floor(Math.random() * 5) + 2;
      const coeffs = [a, a];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{\\ln(1 + \\text{□}x)}{x} = ${a}`
        : `\\lim_{x \\to 0} \\frac{\\ln(1 + ${a}x)}{x} = \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] (e^(ax) - e^(bx))/x = a-b の形
      const a = Math.floor(Math.random() * 4) + 3;
      const b = Math.floor(Math.random() * 3) + 1;
      const answer = a - b;
      const coeffs = [a, b, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\lim_{x \\to 0} \\frac{e^{\\text{□}x} - e^{${b}x}}{x} = ${answer}`;
      } else if (bitedPosition === 1) {
        formula = `\\lim_{x \\to 0} \\frac{e^{${a}x} - e^{\\text{□}x}}{x} = ${answer}`;
      } else {
        formula = `\\lim_{x \\to 0} \\frac{e^{${a}x} - e^{${b}x}}{x} = \\text{□}`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateRationalLimitQuestion(): Question {
  const patterns = [
    () => {
      // lim[x→a] (x^2 - a^2)/(x - a) = 2a の形
      const a = Math.floor(Math.random() * 5) + 2;
      const answer = 2 * a;
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to \\text{□}} \\frac{x^2 - ${a * a}}{x - ${a}} = ${answer}`
        : `\\lim_{x \\to ${a}} \\frac{x^2 - ${a * a}}{x - ${a}} = \\text{□}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→∞] √(x^2 + ax) - x = a/2 の形
      const a = [2, 4, 6, 8][Math.floor(Math.random() * 4)]; // 偶数のみ
      const answer = a / 2;
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to \\infty} (\\sqrt{x^2 + \\text{□}x} - x) = \\frac{${a}}{2}`
        : `\\lim_{x \\to \\infty} (\\sqrt{x^2 + ${a}x} - x) = \\frac{${a}}{\\text{□}}`;
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[x→0] (√(1+ax) - 1)/x = a/2 の形
      const a = [2, 4, 6, 8][Math.floor(Math.random() * 4)]; // 偶数のみ
      const answer = a / 2;
      const coeffs = [a, answer];
      const bitedPosition = Math.floor(Math.random() * 2);
      const bitedValue = coeffs[bitedPosition];

      const formula = bitedPosition === 0
        ? `\\lim_{x \\to 0} \\frac{\\sqrt{1 + \\text{□}x} - 1}{x} = \\frac{${a}}{2}`
        : `\\lim_{x \\to 0} \\frac{\\sqrt{1 + ${a}x} - 1}{x} = \\frac{${a}}{\\text{□}}`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateSequenceLimitQuestion(): Question {
  const patterns = [
    () => {
      // lim[n→∞] (an + b)/(cn + d) = a/c の形
      const a = Math.floor(Math.random() * 4) + 2;
      const b = Math.floor(Math.random() * 5) + 1;
      const c = Math.floor(Math.random() * 3) + 2;
      const d = Math.floor(Math.random() * 5) + 1;
      const answer = Math.floor(a / c);
      if (answer * c !== a) return generateSequenceLimitQuestion(); // 整数解でない場合は再生成

      const coeffs = [a, c, answer];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\lim_{n \\to \\infty} \\frac{\\text{□}n + ${b}}{${c}n + ${d}} = \\frac{${a}}{${c}}`;
      } else if (bitedPosition === 1) {
        formula = `\\lim_{n \\to \\infty} \\frac{${a}n + ${b}}{\\text{□}n + ${d}} = \\frac{${a}}{${c}}`;
      } else {
        formula = `\\lim_{n \\to \\infty} \\frac{${a}n + ${b}}{${c}n + ${d}} = \\frac{\\text{□}}{${c}}`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // lim[n→∞] (1 + a/n)^n = e^a の形（簡略化）
      const a = Math.floor(Math.random() * 4) + 1;
      const coeffs = [a];
      const bitedPosition = 0;
      const bitedValue = coeffs[bitedPosition];

      const formula = `\\lim_{n \\to \\infty} \\left(1 + \\frac{\\text{□}}{n}\\right)^n = e^${a}`;
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

export const generateLimitQuestion = (): Question => {
  const generators = [
    generateBasicLimitQuestion,
    generateTrigonometricLimitQuestion,
    generateExponentialLimitQuestion,
    generateRationalLimitQuestion,
    generateSequenceLimitQuestion
  ];

  return generators[Math.floor(Math.random() * generators.length)]();
};
