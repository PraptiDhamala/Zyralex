
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing, AccessibilityInfo } from "react-native";

export type EyeSweepAnimationType =
  | "sweep-left-to-right"
  | "sweep-word-by-word"
  | "sweep-line-by-line";

export type EyeSweepSpeed = "slow" | "medium" | "fast";

interface EyeSweepTrackerProps {
  target: string;
  emoji?: string;
  color: string;
  speed: EyeSweepSpeed;
  animationType: EyeSweepAnimationType;
  onComplete?: () => void;
  autoPlay?: boolean; // default true
}

const SPEED_MS: Record<EyeSweepSpeed, number> = {
  slow: 1400,
  medium: 900,
  fast: 550,
};

export default function EyeSweepTracker({
  target,
  emoji,
  color,
  speed,
  animationType,
  onComplete,
  autoPlay = true,
}: EyeSweepTrackerProps) {
  const words = target.split(" ");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion).catch(() => {});
  }, []);

  // Reset whenever the target changes (new example loaded)
  useEffect(() => {
    setActiveIndex(0);
    setIsDone(false);
    dotAnim.setValue(0);
  }, [target]);

  useEffect(() => {
    if (!autoPlay) return;
    if (isDone) return;

    const perWordMs = SPEED_MS[speed];

    if (animationType === "sweep-left-to-right" && words.length === 1) {
      // Continuous glide across the single word
      if (reduceMotion) {
        const t = setTimeout(() => finish(), perWordMs);
        return () => clearTimeout(t);
      }
      Animated.timing(dotAnim, {
        toValue: 1,
        duration: perWordMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => finish());
    } else {
      // word-by-word or line-by-line: step through words on a timer
      if (activeIndex >= words.length - 1) {
        const t = setTimeout(() => finish(), perWordMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setActiveIndex((i) => i + 1), perWordMs);
      return () => clearTimeout(t);
    }
  }, [activeIndex, isDone, autoPlay]);

  const finish = () => {
    setIsDone(true);
    onComplete?.();
  };

  const dotTranslate = dotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220], // width of the tracking lane; tune to container width
  });

  return (
    <View style={styles.container}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}

      <View style={styles.lane}>
        {animationType === "sweep-left-to-right" && words.length === 1 ? (
          <>
            <Text style={[styles.word, { color }]}>{target}</Text>
            {!reduceMotion && (
              <Animated.View
                style={[
                  styles.dot,
                  { backgroundColor: color, transform: [{ translateX: dotTranslate }] },
                ]}
              />
            )}
          </>
        ) : (
          <View style={styles.wordsRow}>
            {words.map((w, i) => (
              <Text
                key={`${w}-${i}`}
                style={[
                  styles.word,
                  styles.wordSpaced,
                  i === activeIndex && !isDone
                    ? { color, fontWeight: "800", textDecorationLine: "underline" }
                    : { color: "#374151" },
                ]}
              >
                {w}
              </Text>
            ))}
          </View>
        )}
      </View>

      {isDone && <Text style={styles.doneLabel}>✅ Nice tracking!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  lane: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  word: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 1.5, // dyslexia-friendly spacing
  },
  wordsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordSpaced: {
    marginHorizontal: 8,
  },
  dot: {
    position: "absolute",
    bottom: -14,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  doneLabel: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: "#16A34A",
  },
});