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
  SS = 'SS',
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
  isHighLevel?: boolean;
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
  basicTime: number; // 基本問題（1-7問）の時間
  questionResults: QuestionResult[];
  rank: Rank;
  basicRank?: Rank; // ハイレベルボーナス前の基本ランク
  hasHighLevelBonus: boolean; // ハイレベルボーナスがあるか
}
