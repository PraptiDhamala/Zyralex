import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignGames() {
  return (
    <LinearGradient
      colors={["#FFDEE9", "#B5FFFC"]} // 🎨 pick your gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Fun  Learning Games</Text>

      <View style={styles.grid}>
        <Link href="/game/match" asChild>
          <TouchableOpacity style={styles.cardBlue}>
            <Text style={styles.emoji}>🔗</Text>
            <Text style={styles.buttonText}> Match the Following</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/game/memory" asChild>
          <TouchableOpacity style={styles.cardOrange}>
            <Text style={styles.emoji}>🃏</Text>
            <Text style={styles.buttonText}> Memory Cards</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/game/unscramble" asChild>
          <TouchableOpacity style={styles.cardTeal}>
            <Text style={styles.emoji}>🔤 </Text>
            <Text style={styles.buttonText}>Unscramble Words</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/game/spelling" asChild>
          <TouchableOpacity style={styles.cardGreen}>
            <Text style={styles.emoji}>✍️</Text>
            <Text style={styles.buttonText}> Spelling Bee</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/game/emoji" asChild>
          <TouchableOpacity style={styles.cardPurple}>
            <Text style={styles.emoji}>😊</Text>
            <Text style={styles.buttonText}> Emoji Riddles</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/game/sentence" asChild>
          <TouchableOpacity style={styles.cardCoral}>
            <Text style={styles.emoji}>📚</Text>
            <Text style={styles.buttonText}> Sentence Builder</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, justifyContent: "center", },
  title: { fontSize: 30, fontWeight: "700", textAlign: "center", marginBottom: 20 ,color:"#264994"},

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // Base button style
  baseButton: {
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    width: "60%", // two per row
    alignItems: "center",
    shadowColor: "#0c0a0a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
    borderColor:"black",
    
  },
    emoji: { fontSize: 40 },

  buttonText: { color: "#fbf9f9", fontWeight: "500", textAlign: "center",fontSize:18},

  // 🎨 Different colors
  cardBlue: { backgroundColor: "#318ef8", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" ,},
  cardOrange: { backgroundColor: "#feb136", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" },
  cardTeal: { backgroundColor: "#33ecc4", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" },
  cardGreen: { backgroundColor: "#fc9ad8", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" },
  cardPurple: { backgroundColor: "#c87ee6", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" },
  cardCoral: { backgroundColor: "#e1968f", padding: 20, borderRadius: 10, marginBottom: 15, width: "48%", alignItems: "center" },
});
