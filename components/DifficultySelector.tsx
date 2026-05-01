import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../constants/colors';

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
}

const DIFFICULTIES: DifficultyLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Difficulty Level</Text>
        <Text style={styles.aiLabel}>AI Optimized</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {DIFFICULTIES.map((difficulty) => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.button,
              selectedDifficulty === difficulty && styles.buttonSelected,
            ]}
            onPress={() => onSelectDifficulty(difficulty)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedDifficulty === difficulty && styles.buttonTextSelected,
              ]}
            >
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  aiLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontStyle: 'italic',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    gap: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  buttonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  buttonTextSelected: {
    color: COLORS.white,
  },
});
