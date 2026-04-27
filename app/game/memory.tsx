import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MemoryGame() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Cards</Text>
      <Text style={styles.placeholder}>[Dummy Memory Game Screen]</Text>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back to Hub</Text>
      </Pressable>
    </View>
  );
}




const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  placeholder: { fontSize: 18, color: "#666" },
  backButton: { marginTop: 20, padding: 10, backgroundColor: "#318ef8", borderRadius: 8 },
  backText: { color: "#fff", fontWeight: "600" },
});
//category sort
//puzzle