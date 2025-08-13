import { Question } from "../../types";

export const generateDeterminantQuestion = (): Question => {
  const patterns = [
    // パターン1: 2x2行列の行列式
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const b = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const c = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const d = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      return {
        formula: `\\[\\det \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} = \\text{□}\\]`,
        subformula: "",
        answer: a * d - b * c
      };
    },
    // パターン2: 負の数を含む2x2行列
    () => {
      const a = Math.floor(Math.random() * 9) - 4; // -4から4
      const b = Math.floor(Math.random() * 9) - 4;
      const c = Math.floor(Math.random() * 9) - 4;
      const d = Math.floor(Math.random() * 9) - 4;
      return {
        formula: `\\[\\det \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} = \\text{□}\\]`,
        subformula: "",
        answer: a * d - b * c
      };
    },
    // パターン3: 3x3行列の行列式（第1行展開）
    () => {
      const matrix = Array(3).fill(0).map(() => 
        Array(3).fill(0).map(() => Math.floor(Math.random() * 3) + 2) // 2-4 (1を避ける)
      );
      const det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                  matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                  matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
      
      return {
        formula: `\\[\\det \\begin{pmatrix} ${matrix[0][0]} & ${matrix[0][1]} & ${matrix[0][2]} \\\\ ${matrix[1][0]} & ${matrix[1][1]} & ${matrix[1][2]} \\\\ ${matrix[2][0]} & ${matrix[2][1]} & ${matrix[2][2]} \\end{pmatrix} = \\text{□}\\]`,
        subformula: "",
        answer: det
      };
    },
    // パターン4: 対角行列の行列式
    () => {
      const a = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const b = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      const c = Math.floor(Math.random() * 4) + 2; // 2-5 (1を避ける)
      return {
        formula: `\\[\\det \\begin{pmatrix} ${a} & 0 & 0 \\\\ 0 & ${b} & 0 \\\\ 0 & 0 & ${c} \\end{pmatrix} = \\text{□}\\]`,
        subformula: "",
        answer: a * b * c
      };
    }
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
