// data/readAloud.ts

export interface ReadAloudItem {
  id: string;
  word: string;
  sentenceHint: string;
}

export const BEGINNER_READ_ALOUD: ReadAloudItem[] = [
  { id: "ra_1", word: "CAT", sentenceHint: "The cat sits on the warm mat." },
  { id: "ra_2", word: "BAT", sentenceHint: "Look at the flying bat at night." },
  { id: "ra_3", word: "FOX", sentenceHint: "A clever orange fox ran into the woods." },
  { id: "ra_4", word: "MAP", sentenceHint: "Follow the old map to find the chest." },
  { id: "ra_5", word: "BED", sentenceHint: "Time to hop into your soft bed." }
];