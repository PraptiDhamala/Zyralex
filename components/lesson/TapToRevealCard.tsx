import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Practice = {
  question: string;
  options: string[];
  answer: string;
};

type Variant = "mirror-flip" | "pop";

interface TapToRevealCardProps {
  practice: Practice;
  onAnswer: (selected: string, correct: string) => void;
  variant?: Variant;
  onSpeak: (text: string) => void;
}

/**
 * A single option tile.
 *
 * IMPORTANT FIX: every tile starts hidden behind "❓" — not just the
 * correct one. A tile only reveals its text when:
 *   1. the child taps it (a private "peek" — only that tile flips), or
 *   2. the round is confirmed (showResult = true) — at which point
 *      EVERY tile flips to reveal its word, with the correct one
 *      highlighted green and the child's wrong pick highlighted red.
 * This way a curious tap never leaks the answer, and after confirming
 * the child always gets to see the full picture (not just their own card).
 */
function RevealTile({
  option,
  index,
  variant,
  isSelected,
  isRevealed,
  isLocked,
  isCorrectAnswer,
  showResult,
  onPress,
}: {
  option: string;
  index: number;
  variant: Variant;
  isSelected: boolean;
  isRevealed: boolean;
  isLocked: boolean;
  isCorrectAnswer: boolean;
  showResult: boolean;
  onPress: () => void;
}) {
  const entranceScale = useSharedValue(0);
  const flipProgress = useSharedValue(0);
  const popScale = useSharedValue(1);
  const glow = useSharedValue(0);
  const shake = useSharedValue(0);

  // Staggered entrance so cards feel alive rather than snapping in.
  useEffect(() => {
    entranceScale.value = withDelay(
      index * 90,
      withSpring(1, { damping: 8, stiffness: 140 }),
    );
  }, []);

  // Flip / pop whenever revealed state changes (either a private peek
  // tap, or the "reveal everything" moment after confirming).
  useEffect(() => {
    if (variant === "mirror-flip") {
      flipProgress.value = withDelay(
        showResult ? index * 110 : 0,
        withTiming(isRevealed ? 1 : 0, { duration: 350 }),
      );
    } else {
      if (isRevealed) {
        popScale.value = withDelay(
          showResult ? index * 110 : 0,
          withSequence(
            withTiming(1.15, { duration: 160 }),
            withSpring(1, { damping: 7, stiffness: 160 }),
          ),
        );
        glow.value = withTiming(0.15, { duration: 200 });
      } else {
        popScale.value = 1;
        glow.value = 0;
      }
    }
  }, [isRevealed, variant, showResult]);

  // Little celebratory bounce or shake once results are in.
  useEffect(() => {
    if (!showResult) return;
    if (isCorrectAnswer) {
      entranceScale.value = withDelay(
        index * 110 + 200,
        withSequence(
          withTiming(1.12, { duration: 150 }),
          withSpring(1, { damping: 6, stiffness: 160 }),
        ),
      );
    } else if (isSelected) {
      shake.value = withSequence(
        withTiming(-6, { duration: 80 }),
        withTiming(6, { duration: 80 }),
        withTiming(-4, { duration: 80 }),
        withTiming(0, { duration: 80 }),
      );
    }
  }, [showResult, isCorrectAnswer, isSelected]);

  const tileStyle = showResult
    ? isCorrectAnswer
      ? styles.tileCorrect
      : isSelected
        ? styles.tileWrong
        : styles.tileNeutralRevealed
    : isSelected
      ? styles.tileFlipped
      : null;

  const containerAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { scale: entranceScale.value },
      { translateX: shake.value },
    ],
  }));

  const frontFaceStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipProgress.value * 180}deg` }],
    opacity: flipProgress.value > 0.5 ? 0 : 1,
  }));

  const backFaceStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${-180 + flipProgress.value * 180}deg` }],
    opacity: flipProgress.value > 0.5 ? 1 : 0,
  }));

  const popContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: entranceScale.value * popScale.value },
      { translateX: shake.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const resultIcon = showResult ? (
    isCorrectAnswer ? (
      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={22} color="#28A745" />
      </View>
    ) : isSelected ? (
      <View style={styles.badge}>
        <Ionicons name="close-circle" size={22} color="#E53E3E" />
      </View>
    ) : null
  ) : null;

  if (variant === "mirror-flip") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={isLocked}
      >
        <Animated.View
          style={[styles.tile, styles.flipWrap, containerAnimStyle]}
        >
          {resultIcon}
          <Animated.View style={[styles.face, frontFaceStyle]}>
            <Text style={styles.tileText}>❓</Text>
          </Animated.View>
          <Animated.View
            style={[styles.face, styles.faceBack, tileStyle, backFaceStyle]}
          >
            <Text
              style={[styles.tileText, isRevealed && styles.tileTextFlipped]}
            >
              {option}
            </Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={isLocked}>
      <Animated.View style={[styles.tile, tileStyle, popContainerStyle]}>
        {resultIcon}
        <Animated.View style={[styles.popGlow, glowStyle]} />
        <Text style={[styles.tileText, isRevealed && styles.tileTextFlipped]}>
          {isRevealed ? option : "❓"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function TapToRevealCard({
  practice,
  onAnswer,
  variant = "pop",
  onSpeak,
}: TapToRevealCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const confirmScale = useSharedValue(1);

  // Reset whenever a new question comes in (component is reused across
  // guidedPractice rounds).
  useEffect(() => {
    setSelectedIndex(null);
    setLocked(false);
    setShowResult(false);
  }, [practice.question]);

  const handleTap = (index: number) => {
    if (locked) return;
    setSelectedIndex(index);
  };

  const confirm = () => {
    if (selectedIndex === null || locked) return;
    setLocked(true);
    setShowResult(true);
    confirmScale.value = withSequence(
      withTiming(0.94, { duration: 90 }),
      withSpring(1, { damping: 8, stiffness: 160 }),
    );

    const selectedOption = practice.options[selectedIndex];
    const isCorrect = selectedOption === practice.answer;

    if (!isCorrect) {
      // Let the child hear the right word once every card has revealed.
      setTimeout(
        () => onSpeak(practice.answer),
        practice.options.length * 110 + 250,
      );
    }

    // Wait for the full staggered reveal to finish before advancing,
    // so the child actually sees every card flip — not just theirs.
    setTimeout(
      () => onAnswer(selectedOption, practice.answer),
      practice.options.length * 110 + 900,
    );
  };

  const confirmStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confirmScale.value }],
  }));

  const hint =
    variant === "mirror-flip"
      ? "Tap a card to flip it, then confirm your answer"
      : "Tap a card to reveal it, then confirm your answer";

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{practice.question}</Text>

      <Text style={styles.subhint}>
        {showResult ? "Here's the answer!" : hint}
      </Text>

      <View style={styles.grid}>
        {practice.options.map((option, index) => (
          <RevealTile
            key={option + index}
            option={option}
            index={index}
            variant={variant}
            isSelected={selectedIndex === index}
            isRevealed={showResult || selectedIndex === index}
            isLocked={locked}
            isCorrectAnswer={option === practice.answer}
            showResult={showResult}
            onPress={() => handleTap(index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.audioButton}
        onPress={() => onSpeak(practice.question)}
      >
        <Ionicons name="volume-high" size={20} color="white" />
        <Text style={styles.audioButtonText}>Hear It</Text>
      </TouchableOpacity>

      {!showResult && (
        <Animated.View style={confirmStyle}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              selectedIndex === null && styles.confirmDisabled,
            ]}
            onPress={confirm}
            disabled={selectedIndex === null}
          >
            <Text style={styles.confirmText}>Confirm Answer</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    width: "100%",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1E293B",
    lineHeight: 34,
    textAlign: "center",
  },
  audioButton: {
    backgroundColor: "#6785b0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "center",
    marginBottom: 16,
    width: "70%",
  },
  audioButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  subhint: {
    fontSize: 13,
    color: "#6785b0",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    marginBottom: 20,
  },
  tile: {
    width: 110,
    height: 110,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  flipWrap: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
  },
  face: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "#F1F5F9",
    backfaceVisibility: "hidden",
  },
  faceBack: {
    borderColor: "#CBD5E1",
  },
  tileFlipped: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
  },
  tileCorrect: {
    backgroundColor: "#D4EDDA",
    borderColor: "#28A745",
  },
  tileWrong: {
    backgroundColor: "#FFF3CD",
    borderColor: "#E53E3E",
  },
  tileNeutralRevealed: {
    backgroundColor: "#F1F5F9",
    borderColor: "#CBD5E1",
  },
  tileText: {
    fontSize: 32,
  },
  tileTextFlipped: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2563EB",
  },
  popGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    backgroundColor: "#2563EB",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 12,
    zIndex: 10,
  },
  confirmButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  confirmDisabled: {
    backgroundColor: "#CBD5E1",
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
