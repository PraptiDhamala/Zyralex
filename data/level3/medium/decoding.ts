const level3Decoding = {
  id: "decoding_level3",
  title: "Sound Team Blends",
  subtitle: "Meet the letter teammates that team up to make new sounds! 🤝🔤",
  color: "#DDD6FE",
  mascot: "assets/mimo1.png",
  progressColor: "#7C3AED",

  introduction: {
    mascotMessage:
      "You're a real Sound Blender now! 🕵️‍♂️ This time we're hunting for sneaky sound teams — like sh, ch, tr, and dr — where two letters team up to make one brand-new sound!",
  },

  explanation: [
    {
      type: "info",
      content:
        "Some letter pairs stand side by side and team up to make ONE new sound.",
      animationType: "morph-asset",
      visualAnchor: "s + h ➔ sh",
    },
    {
      type: "tip",
      content: "sh locks together into a soft, quiet whisper: shhh! 🤫",
      animationType: "pulse-on-audio",
      visualAnchor: "sh 🦈",
    },
    {
      type: "tip",
      content: "tr and dr blend two sounds fast, right at the start of a word.",
      animationType: "morph-asset",
      visualAnchor: "t + r ➔ tr",
    },
  ],

  examples: [
    {
      emoji: "🦈",
      letter: "sh",
      word: "shark",
      sentence: "The SH-ark swims fast through the deep blue sea.",
      color: "#2563EB",
    },
    {
      emoji: "🙂",
      letter: "ch",
      word: "chin",
      sentence: "Your CH-in sits right below your mouth.",
      color: "#DC2626",
    },
    {
      emoji: "🚂",
      letter: "tr",
      word: "train",
      sentence: "The TR-ain runs quickly along the shiny tracks.",
      color: "#16A34A",
    },
    {
      emoji: "🥁",
      letter: "dr",
      word: "drum",
      sentence: "Bang the DR-um and hear it go boom, boom!",
      color: "#7C3AED",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🦈 Which sound team starts the word 'shark'?",
      options: ["sh", "ch", "dr"],
      answer: "sh",
      successMessage: "Splendid tracking! SH-ark starts with 'sh'! 🌊",
    },
    {
      interactionType: "tap-to-reveal",
      question: "🙂 Which word starts with the 'ch' sound team?",
      options: ["chin", "train", "drum"],
      answer: "chin",
      successMessage: "Awesome reading! CH-in is exactly right! 🙂",
    },
    {
      interactionType: "drag-and-drop",
      question: "🚂 Which sound team hides inside the word 'train'?",
      options: ["tr", "sh", "ch"],
      answer: "tr",
      successMessage: "Boom! TR-ain combines T and R perfectly! 🚂",
    },
    {
      interactionType: "drag-and-drop",
      question: "🥁 Which word starts with the 'dr' sound team?",
      options: ["drum", "chin", "shark"],
      answer: "drum",
      successMessage: "Fantastic! DR-um has that clear starting blend! 🥁",
    },
  ],

  rewards: {
    stars: 6,
    badge: "🎧 Sound Team Champion",
    message:
      "Incredible decoding! You unlocked the Sound Team Champion badge! 🎖️",
  },

  completionMessage:
    "🏆 Awesome! You conquered Sound Team Blends and mastered tricky letter teammates! Mimo is cheering wildly for you! 🎉",
};

export default level3Decoding;
