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
    if (!groupedQuestions[question.pattern])
      groupedQuestions[question.pattern] = [];
    groupedQuestions[question.pattern].push(question);
  });

  const selectedQuestions: any[] = [];
  for (const pattern in groupedQuestions) {
    selectedQuestions.push(shuffleArray(groupedQuestions[pattern])[0]);
  }

  const remainingQuestions = shuffleArray(
    questionPool.filter(
      (q) => !selectedQuestions.some((s) => s.question === q.question),
    ),
  );
  while (selectedQuestions.length < 10 && remainingQuestions.length > 0) {
    selectedQuestions.push(remainingQuestions.pop());
  }

  return shuffleArray(selectedQuestions);
}

export default function LearnScreen() {
  const router = useRouter();

  const [questions] = useState(generateAssessmentQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weakPatterns, setWeakPatterns] = useState<string[]>([]);

  const [displayLevel, setDisplayLevel] = useState("easy");
  const [displayWeakArea, setDisplayWeakArea] = useState("letter_reversal");

  const startTime = useRef<number>(Date.now());

  const handleAnswer = async (selected: string) => {
    let updatedScore = score;
    const currentWeakAreas = [...weakPatterns];

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
      return;
    }

    setFinished(true);
    setLoading(true);

    const totalTimeSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTime.current) / 1000),
    );
    const mistakes = questions.length - updatedScore;

    let displayLevel = "easy";
    if (updatedScore >= 8 && totalTimeSeconds <= 22) {
      displayLevel = "hard";
    } else if (updatedScore >= 4) {
      displayLevel = "medium";
    }

    try {
      const response = await fetch(
        "https://grinch-cloak-grazing.ngrok-free.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score: updatedScore,
            mistakes,
            reading_speed: totalTimeSeconds,
          }),
        },
      );
      const data = await response.json();
      if (data.level) displayLevel = data.level;
    } catch {
      console.warn("Backend offline. Using local algorithm.");
    }

    const patternFrequency: Record<string, number> = {};
    currentWeakAreas.forEach((pattern) => {
      const normalized = pattern.trim().toLowerCase();
      patternFrequency[normalized] = (patternFrequency[normalized] || 0) + 1;
    });

    let detectedWeakArea = "letter_reversal";
    let highestCount = 0;
    for (const pattern in patternFrequency) {
      if (patternFrequency[pattern] > highestCount) {
        highestCount = patternFrequency[pattern];
        detectedWeakArea = pattern;
      }
    }

    let dynamicReview = "Excellent decoding fluency!";
    if (displayLevel === "easy")
      dynamicReview = `Focus: ${detectedWeakArea.replace(/_/g, " ")}`;
    if (displayLevel === "medium")
      dynamicReview = "Focus: Chunking & Syllables";

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("assessments").upsert(
          {
            user_id: user.id,
            score: updatedScore,
            level: displayLevel,
            weak_area: detectedWeakArea,
            review: dynamicReview,
          },
          { onConflict: "user_id" },
        );
        if (error) throw error;
      }
    } catch (dbErr) {
      console.error("Database save failed:", dbErr);
    } finally {
      setDisplayLevel(displayLevel);
      setDisplayWeakArea(detectedWeakArea);
      setLoading(false);
    }
  };

  const startTargetedLesson = () => {
    const weakAreaToLesson: Record<string, string> = {
      letter_reversal: "letter_reversal",
      spelling_recognition: "letter_reversal",
      visual_tracking: "letter_reversal",
      phonics: "phonics",
      phonological_awareness: "phonics",
      phoneme_manipulation: "phonics",
      vowel_processing: "vowel_processing",
      decoding: "decoding",
      chunking: "chunking",
    };

    const levelToParam: Record<string, string> = {
      easy: "level1",
      medium: "level2",
      hard: "level2",
    };

    const lesson = weakAreaToLesson[displayWeakArea] ?? "letter_reversal";
    const level = levelToParam[displayLevel] ?? "level1";

    router.push({
      pathname: "/dyslexic/module/[level1]/[lesson]",
      params: { level1: level, lesson },
    });
  };

  const renderTargetedCard = () => {
    if (displayLevel === "hard") {
      return (
        <View style={styles.lessonCard}>
          <Text style={styles.lessonTitle}>
            Focus: Advanced Morphological Patterns
          </Text>
          <Text style={styles.lessonText}>
            Excellent decoding fluency! Your path will optimize structural
            prefixes and suffixes.
          </Text>
        </View>
      );
    }

    switch (displayWeakArea) {
      case "letter_reversal":
      case "spelling_recognition": // normalized to letter_reversal lesson
      case "visual_tracking": // normalized to letter_reversal lesson
        return (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>
              Focus: Letter Reversal & Identification
            </Text>
            <Text style={styles.lessonText}>
              Let's practice the difference between{" "}
              <Text style={styles.boldText}>b</Text> and{" "}
              <Text style={styles.boldText}>d</Text>:{"\n"}•{" "}
              <Text style={styles.highlight}>b</Text> has a belly (points right:{" "}
              <Text style={styles.boldText}>ba</Text>ll){"\n"}•{" "}
              <Text style={styles.highlight}>d</Text> wears a diaper (points
              left: <Text style={styles.boldText}>do</Text>g)
            </Text>
          </View>
        );

      case "phonics":
      case "phonological_awareness":
      case "phoneme_manipulation":
        return (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>
              Focus: Phonics & Sound Patterns
            </Text>
            <Text style={styles.lessonText}>
              We noticed difficulty with letter sounds and rhyming patterns.
              We'll practice matching sounds to letters and blending them into
              words.
            </Text>
          </View>
        );

      case "vowel_processing":
        return (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Focus: Vowel Processing</Text>
            <Text style={styles.lessonText}>
              We'll work on recognizing vowel teams like "oa", "ai", and "ee" so
              you can fill in missing sounds confidently.
            </Text>
          </View>
        );

      case "decoding":
        return (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Focus: Decoding Skills</Text>
            <Text style={styles.lessonText}>
              We detected difficulty blending letters and reading words
              smoothly. We'll practice sounding out and decoding words
              step-by-step.
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Focus: Chunking & Syllables</Text>
            <Text style={styles.lessonText}>
              You have a solid baseline. Let's work on breaking longer words
              into syllable chunks to improve reading fluency.
            </Text>
          </View>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ZyraLex Dyslexia Assessment</Text>

      {!finished && (
        <View style={styles.quizContainer}>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(currentQuestion / questions.length) * 100}%` },
              ]}
            />
          </View>
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
          <Text style={styles.resultHeader}>Assessment Completed 🎉</Text>

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
              <View style={styles.scoreRow}>
                <View style={styles.scoreBox}>
                  <Text style={styles.scoreNumber}>
                    {score}/{questions.length}
                  </Text>
                  <Text style={styles.scoreLabel}>Score</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text style={[styles.scoreNumber, { color: "#F59E0B" }]}>
                    {displayLevel.toUpperCase()}
                  </Text>
                  <Text style={styles.scoreLabel}>Level</Text>
                </View>
                <View style={styles.scoreBox}>
                  <Text
                    style={[
                      styles.scoreNumber,
                      { fontSize: 12, color: "#6366F1" },
                    ]}
                  >
                    {displayWeakArea.replace(/_/g, " ")}
                  </Text>
                  <Text style={styles.scoreLabel}>Focus Area</Text>
                </View>
              </View>

              <Text style={styles.levelBadge}>
                Assigned Program: {displayLevel.toUpperCase()}
              </Text>

              {renderTargetedCard()}

              <TouchableOpacity
                style={styles.homeButton}
                onPress={startTargetedLesson}
              >
                <Text style={styles.homeButtonText}>
                  Start Your First Lesson →
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
  progressBarBg: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 999,
  },
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
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  scoreBox: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  scoreNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
    textAlign: "center",
  },
  scoreLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 4,
    textAlign: "center",
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
