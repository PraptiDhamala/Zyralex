const lesson = {
  id: "phonics_level3",
  title: "Silent Letter Detective",
  subtitle:
    "Some letters hide inside words without making a single peep. Let's catch them!",
  color: "#93C5FD",
  mascot: "assets/mimo1.png",
  progressColor: "#1D4ED8",

  introduction: {
    mascotMessage:
      "Shhh... 🦉 I'm Detective Mimo! Some tricky letters are playing hide-and-seek inside our words today. Grab your magnifying glass and let's spot them together!",
  },

  explanation: [
    {
      type: "text",
      content:
        "Some letters are totally silent! We must write them down, but when we say the word out loud, they stay perfectly quiet.",
      animationType: "pulse-on-audio",
      visualAnchor: "🤫 SILENT",
    },
    {
      type: "tip",
      content:
        "Look at 'knee'! The letter K acts like a ghost — it's completely silent, so we just say 'nee'!",
      animationType: "morph-asset",
      visualAnchor: "kn ➔ knee 🦵",
    },
    {
      type: "tip",
      content:
        "In the word 'wrist', the W is taking a nap! Zip right past it and start your sound with 'rist'.",
      animationType: "morph-asset",
      visualAnchor: "wr ➔ wrist ",
    },
    {
      type: "story",
      content:
        "The letter R is superhero word such that it completely changes how the vowels sound.",
      animationType: "pulse-on-audio",
      visualAnchor: "ar er ir or ur",
    },
    {
      type: "tip",
      content:
        "Say 'car' out loud! Hear how the R stretches out the A sound? That is the magic R-controlled trick!",
      animationType: "stroke-by-stroke",
      visualAnchor: "c + ar = car 🚗",
    },
    {
      type: "activity",
      content:
        "Let's warm up your  voice! Say the word or sentence at your pace.",
      animationType: "follow-the-dot",
      visualAnchor: "🗣️ SAY IT!",
    },
  ],

  examples: [
    {
      letter: "kn",
      word: "knee",
      emoji: "🦵",
      sentence: "Kn-ee ➔ The K is sneaky and stays silent!",
      color: "#2563EB",
    },
    {
      letter: "wr",
      word: "wrist",
      emoji: "✋",
      sentence: "Wr-ist ➔ The W hides while the R does the talking!",
      color: "#F59E0B",
    },
    {
      word: "car",
      letter: "Car",
      emoji: "🚗",
      sentence:
        "C-ar ➔ The AR sound works together like a single powerhouse team.",
      color: "#16A34A",
    },
    {
      letter: "Bird",
      word: "bird",
      emoji: "🐦",
      sentence: "B-ird ➔ The IR combo makes a unique chirping sound team!",
      color: "#7C3AED",
    },
  ],

  guidedPractice: [
    {
      interactionType: "tap-to-reveal",
      question: " Which letter stays completely silent in 'knee'?",
      options: ["k", "n", "e"],
      answer: "k",
      successMessage: "Aha! You caught the silent ghost letter K! 🎉",
    },
    {
      interactionType: "tap-to-reveal",
      question:
        " Inspect the word carefully! Which letter is hiding its voice in 'wrist'?",
      options: ["w", "r", "s"],
      answer: "w",
      successMessage:
        "Brilliant! The letter W was hiding, but you spotted it! 🔍",
    },
    {
      interactionType: "drag-and-drop",
      question:
        " Listen to the engine zoom! Which word uses the blended AR vowel team?",
      options: ["car", "cat"],
      answer: "car",
      successMessage: "Vroom! 'Car' has that strong R-controlled sound! 🚗",
    },
    {
      interactionType: "drag-and-drop",
      question: "🐦 Which flying friend contains the hidden 'ir' team sound?",
      options: ["bird", "bed"],
      answer: "bird",
      successMessage: "Incredible! You tracked down the 'ir' blend in bird! 🐦",
    },
    {
      interactionType: "tap-to-reveal",
      question:
        "🔪 Look closely at these tools! Which word begins with a secret silent letter?",
      options: ["knife", "table"],
      answer: "knife",
      successMessage: "Spot on! 'Knife' starts with that secret silent K! 🗡️",
    },
    {
      interactionType: "tap-to-reveal",
      question:
        "✏️ Which action word starts with a hidden, silent letter teammate?",
      options: ["write", "chair"],
      answer: "write",
      successMessage: "Sensational! You found the hidden W in 'write'! 📝",
    },
  ],
  challengeRound: [
    {
      scrambled: "eekn",
      answer: "knee",
      hint: "🦵 Tap to fix this leg joint word!",
    },
    {
      scrambled: "tirsw",
      answer: "wrist",
      hint: "✋ Unscramble your hand connector!",
    },
    {
      scrambled: "rac",
      answer: "car",
      hint: "🚗 Fix the broken car engine parts!",
    },
  ],

  motivationalTips: [
    "🌟 Tricky silent letters puzzle even grown-up readers — you are mastering an incredible secret trick!",
    "🌟 Hearing how the bossy R changes the sound? Your ears are getting super strong!",
    "🌟 Great readers read slowly to check for hidden letters. You're doing spectacular!",
  ],

  rewards: {
    stars: 5,
    badge: "🕵️‍♂️ Master Detective",
    message:
      "Incredible deductions! You unlocked the Master Silent Letter Detective Badge! 🎖️",
  },

  completionMessage:
    "🏆 Mission Accomplished! You can spot silent letters and decode bossy R-controlled vowels like a true certified Master Detective! Mimo is celebrating your big win! 🚀🎉",
};

export default lesson;
