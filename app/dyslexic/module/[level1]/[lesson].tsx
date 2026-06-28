import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import ConfettiCannon from "react-native-confetti-cannon";
import { Mascot } from "../../../../components/lesson/Mascot";
import letterReversal from "../../../../data/level1/easy/letter_reversal";
import phonics from "../../../../data/level1/easy/phonics";
import vowel_processing from "../../../../data/level1/easy/vowel_processing";
import chunking from "../../../../data/level1/medium/chunking";
import decoding from "../../../../data/level1/medium/decoding";
import level2LetterReversal from "../../../../data/level2/easy/letter_reversal";
import level2Phonics from "../../../../data/level2/easy/phonics";
import level2VisualTracking from "../../../../data/level2/easy/visual_tracking";
export default function LessonScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const frameInterval = useRef<NodeJS.Timeout | null>(null);
  const confettiRef = useRef<any>(null);

  const [pendingWordHelp, setPendingWordHelp] = useState<{
    word: string;
    hyphenated: string;
  } | null>(null);
  const curriculumMap: Record<string, any> = {
    letter_reversal: letterReversal,
    phonics: phonics,
    vowel_processing: vowel_processing,
    chunking: chunking,
    decoding: decoding,

    level2_letter_reversal: level2LetterReversal,
    level2_phonics: level2Phonics,
    level2_vowel_processing: level2VisualTracking,
  };
  const { lesson, level1 } = useLocalSearchParams();
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotConfig, setMascotConfig] = useState<{
    mood: "cheer" | "correct" | "wrong" | "encourage" | "frustrated";
    message: string;
    word?: string;
    hyphenated?: string;
  } | null>(null);
  const [isDistracted, setIsDistracted] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const distractionTimer = useRef<any>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const lessonKey = Array.isArray(lesson) ? lesson[0] : lesson;
  const lessonData =
    curriculumMap[level1 as string]?.[lessonKey as string] || letterReversal;
  const explanationLength = lessonData.explanation?.length || 0;
  const examplesLength = lessonData.examples?.length || 0;
  const totalSteps =
    explanationLength +
    examplesLength +
    (lessonData.guidedPractice?.length || 0);
  const currentPractice =
    lessonData.guidedPractice?.[step - explanationLength - examplesLength];

  const SERVER_IP = "192.168.254.69";
  const BASE_IP_URL = `http://${SERVER_IP}:8000`;
  const WS_IP_URL = `ws://${SERVER_IP}:8000/ws/app`;
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) console.warn("Camera permission denied.");
    })();
  }, []);
  useEffect(() => {
    fetch(`${BASE_IP_URL}/api/tracking/start`, { method: "POST" }).catch(
      (err) => console.error("Tracking start failed:", err),
    );

    ws.current = new WebSocket(WS_IP_URL);

    ws.current.onopen = () => {
      console.log("Connected to ZyraLex Server");
      setWsStatus("connected");
      sendCurrentWordsToTracker();
    };
    ws.current.onerror = () => setWsStatus("disconnected");
    ws.current.onclose = () => setWsStatus("disconnected");
    ws.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (response.type === "DISTRACTION_ALERT") {
          if (distractionTimer.current) clearTimeout(distractionTimer.current);
          const alertMessage =
            "Hey! Lost your place? It is completely normal take a rest but don't quit, you got this!!";
          setMascotConfig({
            mood: "encourage",
            message: alertMessage,
          });
          Speech.speak(alertMessage, {
            language: "en",
            pitch: 0.95,
            rate: 0.75,
          });
          distractionTimer.current = setTimeout(
            () => setMascotConfig(null),
            8000,
          );
        }

        if (response.type === "FRUSTRATION_ALERT") {
          if (distractionTimer.current) clearTimeout(distractionTimer.current);
          const frustrationMessage =
            response.sel_message ||
            "This word is tough — and you're still here trying. That's what matters! ";
          setMascotConfig({
            mood: "frustrated",
            message: frustrationMessage,
          });
          Speech.speak(frustrationMessage, {
            language: "en",
            pitch: 0.95,
            rate: 0.72,
          });
          distractionTimer.current = setTimeout(
            () => setMascotConfig(null),
            9000,
          );
        }

        if (response.type === "INTERVENTION_TRIGGER") {
          const interventionMessage = `${response.sel_message}\n\nDo you need help with the word "${response.word}"?`;
          setPendingWordHelp({
            word: response.word,
            hyphenated: response.adaptations.hyphenated,
          });
          setMascotConfig({
            mood: "encourage",
            message: interventionMessage,
          });
          Speech.speak(interventionMessage.replace("\n\n", " "), {
            language: "en",
            pitch: 0.95,
            rate: 0.75,
          });
        }
      } catch (err) {
        console.error("Error parsing socket data:", err);
      }
    };

    return () => {
      if (ws.current) ws.current.close();
      if (distractionTimer.current) clearTimeout(distractionTimer.current);
    };
  }, []);

  useEffect(() => {
    sendCurrentWordsToTracker();
  }, [step]);
  const sendCurrentWordsToTracker = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    let targetWords: string[] = [];
    if (step < explanationLength) {
      targetWords = lessonData.explanation[step].content.split(" ");
    } else if (
      lessonData.examples &&
      step < explanationLength + examplesLength
    ) {
      const example = lessonData.examples[step - explanationLength];
      targetWords = [example.word];
    } else if (currentPractice) {
      targetWords = currentPractice.question.split(" ");
    }

    const mappedScreenWords = targetWords.map((word) => ({
      word: word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
      x1: 0,
      y1: 0,
      x2: screenWidth,
      y2: screenHeight,
    }));

    if (mappedScreenWords.length > 0) {
      ws.current.send(JSON.stringify({ screen_words: mappedScreenWords }));
    }
  };

  const speakWord = (word: string) => {
    Speech.speak(word, { language: "en", pitch: 1, rate: 0.8 });
  };

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
      confettiRef.current?.start();
      setMascotConfig({
        mood: "correct",
        message: "Amazing! You got it right! Your hard work is paying off! ",
      });
      Speech.speak("Amazing job!");
    } else {
      setMascotConfig({
        mood: "wrong",
        message:
          "That's okay! Mistakes help us learn. Try to sound it out next time. 💛",
      });
      Speech.speak("Nice try! Keep going!");
    }
  };

  const renderContent = () => {
    if (step < lessonData.explanation.length) {
      const item = lessonData.explanation[step];
      return (
        <View style={styles.card}>
          <View style={[styles.badge, item.type === "tip" && styles.tipBadge]}>
            <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.text}>{item.content}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => speakWord(item.content)}
          >
            <View style={styles.audioRow}>
              <Ionicons name="volume-high" size={20} color="#fff" />
              <Text style={styles.buttonText}>Hear It</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 14 }]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (lessonData.examples && step < explanationLength + examplesLength) {
      const exampleIndex = step - explanationLength;
      const example = lessonData.examples[exampleIndex];
      return (
        <View style={styles.card}>
          <Text style={styles.bigLetter}>{example.emoji}</Text>
          <Text style={styles.word}>
            <Text
              style={{ color: example.color || "#2563EB", fontWeight: "bold" }}
            >
              {example.letter}
            </Text>
            {example.word.slice(example.letter.length)}
          </Text>
          {example.sentence && (
            <Text style={styles.exampleSentence}>{example.sentence}</Text>
          )}
          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => speakWord(example.word)}
          >
            <Ionicons name="volume-high" size={20} color="#2563EB" />
            <Text style={styles.audioText}>Hear Sound</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (lessonData.guidedPractice && currentPractice) {
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
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={[
            styles.wsBadge,
            {
              backgroundColor: wsStatus === "connected" ? "#22c55e" : "#ef4444",
            },
          ]}
        >
          WS: {wsStatus}
        </Text>
        <Text style={styles.title}>{lessonData.title}</Text>
        <Text style={styles.subtitle}>{lessonData.subtitle}</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((step + 1) / totalSteps) * 100}%` },
            ]}
          />
        </View>
        {!finished ? (
          renderContent()
        ) : (
          <View style={styles.card}>
            <Text style={styles.complete}>{lessonData.completionMessage}</Text>
            <Text style={styles.score}>
              Score: {score} / {lessonData.guidedPractice.length}
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                { marginTop: 24, backgroundColor: "#2563EB" },
              ]}
              onPress={() => {
                setStep(0);
                setFinished(false);
                setScore(0);
                let nextLesson = lessonKey;
                if (lessonKey === "vowel_processing")
                  nextLesson = "visual_tracking";
                router.replace({
                  pathname: "/dyslexic/module/[level1]/[lesson]",
                  params: { level1: "level2", lesson: nextLesson },
                });
              }}
            >
              <Text style={styles.buttonText}>Start Level 2</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {mascotConfig && mascotConfig.mood === "encourage" && !pendingWordHelp ? (
        <View style={styles.distractionToast}>
          <Image
            source={require("../../../../assets/mimoimg.png")}
            style={styles.toastMimo}
            resizeMode="contain"
          />
          <View style={styles.toastTextBlock}>
            <Text style={styles.toastTitle}>Hey!</Text>
            <Text style={styles.distractionText}>{mascotConfig.message}</Text>
          </View>
        </View>
      ) : mascotConfig ? (
        <View style={StyleSheet.absoluteFillObject}>
          <Mascot
            mood={mascotConfig.mood}
            message={mascotConfig.message}
            showNext={!pendingWordHelp}
            nextLabel="Got it!"
            onDismiss={() => {
              if (
                mascotConfig?.mood === "correct" ||
                mascotConfig?.mood === "wrong"
              ) {
                handleNext();
              }
              setMascotConfig(null);
              setPendingWordHelp(null);
            }}
          />

          {pendingWordHelp && (
            <View style={styles.wordHelpButtons}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={() => {
                  setMascotConfig({
                    mood: "cheer",
                    message: `"${pendingWordHelp.word}" breaks down as:\n\n${pendingWordHelp.hyphenated}`,
                  });
                  Speech.speak(
                    `Let's break it down: ${pendingWordHelp.hyphenated}`,
                    { rate: 0.75 },
                  );
                  setPendingWordHelp(null);
                }}
              >
                <Text style={styles.yesText}>Yes, help me! 🧩</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noButton}
                onPress={() => {
                  setMascotConfig(null);
                  setPendingWordHelp(null);
                  Speech.speak("You've got this! Keep going!");
                }}
              >
                <Text style={styles.noText}>I'm okay, keep going!</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}
      <ConfettiCannon
        ref={confettiRef}
        count={120}
        origin={{ x: screenWidth / 2, y: 0 }}
        autoStart={false}
        fadeOut={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  wsBadge: {
    position: "absolute",
    top: 20,
    right: 16,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: "700",
    zIndex: 99999,
  },
  wordHelpButtons: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    flexDirection: "row",
    gap: 12,
    zIndex: 100000,
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  noButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  yesText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  noText: { color: "#64748B", fontWeight: "700", fontSize: 15 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  progressBarBackground: {
    height: 14,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 24,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#F59E0B",
    borderRadius: 999,
  },
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
    fontSize: 24,
    lineHeight: 40,
    letterSpacing: 1,
    color: "#334155",
    marginBottom: 28,
  },
  bigLetter: { fontSize: 100, textAlign: "center", marginBottom: 20 },
  word: { fontSize: 42, textAlign: "center", marginBottom: 20 },
  exampleSentence: {
    fontSize: 20,
    lineHeight: 32,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  audioText: {
    marginLeft: 8,
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "700" },
  audioRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  question: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1E293B",
    lineHeight: 38,
    textAlign: "center",
  },
  distractionToast: {
    position: "absolute",
    top: 30,
    right: 26,
    backgroundColor: "#EEF4FF",
    borderColor: "#2563EB",
    borderWidth: 2,
    borderRadius: 20,
    padding: 12,
    maxWidth: 240,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 99999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  toastMimo: {
    width: 55,
    height: 75,
  },
  toastTextBlock: {
    flex: 1,
    flexShrink: 1,
  },
  toastTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 2,
  },
  distractionEmoji: { fontSize: 20 },
  distractionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E40AF",
    flexShrink: 1,
    lineHeight: 17,
  },
  option: {
    backgroundColor: "#F8FAFC",
    padding: 22,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  optionText: { fontSize: 22, textAlign: "center", fontWeight: "600" },
  complete: {
    fontSize: 26,
    lineHeight: 38,
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "700",
  },
  score: { textAlign: "center", color: "#64748B", marginTop: 10, fontSize: 18 },
});
