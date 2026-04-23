import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(true);
  const hasChecked = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (hasChecked.current) return;
      hasChecked.current = true;

      try {
        console.log("START");

        const choice = await AsyncStorage.getItem("moduleChoice");
        console.log("CHOICE:", choice);

        const currentRoute = segments?.[0];

        if (!currentRoute) return;

        if (!choice) {
          if (currentRoute !== "onboarding") {
            router.replace("/onboarding");
          }
          return;
        }

        const routeMap = {
          dyslexic: "dyslexic",
          sign: "sign",
        } as const;

        const targetRoute = routeMap[choice as keyof typeof routeMap];

        console.log("CURRENT:", currentRoute);
        console.log("TARGET:", targetRoute);

        // 🔥 HARD STOP: prevent loop
        if (currentRoute === targetRoute) {
          console.log("Already correct");
          return;
        }

        console.log("NAVIGATING...");
        router.replace(`/${targetRoute}`);
      } catch (e) {
        console.log("ERROR:", e);
        router.replace("/onboarding");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Root...</Text>
      </View>
    );
  }

  return <Slot />;
}