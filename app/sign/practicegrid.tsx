
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { CameraPracticeGrid } from '../../components/CameraPracticeGrid';

export default function CameraPracticeScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', margin: 16 }}>
        Camera Practice {lessonId ? `(Lesson ${lessonId})` : ''}
      </Text>
      <CameraPracticeGrid />
    </View>
  );
}
