const lesson = {
  id: "letter_reversal",
  title: "b, d, p, and q — The Four Twins",
  subtitle:
    "You've mastered b and d — now let's add p and q to the mix, gently!",
  color: "#DBEAFE",
  mascot: "🐼",
  explanation: [
    {
      type: "text",
      content:
        "You already know b and d. Now two more letters join the family: p and q. They love to flip and turn, just like b and d.",
      animationType: "fade-in-gentle",
      visualAnchor: "b d & p q",
      mascotTip: "You already beat b and d — p and q don't stand a chance! 💪",
    },
    {
      type: "story",
      content:
        "b, d, p, and q are all made from the same two shapes: a circle and a stick. Only the direction changes.",
      animationType: "mirror-flip",
      visualAnchor: "b d p q",
      mascotTip:
        "Same shapes, different directions — that's the whole secret! 🔄",
    },
    {
      type: "tip",
      content: "p: stick down-left, belly on the right → p",
      animationType: "stroke-by-stroke",
      visualAnchor: "p",
      mascotTip: "p is like b, but its stick points DOWN instead of up! ⬇️",
    },
    {
      type: "tip",
      content: "p: The mirror twin of q",
      animationType: "mirror-flip",
      visualAnchor: "p",
      mascotTip: "p is like b, but its stick points DOWN instead of up! ⬇️",
    },
    {
      type: "tip",
      content: "q: belly on the left, stick down-right → q",
      animationType: "stroke-by-stroke",
      visualAnchor: "q",
      mascotTip: "q is like d, but its stick points DOWN instead of up! ⬇️",
    },
    {
      type: "tip",
      content: "q: The mirror twin of p",
      animationType: "mirror-flip",
      visualAnchor: "q",
      mascotTip: "p is like b, but its stick points DOWN instead of up! ⬇️",
    },
    {
      type: "story",
      content:
        "Think of a clock: b and d are the 'up' twins, p and q are the 'down' twins.",
      animationType: "morph-asset",
      visualAnchor: "b d  p q ",
      mascotTip: "Up twins, down twins — easy to remember! 🕐",
    },
    {
      type: "activity",
      content: "Say the sounds aloud: /b/ /d/ /p/ /q/",
      animationType: "pulse-on-audio",
      visualAnchor: "b d p q",
      mascotTip: "Tap the mic and say each sound with me! 🎤",
    },
  ],
  examples: [
    {
      letter: "b",
      word: "boat",
      emoji: "⛵",
      sentence: "The b-oat floats on the water.",
      color: "#2563EB",
    },
    {
      letter: "d",
      word: "duck",
      emoji: "🦆",
      sentence: "The d-uck swims in the pond.",
      color: "#F59E0B",
    },
    {
      letter: "p",
      word: "pig",
      emoji: "🐷",
      sentence: "The p-ig oinks loudly.",
      color: "#EC4899",
    },
    {
      letter: "q",
      word: "queen",
      emoji: "👑",
      sentence: "The q-ueen wears a crown.",
      color: "#8B5CF6",
    },
  ],
  guidedPractice: [
    {
      question: "🎯 Which letter is p?",
      options: ["p", "q"],
      answer: "p",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🦆 Drag the word that starts with d",
      options: ["duck", "pig"],
      answer: "duck",
      interactionType: "drag-and-drop",
    },
    {
      question: "👑 Which word starts with q?",
      options: ["queen", "boat"],
      answer: "queen",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🐷 Drag the letter p into the box",
      options: ["p", "q"],
      answer: "p",
      interactionType: "drag-and-drop",
    },
    {
      question: "which letter looks like a mirror of b?",
      options: ["d", "p"],
      answer: "d",
      interactionType: "tap-to-reveal",
    },
    {
      question: "Drag the letter that matches: '_ is d's down twin'",
      options: ["q", "b"],
      answer: "q",
      interactionType: "drag-and-drop",
    },
  ],
  motivationalTips: [
    "🌟 Four letters, one shape — you're spotting the pattern now.",
    "🌟 Every mix-up is your brain double-checking. That's smart, not slow.",
    "🌟 You've already beaten b and d. p and q are just their cousins.",
  ],
  completionMessage: "Incredible! You just leveled up from 3! ",
};

export default lesson;
