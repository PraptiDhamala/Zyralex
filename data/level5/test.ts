export interface ExplanationStep {
  type: "text" | "story" | "tip" | "activity";
  content: string;
  animationType:
    | "fade-in-gentle"
    | "mirror-flip"
    | "stroke-by-stroke"
    | "follow-the-dot"
    | "pulse-on-audio"
    | "chunk-glow"
    | "slash-split";
  visualAnchor: string;
}

export interface LessonExample {
  letter?: string;
  word: string;
  emoji: string;
  sentence: string;
  color: string;
  chunk?: string;
}

export interface GuidedPracticeQuestion {
  question: string;
  options: string[];
  answer: string | string[];
  interactionType:
    | "tap-to-reveal"
    | "drag-and-drop"
    | "swipe-to-choose"
    | "speed-highlight";
}

export interface DyslexiaLesson {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  mascot: string;
  explanation: ExplanationStep[];
  examples: LessonExample[];
  guidedPractice: GuidedPracticeQuestion[];
  motivationalTips: string[];
  completionMessage: string;
}

const levelFiveTest: DyslexiaLesson = {
  id: "test",
  title: "Level 5: Sky Castle Graduation! 🏰",
  subtitle:
    "Become an official Word Ninja and defeat the tricky Shadow-Scribble!",
  color: "#FAE8FF",
  mascot: "🥷",

  explanation: [
    {
      type: "story",
      content:
        "Welcome, brave Word Ninja! The sneaky Shadow-Scribble has locked up the Golden Scroll inside the Floating Sky Castle!",
      animationType: "fade-in-gentle",
      visualAnchor: "Sky Castle 🏰",
    },
    {
      type: "tip",
      content:
        "To defeat him, you must use all your secret powers: directional scanning, chunk-chomping, and syllable-slashing!",
      animationType: "pulse-on-audio",
      visualAnchor: "Ninja Powers ⚡",
    },
  ],

  examples: [
    {
      letter: "b",
      word: "brave",
      emoji: "🛡️",
      sentence: "A brave ninja uses laser focus!",
      color: "#3B82F6",
    },
    {
      chunk: "celebrat",
      word: "celebration",
      emoji: "🎉",
      sentence: "There will be a massive celebration when you win!",
      color: "#10B981",
    },
    {
      word: "thunderbolt",
      emoji: "⚡",
      sentence: "Chop it down into power pieces: thun-der-bolt!",
      color: "#EF4444",
    },
  ],

  guidedPractice: [
    {
      question: "Fix the word: _ragon",
      options: ["b", "d", "p"],
      answer: "d",
      interactionType: "tap-to-reveal",
    },
    {
      question:
        "Throw the right block to capture the hidden sound in 'lightning'",
      options: ["igh", "ing", "ang"],
      answer: "igh",
      interactionType: "drag-and-drop",
    },
    {
      question:
        "⚔️ SYLLABLE CHOP! Use your sword to slice 'dinosaur' into perfect blocks!",
      options: ["di-no-saur", "din-os-aur", "dinos-aur"],
      answer: "di-no-saur",
      interactionType: "tap-to-reveal",
    },
    {
      question: "Drag the proper master block to turn 'happy' into 'unhappy'",
      options: ["dis", "un", "re"],
      answer: "un",
      interactionType: "drag-and-drop",
    },
    {
      question:
        "📜'The quick silver fox jumped over the sleeping bear.' Who was sleeping?",
      options: ["The quick fox", "The silver ninja", "The sleeping bear"],
      answer: "The sleeping bear",
      interactionType: "speed-highlight",
    },
  ],

  motivationalTips: [
    "⚔️ Trust your ninja instincts!",
    "🛡️ Slow down to move faster through the traps.",
    "✨ You are stronger than any tricky word!",
  ],

  completionMessage:
    "🎉 CHRONICLES COMPLETED! You defeated Shadow-Scribble, saved the scroll, and graduated as a Supreme Word Master! 🏆👑",
};

export default levelFiveTest;
