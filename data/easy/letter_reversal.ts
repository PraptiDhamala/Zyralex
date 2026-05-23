const lesson = {
  id: "letter_reversal",

  title: "Learning b and d",

  subtitle: "Let's learn how these letters face different directions.",

  color: "#DBEAFE",

  explanation: [
    {
      type: "text",
      content:
        "Sometimes letters like b and d can look confusing. That is completely okay.",
    },

    {
      type: "text",
      content: "We will learn a simple trick to remember them step by step.",
    },

    {
      type: "tip",
      content: "The letter b has a belly pointing forward → b",
    },

    {
      type: "tip",
      content: "The letter d has a back pointing backward ← d",
    },
  ],

  examples: [
    {
      letter: "b",
      word: "ball",
      emoji: "⚽",
    },

    {
      letter: "d",
      word: "dog",
      emoji: "🐶",
    },
  ],

  guidedPractice: [
    {
      question: "Which letter is b?",
      options: ["b", "d"],
      answer: "b",
    },

    {
      question: "Which word starts with d?",
      options: ["dog", "ball"],
      answer: "dog",
    },
  ],

  completionMessage:
    "Amazing work! You are starting to recognize letter directions.",
};

export default lesson;
