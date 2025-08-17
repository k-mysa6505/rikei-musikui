import { Question } from "../../types";

// ハイレベル極限問題
export const generateHighLevelLimitQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[\\lim_{x \\to 0} \\frac{\\sin(3x) \\tan(2x)}{x^2} = \\text{□}\\]",
      subformula: "",
      answer: 6
    },
    {
      formula: "\\[\\lim_{x \\to 0} \\frac{\\sin(2x) - 2x + \\frac{4x^3}{3}}{x^5} = -\\frac{4}{\\text{□}}\\]",
      subformula: "",
      answer: 15
    },
    {
      formula: "\\[\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x - 2x^2 - \\frac{4x^3}{3}}{x^4} = \\frac{2}{\\text{□}}\\]",
      subformula: "",
      answer: 3
    }
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル微分問題
export const generateHighLevelDifferentialQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[f(x) = x^3 e^{-x^2}, \\quad f'(x) = x^2 e^{-x^2}(a - bx^2)\\]",
      subformula: "\\[a + b = \\text{□}\\]",
      answer: 5
    },
    {
      formula: "\\[y = \\ln(\\sin x), \\quad \\left.\\frac{d^2y}{dx^2}\\right|_{x=\\frac{\\pi}{4}} = \\text{□}\\]",
      subformula: "",
      answer: -2
    },
    {
      formula: "\\[f(x) = \\arctan(2x), \\quad f^{(3)}(0) = \\text{□}\\]",
      subformula: "",
      answer: -16
    }
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル積分問題
export const generateHighLevelIntegralQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[\\int_0^{\\pi} \\sin^4 x \\, dx = \\frac{3\\pi}{\\text{□}}\\]",
      subformula: "",
      answer: 8
    },
    {
      formula: "\\[\\int_0^{\\pi/2} \\sin^8 x \\, dx = \\frac{35\\pi}{\\text{□}}\\]",
      subformula: "",
      answer: 256
    },
    {
      formula: "\\[\\int_0^{\\pi/2} \\sin^2 x \\cos^4 x \\, dx = \\frac{\\pi}{\\text{□}}\\]",
      subformula: "",
      answer: 32
    }
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル行列式問題
export const generateHighLevelDeterminantQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[\\begin{vmatrix} 2 & 1 & 1 & 1 \\\\ 1 & 2 & 1 & 1 \\\\ 1 & 1 & 2 & 1 \\\\ 1 & 1 & 1 & 2 \\end{vmatrix} = \\text{□}\\]",
      subformula: "",
      answer: 5
    },
    {
      formula: "\\[\\begin{vmatrix} x & 1 & 1 & 1 \\\\ 1 & x & 1 & 1 \\\\ 1 & 1 & x & 1 \\\\ 1 & 1 & 1 & x \\end{vmatrix} = (x-1)^3(x+\\text{□})\\]",
      subformula: "",
      answer: 3
    },
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル固有値問題
export const generateHighLevelEigenvalueQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[A = \\begin{pmatrix} 3 & -1 & 1 \\\\ -1 & 3 & 1 \\\\ 1 & 1 & 3 \\end{pmatrix}, \\quad \\lambda_{\\max} = \\text{□}\\]",
      subformula: "",
      answer: 4
    },
    {
      formula: "\\[A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix}, \\quad \\prod_{i=1}^3 \\lambda_i = \\text{□}\\]",
      subformula: "",
      answer: 4
    },
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル重積分問題
export const generateHighLevelMultipleIntegralQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[\\iint_D xy \\, dA = \\text{□}\\]",
      subformula: "\\[D: x^2 + y^2 \\leq 4, \\, x,y \\geq 0\\]",
      answer: 2
    },
    {
      formula: "\\[\\iiint_V xyz \\, dV = \\frac{1}{\\text{□}}\\]",
      subformula: "\\[V: 0 \\leq x,y,z \\leq 1\\]",
      answer: 8
    },
    {
      formula: "\\[\\iint_D (x^2 + y^2) \\, dA = \\frac{\\pi}{\\text{□}}\\]",
      subformula: "\\[D: x^2 + y^2 \\leq 1\\]",
      answer: 2
    }
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル微分方程式問題
export const generateHighLevelDifferentialEquationQuestion = (): Question => {
  const problems = [
    {
      formula: "\\[y'' + 9y = \\cos(3x)\\]",
      subformula: "\\[y_p = A x\\cos(3x) + B x\\sin(3x), \\quad 6B = \\text{□}\\]",
      answer: 1
    },
    {
      formula: "\\[y' + 2y = 6e^{-2x}\\]",
      subformula: "\\[y_p = \\text{□}xe^{-2x}\\]",
      answer: 6
    }
  ];

  return problems[Math.floor(Math.random() * problems.length)];
};

// ハイレベル問題をランダムに生成する関数
export const generateHighLevelQuestion = (): Question => {
  const questionGenerators = [
    generateHighLevelLimitQuestion,
    generateHighLevelDifferentialQuestion,
    generateHighLevelIntegralQuestion,
    generateHighLevelDeterminantQuestion,
    generateHighLevelEigenvalueQuestion,
    generateHighLevelMultipleIntegralQuestion,
    generateHighLevelDifferentialEquationQuestion
  ];

  const randomIndex = Math.floor(Math.random() * questionGenerators.length);
  const question = questionGenerators[randomIndex]();

  // ハイレベル問題フラグを追加
  return {
    ...question,
    isHighLevel: true
  };
};
