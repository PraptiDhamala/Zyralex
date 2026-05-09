import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function DyslexicHome() {
  const router = useRouter();

  // State for Text Simplification
  const [isSimplified, setIsSimplified] = useState(false);

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
              <Text style={styles.logoLetter}>Z</Text>
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
              <Text style={styles.levelSubtitle}>
                {isSimplified ? "New Learner" : "Beginner"}
              </Text>
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

          <View style={styles.simplificationRow}>
            <View style={styles.toggleLabelGroup}>
              <MaterialCommunityIcons
                name="auto-fix"
                size={18}
                color="#3b82f6"
              />
              <Text style={styles.toggleText}>Simplify all text</Text>
            </View>
            <Switch
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={isSimplified ? "#3b82f6" : "#f4f3f4"}
              onValueChange={() => setIsSimplified(!isSimplified)}
              value={isSimplified}
            />
          </View>

          <View style={styles.aiBubble}>
            <View style={styles.strategyRow}>
              <FontAwesome5 name="seedling" size={14} color="#22c55e" />
              <Text style={styles.strategyLabel}> Strategy</Text>
            </View>
            <Text style={styles.aiMessage}>
              {isSimplified
                ? "I will use easier words to help you read."
                : "I notice you might need more practice. Let’s start with basics!"}
            </Text>
          </View>
        </View>

        {/* FIXED STATS ROW (Now Scrollable) */}
        {/* CLEANED STATS ROW */}
        <View style={styles.statsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // This allows the cards to "breathe" at the start and end
            contentContainerStyle={styles.statsScrollContent}
            // This makes the scrolling feel snappier
            decelerationRate="fast"
            snapToInterval={125} // card width (110) + gap (15)
          >
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>
                {isSimplified ? "Days" : "Day Streak"}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statNumber}>0%</Text>
              <Text style={styles.statLabel}>
                {isSimplified ? "Top" : "Best Score"}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>📈</Text>
              <Text style={styles.statNumber}>+0%</Text>
              <Text style={styles.statLabel}>
                {isSimplified ? "Better" : "Improvement"}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.iconWrapper}>
                <Feather name="upload-cloud" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.statNumber}>Add</Text>
              <Text style={styles.statLabel}>
                {isSimplified ? "Easy Read" : "Simplified"}
              </Text>
            </View>
          </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    width: "100%",
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoIcon: {
    width: 30,
    height: 30,
    backgroundColor: "navy",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  logoLetter: { color: "white", fontWeight: "bold", fontSize: 16 },
  logoTitle: { fontSize: 18, fontWeight: "bold", color: "navy" },
  logoSub: { fontSize: 10, color: "#9ca3af" },
  headerIcons: { flexDirection: "row" },
  hIcon: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },

  mainCard: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    padding: 20,
    borderRadius: 24,
    elevation: 4,
  },
  levelHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  iconCircleBlue: {
    width: 50,
    height: 50,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  levelTextContainer: { flex: 1, marginLeft: 15 },
  levelTitle: { fontSize: 18, fontWeight: "bold" },
  levelSubtitle: { color: "#6b7280" },
  xpContainer: { alignItems: "flex-end" },
  xpText: { color: "#3b82f6", fontWeight: "bold" },
  xpSubtext: { fontSize: 10, color: "#9ca3af" },
  progressBarBg: {
    height: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    marginVertical: 10,
  },
  progressBarFill: {
    width: "10%",
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
  progressPercent: { textAlign: "center", fontSize: 10, color: "#9ca3af" },
  bubbleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  bubble: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
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
    elevation: 2,
  },
  aiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aiIconTitle: { flexDirection: "row", alignItems: "center" },
  aiTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 5 },
  aiSubtitle: { fontSize: 12, color: "#9ca3af", marginBottom: 10 },
  simplificationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  toggleLabelGroup: { flexDirection: "row", alignItems: "center" },
  toggleText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1e40af",
    marginLeft: 8,
  },
  aiBubble: { backgroundColor: "#f8fafc", padding: 15, borderRadius: 15 },
  strategyRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  strategyLabel: { fontWeight: "bold", fontSize: 12 },
  aiMessage: { fontSize: 13, color: "#4b5563" },
  statsContainer: {
    width: "100%",
    marginTop: 25,
    paddingVertical: 5,
  },
  statsScrollContent: {
    paddingHorizontal: 20, // Critical: Stops the "cut off" look at screen edges
    gap: 15, // Consistent spacing between cards
  },
  statCard: {
    backgroundColor: "white",
    width: 110, // Fixed width for symmetry
    height: 100, // Making them square looks much cleaner
    padding: 12,
    borderRadius: 22, // Softer, more modern corners
    alignItems: "center",
    justifyContent: "center",
    // Premium Shadow
    elevation: 4,
    shadowColor: "#3b82f6", // Tinted shadow makes it look high-end
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800", // Extra bold for readability
    color: "#1f2937",
  },
  statLabel: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 2,
  },
  iconWrapper: {
    marginBottom: 4,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
