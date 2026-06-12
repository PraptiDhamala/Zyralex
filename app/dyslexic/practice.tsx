
// Enhanced Practice Screen — Blue & White Theme
// Features: Difficulty Levels (Locked), Lesson Practice with Learn Gate & Progress Controls
 
import {
  ChevronRight,
  Mic,
  Volume2
} from "lucide-react-native";
import React, { useState } from "react";
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
import { beginnerWords } from "../../data/lesson";
import { useAppProgress } from "../../hooks/useAppProgress";
import { speakWord } from "../../services/speech";
import { startListening } from "../../services/voice";
// ─── Types ────────────────────────────────────────────────────────────────────
type FeedbackType = "ok" | "warn" | "err"
 
interface CoachFeedback {
  type: FeedbackType
  result: string
  comment: string
  tags: string[]
}
 
// ─── Data ─────────────────────────────────────────────────────────────────────
const DIFFICULTIES = [
  { id: "beginner",     label: "Beginner",     emoji: "🌱", words: 20, unlocked: true  },
  { id: "intermediate", label: "Intermediate", emoji: "🔥", words: 30, unlocked: false }, 
  { id: "advanced",     label: "Advanced",     emoji: "⚡", words: 40, unlocked: false },
  { id: "expert",       label: "Expert",       emoji: "🏆", words: 50, unlocked: false },
]
 
const LESSON_ITEMS = [
  { id: "LETTER_RECOGNITION", icon: "🔤", name: "Letter Recognition", meta: "Identify letters A–Z",      bg: "#EFF6FF" },
  { id: "SIMPLE_WORDS",       icon: "✍️",  name: "Simple Words",       meta: "3–4 letter basic words",    bg: "#FDF4FF" },
  { id: "SYLLABLE_BASICS",    icon: "🗣️", name: "Syllable Basics",    meta: "Break words into parts",    bg: "#F0FFF4" },
]
 
const PHONICS_LETTERS = [
  { char: "A", sound: '/æ/ — "ay"' },
  { char: "E", sound: '/ɛ/ — "ee"' },
  { char: "I", sound: '/ɪ/ — "ih"' },
  { char: "O", sound: '/ɒ/ — "oh"' },
]
 
const COACH_FEEDBACKS: CoachFeedback[] = [
  {
    type: "ok",
    result: "Amazing! You nailed it 🎉",
    comment: "Your pronunciation was clear and confident. You matched the word perfectly — keep this energy!",
    tags: ["Clear voice", "Perfect match", "Keep it up!"],
  },
]
 
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
  const [coachFeedback, setCoachFeedback]           = useState<CoachFeedback | null>(null)
  const [selectedLetter, setSelectedLetter]         = useState<string | null>(null)
  const [phonicPlaying, setPhonicPlaying]           = useState(false)
  const [lockHint, setLockHint]                     = useState("")
  
  // Active game navigation state
  const [activeLessonGame, setActiveLessonGame]     = useState<string | null>(null)
 
  const currentWord = beginnerWords?.[wordIndex] ?? "CAT"
  const currentDiff = DIFFICULTIES.find((d) => d.id === currentLevel)!

  // ── Handlers ──
  const handleSelectDifficulty = (diff: typeof DIFFICULTIES[0]) => {
    if (!diff.unlocked && diff.id !== "beginner") {
      setLockHint(`🔒 Complete previous levels first to unlock ${diff.label}`)
      return
    }
    setLockHint("")
  }

  // Learn Gate requirement completely bypassed for seamless testing!
  const handleFeatureRowPress = (featureId: string) => {
    setActiveLessonGame(featureId)
  }

  const handleGameComplete = () => {
    setActiveLessonGame(null);
    advanceToNextFeature(); 
  };
 
  const goToNextWord = () => {
    setWordIndex((prev) => (prev < 2 ? prev + 1 : 0))
    setSpokenText("")
    setCoachFeedback(null)
  }
 
  const handleSpeak = (text: any) => {
    const safeText = typeof text === "string" ? text : ""
    setSpokenText(safeText)
    setCoachFeedback(COACH_FEEDBACKS[0])
  }
 
  const handlePhonic = () => {
    setPhonicPlaying(true)
    setTimeout(() => setPhonicPlaying(false), 1200)
  }
 
  const tagStyle = (type: FeedbackType) => ({
    ok:   { bg: "#DCFCE7", text: "#15803D" },
    warn: { bg: "#FEF3C7", text: "#92400E" },
    err:  { bg: "#FEE2E2", text: "#991B1B" },
  }[type])
 
  // Intercept screen rendering if Letter Recognition mini-game is active
  if (activeLessonGame === "LETTER_RECOGNITION") {
    return (
      <LetterRecognitionGame 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ... other code above ...

  // Intercept screen rendering if Letter Recognition mini-game is active
  if (activeLessonGame === "LETTER_RECOGNITION") {
    return (
      <LetterRecognitionGame 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }

  // 👇 PASTE THE NEW BLOCK RIGHT HERE:
  if (activeLessonGame === "SIMPLE_WORDS") {
    return (
      <SimpleWordsGame 
        onComplete={handleGameComplete} 
        onClose={() => setActiveLessonGame(null)} 
      />
    );
  }
// Intercept screen rendering if Simple Words mini-game is active
     if (activeLessonGame === "SIMPLE_WORDS") {
       return (
         <SimpleWordsGame 
           onComplete={handleGameComplete} 
           onClose={() => setActiveLessonGame(null)} 
         />
       );
     }

     // 🔥 ADD THIS NEW INTERCEPT BLOCK RIGHT HERE:
     if (activeLessonGame === "SYLLABLE_BASICS") {
       return (
         <SyllableBasicsGame 
           onComplete={handleGameComplete} 
           onClose={() => setActiveLessonGame(null)} 
         />
       );
     }
  // ... the rest of the file continues below with "return (" ...
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
 
        <Text style={s.pageTitle}>Practice Sessions</Text>
 
        {/* ── Difficulty ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>DIFFICULTY LEVEL</Text>
 
          <View style={s.diffRow}>
            {DIFFICULTIES.map((d) => {
              const isActive  = currentLevel === d.id
              const isLocked  = d.id !== "beginner" && !d.unlocked
              return (
                <TouchableOpacity
                  key={d.id}
                  onPress={() => handleSelectDifficulty(d)}
                  activeOpacity={isLocked ? 1 : 0.75}
                  style={[
                    s.diffItem,
                    isActive  && s.diffActive,
                    isLocked  && s.diffLocked,
                  ]}
                >
                  {isLocked && <Text style={s.lockIco}>🔒</Text>}
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
              <View style={[s.progFill, { width: `${(wordsCompletedCount / currentDiff.words) * 100}%` }]} />
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
        <View style={[s.card, currentFeatureStep !== "READ_ALOUD" && currentFeatureStep !== "PHONICS" && currentFeatureStep !== "COMPLETED" && s.featureLockedDim]}>
          <Text style={s.cardTitle}>🎙️ READ ALOUD {currentFeatureStep !== "READ_ALOUD" && "🔒"}</Text>
          <View style={s.wordBox}>
            <Text style={s.bigWord}>{currentWord.toUpperCase()}</Text>
            <Text style={s.wordSub}>Listen first · then Speak</Text>
          </View>
          <View style={s.btnPair}>
            <TouchableOpacity style={s.btnListen} onPress={() => speakWord(currentWord)}>
              <Volume2 size={16} color="#2563EB" /><Text style={s.btnListenText}>Listen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSpeak} onPress={() => startListening(handleSpeak)}>
              <Mic size={16} color="#2563EB" /><Text style={s.btnSpeakText}>Speak</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.btnNext} onPress={goToNextWord}>
            <Text style={s.btnNextText}>Next Word →</Text>
          </TouchableOpacity>
        </View>
 
        {/* ── Phonics Section ── */}
        <View style={[s.card, currentFeatureStep !== "PHONICS" && currentFeatureStep !== "COMPLETED" && s.featureLockedDim]}>
          <Text style={s.cardTitle}>🔊 PHONICS {currentFeatureStep !== "PHONICS" && "🔒"}</Text>
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
  // Main Layout Spacing (Generous padding to reduce cognitive load)
  screen: { 
    flex: 1, 
    backgroundColor: "#EFF6FF", 
    paddingHorizontal: 20, 
    paddingTop: 20 
  },
  pageTitle: { 
    fontSize: 22,            // Increased from 16 for better visibility
    fontWeight: "700", 
    color: "#1E3A5F", 
    marginBottom: 20,        // More whitespace
    marginTop: 14,
    letterSpacing: 0.5       // Decrowds letters
  },
  
  // Testing HUD
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
    fontSize: 13,            // Increased from 11
    fontWeight: "600", 
    color: "#1E40AF" 
  },
  debugBtn: { 
    backgroundColor: "#2563EB", 
    paddingVertical: 8,      // Increased target size
    paddingHorizontal: 14, 
    borderRadius: 8 
  },
  debugBtnText: { 
    color: "#fff", 
    fontSize: 12,            // Increased from 10
    fontWeight: "bold" 
  },

  // Main Card containers
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 16, 
    borderWidth: 1,          // Defined boundary lines more clearly
    borderColor: "#BFDBFE", 
    padding: 18,             // Increased from 13 for internal breathing room
    marginBottom: 20         // Expanded vertical rhythm between sections
  },
  cardTitle: { 
    fontSize: 13,            // Increased from 10 to clear up tiny headers
    fontWeight: "700", 
    color: "#6B9EC8", 
    letterSpacing: 1,        // Extra spacing prevents letters blending together
    marginBottom: 16 
  },
  featureLockedDim: { opacity: 0.4 },

  // Difficulty Selector Section
  // Difficulty Selector Section (Clean, Structured, and Oval)
  diffRow: { 
    flexDirection: "row", 
    gap: 10,                    // Clear, consistent spacing between items
    paddingVertical: 6,
    paddingHorizontal: 2,       // Matches alignment from the reference image
  },
  diffItem: { 
    borderRadius: 100,          // Complete circular rounding for smooth oval pills
    borderWidth: 1.5, 
    borderColor: "#BFDBFE", 
    backgroundColor: "#fff",    // Clean white background for inactive states
    paddingVertical: 10,        // Managed vertical padding for proper height
    paddingHorizontal: 16,     // Wide horizontal padding for capsule structure
    flexDirection: "row",       // Forces elements into a single organized flat line
    alignItems: "center", 
    justifyContent: "center",
    gap: 6,                     
    position: "relative" 
  },
  diffActive: { 
    backgroundColor: "#2563EB", // Preserves original active brand blue
    borderColor: "#2563EB" 
  },
  diffLocked: { 
    backgroundColor: "#fff", 
    borderColor: "#E2E8F0",     // Muted outline for structured locked style
    opacity: 0.6 
  },
  diffEmoji: { 
    fontSize: 16                // Balanced emoji size for inline tracking
  },
  diffLabel: { 
    fontSize: 14,               // Clear, comfortable text scale for dyslexia
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
  lockIco: { 
    fontSize: 12,
    marginLeft: 2               // Shifts lock directly inside the text row tracking
  },
  
  // Progress & Inline Hints
  progRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 14, marginBottom: 10 },
  progBar: { flex: 1, height: 6, backgroundColor: "#BFDBFE", borderRadius: 99, overflow: "hidden" },
  progFill: { height: 6, backgroundColor: "#2563EB", borderRadius: 99 },
  progTxt: { fontSize: 12, color: "#6B9EC8", fontWeight: "600" },
  lockHint: { fontSize: 12, color: "#EF4444", marginTop: 4, textAlign: "center" },
  
  celebrationSheet: { borderWidth: 1 },
  bonusCard: { borderWidth: 1 },




  // Lesson Practice Rows
  pRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 16,     // Increased row height for easier reading track
    borderBottomWidth: 1, 
    borderBottomColor: "#DBEAFE", 
    justifyContent: 'space-between' 
  },
  pLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  pIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  pName: { 
    fontSize: 15,            // Increased from 12
    fontWeight: "600", 
    color: "#1E3A5F" 
  },
  pMeta: { 
    fontSize: 12,            // Increased from 9
    color: "#6B9EC8", 
    marginTop: 3 
  },
  pArr: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
  
  // Read Aloud Section
  wordBox: { 
    backgroundColor: "#EFF6FF", 
    borderWidth: 2, 
    borderColor: "#BFDBFE", 
    borderRadius: 16, 
    padding: 24, 
    alignItems: "center", 
    marginBottom: 16 
  },
  bigWord: { 
    fontSize: 42,            // Increased from 34 for high focus recognition
    fontWeight: "700", 
    color: "#1E40AF", 
    letterSpacing: 6         // Wide track letter-spacing directly helps dyslexia
  },
  wordSub: { fontSize: 12, color: "#7DD3FC", marginTop: 8, fontWeight: "500" },
  btnPair: { flexDirection: "row", gap: 10, marginBottom: 14 },
  btnListen: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnListenText: { fontSize: 15, fontWeight: "600", color: "#2563EB" },
  btnSpeak: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnSpeakText: { fontSize: 15, fontWeight: "600", color: "#2563EB" },
  btnNext: { backgroundColor: "#F0F7FF", borderWidth: 2, borderColor: "#BFDBFE", borderRadius: 12, paddingVertical: 12, alignItems: "center", marginBottom: 6 },
  btnNextText: { fontSize: 13, fontWeight: "600", color: "#1E3A5F" },
  
  // Phonics Section
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
})