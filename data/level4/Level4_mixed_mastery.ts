// export interface ExplanationStep {
//   type: "text" | "story" | "tip" | "activity";
//   content: string;
//   animationType:
//     | "fade-in-gentle"
//     | "mirror-flip"
//     | "stroke-by-stroke"
//     | "follow-the-dot"
//     | "pulse-on-audio"
//     | "chunk-glow"
//     | "slash-split";
//   visualAnchor: string;
// }

// export interface LessonExample {
//   letter?: string;
//   word: string;
//   emoji: string;
//   sentence: string;
//   color: string;
//   chunk?: string;
// }

// export interface GuidedPracticeQuestion {
//   question: string;
//   options: string[];
//   answer: string | string[];
//   interactionType:
//     | "tap-to-reveal"
//     | "drag-and-drop"
//     | "swipe-to-choose"
//     | "speed-highlight";
// }

// export interface DyslexiaLesson {
//   id: string;
//   title: string;
//   subtitle: string;
//   color: string;
//   mascot: string;
//   explanation: ExplanationStep[];
//   examples: LessonExample[];
//   guidedPractice: GuidedPracticeQuestion[];
//   motivationalTips: string[];
//   completionMessage: string;
// }

const levelFourMixedMastery = {
  id: "mixed_mastery",
  title: "Level 4: Mixed Mastery Challenge",
  subtitle:
    "Bring together everything you've learned to build advanced literacy skills!",
  color: "#DBEAFE",
  mascot: "🐼",

  explanation: [
    {
      type: "text",
      content:
        "Letters like b, d, p, and q love to play tricks on our eyes because they look so similar.",
      animationType: "mirror-flip",
      visualAnchor: "b d p q",
    },
    {
      type: "tip",
      content: "Remember: 'b' has a belly in front, 'd' has a diaper behind.",
      animationType: "stroke-by-stroke",
      visualAnchor: "b vs d",
    },
    {
      type: "activity",
      content:
        "Trace the belly of the 'b' with your finger from top to bottom ",
      animationType: "follow-the-dot",
      visualAnchor: "d",
    },
    // --- Chomp the Chunks! ---
    {
      type: "text",
      content:
        "When a word looks too long, we don't read it letter-by-letter. We look for word families or chunks!",
      animationType: "fade-in-gentle",
      visualAnchor: "nightingale",
    },
    {
      type: "tip",
      content:
        "The three letters 'igh' stick together to make one big 'I' sound.",
      animationType: "chunk-glow",
      visualAnchor: "igh",
    },
    // --- Syllable Slasher ---
    {
      type: "text",
      content:
        "The Rabbit Rule states that when two consonants stand between two vowels, we split right between the consonants!",
      animationType: "fade-in-gentle",
      visualAnchor: "vccv",
    },
    {
      type: "tip",
      content:
        "In 'reptile', 'p' and 't' are the consonants in the middle. Chop them apart!",
      animationType: "slash-split",
      visualAnchor: "rep | tile",
    },
    // --- Building Block Words ---
    {
      type: "text",
      content:
        "Root words are like blocks. We can attach prefixes to the front or suffixes to the back to make brand new meanings.",
      animationType: "fade-in-gentle",
      visualAnchor: "un + help + ful",
    },
    // --- The Mystery of the Echo Cave ---
    {
      type: "text",
      content:
        "Fluency means matching your reading pace to the rhythm of a story, helping your mind paint pictures as you read.",
      animationType: "fade-in-gentle",
      visualAnchor: "Echo Cave",
    },
  ],

  examples: [
    {
      letter: "b",
      word: "bat",
      emoji: "🦇",
      sentence: "The bat flies in the dark.",
      color: "#2563EB",
    },
    {
      letter: "b",
      word: "bold",
      emoji: "🦁",
      sentence: "A bold lion stands proud.",
      color: "#2563EB",
    },
    {
      letter: "d",
      word: "pad",
      emoji: "📝",
      sentence: "Write your ideas on a pad.",
      color: "#F59E0B",
    },
    {
      chunk: "ni",
      word: "night",
      emoji: "🌙",
      sentence: "The night sky is filled with stars. LOOK AT ght",
      color: "yellow",
    },
    {
      chunk: "s",
      word: "sing",
      emoji: "🎤",
      sentence: "Birds love to sing sweet songs. LOOK AT ing",
      color: "#10B981",
    },
    {
      word: "reptile",
      emoji: "🦎",
      sentence: "A lizard is a cold-blooded reptile.",
      color: "#8B5CF6",
    },
    {
      word: "rabbit",
      emoji: "🐰",
      sentence: "The rabbit hops across the split: rab-bit.",
      color: "#8B5CF6",
    },
    {
      word: "helpful",
      emoji: "🤝",
      sentence: "Being helpful means you love to give assistance.",
      color: "#059669",
    },
    {
      word: "helpless",
      emoji: "🧎",
      sentence: "Feeling helpless means you feel like you can't do it alone.",
      color: "#EF4444",
    },
    {
      word: "passage",
      emoji: "📖",
      sentence:
        "Max and Luna found a glowing map hidden inside an old, dusty book.",
      color: "#D97706",
    },
  ],

  guidedPractice: [
    {
      question: "🎯 Complete the word: _at (Hint: It has a belly in front!)",
      options: ["b", "d"],
      answer: "b",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🦁 Drag the correct letter to make 'bold'",
      options: ["b", "d"],
      answer: "b",
      interactionType: "drag-and-drop",
    },
    {
      question:
        "🌙 Find the 3-letter vowel team that says 'I' in 'nightingale'",
      options: ["nig", "igh", "ale"],
      answer: "igh",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🎤 Drag the 'ing' sound chunk into the matching box",
      options: ["ing", "igh"],
      answer: "ing",
      interactionType: "drag-and-drop",
    },
    {
      question: "🦎 Where does the word 'reptile' split?",
      options: ["re-ptile", "rep-tile", "rept-ile"],
      answer: "rep-tile",
      interactionType: "tap-to-reveal",
    },
    {
      question: "🧱 Someone who does not give up is ____helpful.",
      options: ["un", "dis", "re"],
      answer: "un",
      interactionType: "drag-and-drop",
    },
    {
      question:
        "🤝 When you feel like you can't do anything, you feel help____.",
      options: ["ful", "less", "ing"],
      answer: "less",
      interactionType: "tap-to-reveal",
    },
    {
      question: "📖 Where did Max and Luna find the glowing map?",
      options: [
        "Inside a tree hollow",
        "Inside an old, dusty book",
        "Under a rock in Echo Cave",
      ],
      answer: "Inside an old, dusty book",
      interactionType: "speed-highlight",
    },
  ],

  motivationalTips: [
    "🌟 Mistakes help your brain grow stronger.",
    "🌟 Slow reading is smart reading.",
    "🌟 Breaking words apart makes them easier to defeat!",
    "🌟 Every big word is just a few small syllables holding hands.",
    "🌟 Picture the story in your mind like a movie.",
  ],

  completionMessage: "Amazing work! You unlocked the master treasure gate! 🚀",
};

export default levelFourMixedMastery;
