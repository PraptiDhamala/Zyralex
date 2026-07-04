// components/LetterRecognitionGame.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { speakWord } from '../services/speech';

const { width, height } = Dimensions.get('window');

type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface Props {
  level: DifficultyLevel;
  data: any;
  onComplete: () => void;
  onClose: () => void;
}

export default function LetterRecognitionGame({ level, data, onComplete, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Safely grab game content directly from passed dynamic data matrix
  const gameDataList = data?.letterRecognition || [];
  const totalQuestions = gameDataList.length;
  const currentData = gameDataList[currentIndex] || { targetLetter: '', audioPrompt: '', options: [] };

  // Animation values
  const bubbleScale = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-height)).current; 

  // Trigger bubble entry layout animations
  useEffect(() => {
    if (isFinished || totalQuestions === 0) return;

    bubbleScale.setValue(0);
    textFade.setValue(0);

    Animated.parallel([
      Animated.spring(bubbleScale, {
        toValue: 1,
        tension: 45,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(textFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();

    if (currentData?.audioPrompt) {
      speakWord(currentData.audioPrompt);
    }
  }, [currentIndex, isFinished, totalQuestions]);

  // Handle Celebration Modal Animation Slide-in
  useEffect(() => {
    if (isFinished) {
      speakWord("Congratulations! You completed the bubble challenge! Let's try some simple words practice next!");
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [isFinished]);

  const handlePop = (letter: string) => {
    if (letter === currentData.targetLetter) {
      speakWord("Good job!");
      setScore(prev => prev + 1);
      
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    } else {
      speakWord(`That is ${letter}. Try looking for ${currentData.targetLetter}!`);
    }
  };

  if (totalQuestions === 0) {
    return (
      <View style={s.container}>
        <Text style={s.instruction}>No practice content available for this level.</Text>
        <TouchableOpacity style={s.actionBtn} onPress={onClose}>
          <Text style={s.actionBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {/* MAIN GAME INTERFACE CONTENT */}
      {!isFinished && (
        <>
          <View style={s.headerRow}>
            <Text style={s.scoreText}>Bubbles Popped: {score}/{totalQuestions}</Text>
            <TouchableOpacity style={s.closeBtn} onPress={onClose}>
              <Text style={s.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[s.contentBox, { opacity: textFade }]}>
            <Text style={s.instruction}>Tap the bubble that matches:</Text>
            <Text style={s.targetLetter}>{currentData.targetLetter?.toUpperCase()}</Text>
          </Animated.View>

          <View style={s.bubbleContainer}>
            {(currentData.options || []).map((letter: string, index: number) => (
              <Animated.View 
                key={index} 
                style={{ transform: [{ scale: bubbleScale }] }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={s.bubble}
                  onPress={() => handlePop(letter)}
                >
                  <Text style={s.bubbleText}>{letter?.toUpperCase()}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          
          <Text style={s.progressText}>
            Progress Track: {currentIndex + 1} / {totalQuestions}
          </Text>
        </>
      )}

      {/* 🎉 REWARD CELEBRATION MODAL OVERLAY SHEET */}
      {isFinished && (
        <Animated.View style={[s.celebrationCard, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={s.fireworks}>🎉 🌟 🏆</Text>
          <Text style={s.celebrationTitle}>Amazing Job!</Text>
          <Text style={s.celebrationSub}>You popped all {totalQuestions} letter bubbles perfectly!</Text>
          
          <View style={s.badgeBox}>
            <Text style={s.badgeEmoji}>🏅</Text>
            <View>
              <Text style={s.badgeName}>Letter Master Badge</Text>
              <Text style={s.badgeMeta}>Unlocked for identifying A-Z shapes</Text>
            </View>
          </View>

          <Text style={s.nextStepsBody}>
            You are ready for the next level adventure! Let's head over and check out the <Text style={{fontWeight: '700', color: '#1E40AF'}}>Simple Words Practice</Text> to string letters together!
          </Text>

          <TouchableOpacity style={s.actionBtn} onPress={onComplete}>
            <Text style={s.actionBtnText}>Let's Advance! 🚀</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreText: { fontSize: 13, fontWeight: '700', color: '#1E40AF', backgroundColor: '#DBEAFE', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, overflow: 'hidden' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#BFDBFE' },
  closeText: { fontSize: 16, color: '#6B9EC8', fontWeight: 'bold' },
  contentBox: { alignItems: 'center' },
  instruction: { fontSize: 16, fontWeight: '500', color: '#6B9EC8', marginBottom: 5 },
  targetLetter: { fontSize: 100, fontWeight: '900', color: '#2563EB', letterSpacing: 2 },
  bubbleContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 20, width: '100%' },
  bubble: { width: width * 0.38, height: width * 0.38, borderRadius: (width * 0.38) / 2, backgroundColor: '#fff', borderWidth: 5, borderColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  bubbleText: { fontSize: 48, fontWeight: '800', color: '#1E3A5F' },
  progressText: { color: '#6B9EC8', fontSize: 12, fontWeight: '600', backgroundColor: '#fff', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E0F2FE' },
  celebrationCard: { flex: 1, backgroundColor: '#fff', width: '100%', borderRadius: 24, borderWidth: 1, borderColor: '#BFDBFE', padding: 24, alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  fireworks: { fontSize: 44, marginBottom: 15 },
  celebrationTitle: { fontSize: 26, fontWeight: '800', color: '#1E3A5F', marginBottom: 8 },
  celebrationSub: { fontSize: 14, color: '#6B9EC8', textAlign: 'center', marginBottom: 25, paddingHorizontal: 10 },
  badgeBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 16, width: '100%', marginBottom: 25 },
  badgeEmoji: { fontSize: 32 },
  badgeName: { fontSize: 14, fontWeight: '700', color: '#92400E' },
  badgeMeta: { fontSize: 11, color: '#B45309', marginTop: 1 },
  nextStepsBody: { fontSize: 13, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginBottom: 30, paddingHorizontal: 8 },
  actionBtn: { backgroundColor: '#2563EB', width: '100%', paddingVertical: 15, borderRadius: 16, alignItems: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  actionBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});