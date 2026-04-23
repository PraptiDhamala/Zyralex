// app/dyslexic/home.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function DyslexicHome() {
  const router = useRouter();

  const handleReset = async () => {
    await AsyncStorage.removeItem("moduleChoice"); // clear saved choice
    router.replace("/onboarding"); // go back to sign/onboarding
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dyslexic Learn</Text>
      <Text style={styles.subtitle}>This is your Home screen.</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Reset / Go to Sign In" onPress={handleReset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 10 },
});