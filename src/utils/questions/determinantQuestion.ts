import { Question } from "../../types";

export const generateDeterminantQuestion = (): Question => {
  const patterns = [
    () => {
      // 0を含まない行列を生成（1-4の範囲）
      const matrix = Array(3).fill(0).map(() =>
        Array(3).fill(0).map(() => Math.floor(Math.random() * 4) + 1)
      );
      const det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                  matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                  matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
      
      // 行列の要素のうち一つを空欄にするパターンを作成
      const positions = [];
      
      // 行列式が0でない場合のみ、要素を空欄にするパターンを追加
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
      
      // 行列式の値を空欄にするパターン（常に追加）
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
