const lesson = {
  id: "chunking-level-2",
  title: "Advanced Chunking",
  subtitle: "Spot the patterns to chop up bigger words! ✂️",
  color: "#DBEAFE",
  mascot: "🦊",

  explanation: [
    {
      type: "text",
      content: "Level 2 chunking means looking for patterns inside words.",
    },
    {
      type: "text",
      content: "Every chunk needs exactly one vowel sound.",
      animationType: "pulse-on-audio",
      visualAnchor: "chunk",
    },
    {
      type: "story",
      content: "Two consonants between two vowels? Chop right between them.",
      animationType: "stroke-by-stroke",
      visualAnchor: "nap-kin",
    },
    {
      type: "tip",
      content:
        "Look for the 'fence' — the consonants blocking the vowels apart.",
      animationType: "wiggle",
      visualAnchor: "fence",
    },
    {
      type: "activity",
      content: "Your chin drops once for every chunk you say. Try it!",
      visualAnchor: "clap",
    },
  ],

  examples: [
    {
      letter: "nap",
      word: "napkin",
      emoji: "🥢",
      sentence: "Nap-kin splits between the P and K.",
      color: "#EC4899",
    },
    {
      letter: "rab",
      word: "rabbit",
      emoji: "🐇",
      sentence: "Rab-bit splits between the twin consonants.",
      color: "#A855F7",
    },
    {
      letter: "win",
      word: "winter",
      emoji: "❄️",
      sentence: "Win-ter splits between the N and T.",
      color: "#06B6D4",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🧲 How would you chunk 'magnet'?",
      options: ["mag-net", "ma-gnet", "magn-et"],
      answer: "mag-net",
    },
    {
      interactionType: "drag-and-drop",
      question: "🦎 Which is the correct chunking for 'reptile'?",
      options: ["rep-tile", "re-ptile", "rept-ile"],
      answer: "rep-tile",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🦷 How would you chunk 'dentist'?",
      options: ["den-tist", "de-ntist", "dent-ist"],
      answer: "den-tist",
    },
  ],

  challengeRound: [
    { scrambled: "tkinnap", answer: "napkin", hint: "🥢" },
    { scrambled: "tirebbat", answer: "rabbit", hint: "🐇" },
    { scrambled: "rewtrin", answer: "winter", hint: "❄️" },
  ],

  motivationalTips: [
    "🌟 Finding the fence gets easier every time you try.",
    "🌟 Big words are just small chunks stacked together.",
    "🌟 You're reading longer words than you were last level!",
  ],

  completionMessage:
    "Fantastic! 🏆 You've mastered Level 2 syllable splitting! You're ready for giant words now!",
};

export default lesson;
