const morphology = {
  id: "morphology",

  title: "Word Factory",

  subtitle: "Build new words like a word engineer!",

  mascot: "🏭",

  difficulty: "hard",

  explanation: [
    {
      type: "story",
      content:
        "Words are like LEGO blocks. Put the pieces together to build new meanings!",
    },

    {
      type: "tip",
      content: "Prefixes go FIRST.\nSuffixes go LAST.",
    },

    {
      type: "tip",
      content: "Every word piece changes the meaning.",
    },
  ],

  examples: [
    {
      emoji: "🧱",

      root: "happy",

      prefix: "un",

      result: "unhappy",
    },

    {
      emoji: "🔄",

      root: "write",

      prefix: "re",

      result: "rewrite",
    },

    {
      emoji: "🏃",

      root: "jump",

      suffix: "ing",

      result: "jumping",
    },
  ],

  guidedPractice: [
    {
      mission: "🧩 Build the word",

      root: "happy",

      piece: "un-",

      question: "What word do we make?",

      options: ["unhappy", "happyun", "happy"],

      answer: "unhappy",

      success: "Awesome builder! ⭐",
    },

    {
      mission: "✏️ Build again",

      root: "write",

      piece: "re-",

      question: "Choose the new word.",

      options: ["rewrite", "writer", "writing"],

      answer: "rewrite",

      success: "Perfect! 🎉",
    },

    {
      mission: "🏃 Action Time",

      root: "jump",

      piece: "-ing",

      question: "Which word shows the action?",

      options: ["jumping", "jumped", "jumps"],

      answer: "jumping",

      success: "Great building! ⭐",
    },

    {
      mission: "🎁 Add a suffix",

      root: "help",

      piece: "-ful",

      question: "What's the new word?",

      options: ["helpful", "helping", "helper"],

      answer: "helpful",

      success: "Excellent!",
    },
  ],

  completionMessage:
    "🏭 Word Factory Complete!\nYou built lots of amazing new words!",
};
