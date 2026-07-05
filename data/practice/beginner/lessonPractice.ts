// data/practice/beginner/lessonPractice.ts

// 1. Import your newly created interface along with existing ones
import { LetterRecognitionQuestion } from '../types';

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
  // FIXED: Changed type assertion from LetterChallenge[] to LetterRecognitionQuestion[]
  letterRecognition: [
    { id: "blr_1", type: "singleLetter", instruction: "Find the letter A", voicePrompt: "Can you find the letter A?", target: "A", choices: ["A", "M", "T", "C"], correctAnswer: "A", rewardMessage: "Awesome starting step!" },
    { id: "blr_2", type: "singleLetter", instruction: "Find the letter P", voicePrompt: "Can you touch the letter P?", target: "P", choices: ["H", "P", "L", "O"], correctAnswer: "P", rewardMessage: "Super pick!" },
    { id: "blr_3", type: "singleLetter", instruction: "Find the letter S", voicePrompt: "Where is the letter S?", target: "S", choices: ["X", "K", "S", "W"], correctAnswer: "S", rewardMessage: "Sensational match!" },
    { id: "blr_4", type: "singleLetter", instruction: "Find the letter M", voicePrompt: "Tap the letter M!", target: "M", choices: ["O", "Z", "I", "M"], correctAnswer: "M", rewardMessage: "Wonderful job!" },
    { id: "blr_5", type: "singleLetter", instruction: "Find the letter T", voicePrompt: "Spot the letter T!", target: "T", choices: ["T", "C", "F", "Y"], correctAnswer: "T", rewardMessage: "Terrific!" },
    { id: "blr_6", type: "singleLetter", instruction: "Find the letter K", voicePrompt: "Touch the letter K!", target: "K", choices: ["U", "X", "K", "E"], correctAnswer: "K", rewardMessage: "Keep it up!" },
    { id: "blr_7", type: "singleLetter", instruction: "Find the letter O", voicePrompt: "Can you see the letter O?", target: "O", choices: ["Z", "O", "N", "I"], correctAnswer: "O", rewardMessage: "Perfect round!" },
    { id: "blr_8", type: "singleLetter", instruction: "Find the letter H", voicePrompt: "Where is the letter H?", target: "H", choices: ["H", "X", "C", "V"], correctAnswer: "H", rewardMessage: "Great finding!" },
    { id: "blr_9", type: "singleLetter", instruction: "Find the letter X", voicePrompt: "Tap the letter X!", target: "X", choices: ["J", "L", "M", "X"], correctAnswer: "X", rewardMessage: "Excellent!" },
    { id: "blr_10", type: "singleLetter", instruction: "Find the letter Z", voicePrompt: "Look for the letter Z!", target: "Z", choices: ["C", "Z", "V", "U"], correctAnswer: "Z", rewardMessage: "Spectacular!" },
    { id: "blr_11", type: "singleLetter", instruction: "Find the letter L", voicePrompt: "Find the letter L!", target: "L", choices: ["O", "S", "L", "W"], correctAnswer: "L", rewardMessage: "Way to go!" },
    { id: "blr_12", type: "singleLetter", instruction: "Find the letter C", voicePrompt: "Can you catch the letter C?", target: "C", choices: ["C", "N", "X", "Y"], correctAnswer: "C", rewardMessage: "Magnificent!" },
    { id: "blr_13", type: "singleLetter", instruction: "Find the letter R", voicePrompt: "Touch the letter R!", target: "R", choices: ["U", "I", "T", "R"], correctAnswer: "R", rewardMessage: "Splendid!" },
    { id: "blr_14", type: "singleLetter", instruction: "Find the letter G", voicePrompt: "Where is the letter G?", target: "G", choices: ["G", "Z", "X", "M"], correctAnswer: "G", rewardMessage: "Good job!" },
    { id: "blr_15", type: "singleLetter", instruction: "Find the letter Y", voicePrompt: "Tap the letter Y!", target: "Y", choices: ["H", "O", "Y", "C"], correctAnswer: "Y", rewardMessage: "Bullseye!" },
    { id: "blr_16", type: "singleLetter", instruction: "Find the letter B", voicePrompt: "Look for the letter B!", target: "B", choices: ["X", "B", "I", "V"], correctAnswer: "B", rewardMessage: "You got it!" },
    { id: "blr_17", type: "singleLetter", instruction: "Find the letter F", voicePrompt: "Can you spot the letter F?", target: "F", choices: ["F", "U", "C", "Z"], correctAnswer: "F", rewardMessage: "Fantastic work!" },
    { id: "blr_18", type: "singleLetter", instruction: "Find the letter N", voicePrompt: "Where is the letter N?", target: "N", choices: ["X", "O", "N", "S"], correctAnswer: "N", rewardMessage: "Nice choice!" },
    { id: "blr_19", type: "singleLetter", instruction: "Find the letter J", voicePrompt: "Tap the letter J!", target: "J", choices: ["M", "T", "V", "J"], correctAnswer: "J", rewardMessage: "Joyful success!" },
    { id: "blr_20", type: "singleLetter", instruction: "Find the letter V", voicePrompt: "Touch the letter V!", target: "V", choices: ["V", "O", "L", "C"], correctAnswer: "V", rewardMessage: "Incredible tracking!" },
    { id: "blr_21", type: "singleLetter", instruction: "Find the letter W", voicePrompt: "Look for the letter W!", target: "W", choices: ["S", "W", "X", "I"], correctAnswer: "W", rewardMessage: "Wonderful!" },
    { id: "blr_22", type: "singleLetter", instruction: "Find the letter I", voicePrompt: "Can you find the letter I?", target: "I", choices: ["O", "C", "I", "U"], correctAnswer: "I", rewardMessage: "Bingo!" },
    { id: "blr_23", type: "singleLetter", instruction: "Find the letter E", voicePrompt: "Where is the letter E?", target: "E", choices: ["Z", "M", "S", "E"], correctAnswer: "E", rewardMessage: "Great attention!" },
    { id: "blr_24", type: "singleLetter", instruction: "Find the letter U", voicePrompt: "Tap the letter U!", target: "U", choices: ["U", "X", "O", "T"], correctAnswer: "U", rewardMessage: "Superb!" },
    { id: "blr_25", type: "singleLetter", instruction: "Find the letter D", voicePrompt: "Look carefully for the letter D!", target: "D", choices: ["K", "S", "D", "V"], correctAnswer: "D", rewardMessage: "Splendid find!" },
    { id: "blr_26", type: "singleLetter", instruction: "Find the letter Q", voicePrompt: "Touch the letter Q!", target: "Q", choices: ["X", "M", "O", "Q"], correctAnswer: "Q", rewardMessage: "Brilliant matching!" },
    { id: "blr_27", type: "singleLetter", instruction: "Find the letter A again", voicePrompt: "Can you spot the letter A?", target: "A", choices: ["Z", "A", "C", "S"], correctAnswer: "A", rewardMessage: "Superb repetition!" },
    { id: "blr_28", type: "singleLetter", instruction: "Find the letter B again", voicePrompt: "Where is the letter B?", target: "B", choices: ["O", "X", "B", "U"], correctAnswer: "B", rewardMessage: "Nailed it!" },
    { id: "blr_29", type: "singleLetter", instruction: "Find the letter M again", voicePrompt: "Tap the letter M!", target: "M", choices: ["M", "W", "O", "C"], correctAnswer: "M", rewardMessage: "Spot on!" },
    { id: "blr_30", type: "singleLetter", instruction: "Find the letter S again", voicePrompt: "Last beginner challenge! Find the letter S!", target: "S", choices: ["I", "K", "Z", "S"], correctAnswer: "S", rewardMessage: "Beginner Level Complete! Amazing job!" }
  ] as LetterRecognitionQuestion[],

  // Simple words processing configuration
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

  // Syllabic segmentation tracking maps
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