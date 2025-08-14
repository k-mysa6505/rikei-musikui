import { Question } from "../../types";

// 最大公約数を求める関数
const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

// 分数を既約分数にする関数
const reduceFraction = (numerator: number, denominator: number): { num: number, den: number } => {
  const divisor = gcd(numerator, denominator);
  return {
    num: numerator / divisor,
    den: denominator / divisor
  };
};

export const generateLimitQuestion = (): Question => {
  const patterns = [
    // パターン1: 微分の定義型
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5
      const n = Math.floor(Math.random() * 4) + 2; // 2-5
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
    
    // パターン2: 指数関数の極限（係数バリエーション）
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
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    
    // パターン3: 三角関数の極限（係数バリエーション）
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
    
    // パターン4: 無限大での有理関数（次数が同じ）
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5
      const b = Math.floor(Math.random() * 4) + 1; // 1-4
      const c = Math.floor(Math.random() * 3) + 1; // 1-3
      const d = Math.floor(Math.random() * 3) + 1; // 1-3
      const fraction = reduceFraction(a, c);
      const positions = [
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{\\text{□}x^2 + ${b}x}{${c}x^2 + ${d}} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{${fraction.den}}`}\\]`,
          answer: a
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + \\text{□}x}{${c}x^2 + ${d}} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{${fraction.den}}`}\\]`,
          answer: b
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${b}x}{\\text{□}x^2 + ${d}} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{${fraction.den}}`}\\]`,
          answer: c
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${b}x}{${c}x^2 + ${d}} = ${fraction.den === 1 ? '\\text{□}' : `\\frac{\\text{□}}{${fraction.den}}`}\\]`,
          answer: fraction.num
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^2 + ${b}x}{${c}x^2 + ${d}} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{\\text{□}}`}\\]`,
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
    
    // パターン5: 無限大での有理関数（分子の次数が高い）
    () => {
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const b = Math.floor(Math.random() * 3) + 1; // 1-3
      const c = Math.floor(Math.random() * 3) + 1; // 1-3
      const positions = [
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{\\text{□}x^3 + ${b}x}{${c}x^2 + 1} = \\infty\\]`,
          answer: a
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^3 + \\text{□}x}{${c}x^2 + 1} = \\infty\\]`,
          answer: b
        },
        {
          formula: `\\[\\lim_{x \\to \\infty} \\frac{${a}x^3 + ${b}x}{\\text{□}x^2 + 1} = \\infty\\]`,
          answer: c
        }
      ];
      const selectedPos = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: selectedPos.formula,
        subformula: "",
        answer: selectedPos.answer
      };
    },
    
    // パターン6: 0での三角関数の極限（複雑版）
    () => {
      const a = Math.floor(Math.random() * 3) + 2; // 2-4
      const b = Math.floor(Math.random() * 3) + 2; // 2-4
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
          formula: `\\[\\lim_{x \\to 0} \\frac{\\sin ${a}x}{\\sin ${b}x} = ${fraction.den === 1 ? fraction.num : `\\frac{${fraction.num}}{\\text{□}}`}\\]`,
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
    
    // パターン7: 1への指数関数の極限
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
    
    // パターン8: eの定義関連
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
