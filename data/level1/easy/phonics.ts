const lesson = {
  id: "phonics",

  title: "Phonics Adventure",

  subtitle:
    "Become a Sound Detective! Listen, look, speak and play with sounds! 🔍🎵",

  color: "#FEF3C7",

  mascot: "assests/mimo1.png",

  progressColor: "#F59E0B",

  introduction: {
    mascotMessage:
      "Hi! I'm Mimo 🐼. Today we're meeting two special sounds: CH and SH. Let's become Sound Detectives!",
  },
  seeIt: {
    title: "👀 Look Carefully",

    instruction: "Watch the sounds. Notice how CH is strong and SH is quiet.",

    cards: [
      {
        sound: "CH",
        emoji: "🚂",
        word: "Chair",
        description: "CH sounds like a train going CHOO CHOO!",
      },

      {
        sound: "SH",
        emoji: "🤫",
        word: "Ship",
        description: "SH sounds like whispering... SHHH!",
      },
    ],
  },
  hearIt: {
    title: "👂 Listen",

    instruction: "Listen to Mimo. Tap the sound you hear.",

    rounds: [
      {
        audio: "ch",
        answer: "CH",
        options: ["CH", "SH"],
      },

      {
        audio: "sh",
        answer: "SH",
        options: ["CH", "SH"],
      },
    ],
  },

  /*
  ====================================================
  🗣 SAY IT
  ====================================================
  */

  sayIt: {
    title: "🗣 Say the Sound",

    instruction: "Say each sound out loud with Mimo.",

    rounds: [
      {
        expected: "CH",
        hint: "Open your mouth and say CH CH CH!",
      },

      {
        expected: "SH",
        hint: "Place your finger near your lips and whisper SHHH.",
      },
    ],
  },

  /*
  ====================================================
  ✍ TRACE
  ====================================================
  */

  traceIt: {
    title: "✍ Trace",

    instruction: "Trace each sound with your finger.",

    items: [
      {
        text: "CH",
      },

      {
        text: "SH",
      },
    ],
  },

  /*
  ====================================================
  🤏 BUILD IT
  ====================================================
  */

  buildIt: {
    title: "🤏 Build the Word",

    instruction: "Drag the correct sound to complete each word.",

    rounds: [
      {
        image: "🪑",
        word: "__air",
        answer: "CH",
        options: ["CH", "SH"],
      },

      {
        image: "🐑",
        word: "__eep",
        answer: "SH",
        options: ["CH", "SH"],
      },

      {
        image: "🧀",
        word: "__eese",
        answer: "CH",
        options: ["CH", "SH"],
      },
    ],
  },

  playTime: {
    type: "sorting",

    title: "🎮 Help Mimo Sort the Words",

    instruction: "Drag every word into the correct bucket.",

    categories: ["CH", "SH"],

    words: [
      {
        word: "chair",
        answer: "CH",
      },

      {
        word: "cheese",
        answer: "CH",
      },

      {
        word: "chicken",
        answer: "CH",
      },

      {
        word: "ship",
        answer: "SH",
      },

      {
        word: "shoe",
        answer: "SH",
      },

      {
        word: "sheep",
        answer: "SH",
      },
    ],
  },

  /*
  ====================================================
  Keep these until the new lesson engine is finished
  ====================================================
  */

  explanation: [
    {
      type: "story",
      content: "CH is a loud train sound. SH is a quiet whisper.",
      animationType: "pulse-on-audio",
      visualAnchor: "CH 🚂",
    },

    {
      type: "story",
      content: "Can you hear the difference between CH and SH?",
      animationType: "mirror-flip",
      visualAnchor: "SH 🤫",
    },
  ],

  examples: [
    {
      letter: "CH",
      word: "chair",
      emoji: "🪑",
      sentence: "Chair begins with CH.",
      color: "#EF4444",
    },

    {
      letter: "CH",
      word: "cheese",
      emoji: "🧀",
      sentence: "Cheese begins with CH.",
      color: "#EF4444",
    },

    {
      letter: "SH",
      word: "ship",
      emoji: "🚢",
      sentence: "Ship begins with SH.",
      color: "#3B82F6",
    },

    {
      letter: "SH",
      word: "shoe",
      emoji: "👟",
      sentence: "Shoe begins with SH.",
      color: "#3B82F6",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: "🚂 Which sound starts CHAIR?",
      options: ["CH", "SH"],
      answer: "CH",
    },

    {
      interactionType: "drag-and-drop",
      question: "🤫 Which sound starts SHIP?",
      options: ["CH", "SH"],
      answer: "SH",
    },

    {
      interactionType: "tap-to-reveal",
      question: "🧀 Which word starts with CH?",
      options: ["Cheese", "Ship"],
      answer: "Cheese",
    },
  ],

  rewards: {
    stars: 3,

    badge: "🎵 Sound Detective",

    message: "Fantastic! You earned the Sound Detective badge!",
  },

  completionMessage:
    "🎉 Amazing work! You can now hear, say, read and recognise CH and SH sounds!",
};

export default lesson;
