import { Question } from '../../types';
import { generateLimitQuestion } from './limitQuestion';
import { generateDifferentialQuestion } from './differentialQuestion';
import { generateIntegralQuestion } from './integralQuestion';
import { generateDeterminantQuestion } from './determinantQuestion';
import { generateEigenvalueQuestion } from './eigenvalueQuestion';
import { generateMultipleIntegralQuestion } from './multipleIntegralQuestion';
import { generateDifferentialEquationQuestion } from './differentialEquationQuestion';

const questionGenerators = [
  generateLimitQuestion,
  generateDifferentialQuestion,
  generateIntegralQuestion,
  generateDeterminantQuestion,
  generateEigenvalueQuestion,
  generateMultipleIntegralQuestion,
  generateDifferentialEquationQuestion
];

export const generateQuestion = (questionNo: number): Question => {
  if (questionNo < 1 || questionGenerators.length < questionNo) {
    throw new Error(`Invalid question no: ${questionNo}`);
  }
  return questionGenerators[questionNo - 1]();
};
