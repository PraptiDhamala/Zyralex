// app/dyslexic/index.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DyslexicHome() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleReset = async () => {
    await AsyncStorage.removeItem("moduleChoice");
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoTitle}>Dyslexic Learn</Text>
            <Text style={styles.logoSub}>Anusha's Journey</Text>
          </View>
          <View style={styles.avatar} />
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Welcome Back,</Text>
          <Text style={styles.welcomeTitle}>Anusha!</Text>
          <Text style={styles.welcomeSub}>
            Continue your learning journey
          </Text>
        </View>

        {/* LEVEL CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⭐ Level 1 - Beginner</Text>
          <Text style={styles.cardXP}>0 XP</Text>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>

          <Text style={styles.progressText}>0% to next level</Text>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <Pressable
            style={styles.actionBtn}
            onPress={() => router.push("/dyslexic/learn")}
          >
            <Text style={styles.actionText}>Learn</Text>
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => router.push("/dyslexic/practice")}
          >
            <Text style={styles.actionText}>Practice</Text>
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => router.push("/dyslexic/games")}
          >
            <Text style={styles.actionText}>Games</Text>
          </Pressable>
        </View>

        {/* AI TUTOR */}
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>🤖 AI Tutor</Text>
          <Text style={styles.aiText}>
            I notice you might need more practice. Let’s start with basics!
          </Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>+0%</Text>
            <Text style={styles.statLabel}>Improvement</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
                <Button title="Reset / Go to Sign In" onPress={handleReset} />
              </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e0f2fe" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },

  logoTitle: { fontSize: 22, fontWeight: "bold", color: "#2563eb" },
  logoSub: { fontSize: 12, color: "#6b7280" },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#60a5fa",
  },

  welcomeBox: { paddingHorizontal: 20, marginBottom: 15 },

  welcomeTitle: { fontSize: 24, fontWeight: "bold", color: "#111827" },
  welcomeSub: { fontSize: 14, color: "#6b7280", marginTop: 5 },

  card: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardXP: { color: "#2563eb", marginVertical: 10, fontWeight: "600" },

  progressBarBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
  },

  progressBarFill: {
    width: "10%",
    height: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
  },

  progressText: { fontSize: 12, color: "#6b7280", marginTop: 5 },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  actionText: { color: "#2563eb", fontWeight: "600" },

  aiCard: {
    backgroundColor: "#f0f9ff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  aiTitle: { fontWeight: "bold", marginBottom: 5 },
  aiText: { color: "#6b7280" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },

  statBox: { alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "#6b7280" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "white",
  },

  tab: { color: "#9ca3af", fontSize: 12 },
  activeTab: { color: "#2563eb", fontSize: 12, fontWeight: "bold" },
});