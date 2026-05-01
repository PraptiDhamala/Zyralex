import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  const selectModule = async (choice: "dyslexic" | "sign") => {
    await AsyncStorage.setItem("moduleChoice", choice);
    router.replace(`/${choice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Learning Module</Text>

      {/* Panda mascot */}
      <View style={styles.mascotWrapper}>
        <Text style={styles.speechBubble}>
          Hi, I’m Mimo! Pick a module to begin.
        </Text>
        <LottieView
          source={require("../../assets/panda.json")}
          autoPlay
          loop
          style={styles.mascot}
        />
      </View>

      {/* Dyslexic Learn card */}
      <TouchableOpacity onPress={() => selectModule("dyslexic")} style={styles.cardWrapper}>
        <LinearGradient
          colors={["#1679ea", "#70b5f9"]} // gradient shades of blue
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dyslexic Learn</Text>
              <Text style={styles.cardSubtitle}>Reading & vocabulary practice</Text>
            </View>

            <View style={styles.cardButtons}>
              <View style={styles.cardButton}>
                <FontAwesome5 name="book" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>Reading</Text>
              </View>
              <View style={styles.cardButton}>
                <Ionicons name="chatbubble" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>Vocabulary</Text>
              </View>
              <View style={styles.cardButton}>
                <Ionicons name="game-controller" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>Games</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Learn card */}
      <TouchableOpacity onPress={() => selectModule("sign")} style={styles.cardWrapper}>
        <LinearGradient
          colors={["#f29d15", "#f4b562"]} // gradient shades of orange
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Sign Learn</Text>
              <Text style={styles.cardSubtitle}>ASL & sign language training</Text>
            </View>

            <View style={styles.cardButtons}>
              <View style={styles.cardButton}>
                <Ionicons name="hand-left" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>ASL</Text>
              </View>
              <View style={styles.cardButton}>
                <Ionicons name="videocam" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>Videos</Text>
              </View>
              <View style={styles.cardButton}>
                <Ionicons name="camera" size={18} color="#fff" />
                <Text style={styles.cardButtonText}>Camera</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 30, marginBottom: 30, fontWeight: "700", textAlign: "center" },

  mascotWrapper: { flexDirection: "column", alignItems: "center", marginBottom: 20 },
  mascot: { width: 200, height: 200 },
  speechBubble: {
    backgroundColor: "#f1e195",
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    textAlign: "center",
    marginBottom: 10,
  },

  cardWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden", 
    width: "100%",
  },
  cardGradient: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardContent: { flex: 1 },
  cardHeader: { marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 10 },
  cardSubtitle: { color: "#fff", marginBottom: 20 },

  cardButtons: { flexDirection: "row", gap: 15 },
  cardButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  cardButtonText: { color: "#fff", fontSize: 14 },
});