//  utils/questions/tripleIntegralQuestion.ts
//  重積分

import { Question } from "../../types";

function generateConstantTripleIntegralQuestion(): Question {
  const patterns = [
    () => {
      // ∫∫∫ c dxdydz = c×(x範囲)×(y範囲)×(z範囲)
      const c = Math.floor(Math.random() * 5) + 2;
      const x1 = 0, x2 = Math.floor(Math.random() * 3) + 2;
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = c * (x2 - x1) * (y2 - y1) * (z2 - z1);

      const coeffs = [c, x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 4);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{${x2}} \\text{□} \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} ${c} \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 2) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} ${c} \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} ${c} \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // 一般的な範囲での定数積分
      const c = Math.floor(Math.random() * 4) + 2;
      const x1 = Math.floor(Math.random() * 3) + 1, x2 = x1 + Math.floor(Math.random() * 3) + 2;
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = c * (x2 - x1) * (y2 - y1) * (z2 - z1);

      const coeffs = [c, x1, x2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_{${x1}}^{${x2}} \\text{□} \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_{\\text{□}}^{${x2}} ${c} \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_{${x1}}^{\\text{□}} ${c} \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateLinearTripleIntegralQuestion(): Question {
  const patterns = [
    () => {
      // ∫∫∫ x dxdydz = (x²/2)|範囲 × y範囲 × z範囲
      const x1 = 0, x2 = Math.floor(Math.random() * 4) + 2;
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = ((x2 * x2 - x1 * x1) / 2) * (y2 - y1) * (z2 - z1);

      // 整数解になるようx2を偶数に調整
      if (answer !== Math.floor(answer)) return generateLinearTripleIntegralQuestion();

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} x \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} x \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} x \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ y dxdydz = x範囲 × (y²/2)|範囲 × z範囲
      const x1 = 0, x2 = Math.floor(Math.random() * 3) + 2;
      const y1 = 0, y2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = (x2 - x1) * ((y2 * y2 - y1 * y1) / 2) * (z2 - z1);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} y \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} y \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} y \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ z dxdydz = x範囲 × y範囲 × (z²/2)|範囲
      const x1 = 0, x2 = Math.floor(Math.random() * 3) + 2;
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const answer = (x2 - x1) * (y2 - y1) * ((z2 * z2 - z1 * z1) / 2);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} z \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} z \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} z \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateQuadraticTripleIntegralQuestion(): Question {
  const patterns = [
    () => {
      // ∫∫∫ x² dxdydz = (x³/3)|範囲 × y範囲 × z範囲
      const x1 = 0, x2 = [3, 6][Math.floor(Math.random() * 2)]; // 3の倍数のみ
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = ((x2 * x2 * x2 - x1 * x1 * x1) / 3) * (y2 - y1) * (z2 - z1);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} x^2 \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} x^2 \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} x^2 \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ y² dxdydz = x範囲 × (y³/3)|範囲 × z範囲
      const x1 = 0, x2 = Math.floor(Math.random() * 3) + 2;
      const y1 = 0, y2 = [3, 6][Math.floor(Math.random() * 2)]; // 3の倍数のみ
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = (x2 - x1) * ((y2 * y2 * y2 - y1 * y1 * y1) / 3) * (z2 - z1);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} y^2 \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} y^2 \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} y^2 \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateProductTripleIntegralQuestion(): Question {
  const patterns = [
    () => {
      // ∫∫∫ xy dxdydz = (x²/2)|範囲 × (y²/2)|範囲 × z範囲
      const x1 = 0, x2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const y1 = 0, y2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = ((x2 * x2 - x1 * x1) / 2) * ((y2 * y2 - y1 * y1) / 2) * (z2 - z1);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} xy \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} xy \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} xy \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ xz dxdydz = (x²/2)|範囲 × y範囲 × (z²/2)|範囲
      const x1 = 0, x2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const answer = ((x2 * x2 - x1 * x1) / 2) * (y2 - y1) * ((z2 * z2 - z1 * z1) / 2);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} xz \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} xz \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} xz \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ xyz dxdydz = (x²/2)|範囲 × (y²/2)|範囲 × (z²/2)|範囲
      const x1 = 0, x2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const y1 = 0, y2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const z1 = 0, z2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const answer = ((x2 * x2 - x1 * x1) / 2) * ((y2 * y2 - y1 * y1) / 2) * ((z2 * z2 - z1 * z1) / 2);

      const coeffs = [x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 3);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} xyz \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} xyz \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} xyz \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

function generateCoefficientTripleIntegralQuestion(): Question {
  const patterns = [
    () => {
      // ∫∫∫ ax dxdydz = a × (x²/2)|範囲 × y範囲 × z範囲
      const a = Math.floor(Math.random() * 4) + 2;
      const x1 = 0, x2 = [2, 4][Math.floor(Math.random() * 2)]; // 偶数のみ
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = a * ((x2 * x2 - x1 * x1) / 2) * (y2 - y1) * (z2 - z1);

      const coeffs = [a, x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 4);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{${x2}} \\text{□}x \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} ${a}x \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 2) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} ${a}x \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} ${a}x \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    },
    () => {
      // ∫∫∫ ax² dxdydz = a × (x³/3)|範囲 × y範囲 × z範囲
      const a = Math.floor(Math.random() * 3) + 2;
      const x1 = 0, x2 = [3, 6][Math.floor(Math.random() * 2)]; // 3の倍数のみ
      const y1 = 0, y2 = Math.floor(Math.random() * 3) + 2;
      const z1 = 0, z2 = Math.floor(Math.random() * 3) + 2;
      const answer = a * ((x2 * x2 * x2 - x1 * x1 * x1) / 3) * (y2 - y1) * (z2 - z1);

      const coeffs = [a, x2, y2, z2];
      const bitedPosition = Math.floor(Math.random() * 4);
      const bitedValue = coeffs[bitedPosition];

      let formula;
      if (bitedPosition === 0) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{${x2}} \\text{□}x^2 \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 1) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{${y2}} \\int_0^{\\text{□}} ${a}x^2 \\, dx dy dz = ${answer}\\]`;
      } else if (bitedPosition === 2) {
        formula = `\\[\\int_0^{${z2}} \\int_0^{\\text{□}} \\int_0^{${x2}} ${a}x^2 \\, dx dy dz = ${answer}\\]`;
      } else {
        formula = `\\[\\int_0^{\\text{□}} \\int_0^{${y2}} \\int_0^{${x2}} ${a}x^2 \\, dx dy dz = ${answer}\\]`;
      }
      return { formula, answer: bitedValue };
    }
  ];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)]();
  return { formula: pattern.formula, subformula: "", answer: pattern.answer };
}

export const generateMultipleIntegralQuestion = (): Question => {
  const generators = [
    generateConstantTripleIntegralQuestion,
    generateLinearTripleIntegralQuestion,
    generateQuadraticTripleIntegralQuestion,
    generateProductTripleIntegralQuestion,
    generateCoefficientTripleIntegralQuestion
  ];

  return generators[Math.floor(Math.random() * generators.length)]();
};
