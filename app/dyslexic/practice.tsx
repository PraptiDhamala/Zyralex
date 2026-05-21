// app/dyslexic/practice.tsx
// Enhanced Practice Screen — Blue & White Theme
// Features: Difficulty Levels (Locked), Lesson Practice, Read Aloud + Coach Panda, Phonics
 
import { LinearGradient } from "expo-linear-gradient"
import {
  Brain,
  ChevronRight,
  LogOut,
  Mic,
  Settings,
  Volume2,
} from "lucide-react-native"
import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { beginnerWords } from "../../data/lesson"
import { speakWord } from "../../services/speech"
import { startListening } from "../../services/voice"
 
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
  { id: "intermediate", label: "Intermediate", emoji: "🔥", words: 30, unlocked: true  },
  { id: "advanced",     label: "Advanced",     emoji: "⚡", words: 40, unlocked: false },
  { id: "expert",       label: "Expert",       emoji: "🏆", words: 50, unlocked: false },
]
 
const LESSON_ITEMS = [
  { icon: "🔤", name: "Letter Recognition", meta: "Identify letters A–Z",      bg: "#EFF6FF" },
  { icon: "✍️",  name: "Simple Words",       meta: "3–4 letter basic words",    bg: "#FDF4FF" },
  { icon: "🗣️", name: "Syllable Basics",    meta: "Break words into parts",    bg: "#F0FFF4" },
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
  {
    type: "warn",
    result: "So close! Almost there 💪",
    comment: "You got the start right but were a little slow at the ending. Try to keep the whole word smooth and connected.",
    tags: ["Good start", "Work on ending", "Try once more"],
  },
  {
    type: "err",
    result: "Let's try again! 🔄",
    comment: "That didn't quite match. Press Listen to hear it again, then focus on each sound one by one before speaking.",
    tags: ["Listen again", "Go slower", "You can do it"],
  },
  {
    type: "ok",
    result: "Excellent work! ⭐",
    comment: "Confident and clear — your voice was steady and the word was spot on. Outstanding effort!",
    tags: ["Spot on", "Confident", "Outstanding"],
  },
  {
    type: "warn",
    result: "Good effort! 🙌",
    comment: "You rushed through the middle a little. Slow down and break the word sound by sound.",
    tags: ["Good pace", "Slow the middle", "Almost!"],
  },
]
 
// ─── Component ────────────────────────────────────────────────────────────────
export default function DyslexicPractice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner")
  const [wordIndex, setWordIndex]                   = useState(0)
  const [spokenText, setSpokenText]                 = useState("")
  const [coachFeedback, setCoachFeedback]           = useState<CoachFeedback | null>(null)
  const [selectedLetter, setSelectedLetter]         = useState<string | null>(null)
  const [phonicPlaying, setPhonicPlaying]           = useState(false)
  const [lockHint, setLockHint]                     = useState("")
 
  const currentWord = beginnerWords?.[wordIndex] ?? "CAT"
  const currentDiff = DIFFICULTIES.find((d) => d.id === selectedDifficulty)!
  const wordsCompleted = 5 // placeholder — wire to backend later
 
  // ── Handlers ──
  const handleSelectDifficulty = (diff: typeof DIFFICULTIES[0]) => {
    if (!diff.unlocked) {
      const idx = DIFFICULTIES.findIndex((d) => d.id === diff.id)
      const req = DIFFICULTIES[idx - 1]?.label ?? "previous level"
      setLockHint(`🔒 Complete ${req} first to unlock ${diff.label}`)
      return
    }
    setSelectedDifficulty(diff.id)
    setLockHint("")
  }
 
  const goToNextWord = () => {
    setWordIndex((prev) =>
      prev < beginnerWords.length - 1 ? prev + 1 : 0
    )
    setSpokenText("")
    setCoachFeedback(null)
  }
 
  const handleSpeak = (text: any) => {
    const safeText = typeof text === "string" ? text : ""
    setSpokenText(safeText)
    const fb = COACH_FEEDBACKS[wordIndex % COACH_FEEDBACKS.length]
    setCoachFeedback(fb)
  }
 
  const handlePhonic = () => {
    setPhonicPlaying(true)
    setTimeout(() => setPhonicPlaying(false), 1200)
  }
 
  // ── Coach tag colors ──
  const tagStyle = (type: FeedbackType) => ({
    ok:   { bg: "#DCFCE7", text: "#15803D" },
    warn: { bg: "#FEF3C7", text: "#92400E" },
    err:  { bg: "#FEE2E2", text: "#991B1B" },
  }[type])
 
  const coachBorder = (type: FeedbackType) =>
    ({ ok: "#86EFAC", warn: "#FDE68A", err: "#FECACA" }[type])
 
  const coachBg = (type: FeedbackType) =>
    ({ ok: "#F0FFF4", warn: "#FFFBEB", err: "#FFF5F5" }[type])
 
  const coachResultColor = (type: FeedbackType) =>
    ({ ok: "#16A34A", warn: "#D97706", err: "#DC2626" }[type])
 
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <View style={s.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
 
        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.logoRow}>
            <View style={s.logoBox}>
              <Brain size={18} color="#fff" />
            </View>
            <View>
              <Text style={s.appName}>Dyslexic Learn</Text>
              <Text style={s.appSub}>Anusha's Journey ✨</Text>
            </View>
          </View>
          <View style={s.hIcons}>
            <View style={s.hIco}><Settings size={14} color="#6B9EC8" /></View>
            <View style={s.hIco}><LogOut   size={14} color="#2563EB" /></View>
          </View>
        </View>
 
        <Text style={s.pageTitle}>Practice Sessions</Text>
 
        {/* ── Difficulty ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>DIFFICULTY LEVEL</Text>
 
          <View style={s.diffRow}>
            {DIFFICULTIES.map((d) => {
              const isActive  = selectedDifficulty === d.id
              const isLocked  = !d.unlocked
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
                  {isLocked && (
                    <Text style={s.lockIco}>🔒</Text>
                  )}
                  <Text style={s.diffEmoji}>{d.emoji}</Text>
                  <Text style={[s.diffLabel, isActive && s.diffLabelActive]}>
                    {d.label}
                  </Text>
                  <Text style={[s.diffWords, isActive && s.diffWordsActive]}>
                    {d.words} words
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
 
          {/* Progress bar */}
          <View style={s.progRow}>
            <View style={s.progBar}>
              <View
                style={[
                  s.progFill,
                  { width: `${(wordsCompleted / currentDiff.words) * 100}%` },
                ]}
              />
            </View>
            <Text style={s.progTxt}>
              {wordsCompleted} / {currentDiff.words} words
            </Text>
          </View>
 
          {lockHint ? (
            <Text style={s.lockHint}>{lockHint}</Text>
          ) : null}
        </View>
 
        {/* ── Lesson Practice ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>📚 LESSON PRACTICE</Text>
          {LESSON_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.name}
              activeOpacity={0.7}
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
 
        {/* ── Read Aloud ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>🎙️ READ ALOUD</Text>
 
          {/* Word display */}
          <View style={s.wordBox}>
            <Text style={s.bigWord}>{currentWord.toUpperCase()}</Text>
            <Text style={s.wordSub}>Listen first · then Speak</Text>
          </View>
 
          {/* Listen + Speak twin buttons */}
          <View style={s.btnPair}>
            <TouchableOpacity
              style={s.btnListen}
              activeOpacity={0.75}
              onPress={() => speakWord(currentWord)}
            >
              <Volume2 size={16} color="#2563EB" />
              <Text style={s.btnListenText}>Listen</Text>
            </TouchableOpacity>
 
            <TouchableOpacity
              style={s.btnSpeak}
              activeOpacity={0.75}
              onPress={() => startListening(handleSpeak)}
            >
              <Mic size={16} color="#2563EB" />
              <Text style={s.btnSpeakText}>Speak</Text>
            </TouchableOpacity>
          </View>
 
          {/* Next word */}
          <TouchableOpacity style={s.btnNext} activeOpacity={0.75} onPress={goToNextWord}>
            <Text style={s.btnNextText}>Next Word →</Text>
          </TouchableOpacity>
 
          {/* Big Tap to Speak CTA */}
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => startListening(handleSpeak)}
          >
            <LinearGradient
              colors={["#2563EB", "#1D4ED8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.tapCTA}
            >
              <View style={s.tapLeft}>
                <View style={s.micRing}>
                  <View style={s.micRingInner}>
                    <Mic size={20} color="#fff" />
                  </View>
                </View>
                <View>
                  <Text style={s.tapTitle}>Tap to Speak</Text>
                  <Text style={s.tapSub}>Say the word out loud clearly</Text>
                </View>
              </View>
              <View style={s.tapArrow}>
                <ChevronRight size={16} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
 
          {/* You Said box */}
          <View style={s.youSaidBox}>
            <View style={s.ysBadgeRow}>
              <View style={s.ysBadge}>
                <Text style={s.ysBadgeText}>🎤  YOU SAID</Text>
              </View>
            </View>
            <Text style={s.ysWord}>
              {spokenText ? spokenText.toUpperCase() : "— waiting —"}
            </Text>
            <Text style={s.ysHint}>
              {spokenText
                ? `Matched against: "${currentWord.toUpperCase()}" ✓`
                : "Tap the blue button above to begin"}
            </Text>
          </View>
 
          {/* Coach Panda */}
          {coachFeedback && (
            <View
              style={[
                s.coachBox,
                {
                  borderColor: coachBorder(coachFeedback.type),
                  backgroundColor: coachBg(coachFeedback.type),
                },
              ]}
            >
              <View style={s.coachTop}>
                <View style={s.coachAvatar}>
                  <Text style={{ fontSize: 20 }}>🐼</Text>
                </View>
                <View>
                  <Text style={s.coachName}>Coach Panda says</Text>
                  <Text style={[s.coachResult, { color: coachResultColor(coachFeedback.type) }]}>
                    {coachFeedback.result}
                  </Text>
                </View>
              </View>
              <Text style={s.coachComment}>{coachFeedback.comment}</Text>
              <View style={s.coachTags}>
                {coachFeedback.tags.map((tag) => (
                  <View
                    key={tag}
                    style={[s.tag, { backgroundColor: tagStyle(coachFeedback.type).bg }]}
                  >
                    <Text style={[s.tagText, { color: tagStyle(coachFeedback.type).text }]}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
 
        {/* ── Phonics ── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>🔊 PHONICS</Text>
 
          <TouchableOpacity activeOpacity={0.82} onPress={handlePhonic}>
            <LinearGradient
              colors={["#2563EB", "#1D4ED8"]}
              style={s.phonicHdr}
            >
              <Text style={{ fontSize: 26, marginBottom: 4 }}>🔈</Text>
              <Text style={s.phonicHint}>Tap to play sound</Text>
              <Text style={s.phonicName}>
                {phonicPlaying
                  ? "▶ Playing sound..."
                  : selectedLetter
                  ? `Playing — "${selectedLetter}"`
                  : "Vowel sounds — A  E  I  O  U"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
 
          <View style={s.letterGrid}>
            {PHONICS_LETTERS.map((l) => (
              <TouchableOpacity
                key={l.char}
                onPress={() => setSelectedLetter(l.char)}
                activeOpacity={0.75}
                style={[
                  s.lCard,
                  selectedLetter === l.char && s.lCardActive,
                ]}
              >
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
    paddingHorizontal: 14,
    paddingTop: 14,
  },
 
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoBox: {
    width: 34,
    height: 34,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: { fontSize: 14, fontWeight: "500", color: "#1E3A5F" },
  appSub:  { fontSize: 10, color: "#6B9EC8", marginTop: 1 },
  hIcons:  { flexDirection: "row", gap: 8 },
  hIco: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#BFDBFE",
    alignItems: "center",
    justifyContent: "center",
  },
 
  pageTitle: { fontSize: 16, fontWeight: "500", color: "#1E3A5F", marginBottom: 12 },
 
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#BFDBFE",
    padding: 13,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B9EC8",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
 
  // Difficulty
  diffRow: { flexDirection: "row", gap: 5 },
  diffItem: {
    flex: 1,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    backgroundColor: "#F0F7FF",
    paddingVertical: 8,
    paddingHorizontal: 3,
    alignItems: "center",
    gap: 2,
    position: "relative",
  },
  diffActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  diffLocked: { backgroundColor: "#F8FAFC", borderColor: "#E2E8F0", opacity: 0.6 },
  lockIco:    { position: "absolute", top: 3, right: 3, fontSize: 7 },
  diffEmoji:  { fontSize: 17 },
  diffLabel:  { fontSize: 8, fontWeight: "500", color: "#1E3A5F", textAlign: "center" },
  diffLabelActive: { color: "#fff" },
  diffWords:  { fontSize: 7, color: "#6B9EC8", textAlign: "center" },
  diffWordsActive: { color: "#BFDBFE" },
 
  progRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  progBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#BFDBFE",
    borderRadius: 99,
    overflow: "hidden",
  },
  progFill: { height: 4, backgroundColor: "#2563EB", borderRadius: 99 },
  progTxt:  { fontSize: 9, color: "#6B9EC8" },
  lockHint: { fontSize: 10, color: "#EF4444", marginTop: 6, textAlign: "center" },
 
  // Lesson Practice
  pRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DBEAFE",
  },
  pLeft:  { flexDirection: "row", alignItems: "center", gap: 10 },
  pIcon:  { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  pName:  { fontSize: 12, fontWeight: "500", color: "#1E3A5F" },
  pMeta:  { fontSize: 9, color: "#6B9EC8", marginTop: 1 },
  pArr:   { width: 24, height: 24, borderRadius: 7, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
 
  // Read Aloud
  wordBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 13,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  bigWord: { fontSize: 34, fontWeight: "500", color: "#1E40AF", letterSpacing: 5 },
  wordSub: { fontSize: 10, color: "#93C5FD", marginTop: 5 },
 
  // Twin buttons
  btnPair: { flexDirection: "row", gap: 8, marginBottom: 10 },
  btnListen: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  btnListenText: { fontSize: 13, fontWeight: "500", color: "#2563EB" },
  btnSpeak: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  btnSpeakText: { fontSize: 13, fontWeight: "500", color: "#2563EB" },
 
  // Next word
  btnNext: {
    backgroundColor: "#F0F7FF",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    borderRadius: 11,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  btnNextText: { fontSize: 11, color: "#1E3A5F" },
 
  // Tap to Speak CTA
  tapCTA: {
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tapLeft:   { flexDirection: "row", alignItems: "center", gap: 14 },
  micRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  micRingInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  tapTitle: { fontSize: 15, fontWeight: "500", color: "#fff" },
  tapSub:   { fontSize: 11, color: "#BFDBFE", marginTop: 3 },
  tapArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
 
  // You Said box
  youSaidBox: {
    backgroundColor: "#1E3A8A",
    borderRadius: 13,
    padding: 14,
    marginBottom: 10,
  },
  ysBadgeRow: { marginBottom: 8 },
  ysBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 7,
    paddingVertical: 3,
    paddingHorizontal: 9,
    alignSelf: "flex-start",
  },
  ysBadgeText: { fontSize: 9, color: "#93C5FD", fontWeight: "500", letterSpacing: 0.4 },
  ysWord: { fontSize: 24, fontWeight: "500", color: "#fff", letterSpacing: 3, marginBottom: 4 },
  ysHint: { fontSize: 10, color: "#60A5FA" },
 
  // Coach Panda
  coachBox: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    marginTop: 2,
  },
  coachTop:    { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  coachAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  coachName:    { fontSize: 9, color: "#6B9EC8", fontWeight: "500" },
  coachResult:  { fontSize: 12, fontWeight: "500", marginTop: 1 },
  coachComment: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 17,
    marginLeft: 42,
    marginBottom: 8,
  },
  coachTags: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginLeft: 42 },
  tag: { borderRadius: 99, paddingVertical: 3, paddingHorizontal: 9 },
  tagText: { fontSize: 9, fontWeight: "500" },
 
  // Phonics
  phonicHdr: {
    borderRadius: 13,
    padding: 18,
    alignItems: "center",
    marginBottom: 10,
  },
  phonicHint: { fontSize: 9, color: "#BFDBFE", marginBottom: 2 },
  phonicName: { fontSize: 12, fontWeight: "500", color: "#fff", marginTop: 2 },
 
  letterGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  lCard: {
    width: "48%",
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    backgroundColor: "#F0F7FF",
    padding: 13,
    alignItems: "center",
  },
  lCardActive: { borderColor: "#2563EB", backgroundColor: "#DBEAFE" },
  lChar:  { fontSize: 24, fontWeight: "500", color: "#1E40AF" },
  lSound: { fontSize: 9, color: "#6B9EC8", marginTop: 2 },
})
 