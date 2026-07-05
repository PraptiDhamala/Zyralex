// Import the raw data structures exactly as they are defined in your files
import * as beginnerLessons from './beginner/lessonPractice';
import * as beginnerPhonics from './beginner/phonicsData';
import * as beginnerReadAloud from './beginner/readAloudData';

import * as intermediateLessons from './intermediate/lessonPractice';
import * as intermediatePhonics from './intermediate/phonicsData';
import * as intermediateReadAloud from './intermediate/readAloudData';

import * as advancedLessons from './advanced/lessonPractice';
import * as advancedPhonics from './advanced/phonicsData';
import * as advancedReadAloud from './advanced/readAloudData';

// Export the exact matrix matching your app's structure
export const practiceDataMatrix = {
  beginner: {
    // Unwraps the exact 'export const beginnerPhonics' from the file
    phonics: (beginnerPhonics as any).beginnerPhonics || (beginnerPhonics as any).default || beginnerPhonics,
    // Unwraps the exact 'export const beginnerReadAloud' from the file
    readAloud: (beginnerReadAloud as any).beginnerReadAloud || (beginnerReadAloud as any).default || beginnerReadAloud,
    // Unwraps BEGINNER_LESSON_DATA or your fallback configurations safely
    lessons: (beginnerLessons as any).BEGINNER_LESSON_DATA || (beginnerLessons as any).lessonPractice || (beginnerLessons as any).beginnerLessonPractice || (beginnerLessons as any).default || beginnerLessons
  },
  intermediate: {
    // Unwraps the exact 'export const intermediatePhonics' from the file
    phonics: (intermediatePhonics as any).intermediatePhonics || (intermediatePhonics as any).default || intermediatePhonics,
    // Unwraps the exact 'export const intermediateReadAloud' from the file
    readAloud: (intermediateReadAloud as any).intermediateReadAloud || (intermediateReadAloud as any).default || intermediateReadAloud,
    // Unwraps INTERMEDIATE_LESSON_DATA safely
    lessons: (intermediateLessons as any).INTERMEDIATE_LESSON_DATA || (intermediateLessons as any).lessonPractice || (intermediateLessons as any).intermediateLessonPractice || (intermediateLessons as any).default || intermediateLessons
  },
  advanced: {
    // Unwraps the exact 'export const advancedPhonics' from the file
    phonics: (advancedPhonics as any).advancedPhonics || (advancedPhonics as any).default || advancedPhonics,
    // Unwraps the exact 'export const advancedReadAloud' or array map variable from the file
    readAloud: (advancedReadAloud as any).advancedReadAloud || (advancedReadAloud as any).default || advancedReadAloud,
    // Unwraps ADVANCED_LESSON_DATA safely
    lessons: (advancedLessons as any).ADVANCED_LESSON_DATA || (advancedLessons as any).lessonPractice || (advancedLessons as any).advancedLessonPractice || (advancedLessons as any).default || advancedLessons
  }
};