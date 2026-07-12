const WORD_LIST = [
  "beautiful",
  "elephant",
  "computer",
  "umbrella",
  "adventure",
  "chocolate",
  "dinosaur",
  "mountain",
  "butterfly",
  "telephone",
  "sandwich",
  "vacation",
  "hospital",
  "calendar",
  "furniture",
  "chicken",
  "vegetable",
  "airplane",
  "birthday",
  "magazine",
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getWordOfTheDay(): string {
  const today = new Date();
  return WORD_LIST[dayOfYear(today) % WORD_LIST.length];
}
