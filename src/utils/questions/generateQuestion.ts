import { Question } from "../../types";
import { generateLimitQuestion } from "./limitQuestion";
import { generateDifferentialQuestion } from "./differentialQuestion";
import { generateIntegralQuestion } from "./integralQuestion";
import { generateDeterminantQuestion } from "./determinantQuestion";
import { generateEigenvalueQuestion } from "./eigenvalueQuestion";
import { generateMultipleIntegralQuestion } from "./multipleIntegralQuestion";
import { generateDifferentialEquationQuestion } from "./differentialEquationQuestion";

export const generateQuestion = (questionNo: number): Question => {
  switch (questionNo) {
    case 1:
      return generateLimitQuestion();
    case 2:
      return generateDifferentialQuestion();
    case 3:
      return generateIntegralQuestion();
    case 4:
      return generateDeterminantQuestion();
    case 5:
      return generateEigenvalueQuestion();
    case 6:
      return generateMultipleIntegralQuestion();
    case 7:
      return generateDifferentialEquationQuestion();
    default:
      throw new Error(`Invalid question number: ${questionNo}`);
  }
};
