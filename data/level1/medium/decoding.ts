const level1Decoding = {
  id: "decoding_level1",
  title: "Learning b and d",
  subtitle: "Discover how twin letters face different directions! 🪞",
  color: "#DBEAFE",
  mascot: "assets/mimo1.png",
  progressColor: "#2563EB",

  introduction: {
    mascotMessage:
      "Hey Sound Detective! 🕵️‍♂️ Mimo's here. Today we're solving the mystery of b and d — two letters that look like twins but point in different directions. Let's crack the case!",
  },

  explanation: [
    {
      type: "info",
      content:
        "b and d are mirror twins — the exact same shape, just flipped like a reflection! 🪞",
      animationType: "mirror-flip",
      visualAnchor: "b ↔ d",
    },
    {
      type: "tip",
      content:
        "b starts with a tall straight stick, then a round belly puffs out on the right → b",
      animationType: "stroke-by-stroke",
      visualAnchor: "b",
    },
    {
      type: "tip",
      content:
        "d starts with a round donut, then a tall stick stands up on the right → d",
      animationType: "stroke-by-stroke",
      visualAnchor: "d",
    },
    {
      type: "tip",
      content:
        "Picture a bat 🏏 then a ball ⚽ for b. Picture a donut 🍩 then a stick for d.",
      animationType: "morph-asset",
      visualAnchor: "b 🏏⚽ · d 🍩",
    },
  ],

  examples: [
    {
      emoji: "🚌",
      letter: "b",
      word: "bus",
      sentence: "The B-us stops right outside to pick us up.",
      color: "#2563EB",
    },
    {
      emoji: "🔔",
      letter: "b",
      word: "bell",
      sentence: "Ring the B-ell so everyone knows it's time.",
      color: "#2563EB",
    },
    {
      emoji: "🐶",
      letter: "d",
      word: "dog",
      sentence: "The D-og wags its tail and barks with joy.",
      color: "#F59E0B",
    },
    {
      emoji: "🚪",
      letter: "d",
      word: "door",
      sentence: "Open the D-oor slowly and walk on through.",
      color: "#F59E0B",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🎯 Which letter has the stick first, then the belly?",
      options: ["b", "d"],
      answer: "b",
      successMessage: "Sharp eyes! b starts with the stick! 🏏",
    },
    {
      interactionType: "drag-and-drop",
      question: "🐶 Drag the letter that starts the word 'dog'",
      options: ["b", "d"],
      answer: "d",
      successMessage: "Case closed! D-og starts with 'd'! 🐶",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🚌 Which word starts with 'b'?",
      options: ["bus", "door"],
      answer: "bus",
      successMessage: "You spotted it! B-us starts with 'b'! 🚌",
    },
    {
      interactionType: "drag-and-drop",
      question: "🔔 Drag the matching letter into the box: __ell",
      options: ["b", "d"],
      answer: "b",
      successMessage: "Perfect match! B-ell is correct! 🔔",
    },
  ],

  rewards: {
    stars: 5,
    badge: "🪞 Mirror Master",
    message: "Mystery solved! You earned the official Mirror Master badge!",
  },

  completionMessage:
    "🎉 Amazing detective work! You can now tell b and d apart with confidence. Mimo is doing a happy dance! 🕺",
};

export default level1Decoding;
