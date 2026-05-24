const lesson = {
  id: "decoding",

  title: "Decoding Words",

  subtitle: "Learn how to sound out letters and blend them to read new words.",

  objectives: [
    "Recognize letter sounds",
    "Blend sounds together",
    "Read unfamiliar words",
    "Improve reading confidence",
  ],

  explanation: [
    {
      type: "text",
      content:
        "Decoding means figuring out how a word sounds by looking at its letters.",
    },

    {
      type: "text",
      content:
        "Readers decode by saying each sound slowly and blending the sounds together.",
    },

    {
      type: "text",
      content: "Example: c-a-t → cat",
    },

    {
      type: "text",
      content: "Decoding helps us read words we have never seen before.",
    },

    {
      type: "tip",
      content: "Tip: Start with the first sound and move from left to right.",
    },
  ],

  vocabulary: [
    {
      word: "Decode",
      meaning: "To figure out a word by using letter sounds.",
    },

    {
      word: "Blend",
      meaning: "To join sounds together smoothly.",
    },

    {
      word: "Sound",
      meaning: "The noise a letter or group of letters makes.",
    },
  ],

  examples: [
    {
      word: "cat",
      sounds: ["c", "a", "t"],
      blended: "cat",
      emoji: "🐱",
    },

    {
      word: "dog",
      sounds: ["d", "o", "g"],
      blended: "dog",
      emoji: "🐶",
    },

    {
      word: "sun",
      sounds: ["s", "u", "n"],
      blended: "sun",
      emoji: "☀️",
    },

    {
      word: "fish",
      sounds: ["f", "i", "sh"],
      blended: "fish",
      emoji: "🐟",
    },
  ],

  stepByStep: [
    {
      step: 1,
      instruction: "Look at the first letter.",
    },

    {
      step: 2,
      instruction: "Say each sound slowly.",
    },

    {
      step: 3,
      instruction: "Blend the sounds together.",
    },

    {
      step: 4,
      instruction: "Read the whole word smoothly.",
    },
  ],

  guidedPractice: [
    {
      question: "Which sounds make the word 'map'?",
      options: ["m-a-p", "ma-p", "m-p-a"],
      answer: "m-a-p",
      explanation: "We say each sound from left to right.",
    },

    {
      question: "Blend these sounds: d-o-g",
      options: ["dig", "dog", "dug"],
      answer: "dog",
      explanation: "The sounds d-o-g blend together to make 'dog'.",
    },

    {
      question: "What word do these sounds make: s-u-n?",
      options: ["sun", "son", "sin"],
      answer: "sun",
      explanation: "Blending the sounds creates the word 'sun'.",
    },
  ],

  challenge: {
    instruction: "Try decoding these words on your own:",
    words: ["hat", "pen", "shop", "frog"],
  },

  funFact: {
    title: "Did You Know?",
    content:
      "Strong readers decode words very quickly, almost like a superpower!",
  },

  completionMessage:
    "Awesome work! You practiced sounding out and blending words like a real reader!",
};

export default lesson;
