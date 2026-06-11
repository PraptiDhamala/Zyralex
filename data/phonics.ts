// data/phonics.ts

export interface PhonicsItem {
  id: string;
  char: string;
  sound: string;
  exampleWords: string[];
}

export const BEGINNER_PHONICS: PhonicsItem[] = [
  { id: "ph_a", char: "A", sound: '/æ/ — "ay"', exampleWords: ["Apple", "Ant", "Ax"] },
  { id: "ph_e", char: "E", sound: '/ɛ/ — "ee"', exampleWords: ["Egg", "Elf", "Echo"] },
  { id: "ph_i", char: "I", sound: '/ɪ/ — "ih"', exampleWords: ["Igloo", "Ink", "Ill"] },
  { id: "ph_o", char: "O", sound: '/ɒ/ — "oh"', exampleWords: ["Octopus", "Odd", "On"] },
  { id: "ph_u", char: "U", sound: '/ʌ/ — "uh"', exampleWords: ["Umbrella", "Up", "Under"] }
];