import { Feather, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DyslexicLearn() {
  const [speed, setSpeed] = useState(50);
  const [autoPlay, setAutoPlay] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Text style={styles.back}>⟨</Text>
          <View>
            <Text style={styles.title}>Dyslexic</Text>
            <Text style={styles.title}>Learn</Text>
            <Text style={styles.subtitle}>Anush a's Journey</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.circleBtn}>
            <Feather name="settings" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn}>
            <View style={styles.profileCircle} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.circleBtn, { backgroundColor: "#3B82F6" }]}>
            <MaterialIcons name="logout" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <Text style={styles.sectionTitle}>Reading Lessons</Text>

        {/* Daily Reading */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Daily Reading Check</Text>

          <View style={styles.gradientBox}>
            <Text style={styles.whiteTitle}>Daily Reading Assessment</Text>
            <Text style={styles.whiteText}>
              Helps us adjust text difficulty for you
            </Text>

            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.whiteText}>Question 1 of 5</Text>
          </View>

          <View style={styles.blueBox}>
            <Text style={{ color: "#3B82F6" }}>Read this sentence:</Text>
            <Text>The cat sat on the mat.</Text>
          </View>

          <Text style={styles.question}>What did the cat do?</Text>

          {["Jumped", "Sat", "Ran", "Slept"].map((opt) => (
            <TouchableOpacity key={opt} style={styles.optionBtn}>
              <Text>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Phonic Helper */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📖 Phonic Helper</Text>

          <View style={styles.purpleBox}>
            <Text style={styles.whiteTitle}>Phonic Helper</Text>
            <Text style={styles.whiteText}>
              Listen and learn syllables
            </Text>
          </View>

          <Text style={styles.grayText}>
            Sentence 1 of 3 | Word 1/6
          </Text>

          <View style={styles.wordRow}>
            {["The", "cat", "sat", "on", "the", "mat"].map((w, i) => (
              <View
                key={i}
                style={[
                  styles.word,
                  i === 0 && { backgroundColor: "#8B5CF6" },
                ]}
              >
                <Text style={{ color: i === 0 ? "white" : "#333" }}>{w}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.bigWord}>The</Text>

          {/* Buttons */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.btnText}>Play Syllable</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Text style={styles.btnText}>Play Word</Text>
            </TouchableOpacity>
          </View>

          {/* Controls */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.smallBtn}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn}>
              <Text>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Slider */}
          <Text>Speed</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={speed}
            onValueChange={setSpeed}
          />

          {/* AutoPlay */}
          <View style={styles.row}>
            <Switch value={autoPlay} onValueChange={setAutoPlay} />
            <Text>Auto-play next syllable</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  back: { fontSize: 22, color: "#2563EB" },

  title: { color: "#2563EB", fontWeight: "bold", fontSize: 18 },
  subtitle: { fontSize: 12, color: "#999" },

  headerIcons: { flexDirection: "row", gap: 8 },

  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  profileCircle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#A855F7",
  },

  sectionTitle: {
    fontSize: 20,
    color: "#3B82F6",
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  cardTitle: { fontWeight: "600", marginBottom: 10 },

  gradientBox: {
    backgroundColor: "#06B6D4",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  whiteTitle: { color: "white", fontWeight: "bold" },
  whiteText: { color: "white" },

  progressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    marginVertical: 6,
  },

  progressFill: {
    width: "20%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },

  blueBox: {
    backgroundColor: "#DBEAFE",
    padding: 10,
    borderRadius: 10,
  },

  question: { marginTop: 10, fontWeight: "600" },

  optionBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },

  purpleBox: {
    backgroundColor: "#8B5CF6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  grayText: { color: "#666", marginBottom: 10 },

  wordRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },

  word: {
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  bigWord: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  primaryBtn: {
    backgroundColor: "#8B5CF6",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },

  secondaryBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },

  btnText: { color: "white", textAlign: "center" },

  smallBtn: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 10,
  },

  learnBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 12,
  },
});
