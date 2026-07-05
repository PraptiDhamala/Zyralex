// data/practice/types.ts

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface LetterRecognitionQuestion {
  id: string;
  type: "singleLetter" | "similarLetter" | "containsLetter" | "startsWith" | "endsWith";
  instruction: string;
  voicePrompt: string;
  target: string;
  choices: string[];
  correctAnswer: string;
  explanation?: string;
  rewardMessage?: string;
}