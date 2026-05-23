import { useRouter } from "expo-router"; // 1. Import useRouter
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function LearnScreen() {
  const router = useRouter(); // 2. Initialize the router
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
    // Create a local copy to bypass async state update lag
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

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score: updatedScore,
            mistakes: mistakes,
            reading_speed: totalTimeSeconds,
          }),
        });

        const data = await response.json();

        if (data.level) {
          const assignedLevel = data.level;
          setLevel(assignedLevel);

          const {
            data: { user },
          } = await supabase.auth.getUser();

          // FIX: Use the local variable instead of the stale state array
          const primaryWeakArea =
            currentWeakAreas.length > 0
              ? currentWeakAreas[0]
              : "None Identified";

          let dynamicReview = "Excellent decoding fluency!";
          if (assignedLevel === "easy")
            dynamicReview = "Focus: Phoneme Foundations";
          if (assignedLevel === "medium")
            dynamicReview = "Focus: Chunking & Syllables";

          await supabase.from("assessments").insert({
            user_id: user?.id,
            score: updatedScore,
            level: assignedLevel,
            weak_area: primaryWeakArea,
            review: dynamicReview,
          });
        } else {
          throw new Error("Invalid level payload structure");
        }
      } catch (error) {
        console.warn("Backend missing. Triggering local backup...", error);
        let fallbackLevel = "easy";
        if (updatedScore >= 8 && totalTimeSeconds <= 22) fallbackLevel = "hard";
        else if (updatedScore >= 4) fallbackLevel = "medium";

        setLevel(fallbackLevel);

        // Local fallback insert so the database updates even if your Python server is offline
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const primaryWeakArea =
          currentWeakAreas.length > 0 ? currentWeakAreas[0] : "None Identified";

        await supabase.from("assessments").insert({
          user_id: user?.id,
          score: updatedScore,
          level: fallbackLevel,
          weak_area: primaryWeakArea,
          review:
            fallbackLevel === "easy"
              ? "Focus: Phoneme Foundations"
              : "Review Patterns",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  // 3. Navigation handler back to Home
  const navigateToHome = () => {
    router.replace("/dyslexic"); // Adjust this route layout matcher matching your directory schema
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
            <Text style={styles.loadingText}>
              Processing reading diagnostics...
            </Text>
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
                  <Text style={styles.lessonText}>
                    When tracking longer blend terms, segment them cleanly:
                  </Text>
                  <Text style={styles.lessonText}>
                    • re · mem · ber{"\n"}• fanta · stic
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
                    structural reading metrics and prefixes/suffixes.
                  </Text>
                  <Text style={styles.lessonText}>
                    • <Text style={styles.highlight}>Un</Text>predict
                    <Text style={styles.highlight}>able</Text>
                    {"\n"}• <Text style={styles.highlight}>Mis</Text>understand
                  </Text>
                </View>
              )}

              {/* 4. Action Button added here */}
              <TouchableOpacity
                style={styles.homeButton}
                onPress={navigateToHome}
              >
                <Text style={styles.homeButtonText}>Go to Dashboard</Text>
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
  highlight: { color: "navy", fontWeight: "bold" },
  homeButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
