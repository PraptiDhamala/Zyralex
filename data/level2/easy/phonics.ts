const level2Phonics = {
  title: "Advanced Phonics",

  subtitle: "Learn more complex sounds and blend letters together!",

  completionMessage: "Awesome! You mastered Level 2 Phonics!",

  explanation: [
    {
      type: "info",
      content: "Phonics helps us connect letters with sounds.",
    },

    {
      type: "tip",
      content: "Sometimes two letters work together to make one sound.",
    },

    {
      type: "tip",
      content: "For example, 'sh' makes the shhhh sound.",
    },
  ],

  /*
  ========================================
  EXAMPLES
  ========================================
  */

  examples: [
    {
      emoji: "🦈",
      letter: "sh",
      word: "shark",
      sentence: "The shark swims in the ocean.",
      color: "#2563EB",
    },

    {
      emoji: "🪑",
      letter: "ch",
      word: "chair",
      sentence: "Sit on the chair.",
      color: "#DC2626",
    },

    {
      emoji: "🚂",
      letter: "tr",
      word: "train",
      sentence: "The train moves fast.",
      color: "#16A34A",
    },

    {
      emoji: "🌧️",
      letter: "dr",
      word: "drip",
      sentence: "Water drops drip slowly.",
      color: "#7C3AED",
    },
  ],

  /*
  ========================================
  GUIDED PRACTICE
  ========================================
  */

  guidedPractice: [
    {
      question: "Which sound starts the word 'shark'?",

      options: ["sh", "ch", "dr"],

      answer: "sh",
    },

    {
      question: "Which word starts with 'ch'?",

      options: ["chair", "train", "drip"],

      answer: "chair",
    },

    {
      question: "Which blend is in 'train'?",

      options: ["tr", "sh", "ch"],

      answer: "tr",
    },

    {
      question: "Which word starts with 'dr'?",

      options: ["drip", "chair", "shark"],

      answer: "drip",
    },
  ],
};

export default level2Phonics;
