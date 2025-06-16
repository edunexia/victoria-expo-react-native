

export interface QuizAnswer {
  questionId: number;
  value: number;
}

export interface QuizResults {
  blockId: number;
  answers: QuizAnswer[];
  completedAt: string;
} 