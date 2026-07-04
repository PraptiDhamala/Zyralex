import { ChevronRight } from "lucide-react-native";
import React, { useMemo, useState, useEffect } from "react";
import {
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
import { AttentionMeter } from "../../components/AttentionMeter";
import { CameraPreview } from "../../components/CameraPreview";
import { useGazeTracking } from "../../hooks/useGazeTracking";

// Central matched 3-level data matrices
import { practiceDataMatrix as PRACTICE_DATA_MATRIX } from '../../data/practice';

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

  // Phonics Gaze States
  const [phonicsIndex, setPhonicsIndex]             = useState(0);
  const [activeChunkIndex, setActiveChunkIndex]     = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [evaluationData, setEvaluationData]         = useState<{ finalScore: number; feedback: string } | null>(null);

  const { metrics, handleFaceDetected, getEvaluationReport, resetSession } = useGazeTracking();

  // Dynamically derive current level data streams mapping onto selections safely typed
  // Dynamically derive current level data streams mapping onto selections safely typed
  const activeLevelKey: DifficultyLevel = (currentLevel === "intermediate" || currentLevel === "advanced" || currentLevel === "beginner") 
    ? (currentLevel as DifficultyLevel) 
    : "beginner";

  // 1. Get the raw module mapping root from your index matrix
  const rawLevelRoot = PRACTICE_DATA_MATRIX[activeLevelKey];

  // 2. Comprehensive Deep Adapter Layer
  const selectedLevelData = useMemo(() => {
    if (!rawLevelRoot) return null;

    // A list of every possible place your dataset arrays could be nesting inside index.ts
    const searchTargets = [
      (rawLevelRoot as any).lessons,
      (rawLevelRoot as any).lessonPractice,
      (rawLevelRoot as any).BEGINNER_LESSON_DATA,
      (rawLevelRoot as any).INTERMEDIATE_LESSON_DATA,
      (rawLevelRoot as any).ADVANCED_LESSON_DATA,
      (rawLevelRoot as any).default,
      rawLevelRoot
    ];

    // Look through each candidate target for your arrays
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

    // Double-check: If they are STILL empty, check if index.ts accidentally passed the arrays under 'lessons' directly
    if (finalSimpleWords.length === 0 && (rawLevelRoot as any).lessons) {
      const nested = (rawLevelRoot as any).lessons;
      finalSimpleWords = nested?.simpleWords || [];
      finalSyllableBasics = nested?.syllableBasics || [];
      finalLetterRec = nested?.letterRecognition || [];
    }

    // Log this to your developer console so you can instantly verify what was found
    console.log(`[Data Bridge Debug] Level: ${activeLevelKey} | Found simpleWords count: ${finalSimpleWords.length}`);

    return {
      ...rawLevelRoot,
      simpleWords: finalSimpleWords,
      syllableBasics: finalSyllableBasics,
      letterRecognition: finalLetterRec
    };
  }, [rawLevelRoot, activeLevelKey]);

  // Reset internal tracking offsets gracefully when user flips tabs to prevent out-of-bounds array reads
  useEffect(() => {
    setWordIndex(0);
    setPhonicsIndex(0);
    setActiveChunkIndex(0);
    setSpokenText("");
    setMimoFeedback(null);
  }, [currentLevel]);

  // Dynamic Array Assertions with strict boundaries 
  const totalReadAloudItems = selectedLevelData?.readAloud?.length || 0;
  const safeWordIndex       = wordIndex < totalReadAloudItems ? wordIndex : 0;
  const currentEntry        = selectedLevelData?.readAloud?.[safeWordIndex] || { sentence: "" };
  const currentWord         = currentEntry.sentence;

  const totalPhonicsItems   = selectedLevelData?.phonics?.length || 0;
  const safePhonicsIndex    = phonicsIndex < totalPhonicsItems ? phonicsIndex : 0;
  const activePhonics       = selectedLevelData?.phonics?.[safePhonicsIndex] || { word: "", phonemes: [], sounds: [] };

  // Calculate maximum session steps based strictly on real dataset sizes instead of hardcoded numbers
  const totalSessionSteps = useMemo(() => {
    return totalReadAloudItems + totalPhonicsItems;
  }, [totalReadAloudItems, totalPhonicsItems]);

  const DIFFICULTIES = useMemo(() => [
    { id: "beginner" as const,     label: "Beginner",     emoji: "🌱", words: PRACTICE_DATA_MATRIX.beginner?.readAloud?.length + PRACTICE_DATA_MATRIX.beginner?.phonics?.length || 20 },
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

  const advancePhonicsChunk = () => {
    const totalPhonemes = activePhonics.phonemes?.length ?? 0;
    if (activeChunkIndex < totalPhonemes - 1) {
      setActiveChunkIndex((p) => p + 1);
    } else {
      setActiveChunkIndex(0);
      if (totalPhonicsItems === 0) return;
      setPhonicsIndex((p) => (p < totalPhonicsItems - 1 ? p + 1 : 0));
    }
  };

  const goToNextPhonicsWord = () => {
    setActiveChunkIndex(0);
    if (totalPhonicsItems === 0) return;
    setPhonicsIndex((p) => (p < totalPhonicsItems - 1 ? p + 1 : 0));
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
 
  // ── DYNAMIC LESSON GAME OVERLAYS ──
  if (activeLessonGame === "LETTER_RECOGNITION") {
    return (
      <LetterRecognitionGame 
        level={activeLevelKey}
        data={selectedLevelData} 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }
  
  if (activeLessonGame === "SIMPLE_WORDS") {
    return (
      <SimpleWordsGame 
        level={activeLevelKey}
        data={selectedLevelData}
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }
  
  if (activeLessonGame === "SYLLABLE_BASICS") {
    return (
      <SyllableBasicsGame 
        level={activeLevelKey}
        data={selectedLevelData}
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFF6FF" />
      <View style={s.screen}>
        
        {/* 🛠️ TESTING HUD */}
        <View style={s.debugHud}>
          <Text style={s.debugText} numberOfLines={2}>
            Learn Status: {isLearnGatePassed(activeLevelKey) ? "✅ COMPLETED" : "❌ NOT LEARNED"}
          </Text>
          <TouchableOpacity style={s.debugBtn} onPress={() => debugCompleteLearnModule(activeLevelKey)}>
            <Text style={s.debugBtnText}>🔧 Clear Gate</Text>
          </TouchableOpacity> 
        </View>

        {/* 👁️ REAL-TIME PERFORMANCE PANEL */}
        <View style={s.attentionStatusHud}>
          <Text style={s.hudIndicator}>{metrics.isFacePresent ? "👤 Connected" : "👤 Off-camera"}</Text>
          <Text style={[s.hudIndicator, { color: metrics.isLookingAtScreen ? '#15803D' : '#EF4444' }]} numberOfLines={1}>
            {metrics.isLookingAtScreen ? "🎯 Looking Screen" : "⚠️ Looking Away"}
          </Text>
          <Text style={s.hudIndicator} numberOfLines={1}>Read: {metrics.estimatedReadingDirection}</Text>
        </View>

        {!metrics.isLookingAtScreen && (
          <View style={s.gazeAlert}>
            <Text style={s.gazeAlertText}>👀 Keep looking here while reading!</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContainer}>
   
          <Text style={s.pageTitle}>Practice Sessions</Text>
   
          {/* ── Difficulty Switcher Tab Row ── */}
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
                    <Text style={[s.diffWords, isActive && s.diffWordsActive]} numberOfLines={1}>
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
   
          {/* ── Lesson Practice Section ── */}
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

          {/* ── LIVE GAZE PHONICS MODULE ── */}
          <View style={s.card}>
            <Text style={s.cardTitle}>🎯 ATTENTION PHONICS READING</Text>
            <Text style={s.phonicsHint}>Tap chunks from left to right as you read aloud!</Text>
            
            <View style={s.gazePracticeBox}>
              <Text style={s.phonicsTargetWord} numberOfLines={1}>TARGET WORD: {activePhonics.word?.toUpperCase()}</Text>
              
              <View style={s.chunksInteractiveRow}>
                {(activePhonics.phonemes ?? []).map((chunk: string, idx: number) => {
                  const isActive = idx === activeChunkIndex;
                  return (
                    <TouchableOpacity 
                      key={idx} 
                      onPress={advancePhonicsChunk}
                      style={[s.chunkBubble, isActive && s.chunkBubbleActive]}
                    >
                      <Text style={[s.chunkText, isActive && s.chunkTextActive]}>{chunk}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={s.soundHint} numberOfLines={2}>
                Current sound helper: {activePhonics.sounds?.[activeChunkIndex] ?? "/../"}
              </Text>
            </View>

            <View style={s.meterContainer}>
              <AttentionMeter score={metrics.attentionScore} />
            </View>

            <View style={s.cameraFooterControl}>
              <View style={s.cameraWrapper}>
                <CameraPreview onFacesDetected={handleFaceDetected} />
              </View>
              <View style={s.actionBtnGroup}>
                <TouchableOpacity style={s.nextWordBtn} onPress={goToNextPhonicsWord}>
                  <Text style={s.nextWordBtnText}>Next Word ➡️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.evaluateBtn} onPress={handleStopAndEvaluate}>
                  <Text style={s.evaluateBtnText}>Evaluate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Read Aloud Section ── */}
          {totalReadAloudItems > 0 && (
  <ReadAloudModule
    wordIndex={safeWordIndex}
    totalSentences={totalReadAloudItems}
    currentEntry={{
      id: safeWordIndex, // Using safeWordIndex since it is already defined and in scope!
      sentence: currentEntry?.sentence || "",
      words: (currentEntry?.sentence || "").split(" ")
    }}
    mimoFeedback={mimoFeedback}
    onSpeechResult={handleProcessMimoSpeech}
    onNextWord={goToNextWord}
  />
)}


        </ScrollView>

        {/* ── EVALUATION REPORT MODAL ── */}
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
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#EFF6FF" },
  screen: { flex: 1, paddingHorizontal: "4%", paddingTop: 10 },
  scrollContainer: { paddingBottom: 60 },
  pageTitle: { fontSize: 22, fontWeight: "700", color: "#1E3A5F", marginBottom: 16, marginTop: 8, letterSpacing: 0.5 },
  
  debugHud: { backgroundColor: "#DBEAFE", padding: 12, borderRadius: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#93C5FD", marginBottom: 12 },
  debugText: { flex: 1, fontSize: 13, fontWeight: "600", color: "#1E40AF", marginRight: 8 },
  debugBtn: { backgroundColor: "#2563EB", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, minHeight: 36, justifyContent: "center" },
  debugBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  
  attentionStatusHud: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE', marginBottom: 10, gap: 4 },
  hudIndicator: { flex: 1, fontSize: 11, fontWeight: '700', color: '#1E3A5F', textAlign: 'center' },
  gazeAlert: { backgroundColor: '#EF4444', padding: 12, borderRadius: 8, marginBottom: 10 },
  gazeAlertText: { color: '#fff', fontWeight: '800', textAlign: 'center', fontSize: 14 },
  
  card: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#BFDBFE", padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 12, fontWeight: "700", color: "#6B9EC8", letterSpacing: 1, marginBottom: 12 },
  
  diffRow: { flexDirection: "row", gap: 6, justifyContent: "space-between", paddingVertical: 4 },
  diffItem: { flex: 1, borderRadius: 12, borderWidth: 1.5, borderColor: "#BFDBFE", backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 4, alignItems: "center", justifyContent: "center" },
  diffActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  diffEmoji: { fontSize: 18, marginBottom: 2 },
  diffLabel: { fontSize: 12, fontWeight: "700", color: "#1E3A5F", textAlign: "center" },
  diffLabelActive: { color: "#fff" },
  diffWords: { fontSize: 10, color: "#6B9EC8", textAlign: "center", fontWeight: "500", marginTop: 1 },
  diffWordsActive: { color: "#BFDBFE" },
  
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
  pArr: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  
  phonicsHint: { fontSize: 12, color: '#6B9EC8', marginBottom: 12, fontStyle: 'italic' },
  gazePracticeBox: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', width: "100%" },
  phonicsTargetWord: { fontSize: 12, color: '#94A3B8', fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  chunksInteractiveRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  chunkBubble: { backgroundColor: '#E2E8F0', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, minWidth: 50, alignItems: 'center' },
  chunkBubbleActive: { backgroundColor: '#2563EB' },
  chunkText: { fontSize: 24, fontWeight: 'bold', color: '#334155' },
  chunkTextActive: { color: '#fff' },
  soundHint: { fontSize: 13, color: '#475569', fontWeight: '500', textAlign: 'center' },
  
  meterContainer: { width: "100%", marginVertical: 4 },
  cameraFooterControl: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, width: "100%" },
  cameraWrapper: { width: 70, height: 70, borderRadius: 10, overflow: 'hidden', flexShrink: 0 },
  actionBtnGroup: { flex: 1, marginLeft: 12, gap: 8 },
  nextWordBtn: { backgroundColor: '#4B5563', paddingVertical: 10, borderRadius: 10, alignItems: 'center', minHeight: 40, justifyContent: 'center' },
  nextWordBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  evaluateBtn: { backgroundColor: '#1E3A5F', paddingVertical: 10, borderRadius: 10, alignItems: 'center', minHeight: 40, justifyContent: 'center' },
  evaluateBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 12, textAlign: 'center' },
  modalScore: { fontSize: 32, fontWeight: '800', color: '#2563EB', marginBottom: 8 },
  modalFeedback: { fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalCloseBtn: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, minHeight: 44, justifyContent: 'center' },
  modalCloseBtnText: { color: '#fff', fontWeight: '700' }
});