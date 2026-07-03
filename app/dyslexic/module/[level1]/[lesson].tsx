import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
<<<<<<< HEAD
import { default as React, useEffect, useRef, useState } from "react";
import {
  Dimensions,
=======
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import DragDropCard from "../../../../components/lesson/Dragdropcard";
import ExplanationVisual from "../../../../components/lesson/ExplanationVisual";
import { Mascot } from "../../../../components/lesson/Mascot";
import TapToRevealCard from "../../../../components/lesson/TapToRevealCard";
import TraceActivity from "../../../../components/lesson/TraceActivity";
import letterReversal from "../../../../data/level1/easy/letter_reversal";
import phonics from "../../../../data/level1/easy/phonics";
import vowel_processing from "../../../../data/level1/easy/vowel_processing";
import chunking from "../../../../data/level1/medium/chunking";
import decoding from "../../../../data/level1/medium/decoding";
import level2LetterReversal from "../../../../data/level2/easy/letter_reversal";
import level2Phonics from "../../../../data/level2/easy/phonics";
import level2VisualTracking from "../../../../data/level2/easy/visual_tracking";
<<<<<<< HEAD

const curriculumMap: Record<string, any> = {
=======
import level2chunking from "../../../../data/level2/medium/chunking";
import level2decoding from "../../../../data/level2/medium/decoding";
import level3LetterReversal from "../../../../data/level3/easy/letter_reversal";
import level3Phonics from "../../../../data/level3/easy/phonics";
// import level3decoding from "../../../../data/level3/medium/decoding";
import level3VowelProcessing from "../../../../data/level3/easy/vowel_processing";
import {
  buildUrls,
  resolveServerIp,
  setServerIpOverride,
} from "../../../../utils/serverConfig";
const curriculumMap: Record<string, Record<string, any>> = {
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  level1: {
    letter_reversal: letterReversal,
    phonics: phonics,
    vowel_processing: vowel_processing,
    chunking: chunking,
    decoding: decoding,
  },
  level2: {
    letter_reversal: level2LetterReversal,
    phonics: level2Phonics,
<<<<<<< HEAD
    vowel_processing: level2VisualTracking,
=======
    visual_tracking: level2VisualTracking,
    chunking: level2chunking,
    decoding: level2decoding,
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  },
  level3: {
    letter_reversal: level3LetterReversal,
    phonics: level3Phonics,
    vowel_processing: level3VowelProcessing,
    // chunking: level3chunking,
    // decoding: level3decoding,
  },
};

const LEVEL_ORDER = ["level1", "level2", "level3"];

function getNextRoute(currentLevel: string, lessonKey: string): Href | null {
  const idx = LEVEL_ORDER.indexOf(currentLevel);
  const nextLevel = LEVEL_ORDER[idx + 1];
  if (!nextLevel) return null;

  const nextLevelLessons = curriculumMap[nextLevel];
  if (!nextLevelLessons) return null;

  if (nextLevelLessons[lessonKey]) {
    return {
      pathname: "/dyslexic/module/[level1]/[lesson]",
      params: { level1: nextLevel, lesson: lessonKey },
    };
  }

  console.warn(
    `${nextLevel} has no "${lessonKey}" lesson yet — student was defaulted instead.`,
  );
  return {
    pathname: "/dyslexic/module/[level1]/[lesson]",
    params: { level1: nextLevel, lesson: Object.keys(nextLevelLessons)[0] },
  };
}

// Mascot config now carries an explicit displayMode so placement is a
// deliberate choice per alert type, not an accidental side effect of
// which fields happen to be set.
type MascotConfig = {
  mood: "cheer" | "correct" | "wrong" | "encourage" | "frustrated";
  message: string;
  displayMode: "toast" | "modal";
};

export default function LessonScreen() {
  const router = useRouter();
<<<<<<< HEAD
=======
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const frameInterval = useRef<NodeJS.Timeout | null>(null);
  const confettiRef = useRef<any>(null);

  const [pendingWordHelp, setPendingWordHelp] = useState<{
    word: string;
    hyphenated: string;
  } | null>(null);

>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  const { lesson, level1 } = useLocalSearchParams();
  const [step, setStep] = useState(0);
  const lessonKey = Array.isArray(lesson) ? lesson[0] : lesson;
  const activeLevel = Array.isArray(level1) ? level1[0] : level1;

  const lessonData =
    curriculumMap[activeLevel]?.[lessonKey as string] ?? letterReversal;
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotConfig, setMascotConfig] = useState<MascotConfig | null>(null);

<<<<<<< HEAD
  const [intervention, setIntervention] = useState<{
    word: string;
    hyphenated: string;
  } | null>(null);
  const [isDistracted, setIsDistracted] = useState(false);

  const ws = useRef<WebSocket | null>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  // DYNAMIC LESSON LOOKUP
  const lessonKey = Array.isArray(lesson) ? lesson[0] : lesson;
  const lessonData =
    curriculumMap[level1 as string]?.[lessonKey as string] || letterReversal;
=======
  const ws = useRef<WebSocket | null>(null);
  const distractionTimer = useRef<any>(null);
  const reconnectTimer = useRef<any>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  const explanationLength = lessonData.explanation?.length || 0;
  const examplesLength = lessonData.examples?.length || 0;
  const totalSteps =
    explanationLength +
    examplesLength +
    (lessonData.guidedPractice?.length || 0);
  const currentPractice =
    lessonData.guidedPractice?.[step - explanationLength - examplesLength];

<<<<<<< HEAD
  // --- WEBSOCKET LIFECYCLE MANAGEMENT ---
  useEffect(() => {
    // Fast API development endpoint.
    // NOTE: If using a physical testing device, replace "127.0.0.1" with your computer's Local IP address (e.g., 192.168.X.X)
    const socketUrl = "ws://192.168.1.XX:8000/ws/app";
    ws.current = new WebSocket(socketUrl);

    ws.current.onopen = () => {
      console.log("Connected seamlessly to ZyraLex FastAPI Server Engine");
      sendCurrentWordsToTracker();
    };

    ws.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        // Handle Distraction Engine Intercept
        if (response.type === "DISTRACTION_ALERT") {
          setIsDistracted(true);
          Speech.speak(
            "Hey there! Let's bring our attention back to the lesson map.",
            { rate: 0.85 },
          );
        }

        // Handle Fixation / Syllable Breakdown Intercept
        if (response.type === "INTERVENTION_TRIGGER") {
          setIntervention({
            word: response.word,
            hyphenated: response.adaptations.hyphenated,
          });

          // Trigger audio reading cue seamlessly
          Speech.speak(
            `Let's break down the word: ${response.word}. It is pronounced as: ${response.adaptations.hyphenated}`,
            {
              rate: 0.75,
            },
          );
        }
      } catch (err) {
        console.error("Error parsing socket incoming frame stream data:", err);
      }
    };

    ws.current.onerror = (e) => console.log("WebSocket Connection Error: ", e);
    ws.current.onclose = () =>
      console.log("Disconnected from ZyraLex Socket Loop.");
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [step]); // Triggers reload sequence whenever step shifts to refresh local screen word coordinate data

  // Helper function to map current textual blocks to backend tracker coordinate grid maps
=======
  const [serverIp, setServerIp] = useState<string | null>(null);
  const [ipModalVisible, setIpModalVisible] = useState(false);
  const [ipInput, setIpInput] = useState("");
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "disconnected" | "unconfigured"
  >("connecting");

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) console.warn("Camera permission denied.");
    })();
  }, []);
  useEffect(() => {
    setStep(0);
    setFinished(false);
    setScore(0);
    setMascotConfig(null);
    setPendingWordHelp(null);
  }, [activeLevel, lessonKey]);

  // Resolve the server IP once on mount
  useEffect(() => {
    (async () => {
      const ip = await resolveServerIp();
      if (!ip) {
        setWsStatus("unconfigured");
        setIpModalVisible(true);
      } else {
        setServerIp(ip);
      }
    })();
  }, []);

  const saveIpOverride = async () => {
    const trimmed = ipInput.trim();
    if (!trimmed) return;
    await setServerIpOverride(trimmed);
    setServerIp(trimmed);
    setIpModalVisible(false);
  };

  useEffect(() => {
    if (!serverIp) return;

    const { base: BASE_IP_URL, ws: WS_IP_URL } = buildUrls(serverIp);
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      setWsStatus("connecting");

      fetch(`${BASE_IP_URL}/api/tracking/start`, { method: "POST" }).catch(
        (err) => console.error("Tracking start failed:", err),
      );

      const socket = new WebSocket(WS_IP_URL);
      ws.current = socket;

      socket.onopen = () => {
        if (cancelled) return;
        console.log("Connected to ZyraLex Server");
        setWsStatus("connected");
        sendCurrentWordsToTracker();
      };

      socket.onerror = () => {
        if (cancelled) return;
        setWsStatus("disconnected");
      };

      socket.onclose = () => {
        if (cancelled) return;
        setWsStatus("disconnected");
        reconnectTimer.current = setTimeout(connect, 4000);
      };

      socket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);

          if (response.type === "DISTRACTION_ALERT") {
            if (distractionTimer.current)
              clearTimeout(distractionTimer.current);
            const alertMessage =
              "Hey! Lost your place? It is completely normal take a rest but don't quit, you got this!!";
            setMascotConfig({
              mood: "encourage",
              message: alertMessage,
              displayMode: "toast",
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
            if (distractionTimer.current)
              clearTimeout(distractionTimer.current);
            const frustrationMessage =
              response.sel_message ||
              "This word is tough — and you're still here trying. That's what matters! ";
            setMascotConfig({
              mood: "frustrated",
              message: frustrationMessage,

              displayMode: "toast",
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
              displayMode: "modal",
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
    };

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (distractionTimer.current) clearTimeout(distractionTimer.current);
      ws.current?.close();
    };
  }, [serverIp]);

  useEffect(() => {
    sendCurrentWordsToTracker();
  }, [step]);

>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  const sendCurrentWordsToTracker = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    let targetWords: string[] = [];
<<<<<<< HEAD

    // Parse visual words on current active view layer layout frame
=======
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
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

<<<<<<< HEAD
    // Map screen words dynamically to fill the Python server's text layout grid system bounding-box array
=======
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
    const mappedScreenWords = targetWords.map((word) => ({
      word: word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
      x1: 0,
      y1: 0,
<<<<<<< HEAD
      x2: screenWidth, // Map dynamically across structural viewing area
      y2: screenHeight,
    }));
=======
      x2: screenWidth,
      y2: screenHeight,
    }));

>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
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
<<<<<<< HEAD
=======
      confettiRef.current?.start();
      setMascotConfig({
        mood: "correct",
        message: "Amazing! You got it right! Your hard work is paying off! ",
        displayMode: "modal",
      });
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
      Speech.speak("Amazing job!");
    } else {
      setMascotConfig({
        mood: "wrong",
        message:
          "That's okay! Mistakes help us learn. Try to sound it out next time. 💛",
        displayMode: "modal",
      });
      Speech.speak("Nice try! Keep going!");
    }
<<<<<<< HEAD
    handleNext();
=======
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  };
  

  const renderContent = () => {
    if (step < lessonData.explanation.length) {
      const item = lessonData.explanation[step];
      return (
        <View style={styles.card}>
          <View style={[styles.badge, item.type === "tip" && styles.tipBadge]}>
            <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
          </View>
<<<<<<< HEAD
          <Text style={styles.text}>{item.content}</Text>
=======
          <ExplanationVisual item={item} />

          <Text style={styles.text}>{item.content}</Text>
          {item.type === "activity" ? (
            <TraceActivity letter={item.visualAnchor} />
          ) : null}

>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
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
<<<<<<< HEAD

=======
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
    if (lessonData.guidedPractice && currentPractice) {
      if (currentPractice.interactionType === "tap-to-reveal") {
        return (
          <TapToRevealCard
            practice={currentPractice}
            onAnswer={handlePracticeAnswer}
            variant={lessonKey === "letter_reversal" ? "mirror-flip" : "pop"}
          />
        );
      }
      if (currentPractice.interactionType === "drag-and-drop") {
        return (
          <DragDropCard
            practice={currentPractice}
            onAnswer={handlePracticeAnswer}
          />
        );
      }
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

  const wsBadgeColor =
    wsStatus === "connected"
      ? "#22c55e"
      : wsStatus === "connecting"
        ? "#f59e0b"
        : "#ef4444";

  return (
<<<<<<< HEAD
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.complete}>🎉 {lessonData.completionMessage}</Text>
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
              if (lessonKey === "vowel_processing") {
                nextLesson = "visual_tracking";
              }
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

      {/* --- INTEGRATED MODAL OVERLAY: FIXATION / SYLLABLE ASSISTANCE ASSISTANT --- */}
      <Modal visible={intervention !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.interventionCard}>
            <Text style={styles.modalAlertTitle}>Let's Break It Down! 🧩</Text>
            <Text style={styles.originalWord}>{intervention?.word}</Text>
            <Text style={styles.syllableBreakdown}>
              {intervention?.hyphenated}
            </Text>
            <Text style={styles.modalMessage}>
              Take your time parsing out these core individual phonetic sounds!
            </Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIntervention(null)}
            >
              <Text style={styles.buttonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- INTEGRATED MODAL OVERLAY: DISTRACTION / RE-ENGAGEMENT DIALOGUE --- */}
      <Modal visible={isDistracted} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.distractionCard}>
            <Ionicons name="eye-off-outline" size={50} color="#F59E0B" />
            <Text style={styles.distractionTitle}>Are you still reading?</Text>
            <Text style={styles.distractionText}>
              Let's re-align together! We paused right where you left off on
              this module screen step.
=======
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIpInput(serverIp ?? "");
            setIpModalVisible(true);
          }}
        >
          <Text style={[styles.wsBadge, { backgroundColor: wsBadgeColor }]}>
            WS: {wsStatus}
            {serverIp ? ` (${serverIp})` : ""}
          </Text>
        </TouchableOpacity>

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
          <Animated.View
            key={step}
            entering={FadeInRight.duration(350)}
            exiting={FadeOutLeft.duration(200)}
          >
            {renderContent()}
          </Animated.View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.complete}>{lessonData.completionMessage}</Text>
            <Text style={styles.score}>
              Score: {score} / {lessonData.guidedPractice.length}
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
<<<<<<< HEAD
                { width: "100%", backgroundColor: "#F59E0B" },
              ]}
              onPress={() => setIsDistracted(false)}
            >
              <Text style={styles.buttonText}>Resume Learning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
=======
                { marginTop: 24, backgroundColor: "#2563EB" },
              ]}
              onPress={() => {
                setStep(0);
                setFinished(false);
                setScore(0);

                const nextRoute = getNextRoute(
                  activeLevel,
                  lessonKey as string,
                );

                if (nextRoute) {
                  router.replace(nextRoute);
                } else {
                  router.replace("/dyslexic");
                }
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Ambient nudges (distraction / frustration): same toast placement for both. */}
      {mascotConfig && mascotConfig.displayMode === "toast" ? (
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
        // Anything needing a decision or explicit dismissal: blocking modal.
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
                    displayMode: "modal",
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

      <Modal visible={ipModalVisible} transparent animationType="fade">
        <View style={styles.ipModalOverlay}>
          <View style={styles.ipModalCard}>
            <Text style={styles.ipModalTitle}>Server IP</Text>
            <Text style={styles.ipModalHint}>
              Enter the IP your FastAPI server (server.py) is running on, e.g.
              192.168.1.42. This is saved on this device so you only need to set
              it once per network.
            </Text>
            <TextInput
              value={ipInput}
              onChangeText={setIpInput}
              placeholder="192.168.1.42"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numbers-and-punctuation"
              style={styles.ipInput}
            />
            <View style={styles.ipModalButtons}>
              {serverIp && (
                <TouchableOpacity
                  style={styles.ipCancelButton}
                  onPress={() => setIpModalVisible(false)}
                >
                  <Text style={styles.noText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.ipSaveButton}
                onPress={saveIpOverride}
              >
                <Text style={styles.yesText}>Save & Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
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
<<<<<<< HEAD
  title: { fontSize: 30, fontWeight: "800", color: "#1E293B", marginBottom: 8 },
=======
  wsBadge: {
    position: "absolute",
    top: -180,
    right: -290,
    color: "white",
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 6,
    fontWeight: "700",
    zIndex: 9999,
    overflow: "hidden",
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
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
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
<<<<<<< HEAD

  // Modal layout structural layout extensions
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
=======
  ipModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
<<<<<<< HEAD
  interventionCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    width: "100%",
    elevation: 5,
  },
  modalAlertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 12,
  },
  originalWord: { fontSize: 24, fontWeight: "300", color: "#94A3B8" },
  syllableBreakdown: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2563EB",
    marginVertical: 12,
    letterSpacing: 2,
  },
  modalMessage: {
    fontSize: 15,
    textAlign: "center",
    color: "#475569",
    marginBottom: 20,
    lineHeight: 22,
  },
  closeModalButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  distractionCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
    elevation: 5,
  },
  distractionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    marginTop: 16,
    marginBottom: 8,
  },
  distractionText: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
=======
  ipModalCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 420,
  },
  ipModalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
  },
  ipModalHint: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 16,
  },
  ipInput: {
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  ipModalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  ipCancelButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  ipSaveButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
>>>>>>> 9b73812b7db82ac4a67f385e4b7d5ec4bf748575
  },
});
