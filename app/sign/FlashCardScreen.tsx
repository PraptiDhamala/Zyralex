
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FlashCardScreen() {
  const [flipped, setFlipped] = useState(false);

  const flashcard = {
    question: "What does this sign mean?",
    answer: "Environment",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flash Cards</Text>
        <Text style={styles.subtitle}>Learn • Practice • Remember</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>18 / 25</Text>

        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* Flash Card */}
      <Pressable
        style={styles.card}
        onPress={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <>
            <Text style={styles.questionText}>
              {flashcard.question}
            </Text>

            <Text style={styles.tapText}>
              Tap to reveal answer
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.answerLabel}>Answer</Text>

            <Text style={styles.answerText}>
              {flashcard.answer}
            </Text>
          </>
        )}
      </Pressable>

      {/* Tip Section */}
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>
          Try recalling the sign before revealing.
        </Text>
      </View>

      {/* Difficulty Buttons */}
      <View style={styles.buttonsRow}>
        <Pressable style={[styles.levelButton, styles.againButton]}>
          <Text style={styles.againText}>Again</Text>
        </Pressable>

        <Pressable style={[styles.levelButton, styles.hardButton]}>
          <Text style={styles.hardText}>Hard</Text>
        </Pressable>

        <Pressable style={[styles.levelButton, styles.easyButton]}>
          <Text style={styles.easyText}>Easy</Text>
        </Pressable>
      </View>

    
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf7f0",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  header: {
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1F1F39",
  },

  subtitle: {
    fontSize: 15,
    color: "#8B80F9",
    marginTop: 4,
  },

  progressContainer: {
    marginBottom: 30,
  },

  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6E6A7C",
    marginBottom: 10,
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "#E6E1FF",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBarFill: {
    width: "72%",
    height: "100%",
    backgroundColor: "#7ec096",
    borderRadius: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  questionText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F1F39",
    marginBottom: 25,
  },

  tapText: {
    fontSize: 16,
    color: "#88a6ed",
    fontWeight: "600",
  },

  answerLabel: {
    fontSize: 16,
    color: "#8B80F9",
    marginBottom: 12,
    fontWeight: "600",
  },

  answerText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1F1F39",
    textAlign: "center",
  },

  tipBox: {
    backgroundColor: "#e0e5f4",
    padding: 16,
    borderRadius: 18,
    marginTop: 25,
  },

  tipText: {
    textAlign: "center",
    color: "#7C72E8",
    fontWeight: "500",
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    gap: 12,
  },

  levelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom:15,
  },

  againButton: {
    backgroundColor: "#FFE5E5",
  },

  hardButton: {
    backgroundColor: "#FFF3D9",
  },

  easyButton: {
    backgroundColor: "#bbe3d3",
  },

  againText: {
    color: "#E05A5A",
    fontWeight: "700",
  },

  hardText: {
    color: "#D18A00",
    fontWeight: "700",
  },

  easyText: {
    color: "#16A34A",
    fontWeight: "700",
  },

  backButton: {
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: "#8B80F9",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

