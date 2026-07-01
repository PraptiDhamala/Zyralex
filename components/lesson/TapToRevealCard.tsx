import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Practice = {
  question: string;
  options: string[];
  answer: string;
};

export default function TapToRevealCard({
  practice,
  onAnswer,
}: {
  practice: Practice;
  onAnswer: (selected: string, correct: string) => void;
}) {
  const [revealed, setRevealed] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const handleTap = (option: string) => {
    if (locked) return;
    setRevealed(option);
  };

  const confirm = () => {
    if (!revealed || locked) return;
    setLocked(true);
    onAnswer(revealed, practice.answer);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{practice.question}</Text>
      <Text style={styles.subhint}>
        Tap a card to flip it, then confirm your answer
      </Text>

      <View style={styles.grid}>
        {practice.options.map((option, index) => {
          const isFlipped = revealed === option;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.tile, isFlipped && styles.tileFlipped]}
              onPress={() => handleTap(option)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.tileText, isFlipped && styles.tileTextFlipped]}
              >
                {isFlipped ? option : "❓"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, !revealed && styles.confirmDisabled]}
        onPress={confirm}
        disabled={!revealed}
      >
        <Text style={styles.confirmText}>Confirm Answer</Text>
      </TouchableOpacity>
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
    marginBottom: 6,
    color: "#1E293B",
    lineHeight: 34,
    textAlign: "center",
  },
  subhint: {
    fontSize: 13,
    color: "#94A3B8",
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
  tileFlipped: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
  },
  tileText: {
    fontSize: 32,
  },
  tileTextFlipped: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2563EB",
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
