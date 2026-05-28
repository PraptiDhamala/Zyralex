const lesson = {
  id: "phonics",
  title: "Phonics & Sound Blends",
  subtitle: "Let's connect letter combinations to their natural sounds.",
  color: "#FEF3C7",
  explanation: [
    {
      type: "text",
      content:
        "Phonics helps us link the shapes of letters with the sounds they make when spoken.",
    },
    {
      type: "text",
      content:
        "When letters sit next to each other, they sometimes join up to create a brand new sound blend.",
    },
    {
      type: "tip",
      content: "The pair 'ch' makes a sharp sound, like in the word: CH-ip. 🍟",
    },
    {
      type: "tip",
      content:
        "The pair 'sh' makes a quiet, soft sound, like in the word: SH-ip. 🚢",
    },
  ],
  examples: [
    {
      letter: "ch",
      word: "chair",
      emoji: "🪑",
    },
    {
      letter: "sh",
      word: "shoe",
      emoji: "👟",
    },
  ],
  guidedPractice: [
    {
      question:
        "Which letter pair makes the sound you hear at the start of 'Chief'?",
      options: ["ch", "sh"],
      answer: "ch",
    },
    {
      question: "Complete the word for something found at the beach: '___ell'",
      options: ["ch", "sh"],
      answer: "sh",
    },
  ],
  completionMessage:
    "Fantastic work! You are mastering how letter sounds blend together cleanly.",
};

export default lesson;
