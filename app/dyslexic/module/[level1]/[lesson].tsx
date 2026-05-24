import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

<<<<<<< HEAD
// IMPORT BOTH LESSON OPTIONS
import letterReversal from "../../../../data/easy/letter_reversal";
import phonics from "../../../../data/easy/phonics";

// THE CORE MAPPER DICTIONARY
const curriculumMap: Record<string, any> = {
  letter_reversal: letterReversal,
  phonics: phonics,
=======
import letterReversal from "../../../../data/easy/letter_reversal";
import phonics from "../../../../data/easy/phonics";
import vowel_processing from "../../../../data/easy/vowel_processing";
import chunking from "../../../../data/medium/chunking";
import decoding from "../../../../data/medium/decoding";

const curriculumMap: Record<string, any> = {
  letter_reversal: letterReversal,
  phonics: phonics,
  vowel_processing: vowel_processing,
  chunking: chunking,
  decoding: decoding,
>>>>>>> 6097b69f081cb4f26953e51f9a90873f49888e81
};

export default function LessonScreen() {
  const router = useRouter();
  const { level1, lesson } = useLocalSearchParams();

  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  // DYNAMICALY LOOKUP DATA BASED ON THE URL STRING PARAMETER
  const lessonKey = Array.isArray(lesson) ? lesson[0] : lesson;
  const lessonData =
    curriculumMap[lessonKey || "letter_reversal"] || letterReversal;

<<<<<<< HEAD
  const totalSteps =
    lessonData.explanation.length +
    lessonData.examples.length +
    lessonData.guidedPractice.length;

  const currentPractice =
    lessonData.guidedPractice[
      step - lessonData.explanation.length - lessonData.examples.length
    ];
=======
  const explanationLength = lessonData.explanation?.length || 0;

  const examplesLength = lessonData.examples?.length || 0;

  const practiceLength = lessonData.guidedPractice?.length || 0;

  const totalSteps = explanationLength + examplesLength + practiceLength;

  const currentPractice =
    lessonData.guidedPractice?.[step - explanationLength - examplesLength];
>>>>>>> 6097b69f081cb4f26953e51f9a90873f49888e81

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
    // EXPLANATION SECTION
    if (step < lessonData.explanation.length) {
      const item = lessonData.explanation[step];
      return (
        <View style={styles.card}>
          <View style={[styles.badge, item.type === "tip" && styles.tipBadge]}>
            <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.text}>{item.content}</Text>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // EXAMPLES SECTION
<<<<<<< HEAD
    if (step < lessonData.explanation.length + lessonData.examples.length) {
      const exampleIndex = step - lessonData.explanation.length;
=======
    if (lessonData.examples && step < explanationLength + examplesLength) {
      const exampleIndex = step - explanationLength;

>>>>>>> 6097b69f081cb4f26953e51f9a90873f49888e81
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

    // GUIDED PRACTICE SECTION
<<<<<<< HEAD
    if (currentPractice) {
=======
    if (lessonData.guidedPractice && currentPractice) {
>>>>>>> 6097b69f081cb4f26953e51f9a90873f49888e81
      return (
        <View style={styles.card}>
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
      <Text style={styles.title}>{lessonData.title}</Text>
      <Text style={styles.subtitle}>{lessonData.subtitle}</Text>

      {!finished ? (
        renderContent()
      ) : (
        <View style={styles.card}>
          <Text style={styles.complete}>{lessonData.completionMessage}</Text>
          <Text
            style={{
              textAlign: "center",
              color: "#64748B",
              marginTop: 8,
              fontSize: 16,
            }}
          >
            Score: {score} / {lessonData.guidedPractice.length}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { marginTop: 24, backgroundColor: "#16A34A" },
            ]}
            onPress={() => router.replace("/dyslexic")}
          >
            <Text style={styles.buttonText}>Return Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

// Keep your styles object downstream completely unchanged...
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
  },
  title: { fontSize: 30, fontWeight: "800", color: "#1E293B", marginBottom: 8 },
  subtitle: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 32,
    lineHeight: 28,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
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
  text: { fontSize: 22, lineHeight: 34, color: "#334155", marginBottom: 28 },
  bigLetter: {
    fontSize: 120,
    textAlign: "center",
    fontWeight: "800",
    color: "#2563EB",
    marginBottom: 20,
  },
  word: { fontSize: 36, textAlign: "center", marginBottom: 28 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "700" },
  question: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1E293B",
  },
  option: {
    backgroundColor: "#E2E8F0",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  optionText: { fontSize: 22, textAlign: "center", fontWeight: "600" },
  complete: {
    fontSize: 26,
    lineHeight: 38,
    textAlign: "center",
    color: "#16A34A",
    fontWeight: "700",
  },
});
