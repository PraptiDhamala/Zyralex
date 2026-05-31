const lesson = {
  id: "chunking-level-2",

  title: "Advanced Chunking",

  subtitle: "Spot the patterns to chop up bigger words! ✂️",

  color: "#DBEAFE", // A nice soft blue for Level 2

  mascot: "🦊", // A clever fox for decoding

  explanation: [
    {
      type: "text",
      content: "Level 2 chunking means looking for secret patterns inside words.",
    },
    {
      type: "text",
      content: "Every chunk (syllable) must have exactly one talking vowel sound!",
    },
    {
      type: "story",
      content: "When two consonants sit between two vowels, we chop right between them! Nap-kin becomes napkin 🥢",
    },
    {
      type: "tip",
      content: "Look for 'fences' (consonants) blocking the vowels from each other.",
    },
    {
      type: "activity",
      content: "Place your hand under your chin. Your chin drops for every chunk you say! 🗣️",
    },
  ],

  examples: [
    {
      letter: "nap", // Using standard terminology or the first chunk
      word: "napkin",
      emoji: "🥢",
      sentence: "Nap-kin is split between the 'p' and 'k'.",
      color: "#EC4899",
    },
    {
      letter: "rab",
      word: "rabbit",
      emoji: "🐇",
      sentence: "Rab-bit splits right between the twin consonants!",
      color: "#A855F7",
    },
    {
      letter: "win",
      word: "winter",
      emoji: "❄️",
      sentence: "Win-ter splits easily between the 'n' and 't'.",
      color: "#06B6D4",
    },
  ],

  guidedPractice: [
    {
      question: "🧲 How would you chunk 'magnet' between its two consonants?",
      options: ["mag-net", "ma-gnet", "magn-et"],
      answer: "mag-net",
    },
    {
      question: "🪵 Which is the correct chunking for the animal 'reptile'?",
      options: ["rep-tile", "re-ptile", "rept-ile"],
      answer: "rep-tile",
    },
    {
      question: "🦷 How would you chunk the word 'dentist'?",
      options: ["den-tist", "de-ntist", "dent-ist"],
      answer: "den-tist",
    },
  ],

  completionMessage:
    "Fantastic! 🏆 You've mastered Level 2 syllable splitting! You're ready for giant words now!",
};

export default lesson;