export interface PracticeSession {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  questions: number;
  passed: number;
}

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

export const USER_STATS = {
  dayStreak: 7,
  bestScore: 92,
  improvement: 15,
};

export const AI_TIPS = [
  {
    id: '1',
    title: 'Practice Daily',
    description:
      'Even 10 minutes of daily practice dramatically improves your sign language retention. Consistency beats long sessions!',
  },
  {
    id: '2',
    title: 'Focus on Handshape',
    description:
      'The most common mistake beginners make is incorrect handshapes. Take your time to get the shape right before adding movement.',
  },
  {
    id: '3',
    title: 'Use a Mirror',
    description:
      'Practicing in front of a mirror helps you see what a deaf person sees when you sign, improving your accuracy significantly.',
  },
  {
    id: '4',
    title: 'Learn in Context',
    description:
      'Try to learn signs in phrases and sentences rather than isolated words. It helps with memory and real-world usage.',
  },
  {
    id: '5',
    title: 'Watch Native Signers',
    description:
      'Watching videos of native ASL signers helps you pick up natural rhythm, facial expressions, and fluency cues.',
  },
];

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  completed: boolean;
};

export type LessonLevel = {
  id: string;
  title: string;
  level: number;
  completed: number;
  total: number;
  lessons: Lesson[];
};

export const LESSON_LEVELS: LessonLevel[] = [
  {
    id: 'level-1',
    title: 'ASL Basics',
    level: 1,
    completed:1,
    total:8,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Letters A-F',
        description: 'Learn first 6 ASL letters',
        duration: '8 min',
        xp: 20,
        completed: false,
      },
      {
        id: 'lesson-2',
        title: 'Letters G-L',
        description: 'Learn next 6 ASL letters',
        duration: '8 min',
        xp: 20,
        completed: false,
      },
      {
        id: 'lesson-3',
        title: 'Finger Positioning',
        description: 'Perfect your hand shapes',
        duration: '10 min',
        xp: 25,
        completed: false,
      },
    ],
  },
  {
    id: 'level-2',
    title: 'Common Signs',
    level: 2,
    completed:6,
    total:8,
    lessons: [
      {
        id: 'lesson-4',
        title: 'Greetings',
        description: 'Learn hello, goodbye, thank you',
        duration: '10 min',
        xp: 30,
        completed: false,
      },
      {
        id: 'lesson-5',
        title: 'Numbers 1-10',
        description: 'Count from 1 to 10 in ASL',
        duration: '8 min',
        xp: 25,
        completed: false,
      },
      {
        id: 'lesson-6',
        title: 'Colors',
        description: 'Learn basic color signs',
        duration: '12 min',
        xp: 30,
        completed: false,
      },
    ],
  },
  {
    id: 'level-3',
    title: 'Conversations',
    level: 3,
    completed:3,
    total:8,
    lessons: [
      {
        id: 'lesson-7',
        title: 'Introductions',
        description: 'Introduce yourself in ASL',
        duration: '15 min',
        xp: 40,
        completed: false,
      },
      {
        id: 'lesson-8',
        title: 'Family Signs',
        description: 'Learn family member signs',
        duration: '12 min',
        xp: 35,
        completed: false,
      },
    ],
  },
];