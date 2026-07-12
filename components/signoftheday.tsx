import { useSignModule } from "@/hooks/useSignModule";
import { Level, SignItem } from '@/types/lesson';
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from 'expo-router';
import LottieView from "lottie-react-native";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

function getAllSigns(levels: Level[]): SignItem[] {
  return levels.flatMap(level =>
    level.lessons.flatMap(lesson => lesson.signs)
  );
}

function getSignOfTheDay(levels: Level[]): SignItem | null {
  const signs = getAllSigns(levels);
  if (signs.length === 0) return null as any;
  const today = new Date();
  const daySeed = today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();
  const index = daySeed % signs.length;
  return signs[index];
}

export const SignOfTheDayPanel = () => {
  const { levels, stats, loading, error, refetch } = useSignModule(); 
  const signOfTheDay = useMemo(() => getSignOfTheDay(levels), [levels]);
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation, refetch]);

  if (!signOfTheDay) return null;

  return (
    <LinearGradient
      colors={["#e1f3f2", "#fed6e3"]} 
      end={{ x: 1, y: 1 }}
      style={styles.panel}
    >
    
      <Text style={styles.title}>Sign of the Day</Text>
      <Text style={styles.subtitle}>Learn one new sign every day!</Text>
    
      {/* Sign + Mascot Row */}
      <View style={styles.row}>
        <View style={styles.signContainer}>
        {signOfTheDay?.video ? (
          <Video
          source={{ uri: signOfTheDay.video }}
          style={styles.signVideo}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          />
          ) : (
          <Text style={{ color: 'white' }}>Video missing</Text>
          )}
        </View>
        

        <View style={styles.mascotContainer}>
           <LottieView
                    source={require("../assets/panda.json")}
                    autoPlay
                    loop
                    style={styles.mascotImage}
                  />
          <Text style={styles.mascotText}>Try it with me!</Text>
        </View>
      </View>

      {/* Action Buttons 
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.practiceButton}>
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
      </View> */}

      {/* Streak */}
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}> 🔥 Streak: {stats.dayStreak} {stats.dayStreak === 1 ? 'Day' : 'Days'}
        </Text>
      </View>
   
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  panel: {
    
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 24,
    borderRadius:30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginLeft:30,
    gap:30,
  },
  signContainer: {
    alignItems: "center",
    flex: 1,
    
  },
  signVideo: {
  width: 198,
   height: 150,
    borderRadius: 16,
   marginTop: 10 ,
   borderWidth: 2,
borderColor: "white",

  },
  signLabel: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.primary,
    marginTop: 8,
  },
  mascotContainer: {
    alignItems: "center",
    flex: 1,
  },
  mascotImage: {
    marginLeft:30,
    width: 180,
    height: 200,
  },
  mascotText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  practiceButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  quizButton: {
    backgroundColor: COLORS.info,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  streakContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  streakText: {
    fontSize: 15,
    color: COLORS.orange,
    fontWeight: "700",
  },
});
