<<<<<<< HEAD
export const beginnerPhonics = [
  { id: 1,  word: "CAT", phonemes: ["C", "A", "T"], sounds: ["/k/", "/æ/", "/t/"] },
  { id: 2,  word: "DOG", phonemes: ["D", "O", "G"], sounds: ["/d/", "/ɒ/", "/g/"] },
  { id: 3,  word: "BIG", phonemes: ["B", "I", "G"], sounds: ["/b/", "/ɪ/", "/g/"] },
  { id: 4,  word: "HOP", phonemes: ["H", "O", "P"], sounds: ["/h/", "/ɒ/", "/p/"] },
  { id: 5,  word: "RUN", phonemes: ["R", "U", "N"], sounds: ["/r/", "/ʌ/", "/n/"] },
  { id: 6,  word: "PIG", phonemes: ["P", "I", "G"], sounds: ["/p/", "/ɪ/", "/g/"] },
  { id: 7,  word: "SIT", phonemes: ["S", "I", "T"], sounds: ["/s/", "/ɪ/", "/t/"] },
  { id: 8,  word: "MUD", phonemes: ["M", "U", "D"], sounds: ["/m/", "/ʌ/", "/d/"] },
  { id: 9,  word: "FAN", phonemes: ["F", "A", "N"], sounds: ["/f/", "/æ/", "/n/"] },
  { id: 10, word: "HEN", phonemes: ["H", "E", "N"], sounds: ["/h/", "/ɛ/", "/n/"] },
  { id: 11, word: "LOG", phonemes: ["L", "O", "G"], sounds: ["/l/", "/ɒ/", "/g/"] },
  { id: 12, word: "NET", phonemes: ["N", "E", "T"], sounds: ["/n/", "/ɛ/", "/t/"] },
  { id: 13, word: "CUP", phonemes: ["C", "U", "P"], sounds: ["/k/", "/ʌ/", "/p/"] },
  { id: 14, word: "BAT", phonemes: ["B", "A", "T"], sounds: ["/b/", "/æ/", "/t/"] },
  { id: 15, word: "WET", phonemes: ["W", "E", "T"], sounds: ["/w/", "/ɛ/", "/t/"] },
  { id: 16, word: "DIG", phonemes: ["D", "I", "G"], sounds: ["/d/", "/ɪ/", "/g/"] },
  { id: 17, word: "POT", phonemes: ["P", "O", "T"], sounds: ["/p/", "/ɒ/", "/t/"] },
  { id: 18, word: "GUM", phonemes: ["G", "U", "M"], sounds: ["/g/", "/ʌ/", "/m/"] },
  { id: 19, word: "JAM", phonemes: ["J", "A", "M"], sounds: ["/dʒ/", "/æ/", "/m/"] },
  { id: 20, word: "FIT", phonemes: ["F", "I", "T"], sounds: ["/f/", "/ɪ/", "/t/"] },
];
=======
// export interface PhonicsItem {
//   id: number;
//   word: string;
//   phonemes: string[];
//   sounds: string[];
// }

// export const beginnerPhonics: PhonicsItem[] = [
//   // ── GROUP 1: Short 'A' Sound (Basic CVC) ──
//   {
//     id: 1,
//     word: "CAT",
//     phonemes: ["C", "A", "T"],
//     sounds: ["/k/", "/æ/", "/t/"]
//   },
//   {
//     id: 2,
//     word: "MAN",
//     phonemes: ["M", "A", "N"],
//     sounds: ["/m/", "/æ/", "/n/"]
//   },
//   {
//     id: 3,
//     word: "SAT",
//     phonemes: ["S", "A", "T"],
//     sounds: ["/s/", "/æ/", "/t/"]
//   },
//   {
//     id: 4,
//     word: "JAM",
//     phonemes: ["J", "A", "M"],
//     sounds: ["/dʒ/", "/æ/", "/m/"]
//   },

//   // ── GROUP 2: Short 'I' Sound (High-Contrast Visual Shapes) ──
//   {
//     id: 5,
//     word: "SIT",
//     phonemes: ["S", "I", "T"],
//     sounds: ["/s/", "/ɪ/", "/t/"]
//   },
//   {
//     id: 6,
//     word: "WIN",
//     phonemes: ["W", "I", "N"],
//     sounds: ["/w/", "/ɪ/", "/n/"]
//   },
//   {
//     id: 7,
//     word: "FIN",
//     phonemes: ["F", "I", "N"],
//     sounds: ["/f/", "/ɪ/", "/n/"]
//   },
//   {
//     id: 8,
//     word: "LIP",
//     phonemes: ["L", "I", "P"],
//     sounds: ["/l/", "/ɪ/", "/p/"]
//   },

//   // ── GROUP 3: Short 'O' & 'U' Sounds ──
//   {
//     id: 9,
//     word: "HOT",
//     phonemes: ["H", "O", "T"],
//     sounds: ["/h/", "/ɒ/", "/t/"]
//   },
//   {
//     id: 10,
//     word: "SUN",
//     phonemes: ["S", "U", "N"],
//     sounds: ["/s/", "/ʌ/", "/n/"]
//   },
//   {
//     id: 11,
//     word: "RUN",
//     phonemes: ["R", "U", "N"],
//     sounds: ["/r/", "/ʌ/", "/n/"]
//   },
//   {
//     id: 12,
//     word: "MUG",
//     phonemes: ["M", "U", "G"],
//     sounds: ["/m/", "/ʌ/", "/g/"]
//   },

//   // ── GROUP 4: Consonant Digraph 'SH' (One sound, two letters) ──
//   {
//     id: 13,
//     word: "SHOP",
//     phonemes: ["SH", "O", "P"],
//     sounds: ["/ʃ/", "/ɒ/", "/p/"]
//   },
//   {
//     id: 14,
//     word: "SHIP",
//     phonemes: ["SH", "I", "P"],
//     sounds: ["/ʃ/", "/ɪ/", "/p/"]
//   },
//   {
//     id: 15,
//     word: "FISH",
//     phonemes: ["FI", "SH"],
//     sounds: ["/fɪ/", "/ʃ/"]
//   },

//   // ── GROUP 5: Consonant Digraph 'CH' & 'TH' ──
//   {
//     id: 16,
//     word: "CHIP",
//     phonemes: ["CH", "I", "P"],
//     sounds: ["/tʃ/", "/ɪ/", "/p/"]
//   },
//   {
//     id: 17,
//     word: "CHIN",
//     phonemes: ["CH", "I", "N"],
//     sounds: ["/tʃ/", "/ɪ/", "/n/"]
//   },
//   {
//     id: 18,
//     word: "THIN",
//     phonemes: ["TH", "I", "N"],
//     sounds: ["/θ/", "/ɪ/", "/n/"]
//   },

//   // ── GROUP 6: Ending Digraph 'CK' (Solidifies the hard /k/) ──
//   {
//     id: 19,
//     word: "KICK",
//     phonemes: ["KI", "CK"],
//     sounds: ["/kɪ/", "/k/"]
//   },
//   {
//     id: 20,
//     word: "DUCK",
//     phonemes: ["DU", "CK"],
//     sounds: ["/dʌ/", "/k/"]
//   }
// export const beginnerPhonics = [
//   { id: 1,  word: "CAT", phonemes: ["C", "A", "T"], sounds: ["/k/", "/æ/", "/t/"] },
//   { id: 2,  word: "DOG", phonemes: ["D", "O", "G"], sounds: ["/d/", "/ɒ/", "/g/"] },
//   { id: 3,  word: "BIG", phonemes: ["B", "I", "G"], sounds: ["/b/", "/ɪ/", "/g/"] },
//   { id: 4,  word: "HOP", phonemes: ["H", "O", "P"], sounds: ["/h/", "/ɒ/", "/p/"] },
//   { id: 5,  word: "RUN", phonemes: ["R", "U", "N"], sounds: ["/r/", "/ʌ/", "/n/"] },
//   { id: 6,  word: "PIG", phonemes: ["P", "I", "G"], sounds: ["/p/", "/ɪ/", "/g/"] },
//   { id: 7,  word: "SIT", phonemes: ["S", "I", "T"], sounds: ["/s/", "/ɪ/", "/t/"] },
//   { id: 8,  word: "MUD", phonemes: ["M", "U", "D"], sounds: ["/m/", "/ʌ/", "/d/"] },
//   { id: 9,  word: "FAN", phonemes: ["F", "A", "N"], sounds: ["/f/", "/æ/", "/n/"] },
//   { id: 10, word: "HEN", phonemes: ["H", "E", "N"], sounds: ["/h/", "/ɛ/", "/n/"] },
//   { id: 11, word: "LOG", phonemes: ["L", "O", "G"], sounds: ["/l/", "/ɒ/", "/g/"] },
//   { id: 12, word: "NET", phonemes: ["N", "E", "T"], sounds: ["/n/", "/ɛ/", "/t/"] },
//   { id: 13, word: "CUP", phonemes: ["C", "U", "P"], sounds: ["/k/", "/ʌ/", "/p/"] },
//   { id: 14, word: "BAT", phonemes: ["B", "A", "T"], sounds: ["/b/", "/æ/", "/t/"] },
//   { id: 15, word: "WET", phonemes: ["W", "E", "T"], sounds: ["/w/", "/ɛ/", "/t/"] },
//   { id: 16, word: "DIG", phonemes: ["D", "I", "G"], sounds: ["/d/", "/ɪ/", "/g/"] },
//   { id: 17, word: "POT", phonemes: ["P", "O", "T"], sounds: ["/p/", "/ɒ/", "/t/"] },
//   { id: 18, word: "GUM", phonemes: ["G", "U", "M"], sounds: ["/g/", "/ʌ/", "/m/"] },
//   { id: 19, word: "JAM", phonemes: ["J", "A", "M"], sounds: ["/dʒ/", "/æ/", "/m/"] },
//   { id: 20, word: "FIT", phonemes: ["F", "I", "T"], sounds: ["/f/", "/ɪ/", "/t/"] },
// ];
>>>>>>> c120b3dc191b840be20f7a6bdad0b3ad1616184c
