// Import the raw data structures exactly as they are defined in your files
import * as beginnerPhonics from './beginner/phonicsData';
import * as beginnerReadAloud from './beginner/readAloudData';
import * as beginnerLessons from './beginner/lessonPractice';

import * as intermediatePhonics from './intermediate/phonicsData';
import * as intermediateReadAloud from './intermediate/readAloudData';
import * as intermediateLessons from './intermediate/lessonPractice';

import * as advancedPhonics from './advanced/phonicsData';
import * as advancedReadAloud from './advanced/readAloudData';
import * as advancedLessons from './advanced/lessonPractice';

// Export the exact matrix matching your app's structure
export const practiceDataMatrix = {
  beginner: {
    phonics: (beginnerPhonics as any).phonicsData || (beginnerPhonics as any).default || beginnerPhonics,
    readAloud: (beginnerReadAloud as any).readAloudData || (beginnerReadAloud as any).default || beginnerReadAloud,
    lessons: (beginnerLessons as any).lessonPractice || (beginnerLessons as any).default || beginnerLessons
  },
  intermediate: {
    phonics: (intermediatePhonics as any).phonicsData || (intermediatePhonics as any).default || intermediatePhonics,
    readAloud: (intermediateReadAloud as any).readAloudData || (intermediateReadAloud as any).default || intermediateReadAloud,
    lessons: (intermediateLessons as any).lessonPractice || (intermediateLessons as any).default || intermediateLessons
  },
  advanced: {
    phonics: (advancedPhonics as any).phonicsData || (advancedPhonics as any).default || advancedPhonics,
    readAloud: (advancedReadAloud as any).readAloudData || (advancedReadAloud as any).default || advancedReadAloud,
    lessons: (advancedLessons as any).lessonPractice || (advancedLessons as any).default || advancedLessons
  }
};