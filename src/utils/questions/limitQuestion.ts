import { Question } from "../../types";

const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

const reduceFraction = (numerator: number, denominator: number): { num: number, den: number } => {
  const divisor = gcd(numerator, denominator);
  return {
    num: numerator / divisor,   //  分子
    den: denominator / divisor   //  分母
  };
};

export const generateLimitQuestion = (): Question => {
  const patterns = [
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const n = Math.floor(Math.random() * 4) + 2;
      const result = n * Math.pow(a, n - 1);
      const positions = [
        {
          formula: `\\[\\lim_{x \\to \\text{□}} \\frac{x^${n} - ${Math.pow(a, n)}}{x - ${a}} = ${result}\\]`,
          answer: a
        },
        {
          formula: `\\[\\lim_{x \\to ${a}} \\frac{x^\\text{□} - ${Math.pow(a, n)}}{x - ${a}} = ${result}\\]`,
          answer: n
        },
        {
          formula: `\\[\\lim_{x \\to ${a}} \\frac{x^${n} - \\text{□}}{x - ${a}} = ${result}\\]`,
          answer: Math.pow(a, n)
        },
        {
          formula: `\\[\\lim_{x \\to ${a}} \\frac{x^${n} - ${Math.pow(a, n)}}{x - ${a}} = \\text{□}\\]`,
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
      const bases = [2, 3, 4, 5];
      const base = bases[Math.floor(Math.random() * bases.length)];
      const positions = [
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{\\text{□}^x - 1}{x} = \\ln ${base}\\]`,
          answer: base
        },
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{${base}^x - 1}{x} = \\ln \\text{□}\\]`,
          answer: base
        },
        {
          formula: `\\[\\lim_{x \\to \\text{□}} \\frac{${base}^x - 1}{x} = \\ln ${base}\\]`,
          answer: 0
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
      const coefficients = [2, 3, 4, 5];
      const coeff = coefficients[Math.floor(Math.random() * coefficients.length)];
      const trigFunctions = [
        { func: `\\sin \\text{□}x`, answer: coeff },
        { func: `\\tan \\text{□}x`, answer: coeff }
      ];
      const selected = trigFunctions[Math.floor(Math.random() * trigFunctions.length)];
      const positions = [
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{${selected.func.replace('\\text{□}', coeff.toString())}}{x} = \\text{□}\\]`,
          answer: coeff
        },
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{${selected.func}}{x} = ${coeff}\\]`,
          answer: coeff
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
      let a: number, b: number;
      do {
        a = Math.floor(Math.random() * 3) + 2; // 2-4
        b = Math.floor(Math.random() * 3) + 2;
      } while (a === b);
      const fraction = reduceFraction(a, b);
      const positions = [
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{\\sin \\text{□}x}{\\sin ${b}x} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{${fraction.den}}`}\\]`,
          answer: a
        },
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{\\sin ${a}x}{\\sin \\text{□}x} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{${fraction.den}}`}\\]`,
          answer: b
        },
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{\\sin ${a}x}{\\sin ${b}x} = ${fraction.den === 1 ? '\\text{□}' : `\\frac{\\text{□}}{${fraction.den}}`}\\]`,
          answer: fraction.num
        },
        {
          formula: `\\[\\lim_{x \\to 0} \\frac{\\sin ${a}x}{\\sin ${b}x} = ${fraction.den === 1 ? '\\text{□}' : `\\frac{${fraction.num}}{\\text{□}}`}\\]`,
          answer: fraction.den
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
      const n = Math.floor(Math.random() * 4) + 2; // 2-5
      const positions = [
        {
          formula: `\\[\\lim_{x \\to 1} \\frac{x^\\text{□} - 1}{x - 1} = ${n}\\]`,
          answer: n
        },
        {
          formula: `\\[\\lim_{x \\to \\text{□}} \\frac{x^${n} - 1}{x - 1} = ${n}\\]`,
          answer: 1
        },
        {
          formula: `\\[\\lim_{x \\to 1} \\frac{x^${n} - 1}{x - 1} = \\text{□}\\]`,
          answer: n
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
      const n = Math.floor(Math.random() * 4) + 2; // 2-5
      const positions = [
        {
          formula: `\\[\\lim_{x \\to \\infty} \\left(1 + \\frac{\\text{□}}{x}\\right)^x = e^${n}\\]`,
          answer: n
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\left(1 + \\frac{${n}}{x}\\right)^x = e^\\text{□}\\]`,
          answer: n
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
