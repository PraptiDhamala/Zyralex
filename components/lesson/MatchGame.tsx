import { SignItem } from '@/types/lesson';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface Props {
  signs: SignItem[];
  onComplete: (score: number, total: number) => void;
}

type MatchState = 'idle' | 'correct' | 'wrong';

export const MatchGame: React.FC<Props> = ({ signs, onComplete }) => {
  // Use first 6 signs max 
  const gameSign = signs.slice(0, 6);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [matched, setMatched]             = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair]         = useState<string | null>(null);
  const [score, setScore]                 = useState(0);

  // Shuffle the label column independently so they don't align
  const [shuffledLabels] = useState(() =>
    [...gameSign].sort(() => Math.random() - 0.5)
  );

  const handleImagePress = (id: string) => {
    if (matched.has(id)) return;
    setSelectedImage(id === selectedImage ? null : id);
  };

  const handleLabelPress = (id: string) => {
    if (!selectedImage || matched.has(id)) return;

    if (selectedImage === id) {
      // Correct match!
      const newMatched = new Set(matched);
      newMatched.add(id);
      setMatched(newMatched);
      setScore(s => s + 1);
      setSelectedImage(null);

      if (newMatched.size === gameSign.length) {
        setTimeout(() => onComplete(score + 1, gameSign.length), 600);
      }
    } else {
      // Wrong — flash red briefly
      setWrongPair(id);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedImage(null);
      }, 800);
    }
  };

  const imageStyle = (id: string) => {
    if (matched.has(id)) return [styles.imageCard, styles.imageMatched];
    if (selectedImage === id) return [styles.imageCard, styles.imageSelected];
    return styles.imageCard;
  };

  const labelStyle = (id: string) => {
    if (matched.has(id)) return [styles.labelCard, styles.labelMatched];
    if (wrongPair === id) return [styles.labelCard, styles.labelWrong];
    return styles.labelCard;
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Match the sign to the letter</Text>
      <Text style={styles.subtitle}>
        Tap a sign image, then tap the matching letter
      </Text>

      <View style={styles.columns}>
        {/* Left column: images (in original order) */}
        <View style={styles.column}>
          {gameSign.map(sign => (
            <TouchableOpacity
              key={sign.signId}
              style={imageStyle(sign.signId)}
              onPress={() => handleImagePress(sign.signId)}
              activeOpacity={matched.has(sign.signId) ? 1 : 0.8}
            >
              {matched.has(sign.signId)
                ? <Text style={styles.checkmark}>✓</Text>
                : <Image source={{ uri: sign.image }} style={styles.matchImage} resizeMode="contain" />
              }
            </TouchableOpacity>
          ))}
        </View>

        {/* Right column: labels (shuffled) */}
        <View style={styles.column}>
          {shuffledLabels.map(sign => (
            <TouchableOpacity
              key={sign.signId}
              style={labelStyle(sign.signId)}
              onPress={() => handleLabelPress(sign.signId)}
              activeOpacity={matched.has(sign.signId) ? 1 : 0.8}
            >
              <Text style={styles.labelText}>{sign.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.progress}>
        {matched.size} / {gameSign.length} matched
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  columns: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  column: {
    flex: 1,
    gap: 10,
  },
  imageCard: {
    height: 72,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSelected: { borderColor: COLORS.primary, borderWidth: 3 },
  imageMatched:  { borderColor: '#28A745', backgroundColor: '#D4EDDA' },
  matchImage: { width: '100%', height: '100%' },
  checkmark: { fontSize: 28, color: '#28A745', fontWeight: '700' },
  labelCard: {
    height: 72,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelMatched: { borderColor: '#28A745', backgroundColor: '#D4EDDA' },
  labelWrong:   { borderColor: '#DC3545', backgroundColor: '#F8D7DA' },
  labelText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.darkGray,
  },
  progress: {
    marginTop: 20,
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
});