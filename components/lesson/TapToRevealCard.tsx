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

function RevealTile({
  option,
  index,
  variant,
  isFlipped,
  isLocked,
  isCorrectAnswer,
  showResult,
  onPress,
}: {
  option: string;
  index: number;
  variant: Variant;
  isFlipped: boolean;
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

  useEffect(() => {
    entranceScale.value = withDelay(
      index * 90,
      withSpring(1, { damping: 8, stiffness: 140 }),
    );
  }, []);

  useEffect(() => {
    if (variant === "mirror-flip") {
      flipProgress.value = withTiming(isFlipped ? 1 : 0, { duration: 350 });
    } else {
      if (isFlipped) {
        popScale.value = withSequence(
          withTiming(1.15, { duration: 160 }),
          withSpring(1, { damping: 7, stiffness: 160 }),
        );
        glow.value = withTiming(0.15, { duration: 200 });
      } else {
        popScale.value = 1;
        glow.value = 0;
      }
    }
  }, [isFlipped, variant]);

  useEffect(() => {
    if (!showResult || !isFlipped) return;
    if (isCorrectAnswer) {
      entranceScale.value = withSequence(
        withTiming(1.12, { duration: 150 }),
        withSpring(1, { damping: 6, stiffness: 160 }),
      );
    } else {
      shake.value = withSequence(
        withTiming(-6, { duration: 80 }),
        withTiming(6, { duration: 80 }),
        withTiming(-4, { duration: 80 }),
        withTiming(0, { duration: 80 }),
      );
    }
  }, [showResult, isCorrectAnswer, isFlipped]);

  const resultStyle =
    showResult && isFlipped
      ? isCorrectAnswer
        ? styles.tileCorrect
        : styles.tileWrong
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
          <Animated.View style={[styles.face, frontFaceStyle]}>
            <Text style={styles.tileText}>❓</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.face,
              styles.faceBack,
              isFlipped && styles.tileFlipped,
              resultStyle,
              backFaceStyle,
            ]}
          >
            <Text
              style={[styles.tileText, isFlipped && styles.tileTextFlipped]}
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
      <Animated.View
        style={[
          styles.tile,
          isFlipped && styles.tileFlipped,
          resultStyle,
          popContainerStyle,
        ]}
      >
        <Animated.View style={[styles.popGlow, glowStyle]} />
        <Text style={[styles.tileText, isFlipped && styles.tileTextFlipped]}>
          {isFlipped ? option : "❓"}
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
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const confirmScale = useSharedValue(1);

  const handleTap = (index: number) => {
    if (locked) return;
    setRevealedIndex(index);
    setShowResult(false);
  };

  const confirm = () => {
    if (revealedIndex === null || locked) return;
    setLocked(true);
    setShowResult(true);
    confirmScale.value = withSequence(
      withTiming(0.94, { duration: 90 }),
      withSpring(1, { damping: 8, stiffness: 160 }),
    );

    const selectedOption = practice.options[revealedIndex];
    setTimeout(() => onAnswer(selectedOption, practice.answer), 260);
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

      <Text style={styles.subhint}>{hint}</Text>

      <View style={styles.grid}>
        {practice.options.map((option, index) => (
          <RevealTile
            key={option + index}
            option={option}
            index={index}
            variant={variant}
            isFlipped={revealedIndex === index}
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

      <Animated.View style={confirmStyle}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            revealedIndex === null && styles.confirmDisabled,
          ]}
          onPress={confirm}
          disabled={revealedIndex === null}
        >
          <Text style={styles.confirmText}>Confirm Answer</Text>
        </TouchableOpacity>
      </Animated.View>
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
    borderColor: "#FFC107",
  },
  tileText: {
    fontSize: 32,
  },
  tileTextFlipped: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2563EB",
  },
  popGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    backgroundColor: "#2563EB",
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
