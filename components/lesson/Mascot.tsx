import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  cheer: "🎉 Let's go!",
  correct: "✅ Correct!",
  wrong: "💛 Not quite!",
  frustrated: "🫂 You're doing great!",
  encourage: "💪 Keep it up!",
};

export const Mascot: React.FC<Props> = ({
  mood,
  message,
  onDismiss,
  showNext = false,
  nextLabel = "Next",
}) => (
  <View style={styles.overlay}>
    {/* Dark background */}
    <View style={styles.backdrop} />

    {/* Card */}
    <View
      style={[
        styles.card,
        {
          backgroundColor: BUBBLE_COLORS[mood],
          borderColor: BORDER_COLORS[mood],
        },
      ]}
    >
      {/* Mimo image */}
      <Image
        source={require("../../assets/mimoimg.png")}
        style={styles.mimo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={[styles.title, { color: BORDER_COLORS[mood] }]}>
        {TITLE[mood]}
      </Text>

      {/* Message */}
      <Text style={styles.message}>{message}</Text>

      {/* Next button — only shown when showNext=true */}
      {showNext && onDismiss && (
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: BORDER_COLORS[mood] }]}
          onPress={onDismiss}
          activeOpacity={0.8}
        >
          <Text style={styles.nextBtnText}>{nextLabel} →</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

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
