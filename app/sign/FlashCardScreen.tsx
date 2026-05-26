import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FlashCardScreen() {
  const [flipped, setFlipped] = useState(false);

  // Example flashcard data
  const flashcard = {
    question: "Spell the word: Environment",
    answer: "E-N-V-I-R-O-N-M-E-N-T",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Screen</Text>

      <Pressable
        style={styles.card}
        onPress={() => setFlipped(!flipped)}
      >
        <Text style={styles.cardText}>
          {flipped ? flashcard.answer : flashcard.question}
        </Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back to Hub</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  card: {
    width: "80%",
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9c74f",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },
  cardText: { fontSize: 20, fontWeight: "600", textAlign: "center", color: "#333" },
  backButton: { padding: 10, backgroundColor: "#318ef8", borderRadius: 8 },
  backText: { color: "#fff", fontWeight: "600" },
});
