const comprehension = {
  id: "comprehension",

  title: "Reading Comprehension",

  subtitle:
    "Read short passages carefully and answer questions to improve understanding.",

  difficulty: "hard",

  explanation: [
    {
      type: "info",
      content:
        "Comprehension means understanding what you read, not just saying the words.",
    },

    {
      type: "tip",
      content:
        "Good readers think about WHO, WHAT, WHERE, and WHY while reading.",
    },

    {
      type: "info",
      content:
        "You can look for important clues in sentences to help answer questions.",
    },
  ],

  examples: [
    {
      letter: "🐶",
      word: "The dog ran to the park.",
      emoji: "📖",
    },

    {
      letter: "🍎",
      word: "Mia ate an apple because she was hungry.",
      emoji: "🧠",
    },
  ],

  guidedPractice: [
    {
      question:
        "Sam wore a raincoat because it was raining outside.\n\nWhy did Sam wear a raincoat?",

      options: [
        "Because it was cold",
        "Because it was raining",
        "Because he was tired",
      ],

      answer: "Because it was raining",
    },

    {
      question:
        "Lily put her books in her bag before school.\n\nWhat did Lily put in her bag?",

      options: ["Shoes", "Books", "Lunch"],

      answer: "Books",
    },

    {
      question:
        "Tom was thirsty after playing football.\n\nWhy was Tom thirsty?",

      options: ["He was sleeping", "He was playing football", "He was reading"],

      answer: "He was playing football",
    },

    {
      question:
        "The cat hid under the table during the storm.\n\nWhere did the cat hide?",

      options: ["Under the bed", "Under the table", "In the garden"],

      answer: "Under the table",
    },

    {
      question: "Anna studied every day for her test.\n\nWhy did Anna study?",

      options: ["For her test", "To watch TV", "To play outside"],

      answer: "For her test",
    },
  ],

  completionMessage:
    "Excellent work! You are improving your reading comprehension skills.",
};

export default comprehension;
