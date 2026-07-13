// components/practice/ReadAloudResult.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ReadAloudResultProps {
  status: "well_done" | "keep_trying" | "rushed";
  onReset: () => void;
}

export default function ReadAloudResult({ status, onReset }: ReadAloudResultProps) {
  const getLayout = () => {
    switch (status) {
      case "well_done":
        return { label: "Perfect! All words correct 🎉", color: "#15803D" };
      case "keep_trying":
        return { label: "Good effort! Some words matched 🌟", color: "#B45309" };
      case "rushed":
        return { label: "Oops, words didn’t match. Try again!", color: "#B91C1C" };
      default:
        return { label: "Let's practice again!", color: "#374151" };
    }
  };

  const layout = getLayout();

  return (
    <View style={[s.box, { borderColor: layout.color }]}>
      <Text style={[s.text, { color: layout.color }]}>{layout.label}</Text>
      <TouchableOpacity style={s.btn} onPress={onReset}>
        <Text style={s.btnText}>Next Word ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    padding: 14,
    borderWidth: 1.5,
    borderRadius: 12,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF"
  },
  text: { fontSize: 14, fontWeight: "700", textAlign: "center" },
  btn: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  btnText: { color: "#FFF", fontSize: 13, fontWeight: "600" }
});
