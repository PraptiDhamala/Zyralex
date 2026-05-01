export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  xp: number;
  level: number;
}

export interface LessonLevel {
  level: number;
  title: string;
  completed: number;
  total: number;
  lessons: Lesson[];
}

export interface PracticeSession {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  questions: number;
  passed: number;
}

export const LESSON_LEVELS: LessonLevel[] = [
  {
    level: 1,
    title: 'ASL Basics',
    completed: 0,
    total: 3,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Letters A-F',
        description: 'Learn first 6 ASL letters',
        duration: 8,
        xp: 20,
        level: 1,
      },
      {
        id: 'lesson-1-2',
        title: 'Letters G-L',
        description: 'Learn next 6 ASL letters',
        duration: 8,
        xp: 20,
        level: 1,
      },
      {
        id: 'lesson-1-3',
        title: 'Finger Positioning',
        description: 'Perfect your hand shapes',
        duration: 10,
        xp: 25,
        level: 1,
      },
    ],
  },
  {
    level: 2,
    title: 'Common Signs',
    completed: 0,
    total: 2,
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Greetings',
        description: 'Master hello and goodbye signs',
        duration: 9,
        xp: 22,
        level: 2,
      },
      {
        id: 'lesson-2-2',
        title: 'Numbers 1-10',
        description: 'Learn to count in ASL',
        duration: 10,
        xp: 25,
        level: 2,
      },
    ],
  },
];

export const PRACTICE_SESSIONS: PracticeSession[] = [
  {
    id: 'practice-1',
    title: 'Letters A-F Practice',
    description: 'Complete practice sessions to master each lesson',
    difficulty: 'Beginner',
    questions: 5,
    passed: 3,
  },
  {
    id: 'practice-2',
    title: 'Letters G-L Practice',
    description: 'Complete practice sessions to master each lesson',
    difficulty: 'Beginner',
    questions: 5,
    passed: 4,
  },
  {
    id: 'practice-3',
    title: 'Finger Positioning Practice',
    description: 'Complete practice sessions to master each lesson',
    difficulty: 'Beginner',
    questions: 4,
    passed: 3,
  },
];

export const CAMERA_PRACTICE_ITEMS = [
  { id: 'sign-a', label: 'Sign "A"' },
  { id: 'sign-b', label: 'Sign "B"' },
  { id: 'sign-c', label: 'Sign "C"' },
  { id: 'sign-d', label: 'Sign "D"' },
  { id: 'sign-e', label: 'Sign "E"' },
  { id: 'sign-f', label: 'Sign "F"' },
];
