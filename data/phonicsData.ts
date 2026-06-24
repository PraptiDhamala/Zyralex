export interface PhonicsItem {
  id: number;
  word: string;
  phonemes: string[];
  sounds: string[];
}

export const beginnerPhonics: PhonicsItem[] = [
  {
    id: 1,
    word: "CAT",
    phonemes: ["C", "A", "T"],
    sounds: ["/k/", "/æ/", "/t/"]
  },
  {
    id: 2,
    word: "SHOP",
    phonemes: ["SH", "O", "P"],
    sounds: ["/ʃ/", "/ɒ/", "/p/"]
  },
  {
    id: 3,
    word: "CHIP",
    phonemes: ["CH", "I", "P"],
    sounds: ["/tʃ/", "/ɪ/", "/p/"]
  }
];