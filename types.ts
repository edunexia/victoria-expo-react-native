export interface Question {
  id: number;
  index: number;
  text: string;
  answerType: string;
}

export interface QuestionBlock {
  id: number;
  title: string;
  imageUrl: string | null;
  description: string;
  questions: Question[];
}

export interface QuizAnswer {
  questionId: number;
  value: number;
}

export interface QuizResults {
  blockId: number;
  answers: QuizAnswer[];
  completedAt: string;
} 