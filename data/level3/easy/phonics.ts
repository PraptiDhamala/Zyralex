const lesson = {
  id: "letter_reversal_level3",

  title: "b and d Reading Champion",

  subtitle:
    "You're becoming an expert! Let's read words, sentences, and spot tricky letters like a detective 🕵️",

  color: "#93C5FD",

  mascot: "🦉",

  explanation: [
    {
      type: "text",
      content:
        "Awesome work! Now you'll practice reading without getting tricked by mirror letters.",
    },
    {
      type: "tip",
      content: "Pause before every word. Check the first letter carefully.",
    },
    {
      type: "activity",
      content: "Use your finger under every word while reading.",
    },
    {
      type: "story",
      content: "Even expert readers slow down when they see tricky words.",
    },
    {
      type: "tip",
      content: "Don't guess. Look carefully, then read.",
    },
  ],

  examples: [
    {
      letter: "b",
      word: "black",
      emoji: "⚫",
      sentence: "Black begins with b.",
      color: "#2563EB",
    },
    {
      letter: "b",
      word: "bread",
      emoji: "🍞",
      sentence: "Bread begins with b.",
      color: "#2563EB",
    },
    {
      letter: "d",
      word: "dress",
      emoji: "👗",
      sentence: "Dress begins with d.",
      color: "#F59E0B",
    },
    {
      letter: "d",
      word: "dragon",
      emoji: "🐉",
      sentence: "Dragon begins with d.",
      color: "#F59E0B",
    },
  ],

  guidedPractice: [
    {
      question: "🐶 Which word starts with d?",
      options: ["dog", "ball"],
      answer: "dog",
    },

    {
      question: "🍞 Which word starts with b?",
      options: ["bread", "dress"],
      answer: "bread",
    },

    {
      question: "Fill in the missing letter: _og",
      options: ["b", "d"],
      answer: "d",
    },

    {
      question: "Fill in the missing letter: _all",
      options: ["b", "d"],
      answer: "b",
    },

    {
      question: "Which sentence is correct?",
      options: ["Dad has a dog.", "Bad has a bog."],
      answer: "Dad has a dog.",
    },

    {
      question: "Which sentence is correct?",
      options: ["The bird is blue.", "The dird is blue."],
      answer: "The bird is blue.",
    },

    {
      question: "How many b letters are in 'blue bird'?",
      options: ["1", "2", "3"],
      answer: "2",
    },

    {
      question: "How many d letters are in 'Dad has a dog'?",
      options: ["2", "3", "4"],
      answer: "3",
    },
  ],

  challengeRound: [
    {
      scrambled: "lalb",
      answer: "ball",
      hint: "⚽",
    },

    {
      scrambled: "god",
      answer: "dog",
      hint: "🐶",
    },

    {
      scrambled: "dribe",
      answer: "bird",
      hint: "🐦",
    },

    {
      scrambled: "rbeda",
      answer: "bread",
      hint: "🍞",
    },
  ],

  motivationalTips: [
    "🌟 You checked carefully before reading.",
    "🌟 Slow reading makes strong readers.",
    "🌟 Your brain is getting better every day.",
    "🌟 You're becoming a b and d detective!",
  ],

  completionMessage:
    "🏆 Amazing! You can now recognize b and d in words, sentences, and reading challenges. You're becoming a Reading Champion!",
};

export default lesson;
