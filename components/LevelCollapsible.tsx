import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Level } from '../constants/lessonData';
import { LessonCard } from './LessonCard';
import { COLORS } from '../constants/colors';
import { useRouter } from 'expo-router';

interface LevelCollapsibleProps {
  level: Level ;
}

export const LevelCollapsible: React.FC<LevelCollapsibleProps> = ({ level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>{level.level}</Text>
          </View>
          <View>
            <Text style={styles.levelTitle}>{level.title}</Text>
            <Text style={styles.progress}>
              {level.completed}/{level.total} completed
            </Text>
          </View>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {level.lessons.map((lesson) => (
            <LessonCard
              key={lesson.lessonId}
              lesson={lesson}
              onPress={() => router.push({pathname: '/sign/lesson',params: { levelId: level.levelId, lessonId: lesson.lessonId },})
              }
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.cream,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  progress: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 2,
  },
  expandIcon: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
