import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

interface Props {
  mood: "cheer" | "correct" | "wrong" | "encourage" | "frustrated";
  message: string;
  onDismiss?: () => void;
  showNext?: boolean;
  nextLabel?: string;
}

const BUBBLE_COLORS: Record<Props["mood"], string> = {
  cheer: "#EEF4FF",
  correct: "#D4EDDA",
  wrong: "#FFF3CD",
  frustrated: "#FFF0F0",
  encourage: "#EEF4FF",
};

const BORDER_COLORS: Record<Props["mood"], string> = {
  cheer: COLORS.primary,
  correct: "#28A745",
  frustrated: "#E53E3E",
  wrong: "#FFC107",
  encourage: COLORS.primary,
};

const TITLE: Record<Props["mood"], string> = {
  cheer: "Let's go!",
  correct: "Correct!",
  wrong: "💛 Not quite!",
  frustrated: "You're doing great!",
  encourage: "Keep it up!",
};

const SPARKLE_MOODS: Props["mood"][] = ["correct", "cheer"];

export const Mascot: React.FC<Props> = ({
  mood,
  message,
  onDismiss,
  showNext = false,
  nextLabel = "Next",
}) => {
  const backdropOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.6);
  const cardTranslateY = useSharedValue(40);
  const mimoRotate = useSharedValue(0);
  const mimoFloat = useSharedValue(0);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);

  useEffect(() => {
    backdropOpacity.value = withTiming(1, { duration: 200 });
    cardScale.value = withSpring(1, { damping: 9, stiffness: 140 });
    cardTranslateY.value = withSpring(0, { damping: 11, stiffness: 140 });

    if (mood === "correct" || mood === "cheer") {
      mimoRotate.value = withSequence(
        withTiming(-8, { duration: 120 }),
        withTiming(8, { duration: 120 }),
        withTiming(-6, { duration: 120 }),
        withTiming(0, { duration: 120 }),
      );
    } else if (mood === "wrong" || mood === "frustrated") {
      mimoRotate.value = withSequence(
        withTiming(-4, { duration: 90 }),
        withTiming(4, { duration: 90 }),
        withTiming(-3, { duration: 90 }),
        withTiming(0, { duration: 90 }),
      );
    }

    mimoFloat.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    if (SPARKLE_MOODS.includes(mood)) {
      sparkle1.value = withDelay(
        150,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 500 }),
            withTiming(0, { duration: 500 }),
          ),
          -1,
          true,
        ),
      );
      sparkle2.value = withDelay(
        450,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 500 }),
            withTiming(0, { duration: 500 }),
          ),
          -1,
          true,
        ),
      );
    } else {
      sparkle1.value = 0;
      sparkle2.value = 0;
    }
  }, [mood, message]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: cardScale.value },
      { translateY: cardTranslateY.value },
    ],
  }));

  const mimoStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${mimoRotate.value}deg` },
      { translateY: mimoFloat.value },
    ],
  }));

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1.value,
    transform: [{ scale: 0.6 + sparkle1.value * 0.6 }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2.value,
    transform: [{ scale: 0.6 + sparkle2.value * 0.6 }],
  }));

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.backdrop, backdropStyle]} />

      <Animated.View
        style={[
          styles.card,
          cardStyle,
          {
            backgroundColor: BUBBLE_COLORS[mood],
            borderColor: BORDER_COLORS[mood],
          },
        ]}
      >
        {SPARKLE_MOODS.includes(mood) && (
          <>
            <Animated.Text
              style={[styles.sparkle, styles.sparkleLeft, sparkle1Style]}
            >
              ✨
            </Animated.Text>
            <Animated.Text
              style={[styles.sparkle, styles.sparkleRight, sparkle2Style]}
            >
              🌟
            </Animated.Text>
          </>
        )}

        <Animated.View style={mimoStyle}>
          <Image
            source={require("../../assets/mimoimg.png")}
            style={styles.mimo}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={[styles.title, { color: BORDER_COLORS[mood] }]}>
          {TITLE[mood]}
        </Text>

        <Text style={styles.message}>{message}</Text>

        {showNext && onDismiss && (
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: BORDER_COLORS[mood] }]}
            onPress={onDismiss}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>{nextLabel} →</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99999,
    elevation: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  card: {
    width: "82%",
    maxWidth: 700,
    borderRadius: 24,
    borderWidth: 2.5,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  sparkle: {
    position: "absolute",
    fontSize: 26,
    top: 10,
  },
  sparkleLeft: { left: 18 },
  sparkleRight: { right: 18 },
  mimo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  nextBtn: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
