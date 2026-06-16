// Enhanced Practice Screen — Blue & White Theme
// Features: Difficulty Levels (Unlocked), Lesson Practice with Progress Controls
 
import {
  ChevronRight
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import LetterRecognitionGame from "../../components/LetterRecognitionGame";
import SimpleWordsGame from "../../components/SimpleWordsGame";
import SyllableBasicsGame from "../../components/SyllableBasicsGame";
import ReadAloudModule from "../../components/practice/ReadAloudModule"; // 🌟 Imported our new component shortcut package here
import { beginnerReadAloud } from "../../data/readAloudData";
import { useAppProgress } from "../../hooks/useAppProgress";

// ─── Types ────────────────────────────────────────────────────────────────────
type FeedbackType = "ok" | "warn" | "err"
 
interface CoachFeedback {
  type: FeedbackType
  result: string
  comment: string
  tags: string[]
}
 
// ─── Component ────────────────────────────────────────────────────────────────
export default function DyslexicPractice() {
  // Integrate our Progress Engine Hook
  const {
    currentLevel,
    setCurrentLevel,
    currentFeatureStep,
    isLearnGatePassed,
    advanceToNextFeature,
    wordsCompletedCount,
    debugCompleteLearnModule
  } = useAppProgress()

  const [wordIndex, setWordIndex]                   = useState(0)
  const [spokenText, setSpokenText]                 = useState("")
  const [selectedLetter, setSelectedLetter]         = useState<string | null>(null)
  const [phonicPlaying, setPhonicPlaying]           = useState(false)
  const [lockHint, setLockHint]                     = useState("")
  
  // Custom Mascot Mimo Evaluation States
  const [mimoFeedback, setMimoFeedback]             = useState<{
    title: string;
    message: string;
    borderColor: string;
    textColor: string;
    bgColor: string;
  } | null>(null);

  // Active game navigation state
  const [activeLessonGame, setActiveLessonGame]     = useState<string | null>(null)

  const currentEntry = beginnerReadAloud[wordIndex] ?? beginnerReadAloud[0]
  const currentWord  = currentEntry.sentence

  // 🧠 Optimized using useMemo to lock static structural configs safely
  const DIFFICULTIES = useMemo(() => [
    { id: "beginner" as const,     label: "Beginner",     emoji: "🌱", words: 20, unlocked: true  },
    { id: "intermediate" as const, label: "Intermediate", emoji: "🔥", words: 30, unlocked: true  }, 
    { id: "advanced" as const,     label: "Advanced",     emoji: "⚡", words: 40, unlocked: true  },
    { id: "expert" as const,       label: "Expert",       emoji: "🏆", words: 50, unlocked: true  },
  ], []);

  const LESSON_ITEMS = useMemo(() => [
    { id: "LETTER_RECOGNITION", icon: "🔤", name: "Letter Recognition", meta: "Identify letters A–Z",      bg: "#EFF6FF" },
    { id: "SIMPLE_WORDS",       icon: "✍️",  name: "Simple Words",        meta: "3–4 letter basic words",    bg: "#FDF4FF" },
    { id: "SYLLABLE_BASICS",    icon: "🗣️", name: "Syllable Basics",     meta: "Break words into parts",    bg: "#F0FFF4" },
  ], []);

  const PHONICS_LETTERS = useMemo(() => [
    { char: "A", sound: '/æ/ — "ay"' },
    { char: "E", sound: '/ɛ/ — "ee"' },
    { char: "I", sound: '/ɪ/ — "ih"' },
    { char: "O", sound: '/ɒ/ — "oh"' },
  ], []);

  const currentDiff = useMemo(() => {
    return DIFFICULTIES.find((d) => d.id === currentLevel) || DIFFICULTIES[0];
  }, [DIFFICULTIES, currentLevel]);

  // ── Handlers ──
  const handleSelectDifficulty = (diff: typeof DIFFICULTIES[0]) => {
    setCurrentLevel(diff.id)
    setLockHint("")
  };

  const handleFeatureRowPress = (featureId: string) => {
    setActiveLessonGame(featureId)
  };

  const handleGameComplete = () => {
    setActiveLessonGame(null)
    advanceToNextFeature()
  };
 
  const goToNextWord = () => {
    setWordIndex((prev) => (prev < beginnerReadAloud.length - 1 ? prev + 1 : 0))
    setSpokenText("")
    setMimoFeedback(null)
  };
 
  // Processes user speech outcome and displays a friendly response from Mimo the Panda
  const handleProcessMimoSpeech = (outcome: "well_done" | "keep_trying" | "slow") => {
    setSpokenText(currentWord);

    if (outcome === "well_done") {
      setMimoFeedback({
        title: "Well done! 🎉",
        message: `You said "${currentWord.toUpperCase()}" perfectly! Mimo is super proud of you.`,
        borderColor: "#15803D",
        textColor: "#15803D",
        bgColor: "#DCFCE7",
      });
      
      if (typeof advanceToNextFeature === "function") {
        advanceToNextFeature();
      }
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
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    )
  }

  if (activeLessonGame === "SIMPLE_WORDS") {
    return (
      <SimpleWordsGame 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    )
  }

  if (activeLessonGame === "SYLLABLE_BASICS") {
    return (
      <SyllableBasicsGame 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    )
  }

  return (
    <View style={s.screen}>
      
      {/* 🛠️ TESTING HUD (TEMPORARY) */}
      <View style={s.debugHud}>
        <Text style={s.debugText}>
          Learn Status: {isLearnGatePassed(currentLevel) ? "✅ COMPLETED" : "❌ NOT LEARNED YET"}
        </Text>
        <TouchableOpacity 
          style={s.debugBtn} 
          onPress={() => debugCompleteLearnModule(currentLevel)}
        >
          <Text style={s.debugBtnText}>🔧 Clear Learn Gate</Text>
        </TouchableOpacity> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
 
        <Text style={s.pageTitle}>Practice Sessions</Text>
 
        {/* ── Difficulty ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>DIFFICULTY LEVEL</Text>
 
          <View style={s.diffRow}>
            {DIFFICULTIES.map((d) => {
              const isActive = currentLevel === d.id
              return (
                <TouchableOpacity
                  key={d.id}
                  onPress={() => handleSelectDifficulty(d)}
                  activeOpacity={0.75}
                  style={[
                    s.diffItem,
                    isActive && s.diffActive,
                  ]}
                >
                  <Text style={s.diffEmoji}>{d.emoji}</Text>
                  <Text style={[s.diffLabel, isActive && s.diffLabelActive]}>{d.label}</Text>
                  <Text style={[s.diffWords, isActive && s.diffWordsActive]}>{d.words} words</Text>
                </TouchableOpacity>
              )
            })}
          </View>
 
          {/* Progress bar */}
          <View style={s.progRow}>
            <View style={s.progBar}>
              <View style={[s.progFill, { width: `${Math.min((wordsCompletedCount / currentDiff.words) * 100, 100)}%` }]} />
            </View>
            <Text style={s.progTxt}>{wordsCompletedCount} / {currentDiff.words} words</Text>
          </View>
          {lockHint ? <Text style={s.lockHint}>{lockHint}</Text> : null}
        </View>
 
        {/* ── Lesson Practice Section ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>📚 LESSON PRACTICE</Text>
          {LESSON_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => handleFeatureRowPress(item.id)}
              style={[s.pRow, i === LESSON_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={s.pLeft}>
                <View style={[s.pIcon, { backgroundColor: item.bg }]}>
                  <Text style={{ fontSize: 15 }}>{item.icon}</Text>
                </View>
                <View>
                  <Text style={s.pName}>{item.name}</Text>
                  <Text style={s.pMeta}>{item.meta}</Text>
                </View>
              </View>
              <View style={s.pArr}>
                <ChevronRight size={13} color="#6B9EC8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

    
 
      {/* ── Read Aloud Section ── */}
        <ReadAloudModule
          wordIndex={wordIndex}
          totalSentences={beginnerReadAloud.length}
          currentEntry={currentEntry}
          mimoFeedback={mimoFeedback}
          onSpeechResult={handleProcessMimoSpeech}
          onNextWord={goToNextWord}
        />
        
        {/* ── Phonics Section ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>🔊 PHONICS</Text>
          <View style={s.letterGrid}>
            {PHONICS_LETTERS.map((l) => (
              <TouchableOpacity key={l.char} onPress={() => setSelectedLetter(l.char)} style={[s.lCard, selectedLetter === l.char && s.lCardActive]}>
                <Text style={s.lChar}>{l.char}</Text>
                <Text style={s.lSound}>{l.sound}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
 
// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#EFF6FF", 
    paddingHorizontal: 20, 
    paddingTop: 20 
  },
  pageTitle: { 
    fontSize: 22,
    fontWeight: "700", 
    color: "#1E3A5F", 
    marginBottom: 20,
    marginTop: 14,
    letterSpacing: 0.5
  },
  debugHud: { 
    backgroundColor: "#DBEAFE", 
    padding: 14, 
    borderRadius: 12, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#93C5FD", 
    marginBottom: 20 
  },
  debugText: { 
    fontSize: 13,
    fontWeight: "600", 
    color: "#1E40AF" 
  },
  debugBtn: { 
    backgroundColor: "#2563EB", 
    paddingVertical: 8,
    paddingHorizontal: 14, 
    borderRadius: 8 
  },
  debugBtnText: { 
    color: "#fff", 
    fontSize: 12,
    fontWeight: "bold" 
  },
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 16, 
    borderWidth: 1,
    borderColor: "#BFDBFE", 
    padding: 18,
    marginBottom: 20
  },
  cardTitle: { 
    fontSize: 13,
    fontWeight: "700", 
    color: "#6B9EC8", 
    letterSpacing: 1,
    marginBottom: 16 
  },
  diffRow: { 
    flexDirection: "row", 
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  diffItem: { 
    borderRadius: 100,
    borderWidth: 1.5, 
    borderColor: "#BFDBFE", 
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center",
    gap: 6,                     
    position: "relative" 
  },
  diffActive: { 
    backgroundColor: "#2563EB",
    borderColor: "#2563EB" 
  },
  diffEmoji: { 
    fontSize: 16
  },
  diffLabel: { 
    fontSize: 14,
    fontWeight: "600", 
    color: "#1E3A5F", 
    textAlign: "center" 
  },
  diffLabelActive: { color: "#fff" },
  diffWords: { 
    fontSize: 12, 
    color: "#6B9EC8", 
    textAlign: "center",
    fontWeight: "500"
  },
  diffWordsActive: { color: "#BFDBFE" },
  progRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 14, marginBottom: 10 },
  progBar: { flex: 1, height: 6, backgroundColor: "#BFDBFE", borderRadius: 99, overflow: "hidden" },
  progFill: { height: 6, backgroundColor: "#2563EB", borderRadius: 99 },
  progTxt: { fontSize: 12, color: "#6B9EC8", fontWeight: "600" },
  lockHint: { fontSize: 12, color: "#EF4444", marginTop: 4, textAlign: "center" },
  pRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 16,
    borderBottomWidth: 1, 
    borderBottomColor: "#DBEAFE", 
    justifyContent: 'space-between' 
  },
  pLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  pIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  pName: { 
    fontSize: 15,
    fontWeight: "600", 
    color: "#1E3A5F" 
  },
  pMeta: { 
    fontSize: 12,
    color: "#6B9EC8", 
    marginTop: 3 
  },
  pArr: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
  letterGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  lCard: { 
    width: "48%", 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: "#BFDBFE", 
    backgroundColor: "#F0F7FF", 
    padding: 16, 
    alignItems: "center" 
  },
  lCardActive: { borderColor: "#2563EB", backgroundColor: "#DBEAFE" },
  lChar: { fontSize: 28, fontWeight: "700", color: "#1E40AF" },
  lSound: { fontSize: 12, color: "#6B9EC8", marginTop: 4, fontWeight: "500" },
  testerPanel: { backgroundColor: "#EFF6FF", padding: 12, borderRadius: 14, marginBottom: 16, borderWidth: 1, borderColor: "#BFDBFE" },
  testerTitle: { fontSize: 11, fontWeight: "700", color: "#1E40AF", marginBottom: 8, letterSpacing: 0.5 },
  testerButtons: { flexDirection: "row", gap: 8 },
  testBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center" },
  testBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" }
})