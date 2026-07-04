const lesson = {
  id: "vowel_processing_l3",
  title: "Vowel Teams: Level 3",
  subtitle: "Let's meet the 'Bossy R' and shifting vowel teams! 👑",
  color: "#F0FDF4", // Light green tone to signify advanced mastery
  mascot: "🦁",

  explanation: [
    {
      type: "text",
      content:
        "Welcome to Level 3! Here, we meet letters that completely change how a vowel sounds.",
      animationType: "fade-in-gentle",
      visualAnchor: "ar oo",
    },
    {
      type: "story",
      content:
        "When the letter 'r' sits next to 'a', it becomes 'Bossy R' and makes the 'a' say its name like a pirate: 'Arr!' 🏴‍☠️",
      animationType: "pulse-on-audio",
      visualAnchor: "ar",
    },
    {
      type: "tip",
      content: "The pair 'ar' creates the strong sound you hear in st-AR ⭐",
      animationType: "stroke-by-stroke",
      visualAnchor: "ar",
    },
    {
      type: "tip",
      content:
        "The double 'oo' team can stretch out long like a ghost saying 'Ooo!' in m-OO-n 🌙",
      animationType: "mirror-flip",
      visualAnchor: "oo",
    },
    {
      type: "activity",
      content:
        "Growl the 'ar' sound and stretch the 'oo' sound to feel the difference! 🗣️",
      animationType: "pulse-on-audio",
      visualAnchor: "ar oo",
    },
  ],

  examples: [
    {
      letter: "ar",
      word: "star",
      emoji: "⭐",
      sentence: "Look up at the shining st-AR.",
      color: "#16A34A",
    },
    {
      letter: "ar",
      word: "park",
      emoji: "🛝",
      sentence: "We love to play at the p-AR-k.",
      color: "#16A34A",
    },
    {
      letter: "oo",
      word: "moon",
      emoji: "🌙",
      sentence: "The m-OO-n glows bright at night.",
      color: "#059669",
    },
    {
      letter: "oo",
      word: "spoon",
      emoji: "🥄",
      sentence: "Eat your soup with a sp-OO-n.",
      color: "#059669",
    },
  ],

  guidedPractice: [
    {
      question: "⭐ Select the missing letters to spell: St___",
      options: ["ar", "ee"],
      answer: "ar",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🌙 Drag the vowel team that spells m___n",
      options: ["oo", "oa"],
      answer: "oo",
      interactionType: "drag-and-drop",
    },
    {
      question: "🛝 Which word is controlled by the Bossy R?",
      options: ["park", "feet"],
      answer: "park",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🥄 Drag the letters into the box to finish sp___n",
      options: ["oo", "oi"],
      answer: "oo",
      interactionType: "drag-and-drop",
    },
  ],

  motivationalTips: [
    "🌟 Wow, Level 3! You are reading big kid words now!",
    "🌟 Bossy R doesn't scare you—you're the boss of these words!",
    "🌟 Think of how far you've come since Level 1! Awesome job. 🙌",
  ],

  completionMessage:
    "Unbelievable! 🥇 You have officially completed Level 3 and mastered the most complex vowel rules! Expert reader unlocked! 🚀",
};

export default lesson;
