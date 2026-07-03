const lesson = {
  id: "dyslexia-friendly-decoding",
  title: "The Sound Blender! 🥤",
  subtitle: "Smash letter-blocks together to make real words!",
  color: "#FFDE4D", // High-contrast, dyslexia-friendly warm yellow (reduces visual stress)
  mascot: "👾", // Gloop: A friendly slime monster who eats sounds and burps words

  // Design Note: Use OpenDyslexic font and heavy letter-spacing in the UI!
  explanation: [
    {
      type: "tactile-instruction",
      content:
        "Letters are just frozen sounds. When we warm them up, they melt together!",
    },
    {
      type: "interactive-action",
      content:
        "Tap each bouncing block to hear its trapped sound. Tap them left-to-right!",
      animationType: "bounce-on-press",
      visualAnchor: "b-a-t",
    },
    {
      type: "visual-aid",
      content: "See how the colors stretch? /b/---/æ/---/t/ snaps into BAT! 🦇",
      animationType: "color-morph-and-snap", // Letters physically slide and lock together like LEGOs
      visualAnchor: "bat-animated",
    },
  ],

  // Keep words short (CVC - Consonant Vowel Consonant) but use high-interest themes
  examples: [
    {
      letter: "b",
      word: "bat",
      emoji: "🦇",
      // Color-coding phonemes (e.g., Consonants = Blue, Vowels = Red) helps tracking
      colorCoding: { onset: "#3B82F6", vowel: "#EF4444", coda: "#3B82F6" },
      audioTarget: "/audio/b-a-t-blend.mp3",
      funFact: "Gloop's favorite pet is a bat!",
    },
    {
      letter: "f",
      word: "fox",
      emoji: "🦊",
      colorCoding: { onset: "#3B82F6", vowel: "#EF4444", coda: "#3B82F6" },
      audioTarget: "/audio/f-o-x-blend.mp3",
      funFact: "Foxes make funny laughing sounds!",
    },
    {
      letter: "j",
      word: "jam",
      emoji: "🍓",
      colorCoding: { onset: "#3B82F6", vowel: "#EF4444", coda: "#3B82F6" },
      audioTarget: "/audio/j-a-m-blend.mp3",
      funFact: "Don't feed jam to the slime monster!",
    },
  ],

  guidedPractice: [
    {
      interactionType: "sound-smasher", // User physically drags two blocks into each other
      question:
        "🔨 SMASH THE BLOCKS! Drag the 'p' block into the 'i' and 'g' blocks. What did you build?",
      visuals: {
        block1: { text: "p", color: "#3B82F6" },
        block2: { text: "i", color: "#EF4444" },
        block3: { text: "g", color: "#3B82F6" },
      },
      options: ["pig", "peg", "pug"], // Visual options with pictures alongside text
      images: ["🐷", "🪵", "🐶"],
      answer: "pig",
    },
    {
      interactionType: "slingshot-blend", // Pull back a letter and launch it into a word base
      question:
        "🏹 Launch the vowel! Slingshot the 'o' block right into the middle of H __ n to wake up the word!",
      options: ["u", "o", "a"], // h-u-n vs h-o-n vs h-a-n
      answer: "o", // makes "hon" (short for honey/honk context provided by audio)
      audioCue: "/audio/sound-of-o.mp3",
    },
    {
      interactionType: "pop-the-imposter", // Dyslexic learners often flip b/d/p/q. This gamifies it.
      question:
        "🎈 Pop the imposter! Gloop wants to make the word DOG 🐶. One letter is backwards! Pop the wrong one:",
      displayLayout: ["b", "o", "g"], // Visually displays 'bog' where 'd' was intended
      interactiveAction: "tap-to-flip-letter",
      answer: "b", // Tapping 'b' flips it visually into a 'd' to correct the word!
    },
  ],

  completionMessage:
    "YUM! 👾 Gloop ate all the words and is completely full! You leveled up to Sound Master! 👑",
};

export default lesson;
