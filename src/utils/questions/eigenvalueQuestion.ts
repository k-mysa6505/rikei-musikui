import { Question } from "../../types";

export const generateEigenvalueQuestion = (): Question => {
  const patterns = [
    // パターン1: 2x2行列の固有値問題
    () => {
      const lambda1 = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const lambda2 = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const trace = lambda1 + lambda2;
      const det = lambda1 * lambda2;
      
      return {
        formula: `\\[\\det(A - \\lambda I) = \\lambda^2 - ${trace}\\lambda + ${det} = 0\\]`,
        subformula: `\\[\\lambda = \\text{□}\\]`,
        answer: lambda1
      };
    },
    // パターン2: 対角行列の固有値
    () => {
      const eigenvalues = [2, 3, 4, 5]; // 1を除外
      const selected = eigenvalues[Math.floor(Math.random() * eigenvalues.length)];
      const other = eigenvalues.filter(v => v !== selected)[Math.floor(Math.random() * (eigenvalues.length - 1))];
      
      return {
        formula: `\\[A = \\begin{pmatrix} ${selected} & 0 \\\\ 0 & ${other} \\end{pmatrix}\\]`,
        subformula: `\\[\\lambda = \\text{□}\\]`,
        answer: selected
      };
    },
    // パターン3: 特性多項式から固有値を求める
    () => {
      const a = Math.floor(Math.random() * 3) + 2; // 2-4 (1を避ける)
      const b = Math.floor(Math.random() * 3) + 2; // 2-4 (1を避ける)
      const c = a * b; // ab = c となるように設定
      
      return {
        formula: `\\[\\det(A - \\lambda I) = \\lambda^2 - ${a + b}\\lambda + ${c} = 0\\]`,
        subformula: `\\[\\lambda = \\text{□}, ${b}\\]`,
        answer: a
      };
    },
    // パターン4: 単位行列の固有値
    () => {
      const size = Math.floor(Math.random() * 2) + 2; // 2または3
      const matrixText = size === 2 ? 
        "\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}" :
        "\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}";
      
      return {
        formula: `\\[I = ${matrixText}\\]`,
        subformula: `\\[\\lambda = \\text{□}\\]`,
        answer: 1
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
