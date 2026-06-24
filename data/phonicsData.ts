export interface PhonicsItem {
  id: number;
  word: string;
  phonemes: string[];
  sounds: string[];
}

export const beginnerPhonics: PhonicsItem[] = [
  // ── GROUP 1: Short 'A' Sound (Basic CVC) ──
  {
    id: 1,
    word: "CAT",
    phonemes: ["C", "A", "T"],
    sounds: ["/k/", "/æ/", "/t/"]
  },
  {
    id: 2,
    word: "MAN",
    phonemes: ["M", "A", "N"],
    sounds: ["/m/", "/æ/", "/n/"]
  },
  {
    id: 3,
    word: "SAT",
    phonemes: ["S", "A", "T"],
    sounds: ["/s/", "/æ/", "/t/"]
  },
  {
    id: 4,
    word: "JAM",
    phonemes: ["J", "A", "M"],
    sounds: ["/dʒ/", "/æ/", "/m/"]
  },

  // ── GROUP 2: Short 'I' Sound (High-Contrast Visual Shapes) ──
  {
    id: 5,
    word: "SIT",
    phonemes: ["S", "I", "T"],
    sounds: ["/s/", "/ɪ/", "/t/"]
  },
  {
    id: 6,
    word: "WIN",
    phonemes: ["W", "I", "N"],
    sounds: ["/w/", "/ɪ/", "/n/"]
  },
  {
    id: 7,
    word: "FIN",
    phonemes: ["F", "I", "N"],
    sounds: ["/f/", "/ɪ/", "/n/"]
  },
  {
    id: 8,
    word: "LIP",
    phonemes: ["L", "I", "P"],
    sounds: ["/l/", "/ɪ/", "/p/"]
  },

  // ── GROUP 3: Short 'O' & 'U' Sounds ──
  {
    id: 9,
    word: "HOT",
    phonemes: ["H", "O", "T"],
    sounds: ["/h/", "/ɒ/", "/t/"]
  },
  {
    id: 10,
    word: "SUN",
    phonemes: ["S", "U", "N"],
    sounds: ["/s/", "/ʌ/", "/n/"]
  },
  {
    id: 11,
    word: "RUN",
    phonemes: ["R", "U", "N"],
    sounds: ["/r/", "/ʌ/", "/n/"]
  },
  {
    id: 12,
    word: "MUG",
    phonemes: ["M", "U", "G"],
    sounds: ["/m/", "/ʌ/", "/g/"]
  },

  // ── GROUP 4: Consonant Digraph 'SH' (One sound, two letters) ──
  {
    id: 13,
    word: "SHOP",
    phonemes: ["SH", "O", "P"],
    sounds: ["/ʃ/", "/ɒ/", "/p/"]
  },
  {
    id: 14,
    word: "SHIP",
    phonemes: ["SH", "I", "P"],
    sounds: ["/ʃ/", "/ɪ/", "/p/"]
  },
  {
    id: 15,
    word: "FISH",
    phonemes: ["FI", "SH"],
    sounds: ["/fɪ/", "/ʃ/"]
  },

  // ── GROUP 5: Consonant Digraph 'CH' & 'TH' ──
  {
    id: 16,
    word: "CHIP",
    phonemes: ["CH", "I", "P"],
    sounds: ["/tʃ/", "/ɪ/", "/p/"]
  },
  {
    id: 17,
    word: "CHIN",
    phonemes: ["CH", "I", "N"],
    sounds: ["/tʃ/", "/ɪ/", "/n/"]
  },
  {
    id: 18,
    word: "THIN",
    phonemes: ["TH", "I", "N"],
    sounds: ["/θ/", "/ɪ/", "/n/"]
  },

  // ── GROUP 6: Ending Digraph 'CK' (Solidifies the hard /k/) ──
  {
    id: 19,
    word: "KICK",
    phonemes: ["KI", "CK"],
    sounds: ["/kɪ/", "/k/"]
  },
  {
    id: 20,
    word: "DUCK",
    phonemes: ["DU", "CK"],
    sounds: ["/dʌ/", "/k/"]
  }
];