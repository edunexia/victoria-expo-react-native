//interfaces for question onjects

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