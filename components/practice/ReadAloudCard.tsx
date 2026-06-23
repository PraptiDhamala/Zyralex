// components/practice/ReadAloudCard.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ReadAloudCardProps {
  targetText: string;
}

export default function ReadAloudCard({ targetText }: ReadAloudCardProps) {
  return (
    <View style={s.card}>
      <Text style={s.text}>{targetText}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, backgroundColor: "#F8FAFC", borderRadius: 12, alignItems: "center" },
  text: { fontSize: 22, fontWeight: "700", color: "#1E3A5F", textAlign: "center" }
});