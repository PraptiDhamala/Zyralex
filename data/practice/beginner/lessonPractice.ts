export interface LetterChallenge {
  id: string;
  targetLetter: string;
  options: string[];
  audioPrompt: string;
}

export interface WordChallenge {
  id: string;
  word: string;
  scrambled: string[];
  meaningClue: string;
  audioPrompt: string;
}

export interface SyllableChallenge {
  id: string;
  word: string;
  syllablesCount: number;
  breakdown: string;
  meaningClue: string;
  audioPrompt: string;
}

export const BEGINNER_LESSON_DATA = {
  // Keep letterRecognition as is
  letterRecognition: [
    { id: "lr_1",  targetLetter: "a", options: ["a", "o", "e", "u"], audioPrompt: "Can you find the letter A?" },
    { id: "lr_2",  targetLetter: "b", options: ["d", "b", "p", "q"], audioPrompt: "Find the letter B. Watch out for its belly!" },
    { id: "lr_3",  targetLetter: "c", options: ["o", "e", "c", "s"], audioPrompt: "Look for the curly letter C!" },
    { id: "lr_4",  targetLetter: "d", options: ["b", "p", "q", "d"], audioPrompt: "Where is the letter D?" },
    { id: "lr_5",  targetLetter: "e", options: ["c", "o", "e", "a"], audioPrompt: "Tap the letter E!" },
    { id: "lr_6",  targetLetter: "f", options: ["t", "f", "j", "l"], audioPrompt: "Can you spot the letter F?" },
    { id: "lr_7",  targetLetter: "g", options: ["q", "p", "g", "y"], audioPrompt: "Find the hanging letter G!" },
    { id: "lr_8",  targetLetter: "h", options: ["n", "m", "u", "h"], audioPrompt: "Where is the tall letter H?" },
    { id: "lr_9",  targetLetter: "i", options: ["l", "j", "t", "i"], audioPrompt: "Find the little letter I with the dot!" },
    { id: "lr_10", targetLetter: "j", options: ["i", "l", "f", "j"], audioPrompt: "Look for the fishing hook letter J!" },
    { id: "lr_11", targetLetter: "k", options: ["x", "k", "v", "z"], audioPrompt: "Can you find the letter K?" },
    { id: "lr_12", targetLetter: "l", options: ["i", "t", "l", "1"], audioPrompt: "Tap the straight line letter L!" },
    { id: "lr_13", targetLetter: "m", options: ["n", "w", "u", "m"], audioPrompt: "Find the double-hump letter M!" },
    { id: "lr_14", targetLetter: "n", options: ["m", "h", "u", "n"], audioPrompt: "Where is the letter N?" },
    { id: "lr_15", targetLetter: "o", options: ["c", "e", "a", "o"], audioPrompt: "Look for the round donut letter O!" },
    { id: "lr_16", targetLetter: "p", options: ["q", "b", "d", "p"], audioPrompt: "Find the letter P!" },
    { id: "lr_17", targetLetter: "r", options: ["n", "i", "m", "r"], audioPrompt: "Can you see the little branch letter R?" },
    { id: "lr_18", targetLetter: "s", options: ["z", "c", "e", "s"], audioPrompt: "Find the zigzag snake letter S!" },
    { id: "lr_19", targetLetter: "t", options: ["f", "l", "i", "t"], audioPrompt: "Tap the cross-top letter T!" },
    { id: "lr_20", targetLetter: "z", options: ["s", "n", "m", "z"], audioPrompt: "Awesome! Last one, find the letter Z!" }
  ] as LetterChallenge[],

  // 1. CHANGED FROM wordConstruction TO simpleWords TO MATCH THE GAME COMPONENT
  simpleWords: [
    { id: "sw_1",  word: "CAT",  scrambled: ["A", "C", "T"],      meaningClue: "🐱 A furry pet that meows!", audioPrompt: "Let's build the word: CAT. Spell it out block by block!" },
    { id: "sw_2",  word: "DOG",  scrambled: ["G", "D", "O"],      meaningClue: "🐶 A loyal pet that barks!", audioPrompt: "Can you spell DOG?" },
    { id: "sw_3",  word: "SUN",  scrambled: ["N", "S", "U"],      meaningClue: "☀️ Bright and warm in the sky!", audioPrompt: "Let's assemble the word: SUN." },
    { id: "sw_4",  word: "BOX",  scrambled: ["X", "O", "B"],      meaningClue: "📦 Square and great for toys!", audioPrompt: "Put the letters together for: BOX." },
    { id: "sw_5",  word: "BED",  scrambled: ["D", "B", "E"],      meaningClue: "🛏️ Where you go to sleep safely!", audioPrompt: "Let's build the word: BED." },
    { id: "sw_6",  word: "MAP",  scrambled: ["P", "A", "M"],      meaningClue: "🗺️ Helps you find hidden treasure!", audioPrompt: "Spell the word: MAP." },
    { id: "sw_7",  word: "PIG",  scrambled: ["G", "P", "I"],      meaningClue: "🐷 A pink animal that loves mud!", audioPrompt: "Can you find the pieces for PIG?" },
    { id: "sw_8",  word: "HAT",  scrambled: ["T", "H", "A"],      meaningClue: "👒 You wear it on your head!", audioPrompt: "Let's match the letters for: HAT." },
    { id: "sw_9",  word: "BUS",  scrambled: ["U", "S", "B"],      meaningClue: "🚌 Big yellow wheels that take you to school!", audioPrompt: "Spell the word: BUS." },
    { id: "sw_10", word: "FOX",  scrambled: ["O", "X", "F"],      meaningClue: "🦊 A clever animal with a fluffy tail!", audioPrompt: "Assemble the letters for: FOX." },
    { id: "sw_11", word: "BUG",  scrambled: ["G", "U", "B"],      meaningClue: "🛲 A little crawling creature!", audioPrompt: "Let's spell: BUG." },
    { id: "sw_12", word: "LOG",  scrambled: ["O", "G", "L"],      meaningClue: "🪵 A wooden piece from a tree trunk!", audioPrompt: "Can you put together: LOG?" },
    { id: "sw_13", word: "NET",  scrambled: ["T", "E", "N"],      meaningClue: "🕸️ Used to catch butterflies or fish!", audioPrompt: "Spell the word: NET." },
    { id: "sw_14", word: "CUP",  scrambled: ["U", "P", "C"],      meaningClue: "🥤 Holds your delicious warm milk!", audioPrompt: "Let's build the word: CUP." },
    { id: "sw_15", word: "FAN",  scrambled: ["N", "A", "F"],      meaningClue: "🪭 Spins around to blow cool air!", audioPrompt: "Find the building blocks for: FAN." },
    { id: "sw_16", word: "BAT",  scrambled: ["T", "B", "A"],      meaningClue: "🦇 Flaps its wings at nighttime!", audioPrompt: "Spell out the word: BAT." },
    { id: "sw_17", word: "PEN",  scrambled: ["E", "N", "P"],      meaningClue: "🖊️ Used to draw beautiful pictures!", audioPrompt: "Let's assemble the word: PEN." },
    { id: "sw_18", word: "RUN",  scrambled: ["N", "R", "U"],      meaningClue: "🏃 Moving your legs super fast!", audioPrompt: "Can you spell: RUN?" },
    { id: "sw_19", word: "COW",  scrambled: ["W", "O", "C"],      meaningClue: "🐮 Says moo and gives us milk!", audioPrompt: "Let's build the word: COW." },
    { id: "sw_20", word: "BALL", scrambled: ["L", "B", "A", "L"], meaningClue: "⚽ Round and fun to bounce!", audioPrompt: "Awesome last one! Let's spell the word: BALL!" }
  ] as WordChallenge[],

  // 2. CHANGED FROM syllableMatching TO syllableBasics TO MATCH THE GAME COMPONENT
  syllableBasics: [
    { id: "syl_1",  word: "TREE",     syllablesCount: 1, breakdown: "TREE",        meaningClue: "🌳 Tall, green, and grows in nature!", audioPrompt: "Listen closely: TREE. How many beats does it have?" },
    { id: "syl_2",  word: "FISH",     syllablesCount: 1, breakdown: "FISH",        meaningClue: "🐟 Swims around happily in water!", audioPrompt: "How many syllables in FISH?" },
    { id: "syl_3",  word: "FROG",     syllablesCount: 1, breakdown: "FROG",        meaningClue: "🐸 Green animal that hops high!", audioPrompt: "Count the beats for: FROG." },
    { id: "syl_4",  word: "CAKE",     syllablesCount: 1, breakdown: "CAKE",        meaningClue: "🍰 A delicious sweet birthday treat!", audioPrompt: "Clap it out: CAKE." },
    { id: "syl_5",  word: "MOON",     syllablesCount: 1, breakdown: "MOON",        meaningClue: "🌙 Glows brightly in the night sky!", audioPrompt: "How many beats in MOON?" },
    { id: "syl_6",  word: "BOAT",     syllablesCount: 1, breakdown: "BOAT",        meaningClue: "⛵ Sails smoothly across the lake!", audioPrompt: "Let's beat the drum for: BOAT." },
    { id: "syl_7",  word: "ROBOT",    syllablesCount: 2, breakdown: "RO - BOT",     meaningClue: "🤖 A metallic friend that loves to beep!", audioPrompt: "Listen: RO-BOT. Count the parts!" },
    { id: "syl_8",  word: "APPLE",    syllablesCount: 2, breakdown: "AP - PLE",     meaningClue: "🍎 A crunchy, sweet red fruit!", audioPrompt: "How many syllables in AP-PLE?" },
    { id: "syl_9",  word: "MONKEY",   syllablesCount: 2, breakdown: "MON - KEY",    meaningClue: "🐒 Loves swinging on trees and eating bananas!", audioPrompt: "Clap along: MON-KEY." },
    { id: "syl_10", word: "PENCIL",   syllablesCount: 2, breakdown: "PEN - CIL",    meaningClue: "✏️ Used to write and draw stories!", audioPrompt: "Count the beats: PEN-CIL." },
    { id: "syl_11", word: "SPIDER",   syllablesCount: 2, breakdown: "SPI - DER",    meaningClue: "🕷️ Has eight legs and spins silky webs!", audioPrompt: "How many parts in SPI-DER?" },
    { id: "syl_12", word: "CASTLE",   syllablesCount: 2, breakdown: "CAS - TLE",    meaningClue: "🏰 A giant stone home for kings and queens!", audioPrompt: "Let's tap out: CAS-TLE." },
    { id: "syl_13", word: "ZEBRA",    syllablesCount: 2, breakdown: "ZE - BRA",     meaningClue: "🦓 Looks like a horse with black and white stripes!", audioPrompt: "Count the beats: ZE-BRA." },
    { id: "syl_14", word: "BANANA",   syllablesCount: 3, breakdown: "BA - NA - NA",  meaningClue: "🍌 A long yellow fruit that you peel!", audioPrompt: "Listen carefully: BA-NA-NA. Tap the beats!" },
    { id: "syl_15", word: "VOLCANO",  syllablesCount: 3, breakdown: "VOL - CA - NO", meaningClue: "🌋 A mountain that erupts with fiery lava!", audioPrompt: "How many syllables in VOL-CA-NO?" },
    { id: "syl_16", word: "OCTOPUS",  syllablesCount: 3, breakdown: "OC - TO - PUS", meaningClue: "🐙 Has eight squiggly arms under the sea!", audioPrompt: "Count the sections: OC-TO-PUS." },
    { id: "syl_17", word: "DINOSAUR", syllablesCount: 3, breakdown: "DI - NO - SAUR",meaningClue: "🦖 A giant creature from long, long ago!", audioPrompt: "Clap along: DI-NO-SAUR." },
    { id: "syl_18", word: "COMPUTER", syllablesCount: 3, breakdown: "COM - PU - TER",meaningClue: "💻 A smart screen for games and learning!", audioPrompt: "Let's tap for: COM-PU-TER." },
    { id: "syl_19", word: "UMBRELLA", syllablesCount: 3, breakdown: "UM - BREL - LA",meaningClue: "☔ Keeps you perfectly dry during rainstorms!", audioPrompt: "How many beats in UM-BREL-LA?" },
    { id: "syl_20", word: "BUTTERFLY",syllablesCount: 3, breakdown: "BUT - TER - FLY",meaningClue: "🦋 Has colorful wings and flutters around flowers!", audioPrompt: "Last one! Count the beats in: BUT-TER-FLY!" }
  ] as SyllableChallenge[]
};