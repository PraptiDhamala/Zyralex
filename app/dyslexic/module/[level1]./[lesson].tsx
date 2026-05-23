import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import your custom data files
import letterReversal from "../../../../data/easy/letter_reversal";

// Mapper utility dict linking URL route strings to file structures
const curriculumData: Record<string, any> = {
  letter_reversal: letterReversal,
  // Add other lessons here as you expand:
  // phonics: phonicsData
};

export default function LessonScreen() {
  const router = useRouter();
  // Read level parameters from file path parameters
  const { level1, lesson } = useLocalSearchParams();

  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Fallback gracefully if route params don't map to content
  const lessonKey = Array.isArray(lesson) ? lesson[0] : lesson;
  const lessonData =
    curriculumData[lessonKey || "letter_reversal"] || letterReversal;

  const totalSteps =
    lessonData.explanation.length +
    lessonData.examples.length +
    lessonData.guidedPractice.length;

  const handleNext = () => {
    if (step + 1 >= totalSteps) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const handlePracticeAnswer = (selected: string, correct: string) => {
    if (selected === correct) {
      setScore((prev) => prev + 1);
    }
    handleNext();
  };

  const renderContent = () => {
    // 1. EXPLANATION STAGE
    if (step < lessonData.explanation.length) {
      const item = lessonData.explanation[step];
      return (
        <View style={styles.card}>
          <View style={[styles.badge, item.type === "tip" && styles.tipBadge]}>
            <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.text}>{item.content}</Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // 2. EXAMPLES STAGE
    const baseOffset = lessonData.explanation.length;
    if (step < baseOffset + lessonData.examples.length) {
      const exampleIndex = step - baseOffset;
      const example = lessonData.examples[exampleIndex];
      return (
        <View style={styles.card}>
          <Text style={styles.bigLetter}>{example.letter}</Text>
          <Text style={styles.word}>
            {example.emoji} {example.word}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // 3. GUIDED PRACTICE STAGE
    const practiceIndex = step - baseOffset - lessonData.examples.length;
    const currentPractice = lessonData.guidedPractice[practiceIndex];

    if (currentPractice) {
      return (
        <View style={styles.card}>
          <Text style={styles.progressCounter}>
            Practice {practiceIndex + 1} of {lessonData.guidedPractice.length}
          </Text>
          <Text style={styles.question}>{currentPractice.question}</Text>

          {currentPractice.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() =>
                handlePracticeAnswer(option, currentPractice.answer)
              }
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.trackLabel}>
          {level1?.toString().toUpperCase() || "TRACK"}
        </Text>
        <Text style={styles.stepIndicator}>
          Step {step + 1} of {totalSteps}
        </Text>
      </View>

      <Text style={styles.title}>{lessonData.title}</Text>
      <Text style={styles.subtitle}>{lessonData.subtitle}</Text>

      {!finished ? (
        renderContent()
      ) : (
        <View style={styles.card}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.complete}>{lessonData.completionMessage}</Text>
          <Text style={styles.scoreSummary}>
            You answered {score} of {lessonData.guidedPractice.length} problems
            correctly!
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#16A34A", marginTop: 20 },
            ]}
            onPress={() => router.replace("/dyslexic")}
          >
            <Text style={styles.buttonText}>Finish & Return Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  trackLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563EB",
    letterSpacing: 1,
  },
  stepIndicator: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "800", color: "#1E293B", marginBottom: 6 },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 28,
    lineHeight: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  badge: {
    backgroundColor: "#EFF6FF",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 16,
  },
  tipBadge: { backgroundColor: "#FEF3C7" },
  badgeText: { fontSize: 11, fontWeight: "bold", color: "#1E40AF" },
  text: {
    fontSize: 21,
    lineHeight: 32,
    color: "#334155",
    marginBottom: 28,
    fontWeight: "500",
  },
  bigLetter: {
    fontSize: 110,
    textAlign: "center",
    fontWeight: "800",
    color: "#2563EB",
    marginBottom: 12,
  },
  word: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 28,
    fontWeight: "600",
    color: "#1E293B",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
  progressCounter: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1E293B",
    lineHeight: 30,
  },
  option: {
    backgroundColor: "#F1F5F9",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    color: "#334155",
  },
  celebrationEmoji: { fontSize: 50, textAlign: "center", marginBottom: 12 },
  complete: {
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
    color: "#16A34A",
    fontWeight: "700",
    marginBottom: 12,
  },
  scoreSummary: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
});
