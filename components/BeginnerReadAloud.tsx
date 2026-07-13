// components/practice/BeginnerReadAloud.tsx
import { ArrowRight, Mic, Volume2 } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { speakWord } from "../services/speech";
import { startListening, stopListening, EvaluationResult } from "../services/voice";
import { BEGINNER_SENTENCES } from "../data/practicereadaloud";

interface MascotFeedback {
  status: EvaluationResult;
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

const processSpeechOutcome = (outcome: EvaluationResult) => {
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
  } else if (outcome === "rushed") {
    setFeedback({
      status: "rushed",
      title: "Oops! ❌",
      message: "The words didn’t match. Let’s try again carefully.",
      borderColor: "#B91C1C",
      textColor: "#B91C1C",
      bgColor: "#FEE2E2",
    });
  } else if (outcome === "no_speech") {
    setFeedback({
      status: "no_speech",
      title: "Please speak first 🎤",
      message: "We didn’t hear anything. Try saying the sentence aloud!",
      borderColor: "#6B7280",
      textColor: "#6B7280",
      bgColor: "#E5E7EB",
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
      <View style={s.card}>
        <Text style={s.cardTitle}>🎙️ READ ALOUD PRACTICE</Text>
        
        <View style={s.sentenceBox}>
          <Text style={s.mainSentenceText}>{currentItem.sentence}</Text>
          <Text style={s.hintText}>💡 {currentItem.hint}</Text>
        </View>

        {/* Action Controls */}
        <View style={s.btnPair}>
          <TouchableOpacity style={s.btnListen} onPress={() => speakWord(currentItem.sentence)}>
            <Volume2 size={18} color="#2563EB" />
            <Text style={s.btnListenText}>Listen</Text>
          </TouchableOpacity>
          
          {/* Start listening */}
          <TouchableOpacity
            style={s.btnSpeak}
            onPress={() =>
              startListening({
                targetText: currentItem.sentence,
                onTranscriptUpdate: (text) => setSpokenText(text),
                onComplete: (result) => processSpeechOutcome(result),
              })
            }
          >
            <Mic size={18} color="#2563EB" />
            <Text style={s.btnSpeakText}>Speak</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feedback Panel */}
      {feedback && (
        <View style={[s.card, s.memoCard, { borderColor: feedback.borderColor }]}>
          <View style={s.memoHeader}>
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

      {/* Stop & Evaluate */}
      <TouchableOpacity
        style={s.btnNext}
        onPress={() => {
          const result = stopListening(currentItem.sentence);
          processSpeechOutcome(result);
        }}
      >
        <Text style={s.btnNextText}>Stop & Evaluate</Text>
        <ArrowRight size={18} color="#fff" />
      </TouchableOpacity>

      {/* Next Sentence */}
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
  sentenceBox: { backgroundColor: "#EFF6FF", borderWidth: 1.5, borderColor: "#BFDBFE", borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 16 },
  mainSentenceText: { fontSize: 32, fontWeight: "700", color: "#1E40AF", textAlign: "center", letterSpacing: 1 },
  hintText: { fontSize: 13, color: "#475569", marginTop: 10, textAlign: "center", fontWeight: "500" },
  btnPair: { flexDirection: "row", gap: 12 },
  btnListen: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnListenText: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  btnSpeak: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 2, borderColor: "#2563EB" },
  btnSpeakText: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  btnNext: { backgroundColor: "#2563EB", borderRadius: 12, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  btnNextText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  memoCard: { backgroundColor: "#F8FAFC", borderWidth: 2 },
  memoHeader: { flexDirection: "row", gap: 14, alignItems: "center" },
  mascotImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#E2E8F0" },
  memoTitle: { fontSize: 16, fontWeight: "700", marginBottom: 2 },
  memoMessage: { fontSize: 13, color: "#475569", lineHeight: 18 },
  statusBadge: { alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 10 },
  statusBadgeText: { fontSize: 10, fontWeight: "700" },
});
