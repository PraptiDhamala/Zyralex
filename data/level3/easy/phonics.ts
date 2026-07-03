const lesson = {
  id: "phonics_level3",
  title: "Silent Letter Detective",
  subtitle:
    "Some letters hide in a word without making a sound. Let's catch them! 🕵️‍♀️",
  color: "#93C5FD",
  mascot: "🦉",

  explanation: [
    {
      type: "text",
      content: "Some letters are silent. We write them, but we don't say them.",
    },
    {
      type: "tip",
      content: "In 'knee', the K is silent. We just say 'nee'.",
      animationType: "bounce-in",
      visualAnchor: "kn",
    },
    {
      type: "tip",
      content: "In 'wrist', the W is silent. We just say 'rist'.",
      animationType: "wiggle",
      visualAnchor: "wr",
    },
    {
      type: "story",
      content:
        "Another tricky team: ar, er, ir, or, ur. The R changes the vowel sound.",
      animationType: "pulse-on-audio",
      visualAnchor: "ar er ir",
    },
    {
      type: "tip",
      content:
        "Say 'car'. Hear how the R changes the A sound? That's an r-controlled vowel.",
      animationType: "stroke-by-stroke",
      visualAnchor: "car",
    },
    {
      type: "activity",
      content: "Whisper the word first, then say it at normal speed.",
      visualAnchor: "whisper",
    },
  ],

  examples: [
    {
      letter: "kn",
      word: "knee",
      emoji: "🦵",
      sentence: "Kn-ee — the K is silent.",
      color: "#2563EB",
    },
    {
      letter: "wr",
      word: "wrist",
      emoji: "✋",
      sentence: "Wr-ist — the W is silent.",
      color: "#F59E0B",
    },
    {
      letter: "ar",
      word: "car",
      emoji: "🚗",
      sentence: "C-ar — the AR sound is one team.",
      color: "#16A34A",
    },
    {
      letter: "ir",
      word: "bird",
      emoji: "🐦",
      sentence: "B-ird — the IR sound is one team.",
      color: "#7C3AED",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🦵 Which letter is silent in 'knee'?",
      options: ["k", "n", "e"],
      answer: "k",
    },
    {
      interactionType: "tap-to-reveal",
      question: "✋ Which letter is silent in 'wrist'?",
      options: ["w", "r", "s"],
      answer: "w",
    },
    {
      interactionType: "drag-and-drop",
      question: "🚗 Which word has the AR sound?",
      options: ["car", "cat"],
      answer: "car",
    },
    {
      interactionType: "drag-and-drop",
      question: "🐦 Which word has the IR sound?",
      options: ["bird", "bed"],
      answer: "bird",
    },
    {
      question: "Which word starts with a silent letter?",
      options: ["knife", "table"],
      answer: "knife",
    },
    {
      question: "Which word starts with a silent letter?",
      options: ["write", "chair"],
      answer: "write",
    },
  ],

  challengeRound: [
    { scrambled: "eekn", answer: "knee", hint: "🦵" },
    { scrambled: "tirsw", answer: "wrist", hint: "✋" },
    { scrambled: "rac", answer: "car", hint: "🚗" },
  ],

  motivationalTips: [
    "🌟 Silent letters trip up even great readers — you're learning the trick.",
    "🌟 Noticing the R change your ear? That's real progress.",
    "🌟 Careful readers spot the tricky parts first.",
  ],

  completionMessage:
    "🏆 Amazing! You can spot silent letters and r-controlled vowels like a true detective!",
};

export default lesson;
