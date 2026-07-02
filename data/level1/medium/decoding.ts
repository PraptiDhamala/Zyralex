const lesson = {
  id: "decoding",
  title: "Decoding Words",
  subtitle: "Let's sound out letters slowly and blend them into words! 🔊",
  color: "#FDE68A",
  mascot: "🦊",
  explanation: [
    {
      type: "text",
      content: "Decoding means reading a word by sounding out each letter.",
    },
    {
      type: "text",
      content: "We say each sound slowly, then blend the sounds together.",
      animationType: "pulse-on-audio",
      visualAnchor: "c-a-t",
    },
    {
      type: "story",
      content: "c-a-t becomes CAT 🐱 when we blend the sounds together.",
      animationType: "stroke-by-stroke",
      visualAnchor: "cat",
    },
    {
      type: "tip",
      content: "Start from the left and move slowly to the right ➡️",
      animationType: "mirror-flip",
      visualAnchor: "abc",
    },
    {
      type: "activity",
      content: "Tap each sound with your finger while reading ✍️",
      visualAnchor: "tap",
    },
  ],
  examples: [
    {
      letter: "c",
      word: "cat",
      emoji: "🐱",
      sentence: "C-A-T blends to make CAT.",
      color: "#EF4444",
    },
    {
      letter: "d",
      word: "dog",
      emoji: "🐶",
      sentence: "D-O-G blends to make DOG.",
      color: "#3B82F6",
    },
    {
      letter: "s",
      word: "sun",
      emoji: "☀️",
      sentence: "S-U-N blends to make SUN.",
      color: "#F59E0B",
    },
  ],
  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🐶 Blend these sounds: d-o-g",
      options: ["dig", "dog", "dug"],
      answer: "dog",
    },
    {
      interactionType: "drag-and-drop",
      question: "☀️ What word do these sounds make: s-u-n?",
      options: ["sun", "son", "sin"],
      answer: "sun",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🧢 Which sounds make the word 'cap'?",
      options: ["c-a-p", "ca-p", "c-p-a"],
      answer: "c-a-p",
    },
  ],
  completionMessage:
    "Awesome work! 🎉 You practiced sounding out and blending words!",
};

export default lesson;
