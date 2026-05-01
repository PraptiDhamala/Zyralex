import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { PracticeSession } from '../constants/mockData';
import { COLORS } from '../constants/colors';

interface PracticeSessionCardProps {
  session: PracticeSession;
  onPress?: (event: GestureResponderEvent) => void;
}

export const PracticeSessionCard: React.FC<PracticeSessionCardProps> = ({
  session,
  onPress,
}) => {
  const passPercentage = Math.round((session.passed / session.questions) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.title}>{session.title}</Text>
        <Text style={styles.stats}>
          {session.questions} questions • Pass: {session.passed}/{session.questions}
        </Text>
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
    marginBottom: 6,
  },
  stats: {
    fontSize: 13,
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
