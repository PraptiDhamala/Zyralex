export type ExplanationBlock = {
  type: "text" | "story" | "tip" | "activity";
  content: string;
};

export type TrackingExample = {
  target: string; // the word/phrase/sentence the eyes should sweep across
  emoji?: string;
  sentence: string; // instruction shown above the tracker
  color: string;
  speed: "slow" | "medium" | "fast"; // controls the sweep animation speed
};

export type GuidedPracticeItem = {
  question: string;
  options: string[];
  answer: string;
  distractorType?: "reversal" | "transposition" | "direction"; // helps analytics tag *why* it's tricky
};

export type VisualTrackingLevel = {
  levelLabel: string;
  animationType:
    | "sweep-left-to-right"
    | "sweep-word-by-word"
    | "sweep-line-by-line";
  visualAnchor: string; // emoji or icon anchor shown at the start of the tracking line
  interactionType: "eye_sweep";
  mascotTip: string;
  explanation: ExplanationBlock[];
  examples: TrackingExample[];
  guidedPractice: GuidedPracticeItem[];
};

const lesson = {
  id: "visual_tracking",
  title: "Eye Tracking Practice",
  subtitle: "Train your eyes to move smoothly across words 👀✨",
  color: "#DCFCE7",
  mascot: "🦊",

  motivationalTips: [
    "🌟 Your eyes are learning to track better every time you practice.",
    "🌟 Going slow on purpose actually makes reading faster later.",
    "🌟 Skipping around is normal — noticing it is the first step to fixing it.",
  ],

  completionMessage:
    "Nice work! 🎉 Your eyes just got a little stronger at tracking.",

  levels: {
    // ---------------------------------------------------------------
    // LEVEL 1 — single words, slow sweep, big visual anchor
    // ---------------------------------------------------------------
    level1: {
      levelLabel: "Level 1: One Word at a Time",
      animationType: "sweep-left-to-right",
      visualAnchor: "👉",
      interactionType: "eye_sweep",
      mascotTip: "Let your eyes follow the glowing dot — don't rush!",
      explanation: [
        {
          type: "text",
          content:
            "Good readers move their eyes smoothly from left to right, one word at a time.",
        },
        {
          type: "story",
          content:
            "Sometimes eyes skip letters or jump backward. That's super common — practice trains them to move smoother. 💚",
        },
        {
          type: "tip",
          content:
            "Follow the glowing dot with your eyes only — try not to move your head.",
        },
        {
          type: "activity",
          content:
            "Watch the dot sweep under each word, then tap the matching word below.",
        },
      ],
      examples: [
        {
          target: "cat",
          emoji: "🐱",
          sentence: "Track the word cat from left to right.",
          color: "#16A34A",
          speed: "slow",
        },
        {
          target: "dog",
          emoji: "🐶",
          sentence: "Follow the dot across dog.",
          color: "#2563EB",
          speed: "slow",
        },
        {
          target: "fish",
          emoji: "🐟",
          sentence: "Move slowly across the letters in fish.",
          color: "#0EA5E9",
          speed: "slow",
        },
      ],
      guidedPractice: [
        {
          question: "👀 Which word matches CAT?",
          options: ["cat", "tac"],
          answer: "cat",
          distractorType: "reversal",
        },
        {
          question: "🐶 Which word says DOG?",
          options: ["bog", "dog"],
          answer: "dog",
          distractorType: "reversal",
        },
        {
          question: "🐟 Which word is correct?",
          options: ["fish", "fsih"],
          answer: "fish",
          distractorType: "transposition",
        },
        {
          question: "📖 Which direction do we read in English?",
          options: ["Left to Right", "Right to Left"],
          answer: "Left to Right",
          distractorType: "direction",
        },
      ],
    },

    // ---------------------------------------------------------------
    // LEVEL 2 — short phrases, medium sweep, word-by-word highlight
    // ---------------------------------------------------------------
    level2: {
      levelLabel: "Level 2: Short Phrases",
      animationType: "sweep-word-by-word",
      visualAnchor: "🔦",
      interactionType: "eye_sweep",
      mascotTip:
        "Each word lights up one at a time — keep your eyes on the glow!",
      explanation: [
        {
          type: "text",
          content:
            "Now let's track a few words together, in order, without losing your place.",
        },
        {
          type: "story",
          content:
            "Phrases are trickier because your eyes have to jump from word to word smoothly instead of staring at just one.",
        },
        {
          type: "tip",
          content:
            "If you lose your place, that's okay — just find the lit-up word and keep going.",
        },
        {
          type: "activity",
          content:
            "Watch each word light up in order, then answer what came first, middle, or last.",
        },
      ],
      examples: [
        {
          target: "the fast cat",
          emoji: "🐱",
          sentence: "Track each word in order: the → fast → cat.",
          color: "#16A34A",
          speed: "medium",
        },
        {
          target: "my brown dog",
          emoji: "🐶",
          sentence: "Follow the highlight across all three words.",
          color: "#2563EB",
          speed: "medium",
        },
        {
          target: "a small fish",
          emoji: "🐟",
          sentence: "Keep pace with the glowing word.",
          color: "#0EA5E9",
          speed: "medium",
        },
      ],
      guidedPractice: [
        {
          question: "In 'the fast cat', which word lit up first?",
          options: ["the", "cat"],
          answer: "the",
        },
        {
          question: "In 'my brown dog', which word lit up last?",
          options: ["dog", "my"],
          answer: "dog",
        },
        {
          question: "Which set is in the correct reading order?",
          options: ["a small fish", "fish small a"],
          answer: "a small fish",
          distractorType: "direction",
        },
        {
          question: "Which word is spelled correctly?",
          options: ["borwn", "brown"],
          answer: "brown",
          distractorType: "transposition",
        },
      ],
    },

    // ---------------------------------------------------------------
    // LEVEL 3 — full sentence, line sweep, faster pace
    // ---------------------------------------------------------------
    level3: {
      levelLabel: "Level 3: Full Sentences",
      animationType: "sweep-line-by-line",
      visualAnchor: "✨",
      interactionType: "eye_sweep",
      mascotTip: "One smooth line — no jumping back to reread!",
      explanation: [
        {
          type: "text",
          content:
            "Let's put it all together and track a whole sentence smoothly, left to right.",
        },
        {
          type: "story",
          content:
            "This is the real skill readers use every day — moving steadily across a whole line without backtracking.",
        },
        {
          type: "tip",
          content:
            "Try to resist going back to reread — trust your eyes and keep moving forward.",
        },
        {
          type: "activity",
          content:
            "Follow the sweeping line across the sentence, then answer the question about it.",
        },
      ],
      examples: [
        {
          target: "The fast cat ran home.",
          emoji: "🐱",
          sentence: "Track the whole sentence in one smooth pass.",
          color: "#16A34A",
          speed: "fast",
        },
        {
          target: "My brown dog likes to play.",
          emoji: "🐶",
          sentence: "Sweep across without stopping.",
          color: "#2563EB",
          speed: "fast",
        },
        {
          target: "A small fish swims fast.",
          emoji: "🐟",
          sentence: "Keep your eyes moving forward only.",
          color: "#0EA5E9",
          speed: "fast",
        },
      ],
      guidedPractice: [
        {
          question: "What did the cat do?",
          options: ["Ran home", "Ate dinner"],
          answer: "Ran home",
        },
        {
          question: "What does the dog like to do?",
          options: ["Sleep", "Play"],
          answer: "Play",
        },
        {
          question: "How does the fish swim?",
          options: ["Slowly", "Fast"],
          answer: "Fast",
        },
        {
          question: "Which is the correct sentence order?",
          options: ["A small fish swims fast.", "Fast swims fish small a."],
          answer: "A small fish swims fast.",
          distractorType: "direction",
        },
      ],
    },
  } satisfies Record<"level1" | "level2" | "level3", VisualTrackingLevel>,
};

export default lesson;
