import { QuestionBlock } from "./src/types/question";

export const sampleQuizData: QuestionBlock = {
  id: 6,
  title: "Money primarily allows me to:",
  imageUrl: null,
  description: "Rate each of the following statements in terms of their truth for you (0 = not at all like me; 1 = a little like me; 2 = a lot like me; 3 = exactly like me)",
  questions: [
    {
      id: 1,
      index: 0,
      text: "Not worry.",
      answerType: "radio-button-0-3"
    },
    {
      id: 2,
      index: 1,
      text: "Buy things or experiences that bring me joy.",
      answerType: "radio-button-0-3"
    },
    {
      id: 3,
      index: 2,
      text: "Feel secure about my future.",
      answerType: "radio-button-0-3"
    },
    {
      id: 4,
      index: 3,
      text: "Express my values and beliefs.",
      answerType: "radio-button-0-3"
    },
    {
      id: 5,
      index: 4,
      text: "Have power and influence over others.",
      answerType: "radio-button-0-3"
    },
    {
      id: 6,
      index: 5,
      text: "Help family and friends.",
      answerType: "radio-button-0-3"
    }
  ]
}; 