import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import {
<<<<<<< HEAD
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { SignItem } from '../../constants/lessonData';
=======
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
import { COLORS } from '../../constants/colors';
import { SignItem } from '../../constants/lessonData';

interface Props {
  sign: SignItem;
  index: number;
  total: number;
  onNext: () => void;
}

// Sign Video
const SignVideo: React.FC<{ uri: string }> = ({ uri }) => {
  const player = useVideoPlayer(uri, p => {
    p.loop = true;
    p.play();
  });

  return (
    <VideoView
      player={player}
      style={styles.video}
      contentFit="contain"
      allowsFullscreen={false}
    />
  );
};

export const TeachSlide: React.FC<Props> = ({ sign, index, total, onNext }) => (
  <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
    {/* Sign Counter (3 of 6) */}
    <Text style={styles.counter}>{index + 1} of {total}</Text>

    {/* Big letter label */}
    <Text style={styles.letter}>{sign.label}</Text>

    {/* Sign video */}
    <View style={styles.videoBox}>
      <SignVideo uri={sign.video} />
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