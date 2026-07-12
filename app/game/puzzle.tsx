import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { generateGrid, WordPlacement } from "../../utils/gridGenerator";
import { WORDS } from "../../utils/words";

type SelectedCell = {
  row: number;
  col: number;
  letter: string;
};

type Direction = { dRow: number; dCol: number };

const GRID_SIZE = 5;
const CELL_SIZE = 54;
const CELL_MARGIN = 4;
const CELL_TOTAL = CELL_SIZE + CELL_MARGIN * 2;
const GRID_PADDING = 12;
const HINT_COUNT = 6;

function computeDir(a: SelectedCell, b: SelectedCell): Direction {
  return {
    dRow: Math.sign(b.row - a.row),
    dCol: Math.sign(b.col - a.col),
  };
}

// Expand a placement into its full ordered list of {row, col} cells
function placementCells(p: WordPlacement): { row: number; col: number }[] {
  const len = p.word.length;
  const dRow = len > 1 ? Math.sign(p.endRow - p.startRow) : 0;
  const dCol = len > 1 ? Math.sign(p.endCol - p.startCol) : 0;
  const cells = [];
  for (let i = 0; i < len; i++) {
    cells.push({ row: p.startRow + dRow * i, col: p.startCol + dCol * i });
  }
  return cells;
}

function cellsEqual(
  a: { row: number; col: number }[],
  b: { row: number; col: number }[]
) {
  if (a.length !== b.length) return false;
  return a.every((c, i) => c.row === b[i].row && c.col === b[i].col);
}

export default function PuzzleGame() {
  // Generate once and keep both the letter grid and the word placements
  const generated = useRef(generateGrid(GRID_SIZE, WORDS)).current;
  const grid = generated.grid;
  const placements = generated.placements;

  const hintWords = WORDS.slice(0, HINT_COUNT);

  const [selected, setSelected] = useState<SelectedCell[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundPaths, setFoundPaths] = useState<{ row: number; col: number }[][]>([]);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);

  const gridRef = useRef<View>(null);
  const gridOrigin = useRef({ x: 0, y: 0 });
  const selectionRef = useRef<SelectedCell[]>([]);
  const directionRef = useRef<Direction | null>(null);

  const measureGrid = () => {
    gridRef.current?.measure((_x, _y, _w, _h, pageX, pageY) => {
      gridOrigin.current = { x: pageX, y: pageY };
    });
  };

  function getCellFromTouch(pageX: number, pageY: number) {
    const localX = pageX - gridOrigin.current.x - GRID_PADDING;
    const localY = pageY - gridOrigin.current.y - GRID_PADDING;
    if (localX < 0 || localY < 0) return null;

    const col = Math.floor(localX / CELL_TOTAL);
    const row = Math.floor(localY / CELL_TOTAL);
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return null;
    return { row, col };
  }

  function handleStart(pageX: number, pageY: number) {
    const cell = getCellFromTouch(pageX, pageY);
    if (!cell) return;

    setLastResult(null);
    const letter = grid[cell.row][cell.col];
    selectionRef.current = [{ ...cell, letter }];
    directionRef.current = null;
    setSelected([...selectionRef.current]);
  }

  function handleMove(pageX: number, pageY: number) {
    const cell = getCellFromTouch(pageX, pageY);
    if (!cell) return;

    const sel = selectionRef.current;
    if (sel.length === 0) return;
    const last = sel[sel.length - 1];
    if (last.row === cell.row && last.col === cell.col) return;

    // Allow dragging backward to undo the last cell
    if (sel.length > 1) {
      const prev = sel[sel.length - 2];
      if (prev.row === cell.row && prev.col === cell.col) {
        sel.pop();
        directionRef.current =
          sel.length > 1 ? computeDir(sel[sel.length - 2], sel[sel.length - 1]) : null;
        selectionRef.current = [...sel];
        setSelected([...sel]);
        return;
      }
    }

    const distRow = Math.abs(cell.row - last.row);
    const distCol = Math.abs(cell.col - last.col);
    if (distRow > 1 || distCol > 1) return; // finger jumped too far, ignore
    if (distRow === 0 && distCol === 0) return;

    const dRow = Math.sign(cell.row - last.row);
    const dCol = Math.sign(cell.col - last.col);

    if (!directionRef.current) {
      directionRef.current = { dRow, dCol };
    } else if (directionRef.current.dRow !== dRow || directionRef.current.dCol !== dCol) {
      return; // keep selection in a straight line only
    }

    const letter = grid[cell.row][cell.col];
    sel.push({ ...cell, letter });
    selectionRef.current = sel;
    setSelected([...sel]);
  }

  function handleRelease() {
    const sel = selectionRef.current;

    if (sel.length > 1) {
      const selCells = sel.map((c) => ({ row: c.row, col: c.col }));
      const reversedCells = [...selCells].reverse();

      
      const match = placements.find((p) => {
        const path = placementCells(p);
        return cellsEqual(path, selCells) || cellsEqual(path, reversedCells);
      });

      if (match && !foundWords.includes(match.word)) {
        setFoundWords((prev) => [...prev, match.word]);
        setFoundPaths((prev) => [...prev, placementCells(match)]);
        setLastResult("correct");
      } else {
        setLastResult("wrong");
      }
    }

    selectionRef.current = [];
    directionRef.current = null;
    setSelected([]);
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => handleStart(evt.nativeEvent.pageX, evt.nativeEvent.pageY),
      onPanResponderMove: (evt) => handleMove(evt.nativeEvent.pageX, evt.nativeEvent.pageY),
      onPanResponderRelease: handleRelease,
      onPanResponderTerminate: handleRelease,
    })
  ).current;

  const progress = foundWords.length / hintWords.length;

  function isCellFound(row: number, col: number) {
    return foundPaths.some((path) => path.some((c) => c.row === row && c.col === col));
  }

  return (
    <View style={styles.container}>
      
      <View style={[styles.blob, styles.blobTop]} />
      <View style={[styles.blob, styles.blobBottom]} />

      {/* Header */}
      
    <View style={styles.header}>
  <View style={styles.headerRow}>
    <Pressable onPress={() => router.back()} style={styles.backButton}>
      <Ionicons name="chevron-back" size={24} color="#fff" />
    </Pressable>
    <Text style={styles.title}>Word Search</Text>
  </View>
  <Text style={styles.subtitle}>Swipe across letters to find a word</Text>
</View>



      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {foundWords.length}/{hintWords.length}
        </Text>
      </View>

      {/* Grid */}
      <View
        ref={gridRef}
        onLayout={measureGrid}
        style={styles.gridCard}
        {...panResponder.panHandlers}
      >
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((letter, colIndex) => {
              const isSelected = selected.some(
                (c) => c.row === rowIndex && c.col === colIndex
              );
              const isFound = isCellFound(rowIndex, colIndex);
              return (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    (rowIndex + colIndex) % 2 === 0 && styles.cellAlt,
                    isFound && styles.foundCell,
                    isSelected && styles.selectedCell,
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      isFound && styles.foundCellText,
                      isSelected && styles.selectedCellText,
                    ]}
                  >
                    {letter}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {lastResult === "wrong" && (
        <Text style={styles.feedbackWrong}>Not quite — try again!</Text>
      )}
      {lastResult === "correct" && (
        <Text style={styles.feedbackCorrect}>Nice find! 🎉</Text>
      )}

      {/* Word List */}
      <View style={styles.wordListCard}>
        <Text style={styles.wordListTitle}>Find these words</Text>
        {hintWords.map((item) => {
          const isFound = foundWords.includes(item.word);
          return (
            <View key={item.word} style={styles.wordRow}>
              <View style={[styles.checkDot, isFound && styles.checkDotFilled]}>
                {isFound && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={[styles.wordHint, isFound && styles.foundWord]}>
                {item.word.toUpperCase()} — {item.hint}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const PRIMARY = "#5B4FE9";
const PRIMARY_DARK = "#3E35B0";
const ACCENT = "#FFD166";
const FOUND_GREEN = "#7CE38B";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: PRIMARY_DARK,
    alignItems: "center",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.25,
  },
  blobTop: {
    width: 260,
    height: 260,
    backgroundColor: PRIMARY,
    top: -100,
    right: -80,
  },
  blobBottom: {
    width: 220,
    height: 220,
    backgroundColor: ACCENT,
    bottom: -80,
    left: -70,
  },
   header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  
  },
  headerRow: {
    flexDirection: "row",      
    alignItems: "center",      
    justifyContent: "flex-start", 
  },
  backButton: {
    marginRight: 20,            // small gap between arrow and title
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#eee",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    marginBottom: 20,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: ACCENT,
    borderRadius: 4,
  },
  progressLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  gridCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: GRID_PADDING,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  row: { flexDirection: "row" },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    backgroundColor: "#F7F8FC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  cellAlt: {
    backgroundColor: "#ECEEFA",
  },
  cellText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2B4A",
  },
  foundCell: {
    backgroundColor: FOUND_GREEN,
  },
  foundCellText: {
    color: "#003D0F",
  },
  selectedCell: {
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: "#E0A800",
    transform: [{ scale: 1.05 }],
  },
  selectedCellText: {
    color: "#3E2E00",
  },
  feedbackWrong: {
    color: "#FFB3B3",
    fontWeight: "600",
    marginBottom: 10,
  },
  feedbackCorrect: {
    color: "#B9FBC0",
    fontWeight: "700",
    marginBottom: 10,
  },
  wordListCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  wordListTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 10,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkDotFilled: {
    backgroundColor: FOUND_GREEN,
    borderColor: FOUND_GREEN,
  },
  checkMark: {
    fontSize: 11,
    fontWeight: "900",
    color: "#003D0F",
  },
  wordHint: {
    fontSize: 14,
    color: "#eee",
    flexShrink: 1,
  },
  foundWord: {
    textDecorationLine: "line-through",
    color: "#90ee90",
  },
});