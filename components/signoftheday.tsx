import { ResizeMode, Video } from "expo-av";
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { LESSON_LEVELS, SignItem } from '../constants/lessonData';

function getAllSigns(): SignItem[] {
  return LESSON_LEVELS.flatMap(level =>
    level.lessons.flatMap(lesson => lesson.signs)
  );
}

function getSignOfTheDay(): SignItem {
  const signs = getAllSigns();
  if (signs.length === 0) return null as any;

  const today = new Date();
  const daySeed = today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();
  const index = daySeed % signs.length;
  return signs[index];
}

export const SignOfTheDayPanel = () => {
    const signOfTheDay = useMemo(() => getSignOfTheDay(), []);

  if (!signOfTheDay) return null;
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Sign of the Day</Text>
      <Text style={styles.subtitle}>Learn one new sign every day!</Text>

      {/* Sign Illustration */}
      <View style={styles.signContainer}>
        <Video
          source={{ uri: signOfTheDay.video }}
          style={styles.signVideo}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
        <Text style={styles.signLabel}>{signOfTheDay.label}</Text>
      </View>

      {/* Mascot Encouragement */}
      <View style={styles.mascotContainer}>
        <Image
          source={require('../assets/mimo2.png')}
          style={styles.mascotImage}
          resizeMode="contain"
        />
        <Text style={styles.mascotText}>Great job! You did it!</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.practiceButton}>
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizButton}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
      </View>
      {/* Streak */}
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>🔥 Streak: 5 Days</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    elevation: 3,
  },
   signVideo: {
    width: 200,
    height: 150,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 12,
  },
  signContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  signImage: {
    width: 120,
    height: 100,
  },
  signLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 8,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mascotImage: {
    width: 80,
    height: 70,
    marginRight: 8,
  },
  mascotText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  practiceButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quizButton: {
    backgroundColor: COLORS.info,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  streakContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  streakText: {
    fontSize: 14,
    color: COLORS.orange,
    fontWeight: '600',
  },
});
