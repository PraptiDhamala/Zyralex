import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { PRACTICE_SESSIONS } from '../../constants/mockData';
import { DifficultySelector } from '../../components/DifficultySelector';
import { PracticeSessionCard } from '../../components/PracticeSessionCard';
import { CameraPracticeGrid } from '../../components/CameraPracticeGrid';
import { COLORS } from '../../constants/colors';

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export default function PracticeScreen() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>('Beginner');

  // Filter practice sessions by selected difficulty
  const filteredSessions = PRACTICE_SESSIONS.filter(
    (session) => session.difficulty === selectedDifficulty
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Practice Sessions</Text>
        </View>

        {/* Difficulty Selector */}
        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
        />

        {/* Practice Sessions */}
        <View style={styles.practiceContainer}>
          <View style={styles.practiceHeader}>
            <Text style={styles.practiceIcon}>📚</Text>
            <Text style={styles.practiceTitle}>Lesson Practice</Text>
          </View>
          <Text style={styles.practiceSubtitle}>
            Complete practice sessions to master each lesson
          </Text>

          {filteredSessions.length > 0 ? (
            <View style={styles.sessionsList}>
              {filteredSessions.map((session) => (
                <PracticeSessionCard
                  key={session.id}
                  session={session}
                  onPress={() =>
                    console.log('Practice session pressed:', session.id)
                  }
                />
              ))}
            </View>
          ) : (
            <View style={styles.noSessions}>
              <Text style={styles.noSessionsText}>
                No practice sessions available for this difficulty level
              </Text>
            </View>
          )}
        </View>

        {/* Camera Practice Section */}
        <CameraPracticeGrid />

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
  practiceContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  practiceIcon: {
    fontSize: 18,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  practiceSubtitle: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  sessionsList: {
    gap: 12,
  },
  noSessions: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.cream,
    borderRadius: 8,
  },
  noSessionsText: {
    fontSize: 14,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});

