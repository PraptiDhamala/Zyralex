import { LetterChallenge, WordChallenge, SyllableChallenge } from "../beginner/lessonPractice";

export const ADVANCED_LESSON_DATA = {
  letterRecognition: Array.from({ length: 40 }, (_, idx) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const target = letters[idx % letters.length];
    // Generate confusing font-swap layouts for high-speed verification testing
    const options = [target, letters[(idx + 4) % 26], letters[(idx + 9) % 26], letters[(idx + 15) % 26]].sort(() => Math.random() - 0.5);
    return {
      id: `alr_${idx + 1}`,
      targetLetter: target,
      options,
      audioPrompt: `Focus through the background clutter and capture the true letter: ${target.toUpperCase()}!`
    };
  }) as LetterChallenge[],

  wordConstruction: [
    { id: "asw_1",  word: "BEAUTIFUL",    scrambled: ["U", "B", "A", "E", "I", "F", "L", "T", "O"], meaningClue: "🌸 Gorgeous to observe!", audioPrompt: "Spell out: BEAUTIFUL." },
    { id: "asw_2",  word: "ELEPHANT",     scrambled: ["P", "E", "L", "H", "A", "N", "T", "E"],      meaningClue: "🐘 Enormous mammal with a long trunk!", audioPrompt: "Spell out: ELEPHANT." },
    { id: "asw_3",  word: "YESTERDAY",    scrambled: ["Y", "E", "S", "T", "E", "R", "D", "A"],      meaningClue: "📅 The complete calendar day right before today!", audioPrompt: "Assemble: YESTERDAY." },
    { id: "asw_4",  word: "REMEMBER",     scrambled: ["M", "E", "R", "E", "M", "B", "E", "R"],      meaningClue: "🧠 To pull memories back up into active thoughts!", audioPrompt: "Spell: REMEMBER." },
    { id: "asw_5",  word: "DINOSAUR",     scrambled: ["S", "D", "I", "N", "O", "A", "U", "R"],      meaningClue: "🦖 Extinct ancient reptile from long ago!", audioPrompt: "Assemble: DINOSAUR." },
    { id: "asw_6",  word: "HOSPITAL",     scrambled: ["P", "H", "O", "S", "I", "T", "A", "L"],      meaningClue: "🏥 Place for professional healthcare!", audioPrompt: "Spell: HOSPITAL." },
    { id: "asw_7",  word: "COMPUTER",     scrambled: ["M", "C", "O", "P", "U", "T", "E", "R"],      meaningClue: "💻 Processing machine running data software systems!", audioPrompt: "Build the word: COMPUTER." },
    { id: "asw_8",  word: "UMBRELLA",     scrambled: ["M", "U", "B", "R", "E", "L", "L", "A"],      meaningClue: "☔ Canvas protection covering against rain clouds!", audioPrompt: "Assemble: UMBRELLA." },
    { id: "asw_9",  word: "ASTRONAUT",    scrambled: ["S", "A", "T", "R", "O", "N", "A", "U", "T"], meaningClue: "🚀 Space explorer traveling on space rockets!", audioPrompt: "Spell: ASTRONAUT." },
    { id: "asw_10", word: "MICROSCOPE",   scrambled: ["C", "M", "I", "R", "O", "S", "C", "P", "E"], meaningClue: "🔬 Lens tool that magnifying micro-structures!", audioPrompt: "Spell out: MICROSCOPE." },
    { id: "asw_11", word: "TELESCOPE",    scrambled: ["E", "T", "L", "E", "S", "C", "O", "P"],      meaningClue: "🔭 Tool to observe starry galaxies!", audioPrompt: "Assemble: TELESCOPE." },
    { id: "asw_12", word: "HELICOPTER",   scrambled: ["L", "H", "E", "I", "C", "O", "P", "T", "R"], meaningClue: "🚁 Aerial transport with spinning rotors up top!", audioPrompt: "Spell: HELICOPTER." },
    { id: "asw_13", word: "SUBMARINE",    scrambled: ["B", "S", "U", "M", "A", "R", "I", "N", "E"], meaningClue: "⚓ Undersea boat cruising under blue oceans!", audioPrompt: "Assemble: SUBMARINE." },
    { id: "asw_14", word: "MOTORCYCLE",   scrambled: ["T", "M", "O", "O", "R", "C", "Y", "C", "L"], meaningClue: "🏍️ Two-wheeled fast road transport vehicle!", audioPrompt: "Spell out: MOTORCYCLE." },
    { id: "asw_15", word: "CALCULATOR",   scrambled: ["L", "C", "A", "C", "U", "A", "T", "O", "R"], meaningClue: "🧮 Math helper machine processing equations!", audioPrompt: "Build the word: CALCULATOR." },
    { id: "asw_16", word: "DICTIONARY",   scrambled: ["C", "D", "I", "T", "I", "O", "N", "A", "R"], meaningClue: "📚 Thick book containing terminology meanings!", audioPrompt: "Spell: DICTIONARY." },
    { id: "asw_17", word: "CATERPILLAR",  scrambled: ["T", "C", "A", "E", "R", "P", "I", "L", "R"], meaningClue: "🐛 Creeping insect transitioning into butterflies!", audioPrompt: "Assemble: CATERPILLAR." },
    { id: "asw_18", word: "BUTTERFLY",    scrambled: ["T", "B", "U", "T", "E", "R", "F", "L", "Y"], meaningClue: "🦋 Delicate winged insect seeking floral nectar!", audioPrompt: "Spell out: BUTTERFLY." },
    { id: "asw_19", word: "DRAGONFLY",    scrambled: ["G", "D", "R", "A", "O", "N", "F", "L", "Y"], meaningClue: "🛸 Quick four-winged flyer zooming across ponds!", audioPrompt: "Spell out: DRAGONFLY." },
    { id: "asw_20", word: "GRASSHOPPER",  scrambled: ["S", "G", "R", "A", "S", "H", "O", "P", "R"], meaningClue: "🦗 Jumping green lawn insect making loud chirps!", audioPrompt: "Assemble: GRASSHOPPER." },
    { id: "asw_21", word: "WATERMELON",   scrambled: ["T", "W", "A", "E", "R", "M", "E", "L", "O"], meaningClue: "🍉 Giant juicy fruit packed with pink water pulp!", audioPrompt: "Spell out: WATERMELON." },
    { id: "asw_22", word: "STRAWBERRY",   scrambled: ["T", "S", "R", "A", "W", "B", "E", "R", "Y"], meaningClue: "🍓 Sweet red summer treat with outer seeds!", audioPrompt: "Build the word: STRAWBERRY." },
    { id: "asw_23", word: "PINEAPPLE",    scrambled: ["N", "P", "I", "E", "A", "P", "P", "L", "E"], meaningClue: "🍍 Golden spiky tropical plantation treat!", audioPrompt: "Assemble: PINEAPPLE." },
    { id: "asw_24", word: "AVOCADO",      scrambled: ["V", "A", "O", "C", "A", "D", "O"],           meaningClue: "🥑 Green pear-shaped item with a solid inner seed!", audioPrompt: "Spell: AVOCADO." },
    { id: "asw_25", word: "SPAGHETTI",    scrambled: ["P", "S", "A", "G", "H", "E", "T", "I"],      meaningClue: "🍝 Long twisted strands of hot boiling noodles!", audioPrompt: "Assemble: SPAGHETTI." },
    { id: "asw_26", word: "HAMBURGER",    scrambled: ["M", "H", "A", "B", "U", "R", "G", "E", "R"], meaningClue: "🍔 Toasted buns containing hot meat patties!", audioPrompt: "Spell: HAMBURGER." },
    { id: "asw_27", word: "SANDWICH",     scrambled: ["N", "S", "A", "D", "W", "I", "C", "H"],      meaningClue: "🥪 Food slices stacked inside fresh bread slices!", audioPrompt: "Build the word: SANDWICH." },
    { id: "asw_28", word: "CHOCOLATE",    scrambled: ["O", "C", "H", "C", "O", "L", "A", "T", "E"], meaningClue: "🍫 Sweet dark brown confectionery bars!", audioPrompt: "Assemble: CHOCOLATE." },
    { id: "asw_29", word: "MARSHMALLOW",  scrambled: ["R", "M", "A", "S", "H", "M", "A", "L", "O"], meaningClue: "🍡 Puffy white sugar structures toasted on camps!", audioPrompt: "Spell: MARSHMALLOW." },
    { id: "asw_30", word: "DANGEROUS",    scrambled: ["N", "D", "A", "G", "E", "R", "O", "U", "S"], meaningClue: "⚠️ Full of severe safety risks and hazards!", audioPrompt: "Assemble: DANGEROUS." },
    { id: "asw_31", word: "POWERFUL",     scrambled: ["W", "P", "O", "E", "R", "F", "U", "L"],      meaningClue: "⚡ Exploding with great mechanical strength!", audioPrompt: "Spell: POWERFUL." },
    { id: "asw_32", word: "WONDERFUL",    scrambled: ["O", "W", "N", "D", "E", "R", "F", "U", "L"], meaningClue: "⭐ Outstandingly beautiful and refreshing!", audioPrompt: "Assemble: WONDERFUL." },
    { id: "asw_33", word: "CAREFULLY",    scrambled: ["R", "C", "A", "E", "F", "U", "L", "L", "Y"], meaningClue: "🛡️ Doing tasks with focused safety caution!", audioPrompt: "Spell: CAREFULLY." },
    { id: "asw_34", word: "EXCITEDLY",    scrambled: ["X", "E", "C", "I", "T", "E", "D", "L", "Y"], meaningClue: "🎉 Behaving with full energetic enthusiasm!", audioPrompt: "Build the word: EXCITEDLY." },
    { id: "asw_35", word: "COMMUNITY",    scrambled: ["O", "C", "M", "M", "U", "N", "I", "T", "Y"], meaningClue: "🏘️ Neighborhood of citizens living linked together!", audioPrompt: "Spell: COMMUNITY." },
    { id: "asw_36", word: "EDUCATION",    scrambled: ["D", "E", "U", "C", "A", "T", "I", "O", "N"], meaningClue: "📚 Active process of learning academic knowledge!", audioPrompt: "Assemble: EDUCATION." },
    { id: "asw_37", word: "CELEBRATION",  scrambled: ["E", "C", "L", "E", "B", "R", "A", "T", "O"], meaningClue: "🥳 Festive gathering to mark grand events!", audioPrompt: "Spell: CELEBRATION." },
    { id: "asw_38", word: "ENVIRONMENT",  scrambled: ["N", "E", "V", "I", "R", "O", "M", "E", "N"], meaningClue: "🌲 Total ecosystem around land and air wildlife!", audioPrompt: "Build: ENVIRONMENT." },
    { id: "asw_39", word: "IMPROVEMENT",  scrambled: ["M", "I", "P", "R", "O", "V", "E", "M", "N"], meaningClue: "📈 Modifying features to enhance total quality!", audioPrompt: "Spell: IMPROVEMENT." },
    { id: "asw_40", word: "MANAGEMENT",   scrambled: ["A", "M", "N", "A", "G", "E", "M", "E", "N"], meaningClue: "👔 Team controlling organizational operations!", audioPrompt: "Last one! Spell out: MANAGEMENT." }
  ] as WordChallenge[],

  syllableMatching: Array.from({ length: 40 }, (_, idx) => {
    const list = [
      { w: "GIGANTIC", c: 3, b: "GI - GAN - TIC", k: "🦖 Incredibly huge structural scale!" },
      { w: "FANTASTIC", c: 3, b: "FAN - TAS - TIC", k: "🌟 Completely excellent or superb!" },
      { w: "TOMORROW", c: 3, b: "TO - MOR - ROW", k: "📅 The upcoming day following today!" },
      { w: "ALPHABET", c: 3, b: "AL - PHA - BET", k: "🔤 Arranged setup of character sets!" }
    ];
    const item = list[idx % list.length];
    return {
      id: `asyl_${idx + 1}`,
      word: `${item.w}_${idx}`,
      syllablesCount: item.c,
      breakdown: item.b,
      meaningClue: item.k,
      audioPrompt: `Break down this multisyllabic unit: ${item.w}. Clap out the sections!`
    };
  }) as SyllableChallenge[]
};