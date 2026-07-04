const lesson = {
  id: "decoding",
  title: "Decoding Words",
  subtitle: "Let's sound out letters slowly and blend them into words! 🔊",
  color: "#FDE68A",
  mascot: "assets/mimo1.png",
  progressColor: "#F59E0B",

  introduction: {
    mascotMessage:
      "Hey there! I'm Mimo. Today we are becoming Sound Blenders! We will look at letters one by one, stretch their sounds, and smash them together into real words. Let's go! 🦊",
  },

  explanation: [
    {
      type: "info",
      content:
        "Decoding means reading a word smoothly by sounding out each letter block from left to right! ➡️",
      animationType: "pulse-on-audio",
      visualAnchor: "🔤 DECODE",
    },
    {
      type: "tip",
      content:
        "We say each standalone sound slowly first, then slide them together fast to form the word!",
      animationType: "morph-asset",
      visualAnchor: "c...a...t ➔ CAT",
    },
    {
      type: "tip",
      content:
        "Bouncing your sounds together helps you catch the word instantly without getting stuck! ⚡",
      animationType: "morph-asset",
      visualAnchor: "d-o-g 🐶",
    },
  ],

  examples: [
    {
      emoji: "🐱",
      letter: "cat",
      word: "cat",
      sentence:
        "Say each piece: /k/... /æ/... /t/. Now slide them together fast... CAT!",
      color: "#EF4444",
    },
    {
      emoji: "🐶",
      letter: "dog",
      word: "dog",
      sentence:
        "Say each piece: /d/... /ɒ/... /g/. Bounce the sounds together... DOG!",
      color: "#3B82F6",
    },
    {
      emoji: "☀️",
      letter: "sun",
      word: "sun",
      sentence:
        "Bright thinking! /s/~/u/~/n/ blends seamlessly together to make SUN!",
      color: "#F59E0B",
    },
    {
      emoji: "🧢",
      letter: "cap",
      word: "cap",
      sentence:
        "Keep the vowel short, then catch the crisp ending sound... CAP!",
      color: "#10B981",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🐶 Blend these individual sounds together smoothly: d-o-g",
      options: ["dig", "dog", "dug"],
      answer: "dog",
      successMessage: "Awesome reading! /d/~/o/~/g/ makes DOG! 🐶",
    },
    {
      interactionType: "tap-to-reveal",
      question:
        "🧢 Which layout of isolated sounds correctly builds the word 'cap'?",
      options: ["c-a-p", "ca-p", "c-p-a"],
      answer: "c-a-p",
      successMessage:
        "Incredible! You caught every sound piece perfectly for CAP! 🧢",
    },
    {
      interactionType: "drag-and-drop",
      question:
        "☀️ What hidden target word do these sounds make when smashed together: s-u-n?",
      options: ["sun", "son", "sin", "sit"],
      answer: "sun",
      successMessage: "Boom! You are glowing! s-u-n makes SUN! ☀️",
    },
    {
      interactionType: "drag-and-drop",
      question:
        "🐱 Look at the image puzzle! Which sound blend saves the missing pieces of c-__-__?",
      options: ["a-t", "o-g", "u-n", "i-t"],
      answer: "a-t",
      successMessage:
        "Perfect tracing! You blended c-a-t to complete the CAT! 🐱",
    },
  ],

  rewards: {
    stars: 5,
    badge: "🧩 Master Sound Blender",
    message:
      "Sensational decoding! You unlocked the official Master Sound Blender badge! 🎖️",
  },

  completionMessage:
    "🎉 Spectacular job, Sound Blender! You can now confidently see, hear, and decode blended words perfectly! Mimo is cheering for you! 🏆🎉",
};

export default lesson;
