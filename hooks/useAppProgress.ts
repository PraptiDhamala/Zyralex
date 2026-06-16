// hooks/useAppProgress.ts
import { useState } from "react"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert"
export type FeatureStep = "LESSON_PRACTICE" | "READ_ALOUD" | "PHONICS" | "COMPLETED"

export function useAppProgress() {
  // 1. Global state indicators — Defaulted to COMPLETED to unlock all UI sub-sections immediately
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>("beginner")
  const [currentFeatureStep, setCurrentFeatureStep] = useState<FeatureStep>("COMPLETED")
  
  // 2. The "Learn Gate" check variables — All levels set to true so nothing blocks difficulty changes
  const [learnCompletedLevels, setLearnCompletedLevels] = useState<Record<DifficultyLevel, boolean>>({
    beginner: true, 
    intermediate: true,
    advanced: true,
    expert: true,
  })

  // 3. Keep track of inside-feature completion counts
  const [wordsCompletedCount, setWordsCompletedCount] = useState(5) // matches your current UI placeholder

  // Helper validation: Returns true by default now so the Learn Gate checks pass seamlessly
  const isLearnGatePassed = (level: DifficultyLevel): boolean => {
    return learnCompletedLevels[level]
  }

  // Linear Flow controller: Kept intact for progression logic if needed
  const advanceToNextFeature = () => {
    if (currentFeatureStep === "LESSON_PRACTICE") {
      setCurrentFeatureStep("READ_ALOUD")
    } else if (currentFeatureStep === "READ_ALOUD") {
      setCurrentFeatureStep("PHONICS")
    } else if (currentFeatureStep === "PHONICS") {
      setCurrentFeatureStep("COMPLETED")
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