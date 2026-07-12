import { Lesson } from '@/types/lesson';
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface LessonCardProps {
  lesson: Lesson;
  onPress?: (event: GestureResponderEvent) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, lesson.completed && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{lesson.title}</Text>
          {lesson.completed && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>✓ Done</Text>
            </View>
          )}
        </View>
        <Text style={styles.description}>{lesson.description}</Text>
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>⭐ {lesson.xp} XP</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.moreButton, lesson.completed && styles.moreButtonCompleted]}>
        <Text style={styles.moreButtonText}>{lesson.completed ? '✓' : '•••'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardCompleted: {
    backgroundColor: '#F3FBF5',
    borderColor: '#28A745',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  doneBadge: {
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  doneBadgeText: {
    color: '#1E7B34',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  description: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  moreButtonCompleted: {
    backgroundColor: '#28A745',
  },
  moreButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});