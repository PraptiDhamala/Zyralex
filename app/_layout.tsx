import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      // GET CURRENT SESSION
      const { data: { session } } = await supabase.auth.getSession();

      // LISTEN FOR FUTURE CHANGES
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {

          if (!session) {
            router.replace("/signup");
            setLoading(false);
            return;
          }

          const choice = await AsyncStorage.getItem("moduleChoice");

          if (!choice) {
            router.replace("/onboarding");
            setLoading(false);
            return;
          }

          if (choice === "dyslexic") {
            router.replace("/dyslexic");
          } else if (choice === "sign") {
            router.replace("/sign");
          }

          setLoading(false);
        }
      );

      // INITIAL CHECK
      if (!session) {
        router.replace("/signup");
        setLoading(false);
      }

      return () => {
        listener.subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}