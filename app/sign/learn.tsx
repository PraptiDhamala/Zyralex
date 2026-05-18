// app/sign/learn.tsx

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LESSON_LEVELS } from '../../constants/lessonData';
import { LevelCollapsible } from '../../components/LevelCollapsible';
import { COLORS } from '../../constants/colors';

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       
        {/* Lessons Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sign Language Lessons</Text>
        </View>

        {/* Lesson Levels */}
        <View style={styles.lessonsContainer}>
          {LESSON_LEVELS.map((level) => (
            <LevelCollapsible key={level.levelId} level={level} />
          ))}
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 16,
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

