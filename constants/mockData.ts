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
  { id: 'sign-a', label: 'A-F!', lessonId: 'lesson-1',levelId:'level-1' },
  { id: 'sign-b', label: 'G-L', lessonId: 'lesson-2',levelId:'level-1' },
  { id: 'sign-c', label: 'M-R', lessonId: 'lesson-3',levelId:'level-1' },
  { id: 'sign-d', label: 'S-Z', lessonId: 'lesson-4',levelId:'level-1' },
  { id: 'sign-e', label: '1-10', lessonId: 'lesson-5',levelId:'level-1' },
  { id: 'sign-f', label: 'Sign F', lessonId: 'lesson-6',levelId:'level-1' },
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

