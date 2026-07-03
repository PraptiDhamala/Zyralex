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
      content:
        "Some letters are totally silent! We must write them down, but when we say them out loud, they stay quiet.",
      animationType: "pulse-on-audio",
      visualAnchor: "SILENT",
    },
    {
      type: "tip",
      content:
        "Look at 'knee'! The letter K acts like a ghost — it's completely silent, so we just say 'nee'!",
      animationType: "morph-asset",
      visualAnchor: "kn",
    },
    {
      type: "tip",
      content:
        "In the word 'wrist', the W is taking a nap! Zip right past it and start your sound with 'rist'.",
      animationType: "mirror-flip",
      visualAnchor: "wr",
    },
    {
      type: "story",
      content:
        "Meet the R-Controlled Bosses: ar, er, ir, or, ur! The letter R changes how the vowels sound.",
      animationType: "pulse-on-audio",
      visualAnchor: "ar",
    },
    {
      type: "tip",
      content:
        "Say 'car'. Hear how the R stretches out the A sound? That's an r-controlled vowel team.",
      animationType: "stroke-by-stroke",
      visualAnchor: "car",
    },
    {
      type: "speaking_warmup",
      content:
        "Let's warm up your detective voice! Whisper the word first, then say it out loud at normal speed.",
      visualAnchor: "🗣️",
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
