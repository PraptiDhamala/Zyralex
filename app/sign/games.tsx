import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DyslexicGames() {
  return (
    <LinearGradient
      colors={["#f4f4f0", "#f8f9f6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Fun Learning Games</Text>

        <View style={styles.grid}>
          {/* 🔗 Match */}
          <Link href="/game/match" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#7dbef7", "#74e7ef"]} style={styles.card}>
                <Text style={styles.emoji}>🔗</Text>
                <Text style={styles.buttonText}>Match the Following</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          {/* 🃏 Memory */}
          <Link href="/game/memory" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#fadc7a", "#fda085"]} style={styles.card}>
                <Text style={styles.emoji}>🃏</Text>
                <Text style={styles.buttonText}>Memory Cards</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          {/* 🔤 Unscramble */}
          <Link href="/game/unscramble" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#adf2c6", "#8fd3f4"]} style={styles.card}>
                <Text style={styles.emoji}>🔤</Text>
                <Text style={styles.buttonText}>Unscramble Words</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          {/* ✍️ Spelling */}
          <Link href="/game/spelling" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#ff9a9e", "#fad0c4"]} style={styles.card}>
                <Text style={styles.emoji}>✍️</Text>
                <Text style={styles.buttonText}>Spelling Bee</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          {/* 😊 Emoji */}
          <Link href="/game/emoji" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#a18cd1", "#fbc2eb"]} style={styles.card}>
                <Text style={styles.emoji}>😊</Text>
                <Text style={styles.buttonText}>Emoji Riddles</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>

          {/* 📚 Sentence */}
          <Link href="/game/sentence" asChild>
            <TouchableOpacity style={styles.baseButton}>
              <LinearGradient colors={["#ffecd2", "#fcb69f"]} style={styles.card}>
                <Text style={styles.emoji}>📚</Text>
                <Text style={styles.buttonText}>Sentence Builder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#264994",
  },

  grid: {
    flexDirection: "column", // stack vertically
    alignItems: "center",
    width: "100%",
  },

  baseButton: {
    width: "100%", // wider for column layout
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  card: {
    padding: 20,
    alignItems: "center",
    borderRadius: 12,
    height: 140,
  },

  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
