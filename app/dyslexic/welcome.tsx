import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../hooks/AuthProvider";
import { getLatestAssessment } from "../../utils/progress";

export default function WelcomeScreen() {
  const router = useRouter();
  const { session, loading: authLoading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!session?.user?.id) {
      router.replace("/signin" as any); 
      return;
    }

    (async () => {
      const assessment = await getLatestAssessment(session.user.id);

      if (assessment) {
        router.replace({
          pathname: "/dyslexic/module/[level1]/[lesson]",
          params: {
            level1: assessment.level ?? "level1",
            lesson: assessment.weak_area ?? "letter_reversal",
          },
        });
        return;
      }

      setChecking(false);
    })();
  }, [authLoading, session?.user?.id]);

  if (authLoading || checking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/mimoimg.png")}
        style={styles.mascotImage}
        resizeMode="contain"
      />

      <View style={styles.speechBubble}>
        <Text style={styles.bubbleText}>
          Hi, I'm Mimo! 🐼{"\n\n"}
          Before we start learning together, let's do a quick, fun check-in. It
          only takes a few minutes and helps me pick the perfect lessons just
          for you!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/dyslexic/learn" as any)}
      >
        <Text style={styles.primaryButtonText}>Let's find out! 🎯</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        You'll only need to do this once — I'll remember for next time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  mascotImage: {
    width: 160,
    height: 210,
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    maxWidth: 440,
  },
  bubbleText: {
    fontSize: 18,
    lineHeight: 28,
    color: "#334155",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  hint: {
    marginTop: 16,
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
  },
});
