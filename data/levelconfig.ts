export const LEVEL_CONFIG = {
  level1: {
    label: "Level 1",
    difficulty: "easy",
    lessons: ["letter_reversal", "phonics", "vowel_processing"],
    next: "level2",
  },
  level2: {
    label: "Level 2",
    difficulty: "easy",
    lessons: ["letter_reversal", "phonics", "visual_tracking"],
    next: "level3",
  },
  level3: {
    label: "Level 3",
    difficulty: "medium",
    lessons: ["chunking", "decoding", "syllables"],
    next: "level4",
  },
  level4: {
    label: "Level 4",
    difficulty: "hard",
    lessons: ["comprehension", "fluency", "morphology"],
    next: "level5",
  },
  level5: {
    label: "Level 5",
    difficulty: "hard",
    lessons: ["advanced_morphology", "fluency", "comprehension"],
    next: null,
  },
};
