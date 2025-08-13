import { Question } from "../types";

interface QuestionTemplate {
  type: string;
  patterns: PatternConfig[];
}

interface PatternConfig {
  formula: (params: number[]) => string;
  subformula?: (params: number[]) => string;
  paramRanges: Array<{ min: number; max: number; exclude?: number[] }>;
  answerCalc: (params: number[]) => number;
  blankPosition?: number;
}

// 統一された問題テンプレート
const QUESTION_TEMPLATES: Record<number, QuestionTemplate> = {
  1: { // 極限
    type: "limit",
    patterns: [
      {
        formula: (p) => `\\[\\lim_{x \\to ${p[0]}} \\frac{x^${p[1]} - ${Math.pow(p[0], p[1])}}{x - ${p[0]}} = \\text{□}\\]`,
        paramRanges: [
          { min: 2, max: 5 },
          { min: 2, max: 5 }
        ],
        answerCalc: (p) => p[1] * Math.pow(p[0], p[1] - 1)
      },
      {
        formula: (p) => `\\[\\lim_{x \\to 0} \\frac{${p[0]}^x - 1}{x} = \\text{□}\\]`,
        paramRanges: [
          { min: 2, max: 5, exclude: [4] }
        ],
        answerCalc: (p) => p[0] === 2 ? 1 : p[0] === 3 ? 1 : 2 // 簡略化されたln値
      }
    ]
  },
  2: { // 微分
    type: "differential",
    patterns: [
      {
        formula: (p) => `\\[\\frac{d}{dx}(x^${p[0]}) = \\text{□}x^${p[0] - 1}\\]`,
        paramRanges: [{ min: 2, max: 8 }],
        answerCalc: (p) => p[0]
      },
      {
        formula: (p) => `\\[\\frac{d}{dx}(${p[0]}x^${p[1]} + ${p[2]}x + ${p[3]}) = ${p[0] * p[1]}x^${p[1] - 1} + \\text{□}\\]`,
        paramRanges: [
          { min: 2, max: 5 },
          { min: 2, max: 4 },
          { min: 1, max: 9 },
          { min: 1, max: 9 }
        ],
        answerCalc: (p) => p[2]
      }
    ]
  },
  3: { // 積分
    type: "integral",
    patterns: [
      {
        formula: (p) => `\\[\\int x^${p[0]} dx = \\frac{x^{\\text{□}}}{${p[0] + 1}} + C\\]`,
        paramRanges: [{ min: 1, max: 7 }],
        answerCalc: (p) => p[0] + 1
      }
    ]
  },
  4: { // 行列式
    type: "determinant",
    patterns: [
      {
        formula: (p) => `\\[\\det \\begin{pmatrix} ${p[0]} & ${p[1]} \\\\ ${p[2]} & ${p[3]} \\end{pmatrix} = \\text{□}\\]`,
        paramRanges: [
          { min: 1, max: 5 },
          { min: 1, max: 5 },
          { min: 1, max: 5 },
          { min: 1, max: 5 }
        ],
        answerCalc: (p) => p[0] * p[3] - p[1] * p[2]
      }
    ]
  },
  5: { // 固有値
    type: "eigenvalue",
    patterns: [
      {
        formula: (p) => `\\[\\det(A - \\lambda I) = \\lambda^2 - ${p[0] + p[1]}\\lambda + ${p[0] * p[1]} = 0\\]`,
        subformula: (p) => `\\[\\text{この方程式の解の一つは } \\lambda = \\text{□}\\]`,
        paramRanges: [
          { min: 1, max: 4 },
          { min: 1, max: 4 }
        ],
        answerCalc: (p) => p[0]
      }
    ]
  },
  6: { // 重積分
    type: "multiple_integral",
    patterns: [
      {
        formula: (p) => `\\[\\int_0^${p[0]} \\int_0^${p[1]} xy \\, dy \\, dx = \\text{□}\\]`,
        paramRanges: [
          { min: 1, max: 3 },
          { min: 1, max: 3 }
        ],
        answerCalc: (p) => (p[0] * p[0] * p[1] * p[1]) / 4
      }
    ]
  },
  7: { // 微分方程式
    type: "differential_equation",
    patterns: [
      {
        formula: (p) => `\\[\\frac{dy}{dx} = ${p[0]}y\\]`,
        subformula: (p) => `\\[\\text{この微分方程式の一般解は } y = Ce^{\\text{□}x}\\]`,
        paramRanges: [{ min: 1, max: 5 }],
        answerCalc: (p) => p[0]
      }
    ]
  }
};

export const generateQuestion = (questionNo: number): Question => {
  if (questionNo < 1 || questionNo > 7) {
    throw new Error(`Invalid question number: ${questionNo}`);
  }

  const template = QUESTION_TEMPLATES[questionNo];
  const pattern = template.patterns[Math.floor(Math.random() * template.patterns.length)];

  // パラメータ生成
  const params = pattern.paramRanges.map(range => {
    let value;
    do {
      value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    } while (range.exclude?.includes(value));
    return value;
  });

  return {
    formula: pattern.formula(params),
    subformula: pattern.subformula?.(params) || "",
    answer: pattern.answerCalc(params)
  };
};
