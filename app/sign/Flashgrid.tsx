import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { FlashCollapsible } from '../../components/Flashcollaspible';
import { LESSON_LEVELS } from '../../constants/lessonData';

export default function CameraPracticeScreen() {
  const { lessonId, levelId } = useLocalSearchParams<{ lessonId?: string; levelId?: string }>();

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', margin: 16 }}>
        Camera Practice
        {lessonId ? ` (Lesson ${lessonId})` : ''}
      </Text>

      
      {LESSON_LEVELS.map((lvl) => (
        <FlashCollapsible key={lvl.levelId} level={lvl} />
      ))}
    </View>
  );
}
