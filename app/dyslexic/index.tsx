import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DyslexicHome() {
  const router = useRouter();

  const handleReset = async () => {
    await AsyncStorage.removeItem("moduleChoice");
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoLetter}>S</Text>
            </View>
            <View>
              <Text style={styles.logoTitle}>Zyralex</Text>
              <Text style={styles.logoSub}>Advancing accessible reading</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons
            name="settings-outline"
            size={22}
            color="#6b7280"
            style={styles.hIcon}
          />
          <Ionicons
            name="shield-outline"
            size={22}
            color="#8b5cf6"
            style={styles.hIcon}
          />
          <Pressable onPress={handleReset}>
            <Ionicons
              name="exit-outline"
              size={22}
              color="#3b82f6"
              style={styles.hIcon}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LEVEL CARD */}
        <View style={styles.mainCard}>
          <View style={styles.levelHeader}>
            <View style={styles.iconCircleBlue}>
              <FontAwesome5 name="seedling" size={24} color="white" />
            </View>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelTitle}>Level 1</Text>
              <Text style={styles.levelSubtitle}>Beginner</Text>
            </View>
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>0 XP</Text>
              <Text style={styles.xpSubtext}>100 to Level 2</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressPercent}>0% to next level</Text>

          {/* Level Bubbles */}
          <View style={styles.bubbleRow}>
            <View style={[styles.bubble, styles.activeBubble]}>
              <FontAwesome5 name="seedling" size={16} color="white" />
            </View>
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={styles.bubble}>
                <Ionicons name="lock-closed" size={16} color="#d1d5db" />
              </View>
            ))}
          </View>
        </View>

        {/* AI TUTOR CARD */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconTitle}>
              <MaterialCommunityIcons name="brain" size={20} color="#3b82f6" />
              <Text style={styles.aiTitle}> AI Tutor</Text>
            </View>
            <Ionicons name="close" size={20} color="#9ca3af" />
          </View>
          <Text style={styles.aiSubtitle}>Personalized for you</Text>

          <View style={styles.aiBubble}>
            <View style={styles.strategyRow}>
              <FontAwesome5 name="seedling" size={14} color="#22c55e" />
              <Text style={styles.strategyLabel}> Strategy</Text>
            </View>
            <Text style={styles.aiMessage}>
              I notice you might need more practice. Let’s start with basics!
            </Text>
          </View>
          <View style={styles.aiFooter}>
            <View style={styles.dots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
            </View>
            <Text style={styles.nextTip}>Next Tip →</Text>
          </View>
        </View>

        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📈</Text>
            <Text style={styles.statNumber}>+0%</Text>
            <Text style={styles.statLabel}>Improvement</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f9ff" },
  scrollContent: { paddingBottom: 100, alignItems: "center" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    width: "100%",
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#8b5cf6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoLetter: { color: "white", fontWeight: "bold", fontSize: 18 },
  logoTitle: { fontSize: 18, fontWeight: "bold", color: "#3b82f6" },
  logoSub: { fontSize: 10, color: "#9ca3af" },
  headerIcons: { flexDirection: "row" },
  hIcon: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },

  mainCard: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 25,
    padding: 20,
    borderRadius: 24,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  levelHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconCircleBlue: {
    width: 50,
    height: 50,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  levelTextContainer: { flex: 1, marginLeft: 15 },
  levelTitle: { fontSize: 20, fontWeight: "800", color: "#1f2937" },
  levelSubtitle: { fontSize: 14, color: "#6b7280" },
  xpContainer: { alignItems: "flex-end" },
  xpText: { fontWeight: "bold", color: "#3b82f6" },
  xpSubtext: { fontSize: 10, color: "#9ca3af" },

  progressBarBg: { height: 10, backgroundColor: "#f3f4f6", borderRadius: 10 },
  progressBarFill: {
    width: "10%",
    height: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
  },
  progressPercent: {
    textAlign: "center",
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 8,
  },

  bubbleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    borderWeight: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  activeBubble: { backgroundColor: "#3b82f6" },

  aiCard: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  aiHeader: { flexDirection: "row", justifyContent: "space-between" },
  aiIconTitle: { flexDirection: "row", alignItems: "center" },
  aiTitle: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  aiSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 25,
    marginBottom: 15,
  },
  aiBubble: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 18,
    borderBottomLeftRadius: 2,
  },
  strategyRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  strategyLabel: { fontWeight: "bold", color: "#1f2937", fontSize: 14 },
  aiMessage: { color: "#4b5563", lineHeight: 18 },
  aiFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
  },
  dots: { flexDirection: "row" },
  dotActive: {
    width: 12,
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    marginRight: 4,
  },
  dot: { width: 4, height: 4, backgroundColor: "#d1d5db", borderRadius: 2 },
  nextTip: { color: "#3b82f6", fontWeight: "bold", fontSize: 12 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  statCard: {
    backgroundColor: "white",
    width: "31%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  statEmoji: { fontSize: 20, marginBottom: 5 },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  statLabel: { fontSize: 10, color: "#9ca3af", textAlign: "center" },
});
