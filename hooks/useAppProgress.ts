// hooks/useAppProgress.ts
import { useState } from "react"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert"
export type FeatureStep = "LESSON_PRACTICE" | "READ_ALOUD" | "PHONICS" | "COMPLETED"

export function useAppProgress() {
  // 1. Global state indicators
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>("beginner")
  const [currentFeatureStep, setCurrentFeatureStep] = useState<FeatureStep>("LESSON_PRACTICE")
  
  // 2. The "Learn Gate" check variables
  const [learnCompletedLevels, setLearnCompletedLevels] = useState<Record<DifficultyLevel, boolean>>({
    beginner: false, // Set to true manually or via backend once they finish the Learn module
    intermediate: false,
    advanced: false,
    expert: false,
  })

  // 3. Keep track of inside-feature completion counts
  const [wordsCompletedCount, setWordsCompletedCount] = useState(5) // matches your current UI placeholder

  // Helper validation: Is the learn tab finished for the selected level?
  const isLearnGatePassed = (level: DifficultyLevel): boolean => {
    return learnCompletedLevels[level]
  }

  // Linear Flow controller: Moves the user down the component list systematically
  const advanceToNextFeature = () => {
    if (currentFeatureStep === "LESSON_PRACTICE") {
      setCurrentFeatureStep("READ_ALOUD")
    } else if (currentFeatureStep === "READ_ALOUD") {
      setCurrentFeatureStep("PHONICS")
    } else if (currentFeatureStep === "PHONICS") {
      setCurrentFeatureStep("COMPLETED")
      // Level entirely cleared! Ready to unlock intermediate when they choose
    }
  }

  // Force simulation utility to complete the Learn module for debugging/testing
  const debugCompleteLearnModule = (level: DifficultyLevel) => {
    setLearnCompletedLevels(prev => ({ ...prev, [level]: true }))
  }

  return {
    currentLevel,
    setCurrentLevel,
    currentFeatureStep,
    setCurrentFeatureStep,
    isLearnGatePassed,
    advanceToNextFeature,
    wordsCompletedCount,
    setWordsCompletedCount,
    debugCompleteLearnModule,
  }
}