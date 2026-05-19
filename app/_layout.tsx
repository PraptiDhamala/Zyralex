import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const inAuthScreen = segments[0] === "signup";

        if (!session) {
          if (!inAuthScreen) {
            router.replace("/signup");
          }
          setLoading(false);
          return;
        }

        const choice = await AsyncStorage.getItem("moduleChoice");

        if (!choice) {
          if (segments[0] !== "onboarding") {
            router.replace("/onboarding");
          }
          setLoading(false);
          return;
        }

        // --- FIXED PATHS & SEGMENT GUARDS ---
        if (choice === "dyslexic" && segments[0] !== "dyslexic") {
          router.replace("/dyslexic");
        } else if (choice === "sign" && segments[0] !== "sign") {
          router.replace("/sign");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    checkAuth();
  }, [segments]); // Added segments array here to listen safely to route mutations

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}
