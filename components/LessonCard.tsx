import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { Lesson } from '../constants/lessonData';

interface LessonCardProps {
  lesson: Lesson;
  onPress?: (event: GestureResponderEvent) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>⏱ {lesson.duration} min</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>⭐ {lesson.xp} XP</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>•••</Text>
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
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 4,
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
  moreButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
