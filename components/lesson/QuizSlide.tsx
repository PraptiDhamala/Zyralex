import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SignItem } from '../../constants/lessonData';
import { COLORS } from '../../constants/colors';

interface Props {
    signs: SignItem[];
    currentSign: SignItem;
    quizType: 'whatSign' | 'whichImage';
    onAnswer: (correct: boolean) => void;
}

// Pick 3 wrong options from signs (excluding the correct one)
function getOptions(signs: SignItem[], correct: SignItem): SignItem[] {
  const others = signs.filter(s => s.signId !== correct.signId);
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
  const all = [...shuffled, correct].sort(() => Math.random() - 0.5);
  return all;
}

export const QuizSlide: React.FC<Props> = ({
  signs, currentSign, quizType, onAnswer,
}) => {
  const [options, setOptions]       = useState<SignItem[]>([]);
  const [selected, setSelected]     = useState<string | null>(null);
  const [answered, setAnswered]     = useState(false);

  // Regenerate options whenever the question changes
  useEffect(() => {
    setOptions(getOptions(signs, currentSign));
    setSelected(null);
    setAnswered(false);
  }, [currentSign.signId, quizType]);

  const handleSelect = (option: SignItem) => {
    if (answered) return;
    setSelected(option.signId);
    setAnswered(true);
    const isCorrect = option.signId === currentSign.signId;
    onAnswer(isCorrect);
  };

  const isCorrectOption = (opt: SignItem) => opt.signId === currentSign.signId;
  const isSelected = (opt: SignItem) => opt.signId === selected;

  const optionStyle = (opt: SignItem) => {
    if (!answered) return styles.option;
    if (isCorrectOption(opt)) return [styles.option, styles.optionCorrect];
    if (isSelected(opt) && !isCorrectOption(opt)) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDim];
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      {/* Type A: Show the video, pick the meaning */}
      {quizType === 'whatSign' && (
        <>
          <Text style={styles.question}>What does this sign show?</Text>
          <View style={styles.videoBox}>
             <Video source={{ uri: currentSign.video }} style={styles.video} resizeMode={ResizeMode.CONTAIN} 
                shouldPlay // Auto-plays the video 
                isLooping //Loops the video
                /> 
          </View>
          <View style={styles.optionGrid}>
            {options.map(opt => (
              <TouchableOpacity
                key={opt.signId}
                style={optionStyle(opt)}
                onPress={() => handleSelect(opt)}
                activeOpacity={0.75}
              >
                <Text style={styles.optionLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Type B: Show the meaning, pick the sign*/}
      {quizType === 'whichImage' && (
        <>
          <Text style={styles.question}>Which sign is correct? </Text>
          <Text style={styles.bigLetter}>{currentSign.label}</Text>
          <View style={styles.videoGrid}>
            {options.map(opt => (
              <TouchableOpacity
                key={opt.signId}
                style={[styles.videoOption, answered && isCorrectOption(opt) && styles.videoOptionCorrect,
                  answered && isSelected(opt) && !isCorrectOption(opt) && styles.videoOptionWrong]}
                onPress={() => handleSelect(opt)}
                activeOpacity={0.75}
              >
                 <Video source={{ uri: opt.video }} style={styles.video} resizeMode={ResizeMode.CONTAIN} 
                    shouldPlay // Auto-plays the video 
                    isLooping //Loops the video
                    /> 
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  question: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  videoBox: {
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 28,
  },
  video: { width: '100%', height: '100%' },
  bigLetter: {
    fontSize: 80,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 24,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  option: {
    width: '45%',
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: COLORS.cream,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  optionCorrect: {
    backgroundColor: '#D4EDDA',
    borderColor: '#28A745',
  },
  optionWrong: {
    backgroundColor: '#F8D7DA',
    borderColor: '#DC3545',
  },
  optionDim: {
    opacity: 0.45,
  },
  optionLabel: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.darkGray,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
  },
  videoOption: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
    backgroundColor: COLORS.cream,
  },
  videoOptionCorrect: { borderColor: '#28A745', borderWidth: 3 },
  videoOptionWrong:   { borderColor: '#DC3545', borderWidth: 3 },
  optionVideo: { width: '100%', height: '100%' },
});