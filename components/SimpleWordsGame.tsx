// components/SimpleWordsGame.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SIMPLE_WORDS_DATA } from '../data/lessonPractice';
import { speakWord } from '../services/speech';

const { width, height } = Dimensions.get('window');

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

export default function SimpleWordsGame({ onComplete, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const currentData = SIMPLE_WORDS_DATA[currentIndex];
  const totalWords = SIMPLE_WORDS_DATA.length;

  // Animation Anchors
  const letterScale = useRef(new Animated.Value(0)).current;
  const slideCelebration = useRef(new Animated.Value(-height)).current;

  // Track dynamic scrambles so they stay stable per question
  const [scrambledPool, setScrambledPool] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  useEffect(() => {
    if (isGameFinished) return;

    // Reset layout states per challenge loop
    setSelectedLetters([]);
    setUsedIndices([]);
    setIsWordComplete(false);
    setScrambledPool([...currentData.scrambled]);

    letterScale.setValue(0);
    Animated.spring(letterScale, {
      toValue: 1,
      tension: 40,
      friction: 5,
      useNativeDriver: true,
    }).start();

    speakWord(currentData.audioPrompt);
  }, [currentIndex, isGameFinished]);

  useEffect(() => {
    if (isGameFinished) {
      speakWord("Incredible job! You are a master of simple words! Keep going to expand your brilliant mind!");
      Animated.spring(slideCelebration, {
        toValue: 0,
        tension: 25,
        friction: 6,
        useNativeDriver: true,
      }).start();
    }
  }, [isGameFinished]);

  const handleLetterTap = (letter: string, index: number) => {
    if (usedIndices.includes(index)) return;

    const nextSelection = [...selectedLetters, letter];
    const nextUsed = [...usedIndices, index];
    
    setSelectedLetters(nextSelection);
    setUsedIndices(nextUsed);
    speakWord(letter.toLowerCase());

    // Check if total matches target length
    if (nextSelection.length === currentData.word.length) {
      const spelledWord = nextSelection.join("");
      
      if (spelledWord === currentData.word) {
        setIsWordComplete(true);
        speakWord(`Sparkly perfect! That spells ${currentData.word}!`);
      } else {
        // Soft error fallback reset
        setTimeout(() => {
          speakWord("Let's shake those blocks and try that word one more time!");
          setSelectedLetters([]);
          setUsedIndices([]);
        }, 1000);
      }
    }
  };

  const handleNextWord = () => {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  return (
    <View style={s.container}>
      {!isGameFinished && (
        <>
          {/* Header Layout Status */}
          <View style={s.headerRow}>
            <Text style={s.progressBadge}>Words Built: {currentIndex}/{totalWords}</Text>
            <TouchableOpacity style={s.closeBtn} onPress={onClose}>
              <Text style={s.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Clue Area Card */}
          <View style={s.clueBox}>
            <Text style={s.clueEmoji}>{currentData.meaningClue.split(" ")[0]}</Text>
            <Text style={s.clueText}>{currentData.meaningClue.substring(currentData.meaningClue.indexOf(" ") + 1)}</Text>
          </View>

          {/* Puzzle Placement Trays */}
          <View style={s.trayRow}>
            {Array.from({ length: currentData.word.length }).map((_, i) => (
              <View key={i} style={[s.slot, isWordComplete && s.slotSuccess]}>
                <Text style={s.slotText}>
                  {selectedLetters[i] || ""}
                </Text>
              </View>
            ))}
          </View>

          {/* Scrambled Interaction Blocks Map */}
          <View style={s.blocksContainer}>
            {scrambledPool.map((letter, index) => {
              const isUsed = usedIndices.includes(index);
              return (
                <Animated.View key={index} style={{ transform: [{ scale: letterScale }] }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={isUsed}
                    style={[s.block, isUsed && s.blockDisabled]}
                    onPress={() => handleLetterTap(letter, index)}
                  >
                    <Text style={[s.blockText, isUsed && s.blockTextDisabled]}>{letter}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Flow Continue Button Trigger */}
          <View style={{ width: '100%', minHeight: 60 }}>
            {isWordComplete && (
              <TouchableOpacity style={s.continueBtn} onPress={handleNextWord}>
                <Text style={s.continueBtnText}>Next Word Journey 🌟</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {/* 🏆 GRAND MILESTONE CELEBRATION OVERLAY */}
      {isGameFinished && (
        <Animated.View style={[s.celebrationSheet, { transform: [{ translateY: slideCelebration }] }]}>
          <Text style={s.trophy}>🏆 ✨ 🪄</Text>
          <Text style={s.title}>Word Architect!</Text>
          <Text style={s.sub}>You built all {totalWords} basic foundational words seamlessly!</Text>

          <View style={s.bonusCard}>
            <Text style={s.starIcon}>🌟</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.bonusTitle}>Super Speller Achievement</Text>
              <Text style={s.bonusMeta}>Unlocked for mastering vowel-consonant combinations</Text>
            </View>
          </View>

          <Text style={s.footerParagraph}>
            Your reading skills are climbing higher! Let's return to our dashboard and open up the awesome <Text style={{fontWeight: '700', color: '#1E40AF'}}>Syllable Basics Challenges</Text>!
          </Text>

          <TouchableOpacity style={s.finalBtn} onPress={onComplete}>
            <Text style={s.finalBtnText}>Claim Your Trophy! 🚀</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF6FF', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 30, alignItems: 'center', justifyContent: 'space-between' },
  headerRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressBadge: { fontSize: 13, fontWeight: '700', color: '#2563EB', backgroundColor: '#DBEAFE', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, overflow: 'hidden' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#BFDBFE' },
  closeText: { fontSize: 16, color: '#6B9EC8', fontWeight: 'bold' },
  clueBox: { backgroundColor: '#fff', width: '100%', padding: 16, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#BFDBFE', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  clueEmoji: { fontSize: 44, marginBottom: 6 },
  clueText: { fontSize: 14, fontWeight: '600', color: '#1E3A5F', textAlign: 'center' },
  trayRow: { flexDirection: 'row', gap: 14, marginVertical: 20 },
  slot: { width: width * 0.18, height: width * 0.20, borderRadius: 16, backgroundColor: '#E0F2FE', borderWidth: 3, borderColor: '#93C5FD', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  slotSuccess: { backgroundColor: '#DCFCE7', borderColor: '#4ADE80', borderStyle: 'solid' },
  slotText: { fontSize: 32, fontWeight: '800', color: '#1E3A5F' },
  blocksContainer: { flexDirection: 'row', gap: 16, justifyContent: 'center', flexWrap: 'wrap', width: '100%', marginVertical: 10 },
  block: { width: width * 0.20, height: width * 0.20, borderRadius: 18, backgroundColor: '#fff', borderWidth: 4, borderColor: '#2563EB', alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  blockDisabled: { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE', elevation: 0, shadowOpacity: 0 },
  blockText: { fontSize: 32, fontWeight: '900', color: '#1E40AF' },
  blockTextDisabled: { color: '#93C5FD' },
  continueBtn: { backgroundColor: '#4ADE80', width: '100%', paddingVertical: 15, borderRadius: 16, alignItems: 'center', shadowColor: '#4ADE80', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  continueBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  
  // Celebration Engine Layouts
  celebrationSheet: { flex: 1, backgroundColor: '#fff', width: '100%', borderRadius: 24, borderWidth: 1, borderColor: '#BFDBFE', padding: 24, alignItems: 'center', justifyContent: 'center' },
  trophy: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#1E3A5F', marginBottom: 6 },
  sub: { fontSize: 13, color: '#6B9EC8', textAlign: 'center', marginBottom: 20, paddingHorizontal: 12 },
bonusCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    backgroundColor: '#FEF3C7', 
    borderWidth: 1, // <-- Changed from borderHorizontalWidth: 0
    borderColor: '#FDE68A', 
    padding: 14, 
    borderRadius: 16, 
    width: '100%', 
    marginBottom: 20 
  },
  starIcon: { fontSize: 30 },
  bonusTitle: { fontSize: 14, fontWeight: '700', color: '#92400E' },
  bonusMeta: { fontSize: 11, color: '#B45309', marginTop: 2 },
  footerParagraph: { fontSize: 13, color: '#4B5563', textAlign: 'center', lineHeight: 22, marginBottom: 25 },
  finalBtn: { backgroundColor: '#2563EB', width: '100%', paddingVertical: 15, borderRadius: 16, alignItems: 'center' },
  finalBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' }
});