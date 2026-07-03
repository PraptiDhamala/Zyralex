const level2Decoding = {
  id: "decoding_level2",
  title: "Blending Simple Words",
  subtitle: "Sound out letters slowly, then blend them into real words! 🔊",
  color: "#FDE68A",
  mascot: "assets/mimo1.png",
  progressColor: "#F59E0B",

  introduction: {
    mascotMessage:
      "You cracked the b and d mystery — nice! 🕵️‍♂️ Now let's become Sound Blenders. We'll say each letter's sound one at a time, then push them together into a real word!",
  },

  explanation: [
    {
      type: "info",
      content:
        "Decoding means saying each letter's sound, then sliding them together into one word.",
      animationType: "pulse-on-audio",
      visualAnchor: "c-a-t ➔ cat",
    },
    {
      type: "tip",
      content:
        "Always start on the left and move slowly to the right from a to c",
      animationType: "left-to-right-reading",
      visualAnchor: "abc",
    },
    {
      type: "tip",
      content:
        "Stretch each sound like a rubber band before you let them snap together!",
      animationType: "morph-asset",
      visualAnchor: "s-u-n",
    },
  ],

  examples: [
    {
      emoji: "🐱",
      letter: "c",
      word: "cat",
      sentence: "C-A-T blends together to make CAT, a fluffy little pet.",
      color: "#EF4444",
    },
    {
      emoji: "🐶",
      letter: "d",
      word: "dog",
      sentence: "D-O-G blends together to make DOG, a loyal furry friend.",
      color: "#2563EB",
    },
    {
      emoji: "☀️",
      letter: "s",
      word: "sun",
      sentence: "S-U-N blends together to make SUN, shining bright above.",
      color: "#F59E0B",
    },
    {
      emoji: "🧢",
      letter: "c",
      word: "cap",
      sentence: "C-A-P blends together to make CAP, worn on your head.",
      color: "#16A34A",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🐶 Blend these sounds: d-o-g",
      options: ["dig", "dog", "dug"],
      answer: "dog",
      successMessage: "You blended it perfectly! DOG! 🐶",
    },
    {
      interactionType: "drag-and-drop",
      question: "☀️ What word do these sounds make: s-u-n?",
      options: ["sun", "son", "sin"],
      answer: "sun",
      successMessage: "Bright thinking! s-u-n makes SUN! ☀️",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🐱 Which sounds make the word 'cat'?",
      options: ["c-a-t", "ca-t", "c-t-a"],
      answer: "c-a-t",
      successMessage: "You found it! c-a-t blends into CAT! 🐱",
    },
    {
      interactionType: "drag-and-drop",
      question: "🧢 Blend these sounds: c-a-p",
      options: ["cap", "cop", "cup"],
      answer: "cap",
      successMessage: "Nailed it! c-a-p makes CAP! 🧢",
    },
  ],

  rewards: {
    stars: 5,
    badge: "🧩 Sound Blender",
    message:
      "Sensational blending! You earned the official Sound Blender badge!",
  },

  completionMessage:
    "🎉 Great job, Sound Blender! You can now sound out and blend simple words all on your own. Keep shining! 🚀",
};

export default level2Decoding;
