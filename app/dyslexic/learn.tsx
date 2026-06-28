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
const questionPool = [
  {
    question: "Which word rhymes with 'Cake'?",
    options: ["Bake", "Back", "Book", "Bird"],
    answer: "Bake",
    pattern: "phonological_awareness",
  },
  {
    question: "Which word rhymes with 'Light'?",
    options: ["Night", "Leaf", "Stone", "Jump"],
    answer: "Night",
    pattern: "phonological_awareness",
  },

  {
    question: "Remove the 'S' sound from 'Smile'",
    options: ["Mile", "Tile", "File", "Pile"],
    answer: "Mile",
    pattern: "phoneme_manipulation",
  },
  {
    question: "Remove the 'B' sound from 'Black'",
    options: ["Lack", "Clock", "Back", "Lock"],
    answer: "Lack",
    pattern: "phoneme_manipulation",
  },

  {
    question: "Tap the letter q",
    options: ["p", "d", "q", "b"],
    answer: "q",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter faces right and upward?",
    options: ["b", "d", "q", "p"],
    answer: "b",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter faces left and is upward?",
    options: ["b", "d", "p", "q"],
    answer: "d",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter hangs below the line?",
    options: ["b", "d", "p", "m"],
    answer: "p",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter has the circle first?",
    options: ["b", "d", "p", "q"],
    answer: "d",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter has the stick first and upward?",
    options: ["b", "d", "p", "q"],
    answer: "b",
    pattern: "letter_reversal",
  },

  {
    question: "Find the matching letter for b",
    options: ["d", "q", "b", "p"],
    answer: "b",
    pattern: "letter_reversal",
  },

  {
    question: "Find the matching letter for d",
    options: ["p", "d", "q", "b"],
    answer: "d",
    pattern: "letter_reversal",
  },

  {
    question: "Complete the word: ___ed",
    options: ["b", "d", "p", "q"],
    answer: "b",
    pattern: "letter_reversal",
  },

  {
    question: "Complete the word: ___og",
    options: ["d", "b", "p", "q"],
    answer: "d",
    pattern: "letter_reversal",
  },

  {
    question: "Which letter points upward and left?",
    options: ["d", "b", "q", "p"],
    answer: "d",
    pattern: "letter_reversal",
  },
  {
    question: "Choose the correct spelling",
    options: ["Freind", "Friend", "Frend", "Frined"],
    answer: "Friend",
    pattern: "spelling_recognition",
  },
  {
    question: "Choose the correct spelling",
    options: ["Becuse", "Because", "Beacause", "Beacuse"],
    answer: "Because",
    pattern: "spelling_recognition",
  },

  {
    question: "Which word has a long E sound?",
    options: ["Chief", "Chef", "Chair", "Chat"],
    answer: "Chief",
    pattern: "phonics",
  },
  {
    question: "Which word sounds like 'Tree'?",
    options: ["Free", "Trap", "Frog", "Truck"],
    answer: "Free",
    pattern: "phonics",
  },

  {
    question: "What does B-L-I-N-K spell?",
    options: ["Blank", "Blink", "Blind", "Black"],
    answer: "Blink",
    pattern: "decoding",
  },
  {
    question: "What does C-A-P spell?",
    options: ["Cup", "Cap", "Cop", "Clip"],
    answer: "Cap",
    pattern: "decoding",
  },

  {
    question: "What does H-A-T spell?",
    options: ["Hot", "Hat", "Hit", "Hop"],
    answer: "Hat",
    pattern: "decoding",
  },

  {
    question: "What does B-E-D spell?",
    options: ["Bed", "Bad", "Bid", "Bud"],
    answer: "Bed",
    pattern: "decoding",
  },

  {
    question: "What does F-R-O-G spell?",
    options: ["Flag", "Frog", "Free", "Frame"],
    answer: "Frog",
    pattern: "decoding",
  },

  {
    question: "What does T-R-E-E spell?",
    options: ["Tree", "Train", "Trap", "Track"],
    answer: "Tree",
    pattern: "decoding",
  },
  {
    question: "What does S-T-A-R spell?",
    options: ["Start", "Store", "Star", "Stair"],
    answer: "Star",
    pattern: "decoding",
  },

  {
    question: "Fill in the missing vowel: C___t",
    options: ["oa", "ou", "ee", "ai"],
    answer: "oa",
    pattern: "vowel_processing",
  },
  {
    question: "Fill in the missing vowel: Tr___n",
    options: ["ai", "ee", "oa", "ou"],
    answer: "ai",
    pattern: "vowel_processing",
  },

  {
    question: "Find the matching pattern b-d-p-q",
    options: ["b-d-p-q", "d-b-q-p", "p-q-b-d", "q-p-d-b"],
    answer: "b-d-p-q",
    pattern: "visual_tracking",
  },
  {
    question: "Choose the matching sequence m-w-n-u",
    options: ["m-w-n-u", "n-u-m-w", "w-m-u-n", "u-n-w-m"],
    answer: "m-w-n-u",
    pattern: "visual_tracking",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateAssessmentQuestions() {
  const groupedQuestions: Record<string, any[]> = {};

  questionPool.forEach((question) => {
    if (!groupedQuestions[question.pattern]) {
      groupedQuestions[question.pattern] = [];
    }

    groupedQuestions[question.pattern].push(question);
  });

  const selectedQuestions = [];

  for (const pattern in groupedQuestions) {
    const shuffled = shuffleArray(groupedQuestions[pattern]);

    selectedQuestions.push(shuffled[0]);
  }

  const remainingQuestions = questionPool.filter(
    (q) =>
      !selectedQuestions.some((selected) => selected.question === q.question),
  );

  const shuffledRemaining = shuffleArray(remainingQuestions);

  while (selectedQuestions.length < 10 && shuffledRemaining.length > 0) {
    selectedQuestions.push(shuffledRemaining.pop());
  }

  return shuffleArray(selectedQuestions);
}
export default function LearnScreen() {
  const router = useRouter();

  const [questions] = useState(generateAssessmentQuestions());

  const [level, setLevel] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weakPatterns, setWeakPatterns] = useState<string[]>([]);
  const [primaryWeakArea, setPrimaryWeakArea] = useState("");

  const startTime = useRef<number>(Date.now());

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

      if (updatedScore >= 8 && totalTimeSeconds <= 22) {
        assignedLevel = "hard";
      } else if (updatedScore >= 4) {
        assignedLevel = "medium";
      }

      try {
        const response = await fetch(
          "https://grinch-cloak-grazing.ngrok-free.app/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              score: updatedScore,
              mistakes,
              reading_speed: totalTimeSeconds,
            }),
          },
        );

        const data = await response.json();

        if (data.level) {
          assignedLevel = data.level;
        }
      } catch (error) {
        console.warn("Backend offline. Using local algorithm.");
      }

      setLevel(assignedLevel);

      const patternFrequency: Record<string, number> = {};

      currentWeakAreas.forEach((pattern) => {
        const normalizedPattern = pattern.trim().toLowerCase();

        patternFrequency[normalizedPattern] =
          (patternFrequency[normalizedPattern] || 0) + 1;
      });

      let detectedWeakArea = "None Identified";

      let highestCount = 0;

      for (const pattern in patternFrequency) {
        if (patternFrequency[pattern] > highestCount) {
          highestCount = patternFrequency[pattern];
          detectedWeakArea = pattern;
        }
      }

      setPrimaryWeakArea(detectedWeakArea);
      let dynamicReview = "Excellent decoding fluency!";

      if (assignedLevel === "easy") {
        dynamicReview = "Focus: Phoneme Foundations";
      }

      if (assignedLevel === "medium") {
        dynamicReview = "Focus: Chunking & Syllables";
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { error } = await supabase.from("assessments").upsert(
            {
              user_id: user.id,
              score: updatedScore,
              level: assignedLevel,
              weak_area: primaryWeakArea,
              review: dynamicReview,
            },
            {
              onConflict: "user_id",
            },
          );

          if (error) throw error;
        }
      } catch (dbErr) {
        console.error("Database save failed:", dbErr);
      } finally {
        setLoading(false);
      }
    }
  };

  const startTargetedLesson = () => {
    let recommendedLesson = "letter_reversal";

    if (level === "easy") {
      switch (primaryWeakArea) {
        case "phonological_awareness":
        case "phoneme_manipulation":
        case "phonics":
          recommendedLesson = "phonics";
          break;
        case "vowel_processing":
          recommendedLesson = "vowel_processing";
          break;
        case "letter_reversal":
        default:
          recommendedLesson = "letter_reversal";
      }
    }

    if (level === "medium") {
      switch (primaryWeakArea) {
        case "decoding":
          recommendedLesson = "decoding";
          break;
        case "visual_tracking":
        case "vowel_processing":
        default:
          recommendedLesson = "chunking";
      }
    }

    if (level === "hard") {
      recommendedLesson = "morphology"; // matches your hard/morphology.ts
    }

    router.push({
      pathname: "/dyslexic/module/[level1]/[lesson]",
      params: {
        level1: `level1`, // always "level1" — the folder
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
                    {primaryWeakArea === "decoding"
                      ? "Focus: Decoding Skills"
                      : "Focus: Chunking & Syllables"}
                  </Text>

                  <Text style={styles.lessonText}>
                    {primaryWeakArea === "decoding"
                      ? "We detected difficulty blending letters and reading words smoothly. We will practice sounding out and decoding words step-by-step."
                      : "You have solid basic phoneme tracking. Let's build up complex vowel team segments."}
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
