import { Question } from "../../types";

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

// 係数の表示形式を決定する関数
const formatCoefficient = (fraction: { num: number, den: number }, includeSign: boolean = false): string => {
  const sign = includeSign ? '' : '';
  if (fraction.den === 1) {
    // 整数の場合
    if (fraction.num === 1) {
      return sign;
    } else {
      return `${sign}${fraction.num}`;
    }
  } else {
    // 分数の場合
    return `${sign}\\frac{${fraction.num}}{${fraction.den}}`;
  }
};

export const generateIntegralQuestion = (): Question => {
  const patterns = [
    () => {
      let a, n, denominator, fraction;

      // 積分後の係数が1にならないまで繰り返し
      do {
        a = Math.floor(Math.random() * 3) + 2; // 2-4
        n = Math.floor(Math.random() * 3) + 2; // 2-4
        denominator = a * (n + 1);
        fraction = reduceFraction(1, denominator);
      } while (fraction.num === 1 && fraction.den === 1);

      // 係数の表示形式を決定（1の場合は表示しない）
      const coeffDisplay = formatCoefficient(fraction);

      const positions = [
        {
          formula: `\\[\\int (\\text{□}x)^${n} dx = ${coeffDisplay}(${a}x)^{${n + 1}} + C\\]`,
          answer: a
        },
        {
          formula: `\\[\\int (${a}x)^\\text{□} dx = ${coeffDisplay}(${a}x)^{${n + 1}} + C\\]`,
          answer: n
        },
        {
          formula: `\\[\\int (${a}x)^${n} dx = \\frac{\\text{□}}{${denominator}}(${a}x)^{${n + 1}} + C\\]`,
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
      let k, a, fraction;

      // 積分後の係数が1にならないまで繰り返し
      do {
        k = (Math.floor(Math.random() * 8) + 2) * (Math.random() < 0.5 ? 1 : -1); // -5～-2, 2～5
        a = Math.floor(Math.random() * 3) + 2; // 2-4
        fraction = reduceFraction(Math.abs(k), a);
      } while (fraction.num === 1 && fraction.den === 1);

      // 係数の表示形式を決定（1の場合は表示しない）
      const coeffDisplay = formatCoefficient(fraction);
      const signedCoeffDisplay = (k < 0 ? '-' : '') + coeffDisplay;

      const positions = [
        {
          formula: `\\[\\int \\text{□}e^{${a}x} dx = ${signedCoeffDisplay} e^{${a}x} + C\\]`,
          answer: k
        },
        {
          formula: `\\[\\int ${k}e^{\\text{□}x} dx = ${signedCoeffDisplay} e^{${a}x} + C\\]`,
          answer: a
        },
        {
          formula: `\\[\\int ${k}e^{${a}x} dx = ${k < 0 ? '-' : ''}${fraction.den === 1 ? '\\text{□}' : `\\frac{\\text{□}}{${fraction.den}}`} e^{${a}x} + C\\]`,
          answer: fraction.num
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
      let k, a, selected, fraction;

      // 積分後の係数が1にならないまで繰り返し
      do {
        k = (Math.floor(Math.random() * 8) + 2) * (Math.random() < 0.5 ? 1 : -1); // -5～-2, 2～5
        a = Math.floor(Math.random() * 3) + 2; // 2-4
        const trigIntegrals = [
          { func: `\\sin(${a}x)`, integral: `\\cos(${a}x)`, coeff: -k, divisor: a, resultFunc: "\\cos" },
          { func: `\\cos(${a}x)`, integral: `\\sin(${a}x)`, coeff: k, divisor: a, resultFunc: "\\sin" }
        ];
        selected = trigIntegrals[Math.floor(Math.random() * trigIntegrals.length)];
        fraction = reduceFraction(Math.abs(selected.coeff), selected.divisor);
      } while (fraction.num === 1 && fraction.den === 1);

      // 係数の表示形式を決定（1の場合は表示しない、符号は別途処理）
      const coeffDisplay = formatCoefficient(fraction);
      const signedCoeffDisplay = (selected.coeff < 0 ? '-' : '') + coeffDisplay;

      const positions = [
        {
          formula: `\\[\\int \\text{□}${selected.func} dx = ${signedCoeffDisplay} ${selected.resultFunc}(${a}x) + C\\]`,
          answer: k
        },
        {
          formula: `\\[\\int ${k}${selected.func} dx = ${selected.coeff < 0 ? '-' : ''}${fraction.den === 1 ? '\\text{□}' : `\\frac{\\text{□}}{${fraction.den}}`} ${selected.resultFunc}(${a}x) + C\\]`,
          answer: fraction.num
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
