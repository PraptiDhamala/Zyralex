import { SignOfTheDayPanel } from "@/components/signoftheday";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { RelativePathString, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { DifficultySelector } from '../../components/DifficultySelector';
import { PracticeSessionCard } from '../../components/PracticeSessionCard';
import { COLORS } from '../../constants/colors';
type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export default function PracticeScreen() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>('Beginner');
  const [currentLesson, setCurrentLesson] = useState<{ levelId: string; lessonId: string } | null>(null);
  const router = useRouter();

  
useFocusEffect(
  React.useCallback(() => {
    const loadLesson = async () => {
      const stored = await AsyncStorage.getItem("currentLesson");
      if (stored) {
        setCurrentLesson(JSON.parse(stored));
      }
    };
    loadLesson();
  }, [])
);

  if (!currentLesson) {
    return <Text>No lesson selected yet</Text>;
  }

  const { levelId, lessonId } = currentLesson;

  // Define the three practice modes as rows
  const PRACTICE_MODES = [
    {
      id: 'lesson',
      title: 'Lesson Practice',
      description: 'Complete practice sessions to master each lesson',
      route: '/sign/practicegrid',
    },
    {
      id: 'flashcards',
      title: 'Flash Cards',
      description: 'Test your memory with flash card practice',
      route: '/sign/Flashgrid',
    },
    {
      id: 'random',
      title: 'Random Practice',
      description: 'Challenge yourself with random signs',
      route: '/sign/RandomPracticeScreen',
    },
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Practice Sessions</Text>
        </View>

        {/* Difficulty Selector (applies to Lesson mode) */}
        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
        />
        <SignOfTheDayPanel />

        {/* Practice Modes */}
        <View style={styles.practiceContainer}>
          {PRACTICE_MODES.map((mode) => (
            <PracticeSessionCard
              key={mode.id}
              session={{
                id: mode.id,
                title: mode.title,
                description: mode.description,
                difficulty: selectedDifficulty,
                questions: 0,
                passed: 0,
              }}
              onPress={() =>
                router.push({
                  pathname: mode.route as RelativePathString,
                  params: { practiceType: mode.id, difficulty: selectedDifficulty,levelId,lessonId },
                })
              }
            />
          ))}
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  practiceContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16, 
  },
  bottomPadding: {
    height: 40,
  },
});
