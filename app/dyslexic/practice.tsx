// app/dyslexic/practice.tsx

import { LinearGradient } from "expo-linear-gradient"
import {
  Hexagon,
  LogOut,
  Mic,
  Settings,
  Target,
  Volume2
} from "lucide-react-native"
import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function DyslexicPractice() {
  const [activeTab, setActiveTab] = useState("practice")
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner")
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const difficulties = [
    { id: "beginner", label: "Beginner", icon: "◎" },
    { id: "intermediate", label: "Intermediate", icon: "◉" },
    { id: "advanced", label: "Advanced", icon: "⚡" },
    { id: "expert", label: "Expert", icon: "∧" },
  ]

  const letters = ["A", "E", "I", "O"]

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dyslexic Learn</Text>
            <Text style={styles.subtitle}>Anusha's Journey</Text>
          </View>

          <View style={styles.headerIcons}>
            <Settings size={20} color="#888" />
            <Hexagon size={20} color="#888" />
            <LogOut size={20} color="#3B82F6" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.mainHeading}>Practice Sessions</Text>

        {/* Difficulty */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Difficulty Level</Text>

          <View style={styles.row}>
            {difficulties.map((d) => (
              <TouchableOpacity
                key={d.id}
                onPress={() => setSelectedDifficulty(d.id)}
                style={[
                  styles.diffBtn,
                  selectedDifficulty === d.id && styles.activeDiff,
                ]}
              >
                <Text style={{ fontSize: 16 }}>{d.icon}</Text>
                <Text style={styles.diffText}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lesson Practice */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Lesson Practice</Text>

          {["Letter Recognition", "Simple Words", "Syllable Basics"].map((t) => (
            <View key={t} style={styles.practiceItem}>
              <Text style={styles.practiceText}>{t}</Text>
              <Target size={18} color="#3B82F6" />
            </View>
          ))}
        </View>

        {/* Read Aloud */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎙 Read Aloud</Text>

          <View style={styles.wordBox}>
            <Text style={styles.bigWord}>cat</Text>
          </View>

          <TouchableOpacity style={styles.listenBtn}>
            <Volume2 size={18} />
            <Text> Listen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.speakBtn}>
            <Mic size={20} color="#fff" />
            <Text style={{ color: "#fff", marginLeft: 5 }}>
              Click to Speak
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phonics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔊 Phonics</Text>

          <LinearGradient
            colors={["#ec4899", "#8b5cf6", "#3b82f6"]}
            style={styles.soundBox}
          >
            <Volume2 size={32} color="#fff" />
            <Text style={{ color: "#fff" }}>Play Sound</Text>
          </LinearGradient>

          <View style={styles.grid}>
            {letters.map((l) => (
              <TouchableOpacity
                key={l}
                onPress={() => setSelectedLetter(l)}
                style={[
                  styles.letterBox,
                  selectedLetter === l && styles.activeLetter,
                ]}
              >
                <Text style={styles.letter}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 15 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 12, color: "gray" },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },

  mainHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },

  cardTitle: { fontWeight: "bold", marginBottom: 10 },

  row: { flexDirection: "row", justifyContent: "space-between" },

  diffBtn: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },

  activeDiff: {
    backgroundColor: "#3B82F6",
  },

  diffText: { fontSize: 10 },

  practiceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  practiceText: { fontSize: 14 },

  wordBox: {
    padding: 20,
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    alignItems: "center",
  },

  bigWord: { fontSize: 40, fontWeight: "bold" },

  listenBtn: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  speakBtn: {
    backgroundColor: "#ec4899",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  soundBox: {
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 15,
  },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  letterBox: {
    width: "48%",
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  activeLetter: {
    borderColor: "#3B82F6",
    backgroundColor: "#DBEAFE",
  },

  letter: { fontSize: 28, fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
  },

  centerBtn: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 50,
  },
})
