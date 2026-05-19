import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SignItem } from '../../constants/lessonData';

interface Props {
    sign: SignItem;
    index: number;
    total: number;
    onNext: () => void;
}

export const TeachSlide: React.FC<Props>=({ sign, index, total, onNext }) => (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
    {/* Sign Counter(3 of 6)*/}
    <Text style={styles.counter}> {index+1} of {total} </Text>

    {/* Big letter label */}
    <Text style={styles.letter}>{sign.label}</Text>

    {/* Sign video from dataset */}
    <View style={styles.videoBox}> 
    <Video source={sign.video} style={styles.video} resizeMode={ResizeMode.CONTAIN} 
    shouldPlay // Auto-plays the video 
    isLooping //Loops the video
    /> 
    </View>

    {/* Tip box */}
    <View style={styles.hintBox}>
      <Text style={styles.hintTitle}>💡 How to sign it</Text>
      <Text style={styles.hintText}>{sign.hint}</Text>
    </View>

    {/* Next / Finish teaching button */}
    <TouchableOpacity style={styles.nextBtn} onPress={onNext} activeOpacity={0.8}>
      <Text style={styles.nextBtnText}>
        {index < total - 1 ? 'Next Sign →' : 'Start Quiz!'}
      </Text>
    </TouchableOpacity>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  counter: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  letter: {
    fontSize: 72,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
  },
  videoBox: {
    width: 260,
    height: 260,
    borderRadius: 20,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  hintBox: {
    width: '100%',
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 6,
  },
  hintText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
