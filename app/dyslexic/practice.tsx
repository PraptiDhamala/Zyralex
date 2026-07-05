import {
  ArrowLeft,
  BarChart3,
  ChevronRight,
  Eye,
  Pause,
  Play,
  RotateCcw,
  Settings,
} from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LetterRecognitionGame from "../../components/LetterRecognitionGame";
import SimpleWordsGame from "../../components/SimpleWordsGame";
import SyllableBasicsGame from "../../components/SyllableBasicsGame";
import ReadAloudModule from "../../components/practice/ReadAloudModule";
import { useAppProgress } from "../../hooks/useAppProgress";

// Structural Modular Connections
import { CameraPreview } from "../../components/CameraPreview";
import { useGazeTracking } from "../../hooks/useGazeTracking";

// Central matched 3-level data matrices
import { practiceDataMatrix as PRACTICE_DATA_MATRIX } from '../../data/practice';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export default function DyslexicPractice() {
  const {
    currentLevel,
    setCurrentLevel,
    advanceToNextFeature,
    wordsCompletedCount,
    debugCompleteLearnModule,
    isLearnGatePassed
  } = useAppProgress();

  const [wordIndex, setWordIndex]               = useState(0);
  const [spokenText, setSpokenText]                 = useState("");
  
  const [mimoFeedback, setMimoFeedback]             = useState<{
    title: string;
    message: string;
    borderColor: string;
    textColor: string;
    bgColor: string;
  } | null>(null);

  const [activeLessonGame, setActiveLessonGame]     = useState<string | null>(null);

  // Phonics Continuous Real-Time Tracking States
  const [phonicsIndex, setPhonicsIndex]             = useState(0);
  const [activeChunkIndex, setActiveChunkIndex]     = useState(0);
  const [isReadingActive, setIsReadingActive]       = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [evaluationData, setEvaluationData]         = useState<{ finalScore: number; feedback: string } | null>(null);
  
  // Real-Time Interaction Feedback Banners
  const [phonicsValidationMsg, setPhonicsValidationMsg] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const { 
    metrics, 
    handleFaceDetected, 
    getEvaluationReport, 
    resetSession,
    isCameraActive,
    setIsCameraActive
  } = useGazeTracking();

  const activeLevelKey: DifficultyLevel = (currentLevel === "intermediate" || currentLevel === "advanced" || currentLevel === "beginner") 
    ? (currentLevel as DifficultyLevel) 
    : "beginner";

  const rawLevelRoot = PRACTICE_DATA_MATRIX[activeLevelKey];

  const selectedLevelData = useMemo(() => {
    if (!rawLevelRoot) return null;

    const searchTargets = [
      (rawLevelRoot as any).lessons,
      (rawLevelRoot as any).lessonPractice,
      (rawLevelRoot as any).BEGINNER_LESSON_DATA,
      (rawLevelRoot as any).INTERMEDIATE_LESSON_DATA,
      (rawLevelRoot as any).ADVANCED_LESSON_DATA,
      (rawLevelRoot as any).default,
      rawLevelRoot
    ];

    let finalSimpleWords: any[] = [];
    let finalSyllableBasics: any[] = [];
    let finalLetterRec: any[] = [];

    for (const target of searchTargets) {
      if (target) {
        if (Array.isArray(target.simpleWords) && target.simpleWords.length > 0) {
          finalSimpleWords = target.simpleWords;
        }
        if (Array.isArray(target.syllableBasics) && target.syllableBasics.length > 0) {
          finalSyllableBasics = target.syllableBasics;
        }
        if (Array.isArray(target.letterRecognition) && target.letterRecognition.length > 0) {
          finalLetterRec = target.letterRecognition;
        }
      }
    }

    if (finalSimpleWords.length === 0 && (rawLevelRoot as any).lessons) {
      const nested = (rawLevelRoot as any).lessons;
      finalSimpleWords = nested?.simpleWords || [];
      finalSyllableBasics = nested?.syllableBasics || [];
      finalLetterRec = nested?.letterRecognition || [];
    }

    return {
      ...rawLevelRoot,
      simpleWords: finalSimpleWords,
      syllableBasics: finalSyllableBasics,
      letterRecognition: finalLetterRec
    };
  }, [rawLevelRoot, activeLevelKey]);

  useEffect(() => {
    setWordIndex(0);
    setPhonicsIndex(0);
    setActiveChunkIndex(0);
    setSpokenText("");
    setMimoFeedback(null);
    setPhonicsValidationMsg(null);
    setIsCameraActive(false); 
    setIsReadingActive(false);
  }, [currentLevel]);

  const totalReadAloudItems = selectedLevelData?.readAloud?.length || 0;
  const safeWordIndex       = wordIndex < totalReadAloudItems ? wordIndex : 0;
  const currentEntry        = selectedLevelData?.readAloud?.[safeWordIndex] || { sentence: "" };
  const currentWord         = currentEntry.sentence;

  const totalPhonicsItems   = selectedLevelData?.phonics?.length || 0;
  const safePhonicsIndex    = phonicsIndex < totalPhonicsItems ? phonicsIndex : 0;
  const activePhonics       = selectedLevelData?.phonics?.[safePhonicsIndex] || { word: "", phonemes: [], sounds: [] };
  const currentPhonemes     = activePhonics.phonemes || [];

  const totalSessionSteps = useMemo(() => {
    return totalReadAloudItems + totalPhonicsItems;
  }, [totalReadAloudItems, totalPhonicsItems]);

  const DIFFICULTIES = useMemo(() => [
    { id: "beginner" as const,    label: "Beginner",    emoji: "🌱", words: PRACTICE_DATA_MATRIX.beginner?.readAloud?.length + PRACTICE_DATA_MATRIX.beginner?.phonics?.length || 20 },
    { id: "intermediate" as const, label: "Intermed.",    emoji: "🔥", words: PRACTICE_DATA_MATRIX.intermediate?.readAloud?.length + PRACTICE_DATA_MATRIX.intermediate?.phonics?.length || 30 }, 
    { id: "advanced" as const,     label: "Advanced",     emoji: "⚡", words: PRACTICE_DATA_MATRIX.advanced?.readAloud?.length + PRACTICE_DATA_MATRIX.advanced?.phonics?.length || 40 },
  ], []);

  const LESSON_ITEMS = useMemo(() => [
    { id: "LETTER_RECOGNITION", icon: "🔤", name: "Letter Recognition", meta: "Identify letter variants", bg: "#EFF6FF" },
    { id: "SIMPLE_WORDS",       icon: "✍️",  name: "Simple Words",        meta: "Assemble structural blocks", bg: "#FDF4FF" },
    { id: "SYLLABLE_BASICS",    icon: "🗣️", name: "Syllable Basics",     meta: "Break down vocal sound rhythms", bg: "#F0FFF4" },
  ], []);

  const currentDiff = useMemo(() => {
    return DIFFICULTIES.find((d) => d.id === activeLevelKey) || DIFFICULTIES[0];
  }, [DIFFICULTIES, activeLevelKey]);

  const handleSelectDifficulty = (diff: typeof DIFFICULTIES[0]) => {
    setCurrentLevel(diff.id);
  };

  const handleFeatureRowPress = (featureId: string) => {
    setActiveLessonGame(featureId);
  };

  const handleGameComplete = () => {
    setActiveLessonGame(null);
    advanceToNextFeature();
  };
 
  const goToNextWord = () => {
    if (totalReadAloudItems === 0) return;
    setWordIndex((prev) => (prev < totalReadAloudItems - 1 ? prev + 1 : 0));
    setSpokenText("");
    setMimoFeedback(null);
  };

  const goToNextPhonicsWord = () => {
    setActiveChunkIndex(0);
    setPhonicsValidationMsg(null);
    if (totalPhonicsItems === 0) return;
    if (phonicsIndex < totalPhonicsItems - 1) {
      setPhonicsIndex((p) => p + 1);
    } else {
      setPhonicsIndex(0);
      setIsCameraActive(false);
      setIsReadingActive(false);
      Alert.alert("Awesome Work!", "You've successfully finished this matching session.");
    }
  };

  const handleStopAndEvaluate = () => {
    const report = getEvaluationReport();
    setEvaluationData(report);
    setReportModalVisible(true);
  };

  const handleCloseReport = () => {
    setReportModalVisible(false);
    resetSession();
  };

  const handleOpenCameraFlow = () => {
    setIsCameraActive(true);
    setIsReadingActive(true);
    setPhonicsValidationMsg(null);
    setActiveChunkIndex(0);
  };

  // Real-time phoneme step validation engine
  const handleVerifyPhonemeSpeechInput = (simulatedSound: string) => {
    if (!isCameraActive || !isReadingActive) return;

    if (!metrics.isLookingAtScreen) {
      setPhonicsValidationMsg({
        text: "Try again! Look closely at the letters on screen.",
        isCorrect: false
      });
      return;
    }

    const expectedSound = (activePhonics.sounds?.[activeChunkIndex] || "").toLowerCase().trim();
    const cleanInput = simulatedSound.toLowerCase().trim();

    if (cleanInput === expectedSound || cleanInput === "correct") {
      setPhonicsValidationMsg({
        text: `✔ Excellent! "${currentPhonemes[activeChunkIndex]?.toUpperCase()}" is correct.`,
        isCorrect: true
      });

      // Advance chunk inline loop step
      setTimeout(() => {
        setPhonicsValidationMsg(null);
        if (activeChunkIndex < currentPhonemes.length - 1) {
          setActiveChunkIndex((p) => p + 1);
        } else {
          // Word complete!
          goToNextPhonicsWord();
        }
      }, 1200);
    } else {
      setPhonicsValidationMsg({
        text: `Try again. Listen carefully to the "${currentPhonemes[activeChunkIndex]?.toUpperCase()}" sound.`,
        isCorrect: false
      });
    }
  };
 
  const handleProcessMimoSpeech = (outcome: "well_done" | "keep_trying" | "slow") => {
    if (!currentWord) return;
    setSpokenText(currentWord);

    if (outcome === "well_done") {
      setMimoFeedback({
        title: "Well done! 🎉",
        message: `You said "${currentWord.toUpperCase()}" perfectly! Mimo is super proud of you.`,
        borderColor: "#15803D",
        textColor: "#15803D",
        bgColor: "#DCFCE7",
      });
      advanceToNextFeature();
    } else if (outcome === "keep_trying") {
      setMimoFeedback({
        title: "Keep trying! 🌟",
        message: "You are so close! Let's try to say the sounds clearly with Mimo again.",
        borderColor: "#B45309",
        textColor: "#B45309",
        bgColor: "#FEF3C7",
      });
    } else {
      setMimoFeedback({
        title: "A little bit slow... 🕒",
        message: "Great sounds! Let's try to bring those letters together a tiny bit faster next time.",
        borderColor: "#B91C1C",
        textColor: "#B91C1C",
        bgColor: "#FEE2E2",
      });
    }
  };
 
  if (activeLessonGame === "LETTER_RECOGNITION") {
    return (
      <LetterRecognitionGame 
        level={activeLevelKey}
        data={selectedLevelData as any} 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }
  
  if (activeLessonGame === "SIMPLE_WORDS") {
    return (
      <SimpleWordsGame 
        level={activeLevelKey}
        data={selectedLevelData as any}
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }
  
  if (activeLessonGame === "SYLLABLE_BASICS") {
    return (
      <SyllableBasicsGame 
        level={activeLevelKey}
        data={selectedLevelData as any}
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }

  // Calculate clean fraction indicators for the premium tracker blocks
  const completedSoundsText = `${activeChunkIndex} / ${currentPhonemes.length} sounds completed`;
  const individualProgressPct = currentPhonemes.length > 0 ? (activeChunkIndex / currentPhonemes.length) * 100 : 0;
  const isFocused = metrics.isLookingAtScreen;

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle={isCameraActive ? "light-content" : "dark-content"} backgroundColor={isCameraActive ? "#0B1220" : "#EFF6FF"} />
      
      {isCameraActive ? (
        /*
          CAMERA VIEW — redesigned for dyslexic learners:
          - Structured stack (nav / word / camera / controls) instead of floating
            overlays, so nothing ever sits on top of the camera image.
          - The camera gets the largest single block on screen, framed in a
            focus-colored ring — attention state is communicated with a single
            glanceable color, not a wall of text.
          - Only ONE phoneme is emphasized at a time; passed/upcoming letters
            are deliberately muted so there's one clear thing to look at.
          - Big touch targets, short plain-language labels, minimal simultaneous
            messages on screen at once.
        */
        <View style={s.camScreen}>

          {/* Slim, solid nav bar — never overlaps the camera below it */}
          <View style={s.camNavBar}>
            <TouchableOpacity style={s.camNavBtn} onPress={() => setIsCameraActive(false)}>
              <ArrowLeft size={20} color="#1E3A5F" />
            </TouchableOpacity>
            <Text style={s.camNavTitle}>Phonics Coach</Text>
            <TouchableOpacity style={s.camNavBtn}>
              <Settings size={20} color="#1E3A5F" />
            </TouchableOpacity>
          </View>

          {/* Compact word + phoneme strip — current sound is the only bold thing here */}
          <View style={s.wordStrip}>
            <Text style={s.wordStripWord}>{activePhonics.word?.toUpperCase()}</Text>
            <View style={s.phonemeStripRow}>
              {currentPhonemes.map((chunk: string, index: number) => {
                const isPassed = index < activeChunkIndex;
                const isCurrent = index === activeChunkIndex;
                return (
                  <View
                    key={index}
                    style={[
                      s.phonemeChip,
                      isPassed && s.phonemeChipPassed,
                      isCurrent && s.phonemeChipCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        s.phonemeChipText,
                        isPassed && s.phonemeChipTextPassed,
                        isCurrent && s.phonemeChipTextCurrent,
                      ]}
                    >
                      {chunk.toUpperCase()}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* BIG camera block — takes up most of the screen, nothing on top of it
              except a single focus badge and (briefly) a feedback banner */}
          <View style={[s.cameraFrame, { borderColor: isFocused ? "#22C55E" : "#F59E0B" }]}>
            <CameraPreview onFacesDetected={handleFaceDetected} />

            <View style={[s.focusBadge, { backgroundColor: isFocused ? "rgba(34,197,94,0.92)" : "rgba(245,158,11,0.92)" }]}>
              <Eye size={14} color="#FFFFFF" />
              <Text style={s.focusBadgeText}>Focus {metrics.attentionScore}%</Text>
            </View>

            {!metrics.isFacePresent && (
              <View style={s.faceHintBadge}>
                <Text style={s.faceHintText}>Center your face in view</Text>
              </View>
            )}

            {phonicsValidationMsg && (
              <View
                style={[
                  s.camFeedbackBanner,
                  { backgroundColor: phonicsValidationMsg.isCorrect ? "rgba(16, 185, 129, 0.95)" : "rgba(239, 68, 68, 0.95)" },
                ]}
              >
                <Text style={s.camFeedbackText}>{phonicsValidationMsg.text}</Text>
              </View>
            )}
          </View>

          {/* Progress bar sits directly under the camera, before the controls */}
          <View style={s.camProgressRow}>
            <View style={s.camProgressTrack}>
              <View style={[s.camProgressFill, { width: `${Math.min(individualProgressPct, 100)}%` }]} />
            </View>
            <Text style={s.camProgressLabel}>{completedSoundsText}</Text>
          </View>

          {/* Bottom controls — large, few, clearly labeled */}
          <View style={s.camControlsBar}>
            {isReadingActive && (
              <View style={s.simRow}>
                <TouchableOpacity
                  style={[s.simBtn, { backgroundColor: "#10B981" }]}
                  onPress={() => handleVerifyPhonemeSpeechInput(activePhonics.sounds?.[activeChunkIndex] || "correct")}
                >
                  <Text style={s.simBtnText}>✔ Match "{currentPhonemes[activeChunkIndex]?.toUpperCase()}"</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.simBtn, { backgroundColor: "#EF4444" }]}
                  onPress={() => handleVerifyPhonemeSpeechInput("wrong_sound")}
                >
                  <Text style={s.simBtnText}>Distort Sound</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={s.camMainButtonsRow}>
              {!isReadingActive ? (
                <TouchableOpacity style={[s.camMainBtn, { backgroundColor: "#2563EB" }]} onPress={() => setIsReadingActive(true)}>
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                  <Text style={s.camMainBtnText}>Start</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[s.camMainBtn, { backgroundColor: "#475569" }]} onPress={() => setIsReadingActive(false)}>
                  <Pause size={16} color="#FFFFFF" />
                  <Text style={s.camMainBtnText}>Pause</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={s.camMainBtn} onPress={() => setActiveChunkIndex(0)}>
                <RotateCcw size={16} color="#FFFFFF" />
                <Text style={s.camMainBtnText}>Retry</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[s.camMainBtn, { backgroundColor: "#1E3A5F" }]} onPress={handleStopAndEvaluate}>
                <BarChart3 size={16} color="#FFFFFF" />
                <Text style={s.camMainBtnText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        /* STANDARD NORMAL LESSON SUBMENU SELECTION FLOW (Camera stays closed on load) — unchanged */
        <View style={s.screen}>
          <View style={s.debugHud}>
            <Text style={s.debugText} numberOfLines={2}>
              Learn Status: {isLearnGatePassed(activeLevelKey) ? "✅ COMPLETED" : "❌ NOT LEARNED"}
            </Text>
            <TouchableOpacity style={s.debugBtn} onPress={() => debugCompleteLearnModule(activeLevelKey)}>
              <Text style={s.debugBtnText}>🔧 Clear Gate</Text>
            </TouchableOpacity> 
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContainer}>
            <Text style={s.pageTitle}>Practice Sessions</Text>
     
            {/* Difficulty Grid Panel Row */}
            <View style={s.card}>
              <Text style={s.cardTitle}>DIFFICULTY LEVEL</Text>
              <View style={s.diffRow}>
                {DIFFICULTIES.map((d) => {
                  const isActive = activeLevelKey === d.id;
                  return (
                    <TouchableOpacity
                      key={d.id}
                      onPress={() => handleSelectDifficulty(d)}
                      activeOpacity={0.75}
                      style={[s.diffItem, isActive && s.diffActive]}
                    >
                      <Text style={s.diffEmoji}>{d.emoji}</Text>
                      <Text style={[s.diffLabel, isActive && s.diffLabelActive]} numberOfLines={1}>
                        {d.label}
                      </Text>
                      <Text style={[s.diffWords, isActive && d.id === activeLevelKey && { color: '#BFDBFE' }]} numberOfLines={1}>
                        {d.words} steps
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={s.progRow}>
                <View style={s.progBar}>
                  <View style={[s.progFill, { width: `${Math.min((wordsCompletedCount / totalSessionSteps) * 100, 100)}%` }]} />
                </View>
                <Text style={s.progTxt}>{wordsCompletedCount}/{totalSessionSteps}</Text>
              </View>
            </View>
     
            {/* Secondary Sub Games Mapping Panels List */}
            <View style={s.card}>
              <Text style={s.cardTitle}>📚 LESSON PRACTICE ({currentDiff.label})</Text>
              {LESSON_ITEMS.map((item, i) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => handleFeatureRowPress(item.id)}
                  style={[s.pRow, i === LESSON_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
                >
                  <View style={s.pLeft}>
                    <View style={[s.pIcon, { backgroundColor: item.bg }]}>
                      <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                    </View>
                    <View style={s.pTextContainer}>
                      <Text style={s.pName} numberOfLines={1}>{item.name}</Text>
                      <Text style={s.pMeta} numberOfLines={1}>{item.meta}</Text>
                    </View>
                  </View>
                  <View style={s.pArr}>
                    <ChevronRight size={14} color="#6B9EC8" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Immersive Camera Launch Anchor Panel Block */}
            <View style={s.card}>
              <Text style={s.cardTitle}>🎯 ATTENTION PHONICS COACH</Text>
              <Text style={s.phonicsHint}>Launch an immersive portrait reading sequence featuring active eye tracking & vocal assessment.</Text>
              <TouchableOpacity style={s.primaryLaunchCameraBtn} onPress={handleOpenCameraFlow}>
                <Text style={s.primaryLaunchCameraBtnText}>🚀 Open Fullscreen Camera</Text>
              </TouchableOpacity>
            </View>

            {/* Standard Read Aloud Block Layer */}
            {totalReadAloudItems > 0 && (
              <ReadAloudModule
                wordIndex={safeWordIndex}
                totalSentences={totalReadAloudItems}
                currentEntry={{
                  id: safeWordIndex,
                  sentence: currentEntry?.sentence || "",
                  words: (currentEntry?.sentence || "").split(" ")
                }}
                mimoFeedback={mimoFeedback}
                onSpeechResult={handleProcessMimoSpeech}
                onNextWord={goToNextWord}
              />
            )}
          </ScrollView>
        </View>
      )}

      {/* COMPREHENSIVE HUD ATTENTION EVALUATION SHEET MODAL */}
      <Modal visible={reportModalVisible} transparent={true} animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Mimo's Focus Report 🐾</Text>
            <Text style={s.modalScore}>{evaluationData?.finalScore}% Focus Score</Text>
            <Text style={s.modalFeedback}>{evaluationData?.feedback}</Text>
            <TouchableOpacity style={s.modalCloseBtn} onPress={handleCloseReport}>
              <Text style={s.modalCloseBtnText}>Back to Practice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#EFF6FF" },
  screen: { flex: 1, paddingHorizontal: "4%", paddingTop: 10 },
  scrollContainer: { paddingBottom: 60 },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#1E3A5F", marginBottom: 16, marginTop: 8 },
  
  // Debug Elements
  debugHud: { backgroundColor: "#DBEAFE", padding: 12, borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#93C5FD", marginBottom: 12 },
  debugText: { flex: 1, fontSize: 13, fontWeight: "600", color: "#1E40AF", marginRight: 8 },
  debugBtn: { backgroundColor: "#2563EB", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, minHeight: 36, justifyContent: "center" },
  debugBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  // ============== CAMERA VIEW (redesigned) ==============
  camScreen: { flex: 1, backgroundColor: "#0B1220" },

  // Slim solid nav — fixed height, sits ABOVE the camera block, never overlapping it
  camNavBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: "#0B1220" },
  camNavBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  camNavTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 1 },

  // Compact word + phoneme strip, fixed height
  wordStrip: { paddingHorizontal: 20, paddingBottom: 12, alignItems: 'center' },
  wordStripWord: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', letterSpacing: 1, marginBottom: 10 },
  phonemeStripRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  phonemeChip: { minWidth: 44, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.10)', alignItems: 'center' },
  phonemeChipText: { fontSize: 16, fontWeight: '700', color: 'rgba(255,255,255,0.45)' },
  phonemeChipPassed: { backgroundColor: 'rgba(34,197,94,0.18)' },
  phonemeChipTextPassed: { color: '#4ADE80' },
  phonemeChipCurrent: { backgroundColor: '#F59E0B' },
  phonemeChipTextCurrent: { color: '#1E1300', fontSize: 18 },

  // The camera itself — the single largest element on screen
  cameraFrame: { flex: 1, marginHorizontal: 14, borderRadius: 24, borderWidth: 4, overflow: 'hidden', backgroundColor: '#000' },

  focusBadge: { position: 'absolute', top: 14, left: 14, flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 99 },
  focusBadgeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  faceHintBadge: { position: 'absolute', bottom: 18, alignSelf: 'center', backgroundColor: 'rgba(15,18,24,0.75)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 99 },
  faceHintText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

  camFeedbackBanner: { position: 'absolute', bottom: 18, left: 20, right: 20, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16, alignItems: 'center' },
  camFeedbackText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14, textAlign: 'center' },

  // Progress directly under the camera
  camProgressRow: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  camProgressTrack: { width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' },
  camProgressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  camProgressLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', marginTop: 6, textAlign: 'center' },

  // Bottom controls, fixed height, large touch targets
  camControlsBar: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  simRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  simBtn: { flex: 1, paddingVertical: 12, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  simBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  camMainButtonsRow: { flexDirection: 'row', gap: 8 },
  camMainBtn: { flex: 1, flexDirection: 'row', gap: 6, backgroundColor: '#64748B', paddingVertical: 14, borderRadius: 16, alignItems: 'center', justifyContent: 'center', minHeight: 50 },
  camMainBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  // ============== END CAMERA VIEW ==============

  // Base Menu Styles Block (unchanged — original pre-camera design)
  card: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#BFDBFE", padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 12, fontWeight: "700", color: "#6B9EC8", letterSpacing: 1, marginBottom: 12 },
  diffRow: { flexDirection: "row", gap: 6, justifyContent: "space-between" },
  diffItem: { flex: 1, borderRadius: 12, borderWidth: 1.5, borderColor: "#BFDBFE", backgroundColor: "#fff", paddingVertical: 12, alignItems: "center", justifyContent: "center" },
  diffActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  diffEmoji: { fontSize: 18, marginBottom: 2 },
  diffLabel: { fontSize: 12, fontWeight: "700", color: "#1E3A5F", textAlign: "center" },
  diffLabelActive: { color: "#fff" },
  diffWords: { fontSize: 10, color: "#6B9EC8", marginTop: 2, textAlign: "center" },
  
  progRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 14 },
  progBar: { flex: 1, height: 8, backgroundColor: "#BFDBFE", borderRadius: 99, overflow: "hidden" },
  progFill: { height: "100%", backgroundColor: "#2563EB", borderRadius: 99 },
  progTxt: { fontSize: 12, color: "#6B9EC8", fontWeight: "600" },
  
  pRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#DBEAFE", justifyContent: 'space-between' },
  pLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1, marginRight: 8 },
  pIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  pTextContainer: { flex: 1 },
  pName: { fontSize: 15, fontWeight: "600", color: "#1E3A5F" },
  pMeta: { fontSize: 12, color: "#6B9EC8", marginTop: 2 },
  pArr: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
  
  phonicsHint: { fontSize: 12, color: '#6B9EC8', marginBottom: 12, fontStyle: 'italic' },
  primaryLaunchCameraBtn: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  primaryLaunchCameraBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 12, textAlign: 'center' },
  modalScore: { fontSize: 32, fontWeight: '800', color: '#2563EB', marginBottom: 8 },
  modalFeedback: { fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalCloseBtn: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, minHeight: 44, justifyContent: 'center' },
  modalCloseBtnText: { color: '#fff', fontWeight: '700' }
});