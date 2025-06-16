import { QuestionBlock } from "./src/types/question";

export const sampleQuizData: QuestionBlock[] = [
  {
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
  },
  {
    id: 7,
    title: "My money truths are:",
    imageUrl: null,
    description: "Rate each of the following statements in terms of its truth for you (0 = not at all like me; 1 = a little like me; 2 = a lot like me; 3 = exactly like me)",
    questions: [
      { id: 7, index: 0, text: "I don't like thinking about money.", answerType: "radio-button-0-3" },
      { id: 8, index: 1, text: "I use my money to help family, friends, or others in need.", answerType: "radio-button-0-3" },
      { id: 9, index: 2, text: "I like to shop, travel, and spend money on things that make me happy.", answerType: "radio-button-0-3" },
      { id: 10, index: 3, text: "Steadily growing account balances are an essential component of a fulfilled life for me.", answerType: "radio-button-0-3" },
      { id: 11, index: 4, text: "By organizing my finances and keeping things in control, I can feel safer.", answerType: "radio-button-0-3" },
      { id: 12, index: 5, text: "Money causes so many problems for society – we should overhaul our economic system.", answerType: "radio-button-0-3" },
      { id: 13, index: 6, text: "Money can help me build something important and enduring.", answerType: "radio-button-0-3" },
      { id: 14, index: 7, text: "I spend money in ways that will inspire others.", answerType: "radio-button-0-3" }
    ]
  },
  {
    id: 8,
    title: "If I were to receive a windfall of surplus money, I'd use it to:",
    imageUrl: null,
    description: "Rate each of the following statements in terms of its truth for you (0 = not at all like me; 1 = a little like me; 2 = a lot like me; 3 = exactly like me)",
    questions: [
      { id: 15, index: 0, text: "Give more to family, friends, or to worthy causes.", answerType: "radio-button-0-3" },
      { id: 16, index: 1, text: "Increase financial security for the future.", answerType: "radio-button-0-3" },
      { id: 17, index: 2, text: "Upgrade my lifestyle.", answerType: "radio-button-0-3" },
      { id: 18, index: 3, text: "Save it (or pay down debt)", answerType: "radio-button-0-3" },
      { id: 19, index: 4, text: "Invest in my own business or something else of enduring value.", answerType: "radio-button-0-3" },
      { id: 20, index: 5, text: "Access something exclusive or enhance my reputation.", answerType: "radio-button-0-3" },
      { id: 21, index: 6, text: "Pay someone else to handle my bills and deal with my financial affairs.", answerType: "radio-button-0-3" }
    ]
  }
]; 