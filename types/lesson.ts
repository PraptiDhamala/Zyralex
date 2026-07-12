// types/lesson.ts
//sign module
export type SignItem = {
  signId: string;
  label: string;
  image?: string;
  video?: string;
  hint?: string;
  gestureKey?: string;
};

export type Lesson = {
  lessonId: string;      // 'lesson-3'
  lessonUuid: string;    // the real lessons.id uuid needed for user progress
  title: string;
  description: string;
  descriptionpractice: string;
  xp: number;             // total xp
  earnedXp: number;       // earned by user
  completed: boolean;     //different for each user(whether they have completed the lesson or not)
  accuracy: number | null; // lesson's own average camera-practice accuracy
  signs: SignItem[];
};

export type Level = {
  levelId: string;       //'level-1'
  title: string;
  level: number;
  completed: number;     // lessons completed by users in this level
  total: number;         //total lessons
  lessons: Lesson[];
};