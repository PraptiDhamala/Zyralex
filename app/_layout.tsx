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
    let mounted = true;

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

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
          if (currentRoute !== "onboarding") {
            router.replace("/onboarding");
          }

          setLoading(false);
          return;
        }

        if (choice === "dyslexic") {
          if (currentRoute !== "dyslexic") {
            router.replace("/dyslexic");
          }
        } else if (choice === "sign") {
          if (currentRoute !== "sign") {
            router.replace("/sign");
          }
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}