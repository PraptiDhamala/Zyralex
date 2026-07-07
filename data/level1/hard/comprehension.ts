const comprehension = {
  id: "comprehension",

  title: "Reading Detective",

  subtitle:
    "Become a reading detective! Read, find clues, and solve mini mysteries.",

  difficulty: "hard",

  mascot: "🕵️",

  explanation: [
    {
      type: "story",
      content:
        "A detective doesn't just read words—they look for clues! Today YOU are the detective.",
    },

    {
      type: "tip",
      content: "Ask yourself:\n👤 Who?\n📍 Where?\n💭 Why?\n🎯 What happened?",
    },

    {
      type: "encourage",
      content: "Take your time. Great detectives never rush!",
    },
  ],

  examples: [
    {
      emoji: "🐶",
      word: "The dog ran to the park.",
      clue: "📍 Where did it go?",
    },

    {
      emoji: "🍎",
      word: "Mia ate an apple because she was hungry.",
      clue: "💭 Why?",
    },
  ],

  guidedPractice: [
    {
      mission: "🔍 Find the reason!",

      story: "Sam wore a raincoat because it was raining.",

      question: "Why did Sam wear the raincoat?",

      options: ["🥶 It was cold", "🌧️ It was raining", "😴 He was sleepy"],

      answer: "🌧️ It was raining",

      success: "Excellent detective work! ⭐",

      hint: "Look for the word 'because'.",
    },

    {
      mission: "📍 Find the place!",

      story: "The cat hid under the table during the storm.",

      question: "Where did the cat hide?",

      options: ["🛏️ Under the bed", "🪑 Under the table", "🌳 In the garden"],

      answer: "🪑 Under the table",

      success: "You found the clue! 🎉",
    },

    {
      mission: "👤 Find the object!",

      story: "Lily packed her books before school.",

      question: "What did Lily pack?",

      options: ["👟 Shoes", "📚 Books", "🍎 Lunch"],

      answer: "📚 Books",

      success: "Great memory! ⭐",
    },
  ],

  completionMessage:
    "🏆 Detective Complete!\nYou solved every reading mystery!",
};
