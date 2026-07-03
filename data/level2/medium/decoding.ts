const lesson = {
  id: "decoding-level-2",
  title: "Blending Tricky Teams",
  subtitle:
    "Two consonants can team up. Let's blend them and read bigger words! 🚀",
  color: "#FDE68A",
  mascot: "🦊",

  explanation: [
    {
      type: "text",
      content: "Some words start with two consonants blended together.",
    },
    {
      type: "text",
      content:
        "Each letter keeps its own sound, but we say them fast, side by side.",
      animationType: "pulse-on-audio",
      visualAnchor: "s-t",
    },
    {
      type: "story",
      content: "s-t-o-p becomes STOP 🛑 when we blend s and t together first.",
      animationType: "stroke-by-stroke",
      visualAnchor: "stop",
    },
    {
      type: "tip",
      content: "Try it slowly: s...t...op. Then say it fast: stop!",
      animationType: "bounce-in",
      visualAnchor: "st",
    },
    {
      type: "tip",
      content: "Common teams: bl, cr, st, gr, sh, ch.",
      animationType: "wiggle",
      visualAnchor: "bl cr st",
    },
    {
      type: "activity",
      content: "Tap each letter team with your finger before reading the word.",
      visualAnchor: "tap",
    },
  ],

  examples: [
    {
      letter: "st",
      word: "stop",
      emoji: "🛑",
      sentence: "St-op starts with the ST team.",
      color: "#EF4444",
    },
    {
      letter: "cr",
      word: "crab",
      emoji: "🦀",
      sentence: "Cr-ab starts with the CR team.",
      color: "#F97316",
    },
    {
      letter: "bl",
      word: "black",
      emoji: "⚫",
      sentence: "Bl-ack starts with the BL team.",
      color: "#3B82F6",
    },
    {
      letter: "gr",
      word: "grape",
      emoji: "🍇",
      sentence: "Gr-ape starts with the GR team.",
      color: "#8B5CF6",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🛑 Blend these sounds: s-t-o-p",
      options: ["stop", "step", "spot"],
      answer: "stop",
    },
    {
      interactionType: "drag-and-drop",
      question: "🦀 What word do these sounds make: c-r-a-b?",
      options: ["crab", "cab", "grab"],
      answer: "crab",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🍇 Which sounds make the word 'grape'?",
      options: ["g-r-a-p-e", "g-a-r-p-e", "g-r-p-a-e"],
      answer: "g-r-a-p-e",
    },
    {
      interactionType: "drag-and-drop",
      question: "⚫ Blend these sounds: b-l-a-c-k",
      options: ["black", "back", "block"],
      answer: "black",
    },
  ],

  challengeRound: [
    { scrambled: "pots", answer: "stop", hint: "🛑" },
    { scrambled: "abcr", answer: "crab", hint: "🦀" },
    { scrambled: "epagr", answer: "grape", hint: "🍇" },
  ],

  miniGame: {
    title: "🧲 Sort by Team",
    instruction: "Put each word into the correct blend bucket.",
    categories: ["ST", "CR", "BL", "GR"],
    words: [
      { word: "stop", answer: "ST" },
      { word: "crab", answer: "CR" },
      { word: "black", answer: "BL" },
      { word: "grape", answer: "GR" },
    ],
  },

  motivationalTips: [
    "🌟 Blending takes practice — you're doing great.",
    "🌟 Say it slow first, then say it fast.",
    "🌟 Every blend you learn makes the next word easier.",
  ],

  completionMessage:
    "Awesome! 🎉 You're blending consonant teams like a pro reader!",
};

export default lesson;
