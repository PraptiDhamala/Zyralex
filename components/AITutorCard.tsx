import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../constants/colors';
import { AI_TIPS } from '../constants/mockData';

export function AITutorCard() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const currentTip = AI_TIPS[currentTipIndex];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % AI_TIPS.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tutorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
          <View>
            <Text style={styles.title}>AI Tutor</Text>
            <Text style={styles.subtitle}>Personalized for you</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDismiss}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.tipHeader}>
          <Text style={styles.tipTitle}>🎯 {currentTip.title}</Text>
        </View>
        <Text style={styles.tipText}>{currentTip.description}</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentTipIndex + 1) / AI_TIPS.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextTip}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>Next Tip →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tutorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  closeButton: {
    fontSize: 24,
    color: COLORS.textLight,
    fontWeight: '300',
    width: 24,
    textAlign: 'center',
  },
  content: {
    marginBottom: 12,
  },
  tipHeader: {
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tipText: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 10,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  footer: {
    alignItems: 'flex-end',
  },
  nextButton: {
    paddingVertical: 6,
  },
  nextButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
