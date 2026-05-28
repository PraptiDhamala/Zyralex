const fluency = {
  id: "fluency",

  title: "Reading Fluency",

  subtitle: "Practice reading smoothly, accurately, and with confidence.",

  difficulty: "hard",

  explanation: [
    {
      type: "info",
      content:
        "Fluency means reading words smoothly and without stopping too much.",
    },

    {
      type: "tip",
      content:
        "Good readers group words together instead of reading one word at a time.",
    },

    {
      type: "info",
      content:
        "Reading the same sentence multiple times can improve speed and confidence.",
    },
  ],

  examples: [
    {
      letter: "📖",
      word: "The bird flew across the sky.",
      emoji: "🕊️",
    },

    {
      letter: "🚲",
      word: "Mina rides her bike to school every day.",
      emoji: "✨",
    },
  ],

  guidedPractice: [
    {
      question: "Choose the sentence that sounds smooth and complete.",

      options: ["The dog ran fast.", "Dog the fast ran.", "Fast ran dog the."],

      answer: "The dog ran fast.",
    },

    {
      question: "Which sentence is easiest to read clearly?",

      options: [
        "Sam plays football after school.",
        "Football school after Sam plays.",
        "After plays school football Sam.",
      ],

      answer: "Sam plays football after school.",
    },

    {
      question: "Choose the sentence with the correct word order.",

      options: [
        "The sun shines brightly today.",
        "Brightly shines sun today the.",
        "Today the brightly sun shines.",
      ],

      answer: "The sun shines brightly today.",
    },

    {
      question: "Which sentence sounds natural when read aloud?",

      options: [
        "Lucy baked cookies for her friends.",
        "Cookies Lucy her baked friends for.",
        "Friends for baked Lucy cookies.",
      ],

      answer: "Lucy baked cookies for her friends.",
    },

    {
      question: "Choose the smoothest sentence.",

      options: [
        "The children laughed at the funny joke.",
        "Funny joke the laughed children at.",
        "Children the joke funny laughed.",
      ],

      answer: "The children laughed at the funny joke.",
    },
  ],

  completionMessage:
    "Wonderful job! Your reading fluency is getting stronger every day.",
};

export default fluency;
