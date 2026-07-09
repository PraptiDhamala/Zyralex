// app/sign/learn.tsx

import { useSignModule } from '@/hooks/useSignModule';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LevelCollapsible } from '../../components/LevelCollapsible';
import { COLORS } from '../../constants/colors';

export default function LearnScreen() {
  const{ levels, loading, error } = useSignModule();
  if (loading) return <ActivityIndicator style={{ marginTop:40 }} />;
  if (error) return <Text style={{ margin:16 }}> {error} </Text>
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       
        {/* Lessons Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sign Language Lessons</Text>
        </View>

        {/* Lesson Levels */}
        <View style={styles.lessonsContainer}>
          {levels.map((level) => (
            <LevelCollapsible key={level.levelId} level={level} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.darkGray,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonIcon: {
    fontSize: 18,
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
  lessonsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  bottomPadding: {
    height: 40,
  },
});

