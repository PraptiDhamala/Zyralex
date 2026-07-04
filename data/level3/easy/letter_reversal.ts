const lesson = {
  id: "letter_reversal",
  title: "Word Swap Trouble",
  subtitle:
    "You've mastered tricky letters — now let's catch words that swap places!",
  color: "#DBEAFE",
  mascot: "🐼",
  explanation: [
    {
      type: "text",
      content:
        "You're great at telling b and d apart now. But sometimes whole letters inside a word swap places, and the word turns into a different word!",
      animationType: "fade-in-gentle",
      visualAnchor: "was ↔ saw",
      mascotTip: "New mission: catching words that flip their letters! 🕵️",
    },
    {
      type: "story",
      content:
        "'was' and 'saw' use the exact same letters — w, a, s — just in a different order. Same letters, different word!",
      animationType: "mirror-flip",
      visualAnchor: "WAS SAW",
      mascotTip: "Same puzzle pieces, different picture! ",
    },
    {
      type: "tip",
      content: "was = w first, then a, then s. Think: 'I WAS here.'",
      animationType: "stroke-by-stroke",
      visualAnchor: "was",
      mascotTip: "WAS starts with W — like 'Where' something happened! 📍",
    },
    {
      type: "tip",
      content: "saw = s first, then a, then w. Think: 'I SAW a bird.'",
      animationType: "stroke-by-stroke",
      visualAnchor: "saw",
      mascotTip: "SAW starts with S — like your Sight! 👀",
    },
    {
      type: "story",
      content:
        "'on' and 'no' do the same trick. Read the letters left to right, one at a time, to catch which one you're looking at.",
      animationType: "morph-asset",
      visualAnchor: "on ↔ no",
      mascotTip: "Slow down and read left to right — that's the secret! ➡️",
    },
    {
      type: "tip",
      content: "on = o first, then n. A light switch is ON.",
      animationType: "stroke-by-stroke",
      visualAnchor: "on",
    },
    {
      type: "tip",
      content: "no = n first, then o. Shaking your head means NO.",
      animationType: "stroke-by-stroke",
      visualAnchor: "no",
    },
    {
      type: "story",
      content:
        "Even bigger words can swap: 'form' and 'from' use the same letters too! Reading slowly, letter by letter, always wins.",
      animationType: "fade-in-gentle",
      visualAnchor: "form ↔ from",
      mascotTip: "Bigger word, same trick — go slow and check each letter! 🐢",
    },
    {
      type: "activity",
      content: "Say each pair out loud: was, saw... on, no... form, from!",
      animationType: "pulse-on-audio",
      visualAnchor: "was saw on no form from",
      mascotTip: "Tap the mic and say each swap-pair with me! 🎤",
    },
  ],
  examples: [
    {
      letter: "was",
      word: "was",
      emoji: "📍",
      sentence: "I WAS at the park yesterday.",
      color: "#2563EB",
    },
    {
      letter: "saw",
      word: "saw",
      emoji: "👀",
      sentence: "I SAW a butterfly in the garden.",
      color: "#F59E0B",
    },
    {
      letter: "on",
      word: "on",
      emoji: "💡",
      sentence: "Turn the light ON, please.",
      color: "#EC4899",
    },
    {
      letter: "no",
      word: "no",
      emoji: "🙅",
      sentence: "She shook her head and said NO.",
      color: "#8B5CF6",
    },
    {
      letter: "form",
      word: "form",
      emoji: "📝",
      sentence: "Please fill out this FORM.",
      color: "#10B981",
    },
    {
      letter: "from",
      word: "from",
      emoji: "✉️",
      sentence: "This letter is FROM my grandma.",
      color: "#EF4444",
    },
  ],
  guidedPractice: [
    {
      question: "📍 Which word means 'something that happened before'?",
      options: ["was", "saw"],
      answer: "was",
      interactionType: "tap-to-reveal",
    },
    {
      question: "👀 Drag the word that matches: 'I ___ a bird fly by.'",
      options: ["saw", "was"],
      answer: "saw",
      interactionType: "drag-and-drop",
    },
    {
      question: "💡 Which word means the opposite of OFF?",
      options: ["on", "no"],
      answer: "on",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🙅 Drag the word that means 'not yes'",
      options: ["no", "on"],
      answer: "no",
      interactionType: "drag-and-drop",
    },
    {
      question: "📝 Which word do you fill out at the doctor's office?",
      options: ["form", "from"],
      answer: "form",
      interactionType: "tap-to-reveal",
    },
    {
      question: "✉️ Drag the word that matches: 'A letter ___ grandma.'",
      options: ["from", "form"],
      answer: "from",
      interactionType: "drag-and-drop",
    },
    {
      question: "🔍 'was' and 'saw' use the exact same what?",
      options: ["letters", "colors"],
      answer: "letters",
      interactionType: "tap-to-reveal",
    },
  ],
  motivationalTips: [
    "🌟 Reading slowly, letter by letter, catches every swap.",
    "🌟 Mixing up word order means you're really looking closely — that's a good habit.",
    "🌟 You've beaten mirror letters. Swapped words are just the next puzzle.",
  ],
  completionMessage:
    "Amazing detective work! You can now catch words that swap their letters! 🕵️🚀",
};

export default lesson;
