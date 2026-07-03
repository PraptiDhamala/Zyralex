const lesson = {
  id: "vowel_processing",
  title: "Vowel Teams & Pairs",
  subtitle: "Let's learn how vowels work together like teammates! 🎵",
  color: "#E0F2FE",
  mascot: "🐬",
  explanation: [
    {
      type: "text",
      content:
        "Sometimes two vowels stand side-by-side and work together as a team.",
    },
    {
      type: "story",
      content:
        "A fun trick is: 'When two vowels go walking, the first one does the talking!' 🚶",
      animationType: "pulse-on-audio",
      visualAnchor: "oa",
    },
    {
      type: "tip",
      content: "The vowel pair 'oa' says the long O sound like in b-OA-t ⛵",
      animationType: "stroke-by-stroke",
      visualAnchor: "oa",
    },
    {
      type: "tip",
      content: "The vowel pair 'ee' says the long E sound like in tr-EE 🌳",
      animationType: "mirror-flip",
      visualAnchor: "ee",
    },
    {
      type: "activity",
      content: "Stretch the vowel sounds slowly while reading aloud 🔊",
      visualAnchor: "ea",
    },
  ],
  examples: [
    {
      letter: "oa",
      word: "boat",
      emoji: "⛵",
      sentence: "B-OA-t has the OA sound.",
      color: "#0284C7",
    },
    {
      letter: "ee",
      word: "feet",
      emoji: "👣",
      sentence: "F-EE-t has the EE sound.",
      color: "#7C3AED",
    },
    {
      letter: "ea",
      word: "read",
      emoji: "📘",
      sentence: "R-EA-d uses the EA vowel team.",
      color: "#059669",
    },
  ],
  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🧥 Select the missing vowel team: C___at",
      options: ["oa", "ou"],
      answer: "oa",
    },
    {
      interactionType: "drag-and-drop",
      question: "📘 Which vowel team completes R___ad?",
      options: ["ea", "ai"],
      answer: "ea",
    },
    {
      interactionType: "tap-to-reveal",
      question: "👣 Which vowel team makes the long E sound?",
      options: ["ee", "oa"],
      answer: "ee",
    },
  ],
  completionMessage:
    "Fantastic work! 🎉 You are learning how vowel teams work together!",
};

export default lesson;
