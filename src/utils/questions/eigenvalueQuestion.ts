//  utils/questions/eigenvalueQuestion.ts
//  固有値問題

import { Question } from "../../types";

export const generateEigenvalueQuestion = (): Question => {
  //  2つの異なる固有値を持つ2x2行列の生成
  let lambda1: number, lambda2: number;
  lambda1 = Math.floor(Math.random() * 10) - 5;     //  -5～5
  do {
    lambda2 = Math.floor(Math.random() * 10) - 5;   //  -5～5
  } while (lambda1 === lambda2);

  let P: number[][] = new Array(2).fill(0).map(() => new Array(2).fill(0));
  let detP: number;
  do {
    P[0][0] = Math.floor(Math.random() * 6) - 3;    //  -3～3
    P[0][1] = Math.floor(Math.random() * 6) - 3;    //  -3～3
    P[1][0] = Math.floor(Math.random() * 6) - 3;    //  -3～3
    P[1][1] = Math.floor(Math.random() * 6) - 3;    //  -3～3
    detP = P[0][0] * P[1][1] - P[0][1] * P[1][0];
  } while (Math.abs(detP) !== 1);

  const P_inv: number[][] = [
    [P[1][1] / detP, -P[0][1] / detP],
    [-P[1][0] / detP, P[0][0] / detP]
  ];

  const D: number[][] = [
    [lambda1, 0],
    [0, lambda2]
  ];

  let PDP_inv: number[][] = new Array(2).fill(0).map(() => new Array(2).fill(0));
  PDP_inv[0][0] = P_inv[0][0] * D[0][0] * P[0][0] + P_inv[0][1] * D[1][0] * P[1][0];
  PDP_inv[0][1] = P_inv[0][0] * D[0][1] * P[0][1] + P_inv[0][1] * D[1][1] * P[1][1];
  PDP_inv[1][0] = P_inv[1][0] * D[0][0] * P[0][0] + P_inv[1][1] * D[1][0] * P[1][0];
  PDP_inv[1][1] = P_inv[1][0] * D[0][1] * P[0][1] + P_inv[1][1] * D[1][1] * P[1][1];

  //  問題作成
  const bitedPosition = Math.floor(Math.random() * 5);
  const bitedValue =
    bitedPosition < 4 ? P[Math.floor(bitedPosition / 2)][bitedPosition % 2]
    : (bitedPosition === 4 ? lambda1 : lambda2);

  let bitedFormula = `\\[A=`;
  bitedFormula += `\\begin{pmatrix}`;
  for (let i = 0; i < 4; i++) {
    if (i === bitedPosition) {
      bitedFormula += `\\text{□}`;
    } else {
      bitedFormula += `${P[Math.floor(i / 2)][i % 2]}`;
    }
    if (i % 2 === 1 && i !== 3) {
      bitedFormula += ` \\\\ `;
    } else if (i !== 3) {
      bitedFormula += ` & `;
    }
  }
  bitedFormula += `\\end{pmatrix}`;
  bitedFormula += `\\]`;

  let bitedSubFormula;
  if (bitedPosition === 4) {
    bitedSubFormula = `\\[\\text{固有値は□と}${lambda2}\\]`;
  } else if (bitedPosition === 5) {
    bitedSubFormula = `\\[\\text{固有値は}${lambda1}\\text{と□}\\]`;
  } else {
    bitedSubFormula = `\\[\\text{固有値は}${lambda1}\\text{と}${lambda2}\\]`;
  }

  return {
    formula: bitedFormula,
    subformula: bitedSubFormula,
    answer: bitedValue
  };
};
