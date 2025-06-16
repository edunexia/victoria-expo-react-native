import { QuestionBlock } from "./src/types/question";

export const sampleQuizData: QuestionBlock = {
  id: 6,
  title: "My main focus in life is:",
  imageUrl: null,
  description: "Rate each of the following statements according to how you feel about them and enjoy the test :)",
  questions: [
    {
      id: 1,
      index: 1,
      text: "Living in the moment.",
      answerType: "radio-button-1-4"
    },
    {
      id: 2,
      index: 2,
      text: "Buy things or experiences that bring me joy.",
      answerType: "radio-button-1-4"
    },
    {
      id: 3,
      index: 3,
      text: "Feel secure about my future.",
      answerType: "radio-button-1-4"
    },
    {
      id: 4,
      index: 4,
      text: "Express my values and beliefs.",
      answerType: "radio-button-1-4"
    },
    {
      id: 5,
      index: 5,
      text: "Have power and influence over others.",
      answerType: "radio-button-1-4"
    },
    {
      id: 6,
      index: 6,
      text: "Help family and friends.",
      answerType: "radio-button-1-4"
    }
  ]
}; 