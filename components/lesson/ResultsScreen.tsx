// components/lesson/ResultsScreen.tsx

import { Lesson } from '@/types/lesson';
import React from 'react';
import {
  Image, 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  lessonTitle: string;
  score: number;
  total: number;
  xp: number;
  nextLesson: Lesson | null;
  onRetake: () => void;
  onNextLesson: (id: string) => void;
  onPractice: () => void;
  onBackToLessons: () => void; 
}

export const ResultsScreen: React.FC<Props> = ({
  lessonTitle, score, total, xp, nextLesson, onRetake, onNextLesson, onPractice, onBackToLessons
}) => {
  const pct   = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
  const earnedXp = Math.round((pct / 100) * xp);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* mimo */}
      <Image
        source={require('../../assets/mimo1.png')}
        style={styles.mimoImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Lesson Complete!</Text>
      <Text style={styles.subtitle}>{lessonTitle}</Text>

      {/* Stars */}
      <View style={styles.starsRow}>
        {[1, 2, 3].map(n => (
          <Text key={n} style={[styles.star, n <= stars && styles.starActive]}>★</Text>
        ))}
      </View>

      {/* Score card */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreValue}>{score}/{total}</Text>
          <Text style={styles.scoreLabel}>Correct</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreValue}>{pct}%</Text>
          <Text style={styles.scoreLabel}>Accuracy</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreValue}>+{earnedXp}</Text>
          <Text style={styles.scoreLabel}>XP earned</Text>
        </View>
      </View>

      {/* Encouragement message */}
      <Text style={styles.encouragement}>
        {pct >= 90
          ? "🌟 Outstanding! You've mastered this lesson!"
          : pct >= 60
          ? "💪 Good job! A bit more practice and you'll nail it!"
          : "📚 Keep practicing — retake the lesson to improve!"}
      </Text>

      {/* Next Lesson */}
      {nextLesson && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => onNextLesson(nextLesson.lessonId)}
          activeOpacity={0.8}
        >
          <Text style={styles.nextBtnSub}>Up next</Text>
          <Text style={styles.nextBtnTitle}>{nextLesson.title} →</Text>
        </TouchableOpacity>
      )}

      <View style={styles.secondaryRow}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onRetake}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnIcon}>🔄</Text>
          <Text style={styles.secondaryBtnText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onPractice}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnIcon}>📝</Text>
          <Text style={styles.secondaryBtnText}>Practice</Text>
        </TouchableOpacity>

        {/* NEW: Back to Lessons button */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onBackToLessons}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnIcon}>📚</Text>
          <Text style={styles.secondaryBtnText}>Lessons</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  mimoImage: { width: 130, height: 130, marginBottom: 8 },
  title:    { fontSize: 28, fontWeight: '800', color: COLORS.primary, marginBottom: 4 },
  subtitle: { fontSize: 15, color: COLORS.darkGray, marginBottom: 24 },
  starsRow: { flexDirection: 'row', gap: 8, marginBottom: 28 },
  star:       { fontSize: 40, color: COLORS.border },
  starActive: { color: '#FFB800' },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  scoreItem:  { alignItems: 'center' },
  scoreValue: { fontSize: 24, fontWeight: '800', color: COLORS.primary, marginBottom: 4 },
  scoreLabel: { fontSize: 12, color: COLORS.darkGray },
  divider:    { width: 1, backgroundColor: COLORS.border },
  encouragement: {
    fontSize: 15,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  nextBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  nextBtnSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  nextBtnTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: COLORS.cream,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  secondaryBtnIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
});