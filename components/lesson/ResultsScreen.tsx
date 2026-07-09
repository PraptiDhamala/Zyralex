// components/lesson/ResultsScreen.tsx

import { Lesson } from '@/types/lesson';
import React from 'react';
import {
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
}

export const ResultsScreen: React.FC<Props> = ({
  lessonTitle, score, total, xp, nextLesson, onRetake, onNextLesson,onPractice
}) => {
  const pct   = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
  const earnedXp = Math.round((pct / 100) * xp);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.emoji}>🎉</Text>
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

      {/* Next Lesson — primary button, only if there is one */}
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

      {/* Retake Lesson — secondary button, always shown */}
      <TouchableOpacity
        style={styles.retakeBtn}
        onPress={onRetake}
        activeOpacity={0.8}
      >
        <Text style={styles.retakeBtnText}>🔄 Retake Lesson</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.practiceBtn}
        onPress={onPractice}
        activeOpacity={0.8}
      >
        <Text style={styles.practiceBtnText}>📝 Practice Lesson</Text>
      </TouchableOpacity>

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
  emoji:    { fontSize: 64, marginBottom: 12 },
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
    marginBottom: 12,
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
  retakeBtn: {
    width: '100%',
    backgroundColor: COLORS.cream,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 12,

  },
  retakeBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  practiceBtn: {
  width: '100%',
  backgroundColor: COLORS.primary,
  borderRadius: 14,
  paddingVertical: 16,
  alignItems: 'center',
  marginBottom: 12,
  borderWidth:1.5,
  borderColor:'#fff'

},
practiceBtnText: {
  color: '#fff',
  fontSize: 17,
  fontWeight: '600',
},

});