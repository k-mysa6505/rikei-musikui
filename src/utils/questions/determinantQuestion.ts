//  utils/questions/determinantQuestion.ts
//  3×3行列式

function calculateDeterminant(matrix: number[][]): number {
  const [a, b, c] = matrix[0];
  const [d, e, f] = matrix[1];
  const [g, h, i] = matrix[2];
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

export const generateDeterminantQuestion = () => {
  let matrix = Array.from({ length: 3 }, () => Array(3).fill(0));
  for (let i = 0; i < 9; i++) {
    matrix[Math.floor(i / 3)][i % 3] = Math.floor(Math.random() * 6) - 3;   //  -3～3
  }
  const det = calculateDeterminant(matrix);
  const bitedPosition = Math.floor(Math.random() * 10);
  const bitedValue = bitedPosition < 9 ? matrix[Math.floor(bitedPosition / 3)][bitedPosition % 3] : det;

  let bitedFormula = `\\[\\begin{vmatrix}`;
  for (let i = 0; i < 9; i++) {
    if (i === bitedPosition) {
      bitedFormula += `\\text{□}`;
    } else {
      bitedFormula += `${matrix[Math.floor(i / 3)][i % 3]}`;
    }
    if (i % 3 === 2 && i !== 8) {
      bitedFormula += ` \\\\ `;
    } else if (i !== 8) {
      bitedFormula += ` & `;
    }
  }
  bitedFormula += `\\end{vmatrix}`;
  if (bitedPosition === 9) {
    bitedFormula += `= \\text{□}\\]`;
  } else {
    bitedFormula += `= ${det}\\]`;
  }

  return {
    formula: bitedFormula,
    answer: bitedValue
  };
};
