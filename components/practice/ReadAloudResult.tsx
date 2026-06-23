// components/practice/ReadAloudResult.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ReadAloudResultProps {
  status: "well_done" | "keep_trying" | "slow";
  onReset: () => void;
}

export default function ReadAloudResult({ status, onReset }: ReadAloudResultProps) {
  const getLayout = () => {
    if (status === "well_done") return { label: "Excellent Accuracy!", color: "#15803D" };
    if (status === "slow") return { label: "Good Pace, Let's Build Speed!", color: "#B91C1C" };
    return { label: "Let's practice sounds again!", color: "#B45309" };
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
  box: { padding: 14, borderWidth: 1.5, borderRadius: 12, alignItems: "center", gap: 10, backgroundColor: "#FFF" },
  text: { fontSize: 14, fontWeight: "700" },
  btn: { backgroundColor: "#2563EB", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  btnText: { color: "#FFF", fontSize: 13, fontWeight: "600" }
});