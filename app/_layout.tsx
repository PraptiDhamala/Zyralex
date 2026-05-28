import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const router = useRouter();
<<<<<<< HEAD
  
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
=======
  const segments = useSegments();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

<<<<<<< HEAD
        if (!session) {
          router.replace("/signup");
          return;
        }

        const choice = await AsyncStorage.getItem("moduleChoice");

        if (!choice) {
          router.replace("/onboarding");
=======
        if (!mounted) return;

        const currentRoute = segments[0];

        // USER NOT LOGGED IN
        if (!session) {
          if (currentRoute !== "signup") {
            router.replace("/signup");
          }

          setLoading(false);
          return;
        }

        // USER LOGGED IN
        const choice = await AsyncStorage.getItem("moduleChoice");

        if (!mounted) return;

        if (!choice) {
          if (segments[0] !== "onboarding") {
            router.replace("/onboarding");
          }
          setLoading(false);
          return;
        }
        if (segments[0] === "game") {
  
          setLoading(false);
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
          return;
        }

        // --- FIXED PATHS & SEGMENT GUARDS ---
        if (choice === "dyslexic" && segments[0] !== "dyslexic") {
          router.replace("/dyslexic");
        } else if (choice === "sign" && segments[0] !== "sign") {
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
<<<<<<< HEAD
  }, [isNavigationReady]); //Runs once the navigation tree is safe
=======
  }, [segments]); // Added segments array here to listen safely to route mutations
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373

  // Always render the loading screen(slot) to let the navigator mount
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<<<<<<< HEAD
        {/*Wrap Slot here hidden or just let it mount so navigation loads */}
        <View style={{ display: 'none' }}><Slot /></View>
        <ActivityIndicator size="large" color="#007AFF" />
=======
        <Text>Loading...</Text>
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      </View>
    );
  }

  return <Slot />;
}
