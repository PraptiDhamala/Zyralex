export const advancedPhonics = Array.from({ length: 40 }, (_, idx) => {
  const terms = [
    { w: "beautiful", p: ["beau", "ti", "ful"], s: ["/ˈbjuː/", "/tɪ/", "/fʊl/"] },
    { w: "elephant", p: ["el", "e", "phant"], s: ["/ˈɛ/", "/lɪ/", "/fənt/"] },
    { w: "yesterday", p: ["yes", "ter", "day"], s: ["/ˈjɛs/", "/tər/", "/deɪ/"] },
    { w: "remember", p: ["re", "mem", "ber"], s: ["/rɪ/", "/ˈmɛm/", "/bər/"] },
    { w: "communication", p: ["com", "mu", "ni", "ca", "tion"], s: ["/kə/", "/mjuː/", "/nɪ/", "/keɪ/", "/ʃən/"] },
    { w: "responsibility", p: ["re", "spon", "si", "bil", "i", "ty"], s: ["/rɪ/", "/ˌspɒn/", "/sə/", "/ˈbɪl/", "/ə/", "/ti/"] }
  ];
  const choice = terms[idx % terms.length];
  return { word: `${choice.w}`, phonemes: choice.p, sounds: choice.s };
});