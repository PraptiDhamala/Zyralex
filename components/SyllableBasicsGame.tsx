// components/SyllableBasicsGame.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DRUM_ASSETS, REALISTIC_SUBJECTS } from '../constants/imageMap';
import { SYLLABLE_DATA } from '../data/lessonPractice';
import { speakWord } from '../services/speech';

const { width, height } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

export default function SyllableBasicsGame({ onComplete, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const currentData = SYLLABLE_DATA[currentIndex];
  const totalQuestions = SYLLABLE_DATA.length;

  const contentScale = useRef(new Animated.Value(0.9)).current;
  const slideCelebration = useRef(new Animated.Value(-height)).current;

  useEffect(() => {
    if (isGameFinished) return;
    setSelectedAnswer(null);
    setIsCorrect(false);

    contentScale.setValue(0.9);
    Animated.spring(contentScale, {
      toValue: 1,
      tension: 50,
      friction: 6,
      useNativeDriver: true,
    }).start();

    speakWord(currentData.audioPrompt);
  }, [currentIndex, isGameFinished]);

  useEffect(() => {
    if (isGameFinished) {
      speakWord("Spectacular rhythm! You are an official Syllable Rhythm Master!");
      Animated.spring(slideCelebration, {
        toValue: 0,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  }, [isGameFinished]);

  const handleDrumTap = (num: number) => {
    if (isCorrect) return;
    setSelectedAnswer(num);

    if (num === currentData.syllablesCount) {
      setIsCorrect(true);
      speakWord(`That's right! ${currentData.word} has ${num} ${num === 1 ? 'beat' : 'beats'}: ${currentData.breakdown}!`);
    } else {
      speakWord(`Let's try that rhythm again! Listen closely to the beats.`);
      setTimeout(() => setSelectedAnswer(null), 1200);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  const cleanClueText = currentData?.meaningClue 
    ? currentData.meaningClue.substring(currentData.meaningClue.indexOf(" ") + 1)
    : "";

  const lookupKey = currentData?.word?.toUpperCase();
  const mainSubjectImage = REALISTIC_SUBJECTS[lookupKey];

  return (
    // Safe outer view wrapper ensures the ScrollView occupies the true screen height bounds
    <View style={s.safeContainer}>
      <ScrollView 
        style={s.scrollContainer} 
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        keyboardShouldPersistTaps="handled"
      >
        {!isGameFinished && (
          <Animated.View style={[s.innerWrapper, { transform: [{ scale: contentScale }] }]}>
            {/* Header Progress Area */}
            <View style={s.headerRow}>
              <Text style={s.progressBadge}>Rhythm: {currentIndex + 1}/{totalQuestions}</Text>
              <TouchableOpacity style={s.closeBtn} onPress={onClose}>
                <Text style={s.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Core Card Section */}
            <View style={s.questionCard}>
              <Image 
                source={mainSubjectImage} 
                style={s.heroRender} 
                resizeMode="contain" 
              />
              
              <Text style={s.mainWord}>{isCorrect ? currentData.breakdown : currentData.word}</Text>
              <Text style={s.clueText}>{cleanClueText}</Text>
            </View>

            <Text style={s.instructionText}>Tap the drums to count the beats!</Text>

            {/* Interactive Input Rows */}
            <View style={s.drumContainer}>
              {[1, 2, 3].map((num) => {
                const isCurrentSelection = selectedAnswer === num;
                const isWrongSelection = isCurrentSelection && !isCorrect;

                return (
                  <TouchableOpacity
                    key={num}
                    activeOpacity={0.8}
                    onPress={() => handleDrumTap(num)}
                    style={[
                      s.drumPad,
                      isCurrentSelection && s.drumSelected,
                      isWrongSelection && s.drumWrong,
                      isCorrect && currentData.syllablesCount === num && s.drumCorrect
                    ]}
                  >
                    <Image source={DRUM_ASSETS.ACTIVE} style={s.inputDrumAsset} />
                    
                    <View style={s.circleBadge}>
                      <Text style={s.drumNumberText}>{num}</Text>
                    </View>
                    <Text style={s.beatLabel}>{num === 1 ? "1 Beat" : `${num} Beats`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Navigation Action Control Footer */}
            <View style={s.actionRow}>
              {isCorrect && (
                <TouchableOpacity style={s.nextBtn} onPress={handleNext}>
                  <Text style={s.nextBtnText}>Next Rhythm Drum 🎵</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}

        {/* Celebration Window */}
        {isGameFinished && (
          <Animated.View style={[s.celebrationSheet, { transform: [{ translateY: slideCelebration }] }]}>
            <Text style={s.trophy}>🏆 🌟 🎶</Text>
            <Text style={s.title}>Rhythm Master!</Text>
            <Text style={s.sub}>You perfectly identified all {totalQuestions} syllable sounds today!</Text>

            <View style={s.bonusCard}>
              <Text style={s.starIcon}>⚡</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.bonusTitle}>Golden Ear Unlocked</Text>
                <Text style={s.bonusMeta}>Fantastic listening precision for phonetic partitions.</Text>
              </View>
            </View>

            <TouchableOpacity style={s.finalBtn} onPress={onComplete}>
              <Text style={s.finalBtnText}>Finish Journey! 🚀</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  // The magic bullet fix: Forces full screen layout context constraint
  safeContainer: { flex: 1, backgroundColor: '#FAF5FF' },
  scrollContainer: { flex: 1 },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 60, 
    paddingBottom: 60, 
    alignItems: 'center',
    flexGrow: 1 // 👈 CRITICAL: Tells content wrap to expand dynamically past viewport bounds
  },
  innerWrapper: { width: '100%', alignItems: 'center', gap: 16 },
  
  headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  progressBadge: { fontSize: 13, fontWeight: '700', color: '#7C3AED', backgroundColor: '#F3E8FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, overflow: 'hidden' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E9D5FF' },
  closeText: { fontSize: 16, color: '#A78BFA', fontWeight: 'bold' },
  
  questionCard: { backgroundColor: '#fff', width: '100%', paddingVertical: 20, paddingHorizontal: 24, borderRadius: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E9D5FF', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  heroRender: { width: 160, height: 160, marginBottom: 12, borderRadius: 16 },
  mainWord: { fontSize: 38, fontWeight: '900', color: '#4C1D95', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },

  clueText: { fontSize: 16, fontWeight: '600', color: '#6D28D9', textAlign: 'center', paddingHorizontal: 10, marginTop: 8 },
  instructionText: { fontSize: 15, fontWeight: '700', color: '#6B7280', marginVertical: 4 },
  
  drumContainer: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%' },
  drumPad: { flex: 1, backgroundColor: '#fff', borderWidth: 3, borderColor: '#D8B4FE', borderRadius: 20, paddingVertical: 18, alignItems: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  drumSelected: { borderColor: '#A78BFA', backgroundColor: '#F3E8FF' },
  drumCorrect: { borderColor: '#34D399', backgroundColor: '#D1FAE5' },
  drumWrong: { borderColor: '#F87171', backgroundColor: '#FEE2E2' },
  inputDrumAsset: { width: 56, height: 46, resizeMode: 'contain', marginBottom: 10 },
  circleBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#7C3AED', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  drumNumberText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  beatLabel: { fontSize: 12, fontWeight: '700', color: '#4B5563' },

  actionRow: { width: '100%', minHeight: 60, justifyContent: 'center', marginTop: 8 },
  nextBtn: { backgroundColor: '#A78BFA', width: '100%', paddingVertical: 15, borderRadius: 16, alignItems: 'center', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  nextBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  celebrationSheet: { width: '100%', borderRadius: 24, borderWidth: 1, borderColor: '#E9D5FF', padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginTop: 'auto', marginBottom: 'auto' },
  trophy: { fontSize: 52, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#4C1D95', marginBottom: 6 },
  sub: { fontSize: 13, color: '#7C3AED', textAlign: 'center', marginBottom: 25, paddingHorizontal: 10 },
  bonusCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', padding: 16, borderRadius: 16, width: '100%', marginBottom: 30 },
  starIcon: { fontSize: 28, color: '#8B5CF6' },
  bonusTitle: { fontSize: 14, fontWeight: '700', color: '#5B21B6' },
  bonusMeta: { fontSize: 11, color: '#6D28D9', marginTop: 2 },
  finalBtn: { backgroundColor: '#7C3AED', width: '100%', paddingVertical: 15, borderRadius: 16, alignItems: 'center' },
  finalBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});