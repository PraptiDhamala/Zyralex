import { ArrowRight, Mic, Volume2 } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { speakWord } from "../services/speech";
import { startListening } from "../services/voice";
// Import the fresh sentence dataset we just made!
import { BEGINNER_SENTENCES } from "../data/practicereadaloud";

interface MascotFeedback {
  status: "well_done" | "keep_trying" | "slow";
  title: string;
  message: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
}

interface BeginnerReadAloudProps {
  onSentenceComplete: () => void;
}

export default function BeginnerReadAloud({ onSentenceComplete }: BeginnerReadAloudProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spokenText, setSpokenText] = useState("");
  const [feedback, setFeedback] = useState<MascotFeedback | null>(null);

  const currentItem = BEGINNER_SENTENCES[currentIndex];

  // This handles the user's progress and assigns a friendly response from Mimo the Panda
  const processSpeechOutcome = (outcome: "well_done" | "keep_trying" | "slow") => {
    setSpokenText(currentItem.sentence);

    if (outcome === "well_done") {
      setFeedback({
        status: "well_done",
        title: "Well done! 🎉",
        message: "You read the whole sentence perfectly! Mimo is super proud of you!",
        borderColor: "#15803D",
        textColor: "#15803D",
        bgColor: "#DCFCE7",
      });
      // Fire the completion trigger to update the main app's progress bar
      onSentenceComplete();
    } else if (outcome === "keep_trying") {
      setFeedback({
        status: "keep_trying",
        title: "Keep trying! 🌟",
        message: "So close! Let's try to say the words one more time together.",
        borderColor: "#B45309",
        textColor: "#B45309",
        bgColor: "#FEF3C7",
      });
    } else {
      setFeedback({
        status: "slow",
        title: "A little bit slow... 🕒",
        message: "You got all the sounds right! Let's try to connect them a tiny bit smoother next time.",
        borderColor: "#B91C1C",
        textColor: "#B91C1C",
        bgColor: "#FEE2E2",
      });
    }
  };

  const handleNextSentence = () => {
    setCurrentIndex((prev) => (prev < BEGINNER_SENTENCES.length - 1 ? prev + 1 : 0));
    setSpokenText("");
    setFeedback(null);
  };

  return (
    <View style={s.container}>
      
      {/* 🛠️ DEV TEST BUTTONS — Click these to test each of Mimo's results instantly! */}
      <View style={s.testerPanel}>
        <Text style={s.testerTitle}>Test Mimo's Results:</Text>
        <View style={s.testerButtons}>
          <TouchableOpacity style={[s.testBtn, { backgroundColor: "#10B981" }]} onPress={() => processSpeechOutcome("well_done")}>
            <Text style={s.testBtnText}>Well Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.testBtn, { backgroundColor: "#F59E0B" }]} onPress={() => processSpeechOutcome("keep_trying")}>
            <Text style={s.testBtnText}>Keep Trying</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.testBtn, { backgroundColor: "#EF4444" }]} onPress={() => processSpeechOutcome("slow")}>
            <Text style={s.testBtnText}>Slow Pace</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🎙️ MAIN READ ALOUD CARD */}
      <View style={s.card}>
        <Text style={s.cardTitle}>🎙️ READ ALOUD PRACTICE</Text>
        
        <View style={s.sentenceBox}>
          {/* Big, accessible text for dyslexic learners */}
          <Text style={s.mainSentenceText}>{currentItem.sentence}</Text>
          <Text style={s.hintText}>💡 {currentItem.hint}</Text>
        </View>

        {/* Action Controls */}
        <View style={s.btnPair}>
          <TouchableOpacity style={s.btnListen} onPress={() => speakWord(currentItem.sentence)}>
            <Volume2 size={18} color="#2563EB" />
            <Text style={s.btnListenText}>Listen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={s.btnSpeak} onPress={() => startListening(() => processSpeechOutcome("well_done"))}>
            <Mic size={18} color="#2563EB" />
            <Text style={s.btnSpeakText}>Speak</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🐼 FRIENDLY MASCOT PANEL (The "Memo" Layout) */}
      {feedback && (
        <View style={[s.card, s.memoCard, { borderColor: feedback.borderColor }]}>
          <View style={s.memoHeader}>
            {/* References your exact panda image file layout */}
            <Image source={require("../assets/mimoimg.jpg")} style={s.mascotImage} />
            <View style={{ flex: 1 }}>
              <Text style={[s.memoTitle, { color: feedback.textColor }]}>{feedback.title}</Text>
              <Text style={s.memoMessage}>{feedback.message}</Text>
            </View>
          </View>
          
          <View style={[s.statusBadge, { backgroundColor: feedback.bgColor }]}>
            <Text style={[s.statusBadgeText, { color: feedback.textColor }]}>
              {feedback.status.replace("_", " ").toUpperCase()}
            </Text>
          </View>
        </View>
      )}

      {/* Next Sentence Navigation Button */}
      <TouchableOpacity style={s.btnNext} onPress={handleNextSentence}>
        <Text style={s.btnNextText}>Next Sentence</Text>
        <ArrowRight size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { paddingVertical: 5 },
  card: { backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, borderColor: "#BFDBFE", padding: 18, marginBottom: 16 },
  cardTitle: { fontSize: 11, fontWeight: "700", color: "#6B9EC8", letterSpacing: 1, marginBottom: 12 },
  
  // Sentence Board styling
  sentenceBox: { backgroundColor: "#EFF6FF", borderWidth: 1.5, borderColor: "#BFDBFE", borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 16 },
  mainSentenceText: { fontSize: 32, fontWeight: "700", color: "#1E40AF", textAlign: "center", letterSpacing: 1 },
  hintText: { fontSize: 13, color: "#475569", marginTop: 10, textAlign: "center", fontWeight: "500" },
  
  // Buttons
  btnPair: { flexDirection: "row", gap: 12 },
  btnListen: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnListenText: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  btnSpeak: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnSpeakText: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  btnNext: { backgroundColor: "#2563EB", borderRadius: 12, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  btnNextText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  
  // Mascot Memo Box
  memoCard: { backgroundColor: "#F8FAFC", borderWidth: 2 },
  memoHeader: { flexDirection: "row", gap: 14, alignItems: "center" },
  mascotImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#E2E8F0" },
  memoTitle: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  memoMessage: { fontSize: 13, color: "#475569", lineHeight: 18 },
  statusBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  statusBadgeText: { fontSize: 10, fontWeight: "700" },
  
  // Developer Tester HUD
  testerPanel: { backgroundColor: "#DBEAFE", padding: 10, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: "#93C5FD" },
  testerTitle: { fontSize: 11, fontWeight: "600", color: "#1E40AF", marginBottom: 6 },
  testerButtons: { flexDirection: "row", gap: 6 },
  testBtn: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: "center" },
  testBtnText: { color: "#fff", fontSize: 11, fontWeight: "700" }
});