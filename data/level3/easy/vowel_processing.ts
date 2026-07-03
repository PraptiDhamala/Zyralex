const lesson = {
  id: "vowel_processing_level3",
  title: "Vowel Team Explorer",
  subtitle:
    "oi, oy, ou, ow — the same sound, spelled two ways. Let's find the pattern! 🔍",
  color: "#93C5FD",
  mascot: "🦉",

  explanation: [
    {
      type: "text",
      content:
        "Some vowel teams make the same sound but are spelled differently.",
    },
    {
      type: "tip",
      content: "'oi' and 'oy' both make the same sound, like in coin and toy.",
      animationType: "pulse-on-audio",
      visualAnchor: "oi oy",
    },
    {
      type: "story",
      content: "We use 'oy' at the end of a word, and 'oi' in the middle.",
      animationType: "bounce-in",
      visualAnchor: "boy coin",
    },
    {
      type: "tip",
      content: "'ou' and 'ow' both make the same sound, like in cloud and cow.",
      animationType: "wiggle",
      visualAnchor: "ou ow",
    },
    {
      type: "activity",
      content: "Say each word slowly and listen for the matching sound.",
      visualAnchor: "listen",
    },
  ],

  examples: [
    {
      letter: "oi",
      word: "coin",
      emoji: "🪙",
      sentence: "C-oi-n has the OI sound in the middle.",
      color: "#0284C7",
    },
    {
      letter: "oy",
      word: "toy",
      emoji: "🧸",
      sentence: "T-oy has the OY sound at the end.",
      color: "#7C3AED",
    },
    {
      letter: "ou",
      word: "cloud",
      emoji: "☁️",
      sentence: "Cl-ou-d has the OU sound in the middle.",
      color: "#059669",
    },
    {
      letter: "ow",
      word: "cow",
      emoji: "🐄",
      sentence: "C-ow has the OW sound at the end.",
      color: "#DC2626",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🪙 Which word has the OI sound?",
      options: ["coin", "cat"],
      answer: "coin",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🧸 Which word has the OY sound?",
      options: ["toy", "top"],
      answer: "toy",
    },
    {
      interactionType: "drag-and-drop",
      question: "☁️ Which word has the OU sound?",
      options: ["cloud", "clap"],
      answer: "cloud",
    },
    {
      interactionType: "drag-and-drop",
      question: "🐄 Which word has the OW sound?",
      options: ["cow", "car"],
      answer: "cow",
    },
    {
      question:
        "We usually spell this sound 'oy' when it's at the ___ of a word.",
      options: ["end", "middle"],
      answer: "end",
    },
    {
      question:
        "We usually spell this sound 'oi' when it's in the ___ of a word.",
      options: ["middle", "end"],
      answer: "middle",
    },
  ],

  challengeRound: [
    { scrambled: "cnoi", answer: "coin", hint: "🪙" },
    { scrambled: "oty", answer: "toy", hint: "🧸" },
    { scrambled: "wco", answer: "cow", hint: "🐄" },
  ],

  motivationalTips: [
    "🌟 Same sound, different spelling — you're spotting the pattern.",
    "🌟 Listening carefully is a superpower for reading.",
    "🌟 You're building real reader instincts.",
  ],

  completionMessage:
    "🎉 Fantastic! You can now match vowel team sounds to their spelling pattern!",
};

export default lesson;
