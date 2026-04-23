// app/onboarding/index.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const router = useRouter();

  const selectModule = async (choice: "dyslexic" | "sign") => {
    await AsyncStorage.setItem("moduleChoice", choice);
    router.replace(`/${choice}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Choose Your Learning Module</Text>
      <TouchableOpacity onPress={() => selectModule("dyslexic")}>
        <Text style={{ fontSize: 18, color: "blue" }}>Dyslexic Learn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectModule("sign")}>
        <Text style={{ fontSize: 18, color: "orange", marginTop: 10 }}>Sign Learn</Text>
      </TouchableOpacity>
    </View>
  );
}
