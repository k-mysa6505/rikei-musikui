declare global {
    interface Window {
        MathJax: {
            typeset: (elements?: HTMLElement[]) => void;
        };
    }
}

export enum GameState {
  TITLE = 0,
  HOW_TO_PLAY = 1,
  COUNT_DOWN = 2,
  PLAYING = 3,
  RESULTS = 4
};

export enum Rank {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export interface Question {
  formula: string;
  subformula: string;
  answer: number;
}

export interface QuestionResult {
  stage: number;
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

export interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  questionResults: QuestionResult[];
  rank: Rank;
}
