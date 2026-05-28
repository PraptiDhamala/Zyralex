import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const router = useRouter();
  
  // Reference to the navigation state
  const rootNavigationRef = useNavigationContainerRef();
  
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [ready, setReady] = useState(false);

  // Monitor when the root navigator is actually mounted and ready
  useEffect(() => {
    if (rootNavigationRef?.current) {
      setIsNavigationReady(true);
    }
  }, [rootNavigationRef]);

  useEffect(() => {
    // Block execution until Expo Router is mounted and ready for redirects
    if (!isNavigationReady) return;

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/signup");
          return;
        }

        const choice = await AsyncStorage.getItem("moduleChoice");

        if (!choice) {
          router.replace("/onboarding");
          return;
        }

        if (choice === "dyslexic") {
          router.replace("/dyslexic");
        } else if (choice === "sign") {
          router.replace("/sign");
        } else {
          router.replace("/onboarding");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/signup");
      } finally {
        setReady(true); //always runs no mater what
      }
    };

    checkAuth();
  }, [isNavigationReady]); //Runs once the navigation tree is safe

  // Always render the loading screen(slot) to let the navigator mount
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/*Wrap Slot here hidden or just let it mount so navigation loads */}
        <View style={{ display: 'none' }}><Slot /></View>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <Slot />;
}