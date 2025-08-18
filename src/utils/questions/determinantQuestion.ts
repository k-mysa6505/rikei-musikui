import { Question } from "../../types";

export const generateDeterminantQuestion = (): Question => {
  const patterns = [
    () => {
      let matrix: number[][];
      let zeroCount: number;

      // 0の要素がちょうど1個になるまで行列を生成し直す
      do {
        matrix = Array(3).fill(0).map(() =>
          Array(3).fill(0).map(() => Math.floor(Math.random() * 5) - 2) // -2 ~ 2
        );
        zeroCount = matrix.flat().filter(val => val === 0).length;
      } while (zeroCount !== 1);

      const det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                  matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                  matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
      const positions = [];
      if (det !== 0) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const tempMatrix: (number | string)[][] = matrix.map(row => [...row]);
            const originalValue = matrix[i][j];
            tempMatrix[i][j] = "\\text{□}";
            positions.push({
              matrix: tempMatrix,
              answer: originalValue,
              det: det
            });
          }
        }
      }
      positions.push({
        matrix: matrix,
        answer: det,
        det: "\\text{□}"
      });
      const selected = positions[Math.floor(Math.random() * positions.length)];
      return {
        formula: `\\[\\det \\begin{pmatrix} ${selected.matrix[0][0]} & ${selected.matrix[0][1]} & ${selected.matrix[0][2]} \\\\ ${selected.matrix[1][0]} & ${selected.matrix[1][1]} & ${selected.matrix[1][2]} \\\\ ${selected.matrix[2][0]} & ${selected.matrix[2][1]} & ${selected.matrix[2][2]} \\end{pmatrix} = ${selected.det}\\]`,
        subformula: "",
        answer: selected.answer
      };
    },
  ];

  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};
