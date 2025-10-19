// src/utils/questions/eigenvalueQuestion.ts
// 第5問 固有値の問題生成

import { Question } from "../../types";

export const generateEigenvalueQuestion = (): Question => {
  const patterns = [
    () => {
      const lambda1 = Math.floor(Math.random() * 6) + 1; // 1-6
      const lambda2 = Math.floor(Math.random() * 6) + 1; // 1-6
      const eigenvalueText = lambda1 === lambda2 ? `${lambda1}` : `${lambda1}, ${lambda2}`;
      const positions = [
        {
          formula: `\\[A = \\begin{pmatrix} \\text{□} & 0 \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: lambda1
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & 0 \\\\ 0 & \\text{□} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: lambda2
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & 0 \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${lambda1 === lambda2 ? '\\text{□}' : '\\text{□}, ' + lambda2}\\]`,
          answer: lambda1
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & 0 \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${lambda1 === lambda2 ? '\\text{□}' : lambda1 + ', \\text{□}'}\\]`,
          answer: lambda2
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
      const lambda1 = Math.floor(Math.random() * 5) + 1; // 1-5
      const lambda2 = Math.floor(Math.random() * 5) + 1; // 1-5
      const b = Math.floor(Math.random() * 4) + 1; // 1-4
      const eigenvalueText = lambda1 === lambda2 ? `${lambda1}` : `${lambda1}, ${lambda2}`;
      const positions = [
        {
          formula: `\\[A = \\begin{pmatrix} \\text{□} & ${b} \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: lambda1
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & ${b} \\\\ 0 & \\text{□} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: lambda2
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & ${b} \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${lambda1 === lambda2 ? '\\text{□}' : '\\text{□}, ' + lambda2}\\]`,
          answer: lambda1
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${lambda1} & ${b} \\\\ 0 & ${lambda2} \\end{pmatrix}\\text{の固有値は } ${lambda1 === lambda2 ? '\\text{□}' : lambda1 + ', \\text{□}'}\\]`,
          answer: lambda2
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
      const eigenvalues = [
        { a: 3, b: 1, c: 1, d: 3, lambda1: 2, lambda2: 4 },
        { a: 5, b: 2, c: 2, d: 5, lambda1: 3, lambda2: 7 },
        { a: 4, b: 1, c: 1, d: 4, lambda1: 3, lambda2: 5 },
        { a: 2, b: 1, c: 1, d: 2, lambda1: 1, lambda2: 3 },
        { a: 3, b: 0, c: 0, d: 3, lambda1: 3, lambda2: 3 },
        { a: 2, b: 0, c: 0, d: 2, lambda1: 2, lambda2: 2 }
      ];
      const selected = eigenvalues[Math.floor(Math.random() * eigenvalues.length)];
      const eigenvalueText = selected.lambda1 === selected.lambda2 ? `${selected.lambda1}` : `${selected.lambda1}, ${selected.lambda2}`;
      const positions = [
        {
          formula: `\\[A = \\begin{pmatrix} \\text{□} & ${selected.b} \\\\ ${selected.c} & ${selected.d} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: selected.a
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${selected.a} & ${selected.b} \\\\ ${selected.c} & \\text{□} \\end{pmatrix}\\text{の固有値は } ${eigenvalueText}\\]`,
          answer: selected.d
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${selected.a} & ${selected.b} \\\\ ${selected.c} & ${selected.d} \\end{pmatrix}\\text{の固有値は } ${selected.lambda1 === selected.lambda2 ? '\\text{□}' : '\\text{□}, ' + selected.lambda2}\\]`,
          answer: selected.lambda1
        },
        {
          formula: `\\[A = \\begin{pmatrix} ${selected.a} & ${selected.b} \\\\ ${selected.c} & ${selected.d} \\end{pmatrix}\\text{の固有値は } ${selected.lambda1 === selected.lambda2 ? '\\text{□}' : selected.lambda1 + ', \\text{□}'}\\]`,
          answer: selected.lambda2
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
