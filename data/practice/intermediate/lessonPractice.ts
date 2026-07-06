// data/practice/intermediate/lessonPractice.ts

import { SyllableChallenge, WordChallenge } from '../beginner/lessonPractice';
import { LetterRecognitionQuestion } from '../types';

// Unified interface to structure the lesson data cleanly
export interface LessonDataStructure {
  letterRecognition: LetterRecognitionQuestion[];
  simpleWords: WordChallenge[];
  syllableBasics: SyllableChallenge[];
}

export const INTERMEDIATE_LESSON_DATA: LessonDataStructure = {
  letterRecognition: [
    { id: "ilr_1", type: "similarLetter", instruction: "Find lowercase b", voicePrompt: "Can you find lowercase b?", target: "b", choices: ["d", "p", "b", "q"], correctAnswer: "b", rewardMessage: "Excellent flip detection!" },
    { id: "ilr_2", type: "similarLetter", instruction: "Find uppercase E", voicePrompt: "Can you find uppercase E?", target: "E", choices: ["F", "B", "E", "P", "R", "L"], correctAnswer: "E", rewardMessage: "Stellar line detection!" },
    { id: "ilr_3", type: "similarLetter", instruction: "Find lowercase m", voicePrompt: "Can you find lowercase m?", target: "m", choices: ["m", "n", "w", "u", "h", "r"], correctAnswer: "m", rewardMessage: "Perfect peak scanning!" },
    { id: "ilr_4", type: "similarLetter", instruction: "Find lowercase d", voicePrompt: "Where is lowercase d?", target: "d", choices: ["b", "q", "p", "d", "h", "o"], correctAnswer: "d", rewardMessage: "Smart scanning!" },
    { id: "ilr_5", type: "similarLetter", instruction: "Find lowercase p", voicePrompt: "Can you catch lowercase p?", target: "p", choices: ["q", "g", "b", "d", "p", "y"], correctAnswer: "p", rewardMessage: "Spectacular!" },
    { id: "ilr_6", type: "similarLetter", instruction: "Find lowercase q", voicePrompt: "Tap the lowercase q!", target: "q", choices: ["p", "b", "d", "g", "q", "o"], correctAnswer: "q", rewardMessage: "Sensational!" },
    { id: "ilr_7", type: "similarLetter", instruction: "Find lowercase n", voicePrompt: "Look for lowercase n!", target: "n", choices: ["u", "m", "h", "r", "n", "v"], correctAnswer: "n", rewardMessage: "Way to differentiate!" },
    { id: "ilr_8", type: "similarLetter", instruction: "Find lowercase u", voicePrompt: "Touch lowercase u!", target: "u", choices: ["n", "v", "w", "u", "m", "o"], correctAnswer: "u", rewardMessage: "Wonderful upside check!" },
    { id: "ilr_9", type: "similarLetter", instruction: "Find lowercase w", voicePrompt: "Where is lowercase w?", target: "w", choices: ["m", "v", "u", "w", "x", "n"], correctAnswer: "w", rewardMessage: "Awesome reading!" },
    { id: "ilr_10", type: "similarLetter", instruction: "Find lowercase t", voicePrompt: "Tap lowercase t!", target: "t", choices: ["f", "l", "i", "t", "j", "r"], correctAnswer: "t", rewardMessage: "Great tracking!" },
    { id: "ilr_11", type: "similarLetter", instruction: "Find lowercase f", voicePrompt: "Spot lowercase f!", target: "f", choices: ["t", "j", "l", "f", "i", "k"], correctAnswer: "f", rewardMessage: "Top tier focus!" },
    { id: "ilr_12", type: "similarLetter", instruction: "Find uppercase F", voicePrompt: "Find uppercase F!", target: "F", choices: ["E", "L", "T", "F", "H", "I"], correctAnswer: "F", rewardMessage: "Super job!" },
    { id: "ilr_13", type: "similarLetter", instruction: "Find uppercase C", voicePrompt: "Can you see uppercase C?", target: "C", choices: ["G", "O", "Q", "C", "D", "U"], correctAnswer: "C", rewardMessage: "Brilliant eye!" },
    { id: "ilr_14", type: "similarLetter", instruction: "Find uppercase G", voicePrompt: "Touch uppercase G!", target: "G", choices: ["C", "O", "Q", "D", "G", "S"], correctAnswer: "G", rewardMessage: "Incredible!" },
    { id: "ilr_15", type: "similarLetter", instruction: "Find uppercase O", voicePrompt: "Tap uppercase O!", target: "O", choices: ["Q", "C", "G", "D", "O", "U"], correctAnswer: "O", rewardMessage: "Perfect alignment!" },
    { id: "ilr_16", type: "similarLetter", instruction: "Find uppercase Q", voicePrompt: "Where is uppercase Q?", target: "Q", choices: ["O", "G", "C", "Q", "D", "O"], correctAnswer: "Q", rewardMessage: "Spot on!" },
    { id: "ilr_17", type: "similarLetter", instruction: "Find lowercase s", voicePrompt: "Look for lowercase s!", target: "s", choices: ["z", "c", "e", "s", "x", "a"], correctAnswer: "s", rewardMessage: "Magnificent curve tracking!" },
    { id: "ilr_18", type: "similarLetter", instruction: "Find lowercase z", voicePrompt: "Tap lowercase z!", target: "z", choices: ["s", "x", "e", "z", "c", "v"], correctAnswer: "z", rewardMessage: "Awesome!" },
    { id: "ilr_19", type: "similarLetter", instruction: "Find lowercase a", voicePrompt: "Find lowercase a!", target: "a", choices: ["o", "e", "c", "g", "a", "d"], correctAnswer: "a", rewardMessage: "Stunning skill!" },
    { id: "ilr_20", type: "similarLetter", instruction: "Find lowercase e", voicePrompt: "Can you catch lowercase e?", target: "e", choices: ["o", "c", "a", "e", "d", "g"], correctAnswer: "e", rewardMessage: "Terrific spot!" },
    { id: "ilr_21", type: "similarLetter", instruction: "Find uppercase M", voicePrompt: "Where is uppercase M?", target: "M", choices: ["W", "N", "V", "M", "H", "U"], correctAnswer: "M", rewardMessage: "Great flip adjustment!" },
    { id: "ilr_22", type: "similarLetter", instruction: "Find uppercase W", voicePrompt: "Tap uppercase W!", target: "W", choices: ["M", "V", "N", "W", "U", "A"], correctAnswer: "W", rewardMessage: "Fantastic!" },
    { id: "ilr_23", type: "similarLetter", instruction: "Find lowercase h", voicePrompt: "Look for lowercase h!", target: "h", choices: ["n", "m", "r", "b", "h", "l"], correctAnswer: "h", rewardMessage: "Stem checked correctly!" },
    { id: "ilr_24", type: "similarLetter", instruction: "Find lowercase r", voicePrompt: "Find lowercase r!", target: "r", choices: ["n", "m", "i", "h", "r", "c"], correctAnswer: "r", rewardMessage: "Splendid track!" },
    { id: "ilr_25", type: "similarLetter", instruction: "Find lowercase l", voicePrompt: "Where is lowercase l?", target: "l", choices: ["i", "1", "t", "j", "l", "o"], correctAnswer: "l", rewardMessage: "Perfect vector matching!" },
    { id: "ilr_26", type: "similarLetter", instruction: "Find lowercase i", voicePrompt: "Tap lowercase i!", target: "i", choices: ["l", "1", "j", "t", "i", "I"], correctAnswer: "i", rewardMessage: "Caught the dot!" },
    { id: "ilr_27", type: "similarLetter", instruction: "Find lowercase j", voicePrompt: "Look for lowercase j!", target: "j", choices: ["i", "l", "g", "y", "j", "f"], correctAnswer: "j", rewardMessage: "Beautiful tracking!" },
    { id: "ilr_28", type: "similarLetter", instruction: "Find lowercase v", voicePrompt: "Touch lowercase v!", target: "v", choices: ["u", "w", "x", "y", "v", "r"], correctAnswer: "v", rewardMessage: "Super clean focus!" },
    { id: "ilr_29", type: "similarLetter", instruction: "Find lowercase k", voicePrompt: "Where is lowercase k?", target: "k", choices: ["x", "h", "l", "k", "t", "f"], correctAnswer: "k", rewardMessage: "Exceptional!" },
    { id: "ilr_30", type: "similarLetter", instruction: "Find lowercase x", voicePrompt: "Tap lowercase x!", target: "x", choices: ["k", "z", "v", "y", "x", "w"], correctAnswer: "x", rewardMessage: "Bullseye!" },
    { id: "ilr_31", type: "similarLetter", instruction: "Find lowercase b again", voicePrompt: "Can you track lowercase b?", target: "b", choices: ["d", "p", "q", "h", "b", "g"], correctAnswer: "b", rewardMessage: "Unstoppable processing!" },
    { id: "ilr_32", type: "similarLetter", instruction: "Find lowercase d again", voicePrompt: "Spot the lowercase d!", target: "d", choices: ["b", "p", "q", "g", "d", "o"], correctAnswer: "d", rewardMessage: "Nailed it!" },
    { id: "ilr_33", type: "similarLetter", instruction: "Find lowercase p again", voicePrompt: "Find lowercase p!", target: "p", choices: ["q", "b", "d", "j", "p", "g"], correctAnswer: "p", rewardMessage: "Fabulous!" },
    { id: "ilr_34", type: "similarLetter", instruction: "Find lowercase q again", voicePrompt: "Where is lowercase q?", target: "q", choices: ["p", "d", "b", "g", "q", "y"], correctAnswer: "q", rewardMessage: "Pure brilliance!" },
    { id: "ilr_35", type: "similarLetter", instruction: "Last one! Find lowercase m", voicePrompt: "Last challenge! Touch lowercase m!", target: "m", choices: ["n", "w", "u", "h", "m", "r"], correctAnswer: "m", rewardMessage: "Intermediate Tier Complete! Outstanding tracking!" }
  ],

  simpleWords: [
    { id: "isw_1",  word: "BIRD",  scrambled: ["R", "B", "I", "D"],  meaningClue: "🐦 Flaps its wings and chirps!", audioPrompt: "Spell the word: BIRD." },
    { id: "isw_2",  word: "FROG",  scrambled: ["O", "G", "F", "R"],  meaningClue: "🐸 Green and leaps around ponds!", audioPrompt: "Assemble the letters for: FROG." },
    { id: "isw_3",  word: "LAMP",  scrambled: ["M", "L", "A", "P"],  meaningClue: "💡 Shines light on your desk!", audioPrompt: "Let's build the word: LAMP." },
    { id: "isw_4",  word: "DUCK",  scrambled: ["K", "D", "U", "C"],  meaningClue: "🦆 Enjoys swimming and says quack!", audioPrompt: "Can you spell: DUCK?" },
    { id: "isw_5",  word: "FISH",  scrambled: ["H", "F", "I", "S"],  meaningClue: "🐟 Blows little bubbles underwater!", audioPrompt: "Spell out the word: FISH." },
    { id: "isw_6",  word: "SHIP",  scrambled: ["P", "S", "H", "I"],  meaningClue: "🚢 Massive vessel on open oceans!", audioPrompt: "Let's assemble the word: SHIP." },
    { id: "isw_7",  word: "MILK",  scrambled: ["K", "M", "I", "L"],  meaningClue: "🥛 Great for strong and healthy bones!", audioPrompt: "Find the blocks for: MILK." },
    { id: "isw_8",  word: "TENT",  scrambled: ["T", "N", "E", "T"],  meaningClue: "⛺ Perfect shelter when camping out!", audioPrompt: "Can you put together: TENT?" },
    { id: "isw_9",  word: "WIND",  scrambled: ["D", "W", "I", "N"],  meaningClue: "💨 Cool blowing air you can't see!", audioPrompt: "Spell the word: WIND." },
    { id: "isw_10", word: "CRAB",  scrambled: ["B", "C", "R", "A"],  meaningClue: "🦀 Walks sideways across sandy beaches!", audioPrompt: "Assemble the word: CRAB." },
    { id: "isw_11", word: "NEST",  scrambled: ["T", "N", "E", "S"],  meaningClue: "🪺 Safe cozy home built out of twigs!", audioPrompt: "Let's spell: NEST." },
    { id: "isw_12", word: "STAR",  scrambled: ["R", "S", "T", "A"],  meaningClue: "⭐ Sparkles far away in deep space!", audioPrompt: "Put together the word: STAR." },
    { id: "isw_13", word: "TREE",  scrambled: ["E", "T", "R", "E"],  meaningClue: "🌳 Grow high with wooden branches!", audioPrompt: "Spell out the word: TREE." },
    { id: "isw_14", word: "FIRE",  scrambled: ["R", "F", "I", "E"],  meaningClue: "🔥 Warm, glowing, and cracks loudly!", audioPrompt: "Can you spell: FIRE?" },
    { id: "isw_15", word: "MOON",  scrambled: ["N", "M", "O", "O"],  meaningClue: "🌙 Rises gracefully when evening falls!", audioPrompt: "Let's build the word: MOON." },
    { id: "isw_16", word: "BOAT",  scrambled: ["T", "B", "O", "A"],  meaningClue: "⛵ Glides cleanly across blue lakes!", audioPrompt: "Find the blocks for: BOAT." },
    { id: "isw_17", word: "LION",  scrambled: ["N", "L", "I", "O"],  meaningClue: "🦁 Big wild cat with a golden mane!", audioPrompt: "Spell out the word: LION." },
    { id: "isw_18", word: "RING",  scrambled: ["G", "R", "I", "N"],  meaningClue: "💍 Shiny circles worn on fingers!", audioPrompt: "Can you piece together: RING?" },
    { id: "isw_19", word: "CAKE",  scrambled: ["K", "C", "A", "E"],  meaningClue: "🍰 Sweet item baked for celebrations!", audioPrompt: "Let's spell the word: CAKE." },
    { id: "isw_20", word: "KITE",  scrambled: ["E", "K", "I", "T"],  meaningClue: "🪁 Dances around on windy afternoons!", audioPrompt: "Assemble the letters for: KITE." },
    { id: "isw_21", word: "APPLE", scrambled: ["E", "A", "P", "L", "P"], meaningClue: "🍎 A crunchy, sweet orchard fruit!", audioPrompt: "Let's spell: APPLE." },
    { id: "isw_22", word: "ROBOT", scrambled: ["T", "R", "O", "B", "O"], meaningClue: "🤖 Electronic toy that flashes loops!", audioPrompt: "Assemble the letters for: ROBOT." },
    { id: "isw_23", word: "SHARK", scrambled: ["K", "S", "H", "A", "R"], meaningClue: "🦈 Fast swimmer with sharp fins!", audioPrompt: "Spell out the word: SHARK." },
    { id: "isw_24", word: "CLOCK", scrambled: ["K", "C", "L", "O", "C"], meaningClue: "⏰ Ticks around to show current hours!", audioPrompt: "Can you spell: CLOCK?" },
    { id: "isw_25", word: "SNAKE", scrambled: ["E", "S", "N", "A", "K"], meaningClue: "🐍 Slithers through the green grass!", audioPrompt: "Let's assemble the word: SNAKE." },
    { id: "isw_26", word: "GRAPE", scrambled: ["E", "G", "R", "A", "P"], meaningClue: "🍇 Small juicy spheres on vines!", audioPrompt: "Find the building blocks for: GRAPE." },
    { id: "isw_27", word: "SPOON", scrambled: ["N", "S", "P", "O", "O"], meaningClue: "🥄 Used to eat warm cereal soups!", audioPrompt: "Spell out the word: SPOON." },
    { id: "isw_28", word: "TRAIN", scrambled: ["N", "T", "R", "A", "I"], meaningClue: "🚂 Chugs along iron tracks continuously!", audioPrompt: "Can you match pieces for: TRAIN?" },
    { id: "isw_29", word: "HOUSE", scrambled: ["E", "H", "O", "U", "S"], meaningClue: "🏠 Where families live together safely!", audioPrompt: "Let's build the word: HOUSE." },
    { id: "isw_30", word: "ZEBRA", scrambled: ["A", "Z", "E", "B", "R"], meaningClue: "🦓 Striped horse roaming open fields!", audioPrompt: "Last one! Let's build: ZEBRA." }
  ],

  syllableBasics: [
    { id: "isyl_1",  word: "GARDEN",    syllablesCount: 2, breakdown: "GAR - DEN",    meaningClue: "🏡 Patch where colorful flowers blossom!", audioPrompt: "Listen carefully: GAR-DEN. Count the beats!" },
    { id: "isyl_2",  word: "WINTER",    syllablesCount: 2, breakdown: "WIN - TER",    meaningClue: "❄️ Cold season with white falling snow!", audioPrompt: "How many syllables in WIN-TER?" },
    { id: "isyl_3",  word: "RABBIT",    syllablesCount: 2, breakdown: "RAB - BIT",    meaningClue: "🐇 Fuzzy ears and hops through bushes!", audioPrompt: "Clap along to the beats: RAB-BIT." },
    { id: "isyl_4",  word: "FLOWER",    syllablesCount: 2, breakdown: "FLOW - ER",    meaningClue: "🌻 Smells wonderful and opens in spring!", audioPrompt: "Count the sections: FLOW-ER." },
    { id: "isyl_5",  word: "WINDOW",    syllablesCount: 2, breakdown: "WIN - DOW",    meaningClue: "🪟 Clear pane that lets warm sunlight in!", audioPrompt: "Let's tap out: WIN-DOW." },
    { id: "isyl_6",  word: "BASKET",    syllablesCount: 2, breakdown: "BAS - KET",    meaningClue: "🧺 Woven holder used to carry apples!", audioPrompt: "How many beats in BAS-KET?" },
    { id: "isyl_7",  word: "BUTTER",    syllablesCount: 2, breakdown: "BUT - TER",    meaningClue: "🧈 Creamy yellow spread for fresh bread!", audioPrompt: "Count the pieces: BUT-TER." },
    { id: "isyl_8",  word: "DOCTOR",    syllablesCount: 2, breakdown: "DOC - TOR",    meaningClue: "🩺 Friendly helper when you feel unwell!", audioPrompt: "Clap it out: DOC-TOR." },
    { id: "isyl_9",  word: "PENCIL",    syllablesCount: 2, breakdown: "PEN - CIL",    meaningClue: "✏️ Lead tool used to draw cute cartoons!", audioPrompt: "How many syllables in PEN-CIL?" },
    { id: "isyl_10", word: "CANDLE",    syllablesCount: 2, breakdown: "CAN - DLE",    meaningClue: "🕯️ Glowing wax stick that sheds bright light!", audioPrompt: "Listen close: CAN-DLE. Count them!" },
    { id: "isyl_11", word: "POCKET",    syllablesCount: 2, breakdown: "POCK - ET",    meaningClue: "🪙 Little pouch inside coats to hold coins!", audioPrompt: "Tap the rhythms: POCK-ET." },
    { id: "isyl_12", word: "ROCKET",    syllablesCount: 2, breakdown: "ROCK - ET",    meaningClue: "🚀 Launches straight out into stellar space!", audioPrompt: "How many parts in ROCK-ET?" },
    { id: "isyl_13", word: "JACKET",    syllablesCount: 2, breakdown: "JACK - ET",    meaningClue: "🧥 Keeps you cozy against chilly breezes!", audioPrompt: "Clap together: JACK-ET." },
    { id: "isyl_14", word: "BLANKET",   syllablesCount: 2, breakdown: "BLAN - KET",   meaningClue: "🛌 Soft woven sheet spread across beds!", audioPrompt: "Count the parts: BLAN-KET." },
    { id: "isyl_15", word: "PLANET",    syllablesCount: 2, breakdown: "PLAN - ET",    meaningClue: "🌍 Celestial sphere like Earth or Mars!", audioPrompt: "Let's tap out: PLAN-ET." },
    { id: "isyl_16", word: "SILVER",    syllablesCount: 2, breakdown: "SIL - VER",    meaningClue: "🥈 Shiny metal used to make awards!", audioPrompt: "How many beats in SIL-VER?" },
    { id: "isyl_17", word: "FOREST",    syllablesCount: 2, breakdown: "FOR - EST",    meaningClue: "🌲 Dense woods where tall trees thrive!", audioPrompt: "Count along: FOR-EST." },
    { id: "isyl_18", word: "SUMMER",    syllablesCount: 2, breakdown: "SUM - MER",    meaningClue: "🏖️ Warm sunny break for beach trips!", audioPrompt: "Clap it out: SUM-MER." },
    { id: "isyl_19", word: "TURTLE",    syllablesCount: 2, breakdown: "TUR - TLE",    meaningClue: "🐢 Carries its hard home wherever it crawls!", audioPrompt: "How many beats in TUR-TLE?" },
    { id: "isyl_20", word: "LIZARD",    syllablesCount: 2, breakdown: "LIZ - ARD",    meaningClue: "🦎 Tiny reptile basking on sunny stones!", audioPrompt: "Count sections for: LIZ-ARD." },
    { id: "isyl_21", word: "KITTEN",    syllablesCount: 2, breakdown: "KIT - TEN",    meaningClue: "🐱 Baby cat that loves chasing string yarn!", audioPrompt: "How many parts in KIT-TEN?" },
    { id: "isyl_22", word: "PURPLE",    syllablesCount: 2, breakdown: "PUR - PLE",    meaningClue: "🍇 Color mixed from rich shades of blue and red!", audioPrompt: "Clap along: PUR-PLE." },
    { id: "isyl_23", word: "YELLOW",    syllablesCount: 2, breakdown: "YEL - LOW",    meaningClue: "🍋 Bright color of standard fresh lemons!", audioPrompt: "Count the sections: YEL-LOW." },
    { id: "isyl_24", word: "ORANGE",    syllablesCount: 2, breakdown: "OR - ANGE",    meaningClue: "🍊 Round, juicy citrus full of sweet vitamins!", audioPrompt: "Let's tap out: OR-ANGE." },
    { id: "isyl_25", word: "POTATO",    syllablesCount: 3, breakdown: "PO - TA - TO",   meaningClue: "🥔 Starchy vegetable pulled from dirt rows!", audioPrompt: "Listen: PO-TA-TO. Count the parts!" },
    { id: "isyl_26", word: "TOMATO",    syllablesCount: 3, breakdown: "TO - MA - TO",   meaningClue: "🍅 Bright red salad item grown on fields!", audioPrompt: "How many syllables in TO-MA -TO?" },
    { id: "isyl_27", word: "REPORTER",  syllablesCount: 3, breakdown: "RE - POR - TER", meaningClue: "📰 Person sharing crucial events on air!", audioPrompt: "Clap along: RE-POR-TER." },
    { id: "isyl_28", word: "UMBRELLA",  syllablesCount: 3, breakdown: "UM - BREL - LA", meaningClue: "☔ Shield that deflects raindrops reliably!", audioPrompt: "Count the sections: UM-BREL-LA." },
    { id: "isyl_29", word: "COMPANION", syllablesCount: 3, breakdown: "COM - PAN - ION",meaningClue: "🤝 Trusty partner walking right alongside you!", audioPrompt: "How many beats in COM-PAN-ION?" },
    { id: "isyl_30", word: "EXPLOSION", syllablesCount: 3, breakdown: "EX - PLO - SION",meaningClue: "💥 Loud spectacular outburst of force energy!", audioPrompt: "Last one! Count parts in: EX-PLO-SION!" }
  ]
};