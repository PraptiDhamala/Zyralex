import { Level } from '@/types/lesson';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../constants/colors';
import { LessonCard } from './LessonCard';

interface LevelCollapsibleProps {
  level: Level ;
}

export const LevelCollapsible: React.FC<LevelCollapsibleProps> = ({ level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const isLevelComplete = level.total > 0 && level.completed === level.total;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
         <View style={styles.headerLeft}>
          <View style={[styles.levelBadge, isLevelComplete && styles.levelBadgeComplete]}>
            {isLevelComplete ? (
              <Text style={styles.levelCompleteIcon}>✓</Text>
            ) : (
              <Text style={styles.levelNumber}>{level.level}</Text>
            )}
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.levelTitle}>{level.title}</Text>
              {isLevelComplete && (
                <View style={styles.completeBadge}>
                  <Text style={styles.completeBadgeText}>Completed</Text>
                </View>
              )}
            </View>
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
              onPress={async() =>
                {
                  try {
                    // Save current lesson globally
                    await AsyncStorage.setItem(
                      "currentLesson",
                      JSON.stringify({ levelId: level.levelId, lessonId: lesson.lessonId })
                    );
                  } catch (e) {
                    console.error("Failed to save lesson", e);
                  }
                 router.push({pathname: '/sign/lesson',params: { levelId: level.levelId, lessonId: lesson.lessonId },})
              }}
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

  levelBadgeComplete: {
    backgroundColor: '#28A745',
  },
  levelCompleteIcon: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completeBadge: {
    backgroundColor: '#D4EDDA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  completeBadgeText: {
    color: '#1E7B34',
    fontSize: 10,
    fontWeight: '700',
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