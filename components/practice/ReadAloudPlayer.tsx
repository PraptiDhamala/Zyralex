// components/practice/ReadAloudPlayer.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ReadAloudPlayerProps {
  targetText: string;
}

export default function ReadAloudPlayer({ targetText }: ReadAloudPlayerProps) {
  const handlePlay = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(targetText);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <TouchableOpacity style={s.btnPlay} onPress={handlePlay}>
      <Text style={s.btnText}>🔊 Listen to Pronunciation</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btnPlay: { padding: 8, alignItems: "center" },
  btnText: { color: "#2563EB", fontWeight: "600", fontSize: 14 }
});