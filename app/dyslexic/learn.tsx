import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function LearnScreen() {
  const router = useRouter();
  const [level, setLevel] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weakPatterns, setWeakPatterns] = useState<string[]>([]);
  const startTime = useRef<number>(Date.now());

  const questions = [
    {
      question: "Which word rhymes with 'Fright'?",
      options: ["Flight", "Fridg", "Freit"],
      answer: "Flight",
      pattern: "phonological_awareness",
    },
    {
      question:
        "What word do you get if you take the 'S' sound out of 'Scream'?",
      options: ["Cream", "Creamy", "Seam"],
      answer: "Cream",
      pattern: "phoneme_manipulation",
    },
    {
      question: "Which word rhymes with 'Stray'?",
      options: ["Spit", "Weigh", "Straw"],
      answer: "Weigh",
      pattern: "phonological_awareness",
    },
    {
      question:
        "Complete the word '___illiand' (Brilliant) using the correct facing letter:",
      options: ["b", "d", "p"],
      answer: "b",
      pattern: "letter_reversal",
    },
    {
      question: "Choose the correct spelling of this common word:",
      options: ["Dose", "Does", "Deos"],
      answer: "Does",
      pattern: "spelling_recognition",
    },
    {
      question: "Find the letter pattern that matches 'b-d-p-q':",
      options: ["d-b-q-p", "b-d-p-q", "p-q-b-d"],
      answer: "b-d-p-q",
      pattern: "visual_tracking",
    },
    {
      question: "Which of these is a REAL English word, not a made-up word?",
      options: ["Trish", "Plung", "Thump"],
      answer: "Thump",
      pattern: "word_recognition",
    },
    {
      question: "If 'G-L-I-N-T' spells Glint, what does 'B-L-I-N-K' spell?",
      options: ["Blind", "Blink", "Blank"],
      answer: "Blink",
      pattern: "decoding",
    },
    {
      question:
        "Select the missing vowel pair for 'C___at' (as in a jacket/coat):",
      options: ["ou", "oa", "ao"],
      answer: "oa",
      pattern: "vowel_processing",
    },
    {
      question: "Which word makes a long 'E' sound (like in 'Tree')?",
      options: ["Chief", "Chef", "Chair"],
      answer: "Chief",
      pattern: "phonics",
    },
  ];

  const handleAnswer = async (selected: string) => {
    let updatedScore = score;
    let currentWeakAreas = [...weakPatterns];

    if (selected === questions[currentQuestion].answer) {
      updatedScore += 1;
      setScore(updatedScore);
    } else {
      const failedPattern = questions[currentQuestion].pattern;
      currentWeakAreas.push(failedPattern);
      setWeakPatterns((prev) => [...prev, failedPattern]);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
      setLoading(true);

      const endTime = Date.now();
      const totalTimeSeconds = Math.max(
        1,
        Math.floor((endTime - startTime.current) / 1000),
      );
      const mistakes = questions.length - updatedScore;

      let assignedLevel = "easy";
      if (updatedScore >= 8 && totalTimeSeconds <= 22) assignedLevel = "hard";
      else if (updatedScore >= 4) assignedLevel = "medium";

      try {
        const response = await fetch(
          "https://grinch-cloak-grazing.ngrok-free.app/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              score: updatedScore,
              mistakes: mistakes,
              reading_speed: totalTimeSeconds,
            }),
          },
        );

        const data = await response.json();
        if (data.level) assignedLevel = data.level;
      } catch (error) {
        console.warn(
          "Backend pipeline offline. Defaulting to algorithmic calculation tier.",
        );
      }

      setLevel(assignedLevel);
      const primaryWeakArea =
        currentWeakAreas.length > 0 ? currentWeakAreas[0] : "None Identified";

      let dynamicReview = "Excellent decoding fluency!";
      if (assignedLevel === "easy")
        dynamicReview = "Focus: Phoneme Foundations";
      if (assignedLevel === "medium")
        dynamicReview = "Focus: Chunking & Syllables";

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          // CRITICAL FIX: Change execution to .upsert matching the user primary profile
          const { error: upsertError } = await supabase
            .from("assessments")
            .upsert(
              {
                user_id: user.id,
                score: updatedScore,
                level: assignedLevel,
                weak_area: primaryWeakArea,
                review: dynamicReview,
              },
              { onConflict: "user_id" },
            );
          if (upsertError) throw upsertError;
        }
      } catch (dbErr) {
        console.error("Database save failed during evaluation cycle:", dbErr);
      } finally {
        setLoading(false);
      }
    }
  };
  const startTargetedLesson = () => {
    const routeLevel =
      level === "hard" ? "hard" : level === "medium" ? "medium" : "easy";

    // ADAPTIVE LESSON SELECTION
    let recommendedLesson = "letter_reversal";

    if (weakPatterns.includes("phonics")) {
      recommendedLesson = "phonics";
    }

    if (weakPatterns.includes("decoding")) {
      recommendedLesson = "decoding";
    }

    if (weakPatterns.includes("vowel_processing")) {
      recommendedLesson = "vowel_processing";
    }

    router.push({
      pathname: "/dyslexic/module/[level1]/[lesson]",
      params: {
        level1: routeLevel,
        lesson: recommendedLesson,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ZyraLex Dyslexia Assessment</Text>

      {!finished && (
        <View style={styles.quizContainer}>
          <Text style={styles.progressText}>
            Task {currentQuestion + 1} of {questions.length}
          </Text>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>

          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {finished && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Assessment Completed</Text>

          {loading ? (
            <View style={{ marginVertical: 20 }}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text
                style={[
                  styles.loadingText,
                  { textAlign: "center", marginTop: 10 },
                ]}
              >
                Processing reading diagnostics...
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.levelBadge}>
                Assigned Program: {level.toUpperCase()}
              </Text>

              {level === "easy" && (
                <View style={styles.lessonCard}>
                  <Text style={styles.lessonTitle}>
                    Focus: Phoneme Foundations
                  </Text>
                  <Text style={styles.lessonText}>
                    We are starting with tracking letter sound alignments.
                  </Text>
                  <Text style={styles.lessonText}>
                    Let's practice the difference between{" "}
                    <Text style={styles.boldText}>b</Text> and{" "}
                    <Text style={styles.boldText}>d</Text>:
                  </Text>
                  <Text style={styles.lessonText}>
                    • <Text style={styles.highlight}>b</Text> has a belly
                    (points right: <Text style={styles.boldText}>ba</Text>ll)
                    {"\n"}• <Text style={styles.highlight}>d</Text> wears a
                    diaper (points left: <Text style={styles.boldText}>do</Text>
                    g)
                  </Text>
                </View>
              )}

              {level === "medium" && (
                <View style={styles.lessonCard}>
                  <Text style={styles.lessonTitle}>
                    Focus: Chunking & Syllables
                  </Text>
                  <Text style={styles.lessonText}>
                    You have solid basic phoneme tracking. Let's build up
                    complex vowel team segments.
                  </Text>
                </View>
              )}

              {level === "hard" && (
                <View style={styles.lessonCard}>
                  <Text style={styles.lessonTitle}>
                    Focus: Advanced Morphological Patterns
                  </Text>
                  <Text style={styles.lessonText}>
                    Excellent decoding fluency! Your path will optimize
                    structural prefixes and suffixes.
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.homeButton}
                onPress={startTargetedLesson}
              >
                <Text style={styles.homeButtonText}>
                  Start Your First Lesson
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.homeButton,
                  { backgroundColor: "transparent", marginTop: 12 },
                ]}
                onPress={() => router.replace("/dyslexic")}
              >
                <Text style={{ color: "#475569", fontWeight: "600" }}>
                  Go back to Dashboard
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FBFBF8",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 32,
  },
  quizContainer: { width: "100%" },
  progressText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  question: {
    fontSize: 22,
    lineHeight: 34,
    color: "#2D3748",
    fontWeight: "700",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#E2E8F0",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  buttonText: { color: "#1E293B", fontSize: 18, fontWeight: "600" },
  resultContainer: { width: "100%" },
  resultHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 12,
  },
  loadingText: { fontSize: 18, color: "#475569" },
  levelBadge: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2563EB",
    backgroundColor: "#EFF6FF",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 24,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 32,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  lessonText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#475569",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  boldText: { fontWeight: "bold" },
  highlight: { color: "#2563EB", fontWeight: "bold" },
  homeButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
