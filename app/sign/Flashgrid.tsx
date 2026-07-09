import { useSignModule } from '@/hooks/useSignModule';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlashCollapsible } from '../../components/Flashcollaspible';
import { COLORS } from '../../constants/colors';

export default function FlashPracticeScreen() {
  const { lessonId, levelId } = useLocalSearchParams<{ lessonId?: string; levelId?: string }>();
  const{ levels, loading, error } = useSignModule();
  if (loading) return <ActivityIndicator style={{ marginTop:40 }} />;
  if (error) return <Text style={{ margin:16 }}> {error} </Text>
  
  return (
    <ScrollView style={{ flex: 1 ,backgroundColor: COLORS.white,}}>
     <View style={styles.sectionHeader}>
       <Text style={styles.sectionTitle}>Flash Card Sessions </Text>
      </View>
     
    <View style={styles.lessonsContainer}>
      {levels.map((lvl) => (
        <FlashCollapsible key={lvl.levelId} level={lvl} />
      ))}
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  lessonsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  marginBottom:20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
   

  },
});
