import { useCallback, useEffect, useRef, useState } from 'react';

export interface AttentionMetrics {
  isFacePresent: boolean;
  areEyesOpen: boolean;
  isLookingAtScreen: boolean;
  estimatedReadingDirection: 'Left-to-Right' | 'Static' | 'Distracted';
  attentionScore: number;
}

export const useGazeTracking = () => {
  const [metrics, setMetrics] = useState<AttentionMetrics>({
    isFacePresent: true,
    areEyesOpen: true,
    isLookingAtScreen: true,
    estimatedReadingDirection: 'Static',
    attentionScore: 95,
  });

  const sessionScores = useRef<number[]>([95, 90, 88]);

  // Simulate focus shifts periodically so you can see the Attention Meter and warnings react live!
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        // 90% chance to stay focused, 10% chance to simulate a look-away distraction
        const temporaryDistraction = Math.random() > 0.90;
        
        const newScore = temporaryDistraction 
          ? Math.max(30, Math.round(prev.attentionScore - 25)) 
          : Math.min(100, Math.round(prev.attentionScore + 2));

        sessionScores.current.push(newScore);

        return {
          isFacePresent: true,
          areEyesOpen: true,
          isLookingAtScreen: !temporaryDistraction,
          estimatedReadingDirection: Math.random() > 0.6 ? 'Left-to-Right' : 'Static',
          attentionScore: newScore,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleFaceDetected = useCallback((faces: any[]) => {
    // Gracefully handle empty call from mock preview frame
  }, []);

  const resetSession = useCallback(() => {
    sessionScores.current = [95];
    setMetrics({
      isFacePresent: true,
      areEyesOpen: true,
      isLookingAtScreen: true,
      estimatedReadingDirection: 'Static',
      attentionScore: 95,
    });
  }, []);

  const getEvaluationReport = useCallback(() => {
    const scores = sessionScores.current;
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    
    let feedback = 'Keep Practicing! Remember to scan words from left to right.';
    if (averageScore >= 85) feedback = 'Great job! You followed most phonics perfectly.';
    else if (averageScore >= 65) feedback = 'Good effort! Try to stay focused on each phonics block.';

    return { finalScore: averageScore, feedback };
  }, []);

  return { metrics, handleFaceDetected, getEvaluationReport, resetSession };
};