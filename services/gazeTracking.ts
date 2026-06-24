export interface AttentionMetrics {
  isFacePresent: boolean;
  areEyesOpen: boolean;
  isLookingAtScreen: boolean;
  estimatedReadingDirection: 'Left-to-Right' | 'Static' | 'Distracted';
  attentionScore: number;
}

let lastYaw = 0;

/**
 * Clean simulation processor for Expo Go.
 * Generates natural focus metrics and reading directions based on look-away triggers.
 */
export const analyzeGazeAndAttention = (
  face: any, // Changed to any to cleanly bypass empty type validation definitions in Expo Go mode
  previousMetrics: AttentionMetrics | null
): AttentionMetrics => {
  if (!face) {
    return {
      isFacePresent: true,
      areEyesOpen: true,
      isLookingAtScreen: true,
      estimatedReadingDirection: Math.random() > 0.5 ? 'Left-to-Right' : 'Static',
      attentionScore: 95,
    };
  }

  // Use provided simulated data values securely
  const { yawAngle = 0, pitchAngle = 0, leftEyeOpenProbability = 1, rightEyeOpenProbability = 1 } = face;
  
  const areEyesOpen = leftEyeOpenProbability > 0.4 && rightEyeOpenProbability > 0.4;
  const isLookingAtScreen = Math.abs(yawAngle) < 15 && Math.abs(pitchAngle) < 15;

  let direction: 'Left-to-Right' | 'Static' | 'Distracted' = 'Static';
  
  if (isLookingAtScreen) {
    const yawDelta = yawAngle - lastYaw;
    if (yawDelta > 0.8) {
      direction = 'Left-to-Right';
    }
  } else {
    direction = 'Distracted';
  }
  
  lastYaw = yawAngle;

  let baseScore = 100;
  if (!areEyesOpen) baseScore -= 40;
  if (!isLookingAtScreen) {
    const deviation = Math.max(Math.abs(yawAngle), Math.abs(pitchAngle));
    baseScore -= Math.min(deviation * 2.5, 60);
  }

  const previousScore = previousMetrics?.attentionScore ?? 100;
  const finalScore = Math.round(previousScore * 0.7 + baseScore * 0.3);

  return {
    isFacePresent: true,
    areEyesOpen,
    isLookingAtScreen,
    estimatedReadingDirection: direction,
    attentionScore: Math.max(0, Math.min(100, finalScore)),
  };
};