// src/data/practicereadaloud.ts

export interface BeginnerReadAloudSentence {
  id: string;
  sentence: string;      // The short, fun sentence the user will read
  targetWords: string[]; // Individual words we track
  hint: string;          // A friendly tip for the user
}

export interface BeginnerPhonicsData {
  id: string;
  letter: string;
  soundCue: string;      // /æ/ sound help
  exampleWord: string;   // The word they look at to decode
}

// 🎙️ BEGINNER READ ALOUD DATASET (Short, engaging sentences instead of boring single words!)
export const BEGINNER_SENTENCES: BeginnerReadAloudSentence[] = [
  {
    id: "beg_s1",
    sentence: "The cat sat.",
    targetWords: ["The", "cat", "sat"],
    hint: "Look at the cozy cat!"
  },
  {
    id: "beg_s2",
    sentence: "See the sun.",
    targetWords: ["See", "the", "sun"],
    hint: "The sun is bright and warm!"
  },
  {
    id: "beg_s3",
    sentence: "A red bug.",
    targetWords: ["A", "red", "bug"],
    hint: "Can you spot the little red bug?"
  },
  {
    id: "beg_s4",
    sentence: "Run big dog.",
    targetWords: ["Run", "big", "dog"],
    hint: "The friendly dog loves to run!"
  }
];

// 🔊 BEGINNER PHONICS DATASET (Targeted focusing for the camera tracking module)
export const BEGINNER_PHONICS: BeginnerPhonicsData[] = [
  { id: "p_at", letter: "A", soundCue: 'makes an "ah" sound', exampleWord: "CAT" },
  { id: "p_un", letter: "U", soundCue: 'makes an "uh" sound', exampleWord: "SUN" },
  { id: "p_og", letter: "O", soundCue: 'makes an "oh" sound', exampleWord: "DOG" },
  { id: "p_ed", letter: "E", soundCue: 'makes an "eh" sound', exampleWord: "BED" }
];