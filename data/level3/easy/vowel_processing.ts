const lesson = {
  id: "vowel_processing",
  title: "Advanced Vowel Anchoring",
  subtitle:
    "Mastering complex multi-syllable vowel shifting for rapid reading. ⚡",
  color: "#F3E8FF", // Soft premium purple theme for advanced level
  mascot: "🦉",
  explanation: [
    {
      type: "text",
      content:
        "In larger words, vowels change their behavior based on the letters surrounding them.",
      animationType: "fade-in-gentle",
      visualAnchor: "com-pu-ter",
    },
    {
      type: "story",
      content:
        "By anchoring your eyes directly to the vowels in each syllable chunk, you can decode complex multi-syllable words instantly.",
      animationType: "follow-the-dot",
      visualAnchor: "vol-ca-no",
    },
    {
      type: "tip",
      content:
        "Watch out for diphthongs like 'ou' and 'oy' where two vowels blend smoothly together into a shifting sound.",
      animationType: "pulse-on-audio",
      visualAnchor: "s o u n d",
    },
    {
      type: "activity",
      content:
        "Say these shifting diphthong sounds aloud: /ou/ as in ground, and /oy/ as in destroy!",
      animationType: "pulse-on-audio",
      visualAnchor: "ou oy",
    },
  ],
  examples: [
    {
      letter: "ou",
      word: "mountain",
      emoji: "🏔️",
      sentence: "We climbed up the steep m-ou-n-t-ai-n path.",
      color: "#8B5CF6",
    },
    {
      letter: "oy",
      word: "destroy",
      emoji: "💥",
      sentence: "Do not destr-oy the fragile display.",
      color: "#8B5CF6",
    },
  ],
  guidedPractice: [
    {
      question:
        "🧠 Syllable Check: Which vowel sounds anchor the word 'explode'?",
      options: ["short e + long o", "short e + short o"],
      answer: "short e + long o",
      interactionType: "tap-to-reveal",
    },
    {
      question: "⏰ Drag the word that contains a shifting diphthong sound:",
      options: ["ground", "grown"],
      answer: "ground",
      interactionType: "drag-and-drop",
    },
    {
      question: "⚡ Identify the anchoring vowels in the word 'shouting':",
      options: ["ou + i", "o + u + i"],
      answer: "ou + i",
      interactionType: "tap-to-reveal",
    },
  ],
  motivationalTips: [
    "🌟 Advanced decoding is all about spotting patterns. Trust your training!",
    "🌟 Splitting words at vowel boundaries keeps complex passages effortless.",
    "🌟 You are training your brain to scan like a high-speed text processor.",
  ],
  completionMessage:
    "Absolute Mastery! Your advanced visual tracking is top tier. 🚀",
};

export default lesson;
