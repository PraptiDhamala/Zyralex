import { WordEntry } from "./words";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface WordPlacement {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export interface GeneratedGrid {
  grid: string[][];
  placements: WordPlacement[];
}

function createEmptyGrid(size: number): string[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "")
  );
}

function getRandomLetter() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function placeWord(
  grid: string[][],
  word: string
): WordPlacement | null {
  const size = grid.length;

  const directions = [
    { dx: 1, dy: 0 },   // horizontal
    { dx: 0, dy: 1 },   // vertical
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: -1, dy: 1 },  // diagonal down-left
  ];

  for (let attempt = 0; attempt < 100; attempt++) {
    const dir =
      directions[Math.floor(Math.random() * directions.length)];

    const startCol = Math.floor(Math.random() * size);
    const startRow = Math.floor(Math.random() * size);

    const endCol = startCol + dir.dx * (word.length - 1);
    const endRow = startRow + dir.dy * (word.length - 1);

    if (
      endCol < 0 ||
      endCol >= size ||
      endRow < 0 ||
      endRow >= size
    )
      continue;

    let valid = true;

    for (let i = 0; i < word.length; i++) {
      const r = startRow + dir.dy * i;
      const c = startCol + dir.dx * i;

      if (
        grid[r][c] !== "" &&
        grid[r][c] !== word[i].toUpperCase()
      ) {
        valid = false;
        break;
      }
    }

    if (!valid) continue;

    for (let i = 0; i < word.length; i++) {
      const r = startRow + dir.dy * i;
      const c = startCol + dir.dx * i;

      grid[r][c] = word[i].toUpperCase();
    }

    return {
      word,
      startRow,
      startCol,
      endRow,
      endCol,
    };
  }

  return null;
}

export function generateGrid(
  size: number,
  words: WordEntry[]
): GeneratedGrid {
  const grid = createEmptyGrid(size);

  const placements: WordPlacement[] = [];

  words.forEach(({ word }) => {
    const placement = placeWord(grid, word);

    if (placement) {
      placements.push(placement);
    }
  });

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = getRandomLetter();
      }
    }
  }

  return {
    grid,
    placements,
  };
}