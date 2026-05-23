import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

// ==========================================
// 1. LESSON DATA STORAGE (Embedded directly)
// ==========================================
interface LessonSlide {
  title: string;
  content: string;
  example?: string;
}

const lessonsDataset: Record<string, LessonSlide[]> = {
  easy: [
    {
      title: "Phoneme Foundations: Tracking b vs d",
      content: "The letter 'b' has a belly in front. The letter 'd' has a diaper in the back. Let's practice tracking them visually.",
      example: "b -> bed, d -> dog"
    },
    {
      title: "Short Vowel Isolations",
      content: "Short vowel sounds can shift easily. Pay close attention to how your mouth changes shape between 'eh' (Net) and 'ih' (Nit).",
      example: "Net vs. Nit"
    }
  ],
  medium: [
    {
      title: "Chunking & Syllables",
      content: "Breaking longer complex words into tiny chunks makes reading smoother. Tap your fingers for every visual beat.",
      example: "Cat-er-pil-lar (Caterpillar)"
    },
    {
      title: "Vowel Teams (OA & OU)",
      content: "When two vowels match up together, the first vowel sound is usually long while the second stays completely quiet.",
      example: "C-OA-T (Coat)"
    }
  ],
  hard: [
    {
      title: "Advanced Morphological Patterns",
      content: "Isolating structural roots from prefixes and suffixes prevents visual crowding and improves total tracking speed.",
      example: "Un-comfort-able"
    }
  ]
};

export default function LearnScreen() {
  const router = useRouter();
  const [level, setLevel] = useState("easy");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weakPatterns, setWeakPatterns] = useState<string[]>([]);
  const startTime = useRef<number>(Date.now());

  // NEW STATES: Control the active lesson slides after the assessment ends
  const [inLessonMode, setInLessonMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const questions = [
    {
      question: "Which word rhymes with 'Fright'?",
      options: ["Flight", "Fridg", "Freit"],
      answer: "Flight",
      pattern: "phonological_awareness",
    },
    {
      question: "What word do you get if you take the 'S' sound out of 'Scream'?",
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
      question: "Complete the word '___illiand' (Brilliant) using the correct facing letter:",
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
      question: "Select the missing vowel pair for 'C___at' (as in a jacket/coat):",
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
    let localWeakPatterns = [...weakPatterns];

    if (selected === questions[currentQuestion].answer) {
      updatedScore += 1;
      setScore(updatedScore);
    } else {
      const currentPattern = questions[currentQuestion].pattern;
      localWeakPatterns.push(currentPattern);
      setWeakPatterns((prev) => [...prev, currentPattern]);
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
      const primaryWeakArea =
        localWeakPatterns.length > 0 ? localWeakPatterns[0] : "None Identified";

      let assignedLevel = "easy";
      if (updatedScore >= 8 && totalTimeSeconds <= 22) {
        assignedLevel = "hard";
      } else if (updatedScore >= 4) {
        assignedLevel = "medium";
      }

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
          assignedLevel = data.level;
        }
      } catch (error) {
        console.warn(
          "Backend dynamic prediction offline. Proceeding with frontend logic calculation.",
        );
      }

      setLevel(assignedLevel);

      let dynamicReview = "Excellent decoding fluency!";
      if (assignedLevel === "easy") dynamicReview = "Focus: Phoneme Foundations";
      if (assignedLevel === "medium") dynamicReview = "Focus: Chunking & Syllables";

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("assessments").upsert(
          {
            user_id: user.id,
            score: updatedScore,
            level: assignedLevel,
            weak_area: primaryWeakArea,
            review: dynamicReview,
          },
          { onConflict: "user_id" },
        );
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAssessment();
  }, []);

  const checkAssessment = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("assessments")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setLevel(data.level || "easy");
      setScore(data.score || 0);
    }
  };

  const navigateToHome = () => {
    router.replace("/dyslexic");
  };

  // NEW METHOD: Advances lessons or returns user to Home when slides finish
  const handleNextSlide = (totalSlides: number) => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      navigateToHome();
    }
  };

  // Locate current active slide sequence
  const activeSlides = lessonsDataset[level] || lessonsDataset["easy"];
  const currentSlide = activeSlides[currentSlideIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ZyraLex Dyslexia Program</Text>

      {/* STAGE 1: ASSESSMENT QUESTIONS */}
      {!finished && !inLessonMode && (
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

      {/* STAGE 2: ASSESSMENT RESULTS PREVIEW */}
      {finished && !inLessonMode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>Assessment Completed</Text>

          {loading ? (
            <Text style={styles.loadingText}>Processing reading diagnostics...</Text>
          ) : (
            <>
              <Text style={styles.levelBadge}>
                Assigned Tier: {level.toUpperCase()}
              </Text>

              <View style={styles.lessonCard}>
                <Text style={styles.lessonTitle}>Your Path is Ready</Text>
                <Text style={styles.lessonText}>
                  Based on your performance speed and patterns, we have curated a tracking program specifically for your profile.
                </Text>
              </View>

              {/* Action Button to launch Lesson state inside this same file */}
              <TouchableOpacity
                style={[styles.homeButton, { backgroundColor: "#10B981", marginBottom: 12 }]}
                onPress={() => setInLessonMode(true)}
              >
                <Text style={styles.homeButtonText}>Start Learning Modules</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={navigateToHome}>
                <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* STAGE 3: RUNTIME LESSON SLIDES */}
      {inLessonMode && currentSlide && (
        <View style={styles.lessonContainer}>
          <Text style={styles.progressText}>
            Slide {currentSlideIndex + 1} of {activeSlides.length} ({level.toUpperCase()})
          </Text>

          <View style={styles.slideCard}>
            <Text style={styles.slideTitle}>{currentSlide.title}</Text>
            <Text style={styles.slideContent}>{currentSlide.content}</Text>

            {currentSlide.example && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleHeader}>Visual Breakdown:</Text>
                <Text style={styles.exampleText}>{currentSlide.example}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => handleNextSlide(activeSlides.length)}
          >
            <Text style={styles.homeButtonText}>
              {currentSlideIndex === activeSlides.length - 1 ? "Complete Curriculum" : "Next Segment"}
            </Text>
          </TouchableOpacity>
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
  },
  homeButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  secondaryButtonText: { color: "#475569", fontSize: 16, fontWeight: "600" },
  
  // Lesson Specific Styles
  lessonContainer: { width: "100%" },
  slideCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  slideTitle: { fontSize: 22, fontWeight: "800", color: "#1E293B", marginBottom: 14 },
  slideContent: { fontSize: 18, lineHeight: 28, color: "#475569", letterSpacing: 0.5 },
  exampleContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  exampleHeader: { fontSize: 12, fontWeight: "700", color: "#64748B", textTransform: "uppercase" },
  exampleText: { fontSize: 20, fontWeight: "700", color: "#1E293B", marginTop: 4, letterSpacing: 1 },
});