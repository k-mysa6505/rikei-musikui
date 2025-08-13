//  src/types/index.ts

declare global {
    interface Window {
        MathJax: {
            typeset: (elements?: HTMLElement[]) => void;
        };
    }
}

//  Game states
export enum GameState {
  TITLE = 0,
  HOW_TO_PLAY = 1,
  COUNT_DOWN = 2,
  PLAYING = 3,
  RESULTS = 4
};

// Rank enum
export enum Rank {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

// Game questions
export interface Question {
  formula: string;
  subformula: string;
  answer: number;   // Correct answer
}

// Game result for each question
export interface QuestionResult {
  stage: number;
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

// Overall game result
export interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  questionResults: QuestionResult[];
  rank: Rank;
}
