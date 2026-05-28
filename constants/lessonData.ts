// constants/lessonData
export type SignItem={
  signId: string;
  label: string; //"A","B","1"
  image: any;
  video: any;
  hint: string;
  gestureKey: string; 
}
export type Lesson = {
  lessonId: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  completed: boolean;
  signs: SignItem[];
};

export type Level = {
  levelId: string;
  title: string;
  level: number;
  completed: number;
  total: number;
  lessons: Lesson[];
};

const CLOUD = 'https://res.cloudinary.com/dp53zinbe';

// helpers
const aslVideo = (name: string) =>
  `https://res.cloudinary.com/dp53zinbe/video/upload/${name}.mp4`;

const aslImage = (name: string) =>
  `https://res.cloudinary.com/dp53zinbe/image/upload/${name}.jpg`;

export const LESSON_LEVELS: Level[] = [
// Level 1
  {
    levelId: 'level-1',
    title: 'Alphabets and Numbers',
    level: 1,
    completed:0,
    total:5,
    lessons: [
    {
      lessonId: 'lesson-1',
      title: 'Letters A – F',
      description: 'Learn the first 6 letters of ASL',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
<<<<<<< HEAD
        { signId: 'a', label: 'A', image: aslImage('a'), video: aslVideo('a'), hint: 'Make a fist with your thumb resting on the side.' },
        { signId: 'b', label: 'B', image: aslImage('b'), video: aslVideo('b'), hint: 'Hold four fingers straight up, thumb tucked across palm.' },
        { signId: 'c', label: 'C', image: aslImage('c'), video: aslVideo('c'), hint: 'Curve your hand like the letter C.' },
        { signId: 'd', label: 'D', image: aslImage('d'), video: aslVideo('d'), hint: 'Index finger up, other fingers touch the thumb.' },
        { signId: 'e', label: 'E', image: aslImage('e'), video: aslVideo('e'), hint: 'Curl all fingers down, thumb tucked under.' },
        { signId: 'f', label: 'F', image: aslImage('f'), video: aslVideo('f'), hint: 'Index finger and thumb touch, other three fingers up.' },
=======
        { signId: 'a', label: 'A', image: require('../dataset/images/alphabet/a.jpg'), video: require('../dataset/videos/alphabet/a.mp4'), hint: 'Make a fist with your thumb resting on the side.', gestureKey: 'fist_thumb_side' },
        { signId: 'b', label: 'B', image: require('../dataset/images/alphabet/b.jpg'), video: require('../dataset/videos/alphabet/b.mp4'), hint: 'Hold four fingers straight up, thumb tucked across palm.',gestureKey: 'four_fingers_up_thumb_across' },
        { signId: 'c', label: 'C', image: require('../dataset/images/alphabet/c.jpg'), video: require('../dataset/videos/alphabet/c.mp4'), hint: 'Curve your hand like the letter C.',gestureKey:'curved_hand_c_shape' },
        { signId: 'd', label: 'D', image: require('../dataset/images/alphabet/d.jpg'), video: require('../dataset/videos/alphabet/d.mp4'), hint: 'Index finger up, other fingers touch the thumb.',gestureKey:'index_up_rest_touch_thumb' },
        { signId: 'e', label: 'E', image: require('../dataset/images/alphabet/e.jpg'), video: require('../dataset/videos/alphabet/e.mp4'), hint: 'Curl all fingers down, thumb tucked under.',gestureKey:'fingers_curled_thumb_under' },
        { signId: 'f', label: 'F', image: require('../dataset/images/alphabet/f.jpg'), video: require('../dataset/videos/alphabet/f.mp4'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      ],
    },
    {
      lessonId: 'lesson-2',
      title: 'Letters G – L',
      description: 'Learn the next 6 letters of ASL',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
<<<<<<< HEAD
        { signId: 'g', label: 'G', image: aslImage('g'), video: aslVideo('g'), hint: 'Index finger and thumb point sideways.' },
        { signId: 'h', label: 'H', image: aslImage('h'), video: aslVideo('h'), hint: 'Index and middle finger point sideways together.' },
        { signId: 'i', label: 'I', image: aslImage('i'), video: aslVideo('i'), hint: 'Pinky finger up, others in a fist.' },
        { signId: 'j', label: 'J', image: aslImage('j'), video: aslVideo('j'), hint: 'Like I, but trace a J in the air with your pinky.' },
        { signId: 'k', label: 'K', image: aslImage('k'), video: aslVideo('k'), hint: 'Index up, middle angled out, thumb between them.' },
        { signId: 'l', label: 'L', image: aslImage('l'), video: aslVideo('l'), hint: 'Index up, thumb out — like an L shape.' },
=======
        { signId: 'g', label: 'G', image: require('../dataset/images/alphabet/g.jpg'), video: require('../dataset/videos/alphabet/g.mp4'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'h', label: 'H', image: require('../dataset/images/alphabet/h.jpg'), video: require('../dataset/videos/alphabet/h.mp4'), hint: 'Index and middle finger point sideways together.',gestureKey:'index_middle_sideways' },
        { signId: 'i', label: 'I', image: require('../dataset/images/alphabet/i.jpg'), video: require('../dataset/videos/alphabet/i.mp4'), hint: 'Pinky finger up, others in a fist.',gestureKey:'pinky_up_fist_res' },
        { signId: 'j', label: 'J', image: require('../dataset/images/alphabet/j.jpg'), video: require('../dataset/videos/alphabet/j.mp4'), hint: 'Like I, but trace a J in the air with your pinky.',gestureKey:'pinky_trace_j'},
        { signId: 'k', label: 'K', image: require('../dataset/images/alphabet/k.jpg'), video: require('../dataset/videos/alphabet/k.mp4'), hint: 'Index up, middle angled out, thumb between them.',gestureKey:'index_up_middle_out_thumb_between' },
        { signId: 'l', label: 'L', image: require('../dataset/images/alphabet/l.jpg'), video: require('../dataset/videos/alphabet/l.mp4'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      ],
    },
    {
      lessonId: 'lesson-3',
      title: 'Letters M – R',
      description: 'Learn letters M through R',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
<<<<<<< HEAD
        { signId: 'm', label: 'M', image: aslImage('m'), video: aslVideo('m'), hint: 'Three fingers folded over the thumb.' },
        { signId: 'n', label: 'N', image: aslImage('n'), video: aslVideo('n'), hint: 'Two fingers folded over the thumb.' },
        { signId: 'o', label: 'O', image: aslImage('o'), video: aslVideo('o'), hint: 'All fingers curve to meet the thumb — like an O.' },
        { signId: 'p', label: 'P', image: aslImage('p'), video: aslVideo('p'), hint: 'Like K but pointing downward.' },
        { signId: 'q', label: 'Q', image: aslImage('q'), video: aslVideo('q'), hint: 'Like G but pointing downward.' },
        { signId: 'r', label: 'R', image: aslImage('r'), video: aslVideo('r'), hint: 'Cross your index and middle fingers.' },
=======
        { signId: 'm', label: 'M', image: require('../dataset/images/alphabet/m.jpg'), video: require('../dataset/videos/alphabet/m.mp4'), hint: 'Three fingers folded over the thumb.',gestureKey:'three_fingers_over_thumb' },
        { signId: 'n', label: 'N', image: require('../dataset/images/alphabet/n.jpg'), video: require('../dataset/videos/alphabet/n.mp4'), hint: 'Two fingers folded over the thumb.',gestureKey:'two_fingers_over_thumb' },
        { signId: 'o', label: 'O', image: require('../dataset/images/alphabet/o.jpg'), video: require('../dataset/videos/alphabet/o.mp4'), hint: 'All fingers curve to meet the thumb — like an O.' ,gestureKey:'curved_hand_o_shape'},
        { signId: 'p', label: 'P', image: require('../dataset/images/alphabet/p.jpg'), video: require('../dataset/videos/alphabet/p.mp4'), hint: 'Like K but pointing downward.',gestureKey:'k_shape_downward' },
        { signId: 'q', label: 'Q', image: require('../dataset/images/alphabet/q.jpg'), video: require('../dataset/videos/alphabet/q.mp4'), hint: 'Like G but pointing downward.',gestureKey:'g_shape_downward' },
        { signId: 'r', label: 'R', image: require('../dataset/images/alphabet/r.jpg'), video: require('../dataset/videos/alphabet/r.mp4'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      ],
    },
    {
      lessonId: 'lesson-4',
      title: 'Letters S – Z',
      description: 'Complete the alphabet!',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
<<<<<<< HEAD
        { signId: 's', label: 'S', image: aslImage('s'), video: aslVideo('s'), hint: 'Fist with thumb across the front of fingers.' },
        { signId: 't', label: 'T', image: aslImage('t'), video: aslVideo('t'), hint: 'Thumb between index and middle finger.' },
        { signId: 'u', label: 'U', image: aslImage('u'), video: aslVideo('u'), hint: 'Index and middle finger up together.' },
        { signId: 'v', label: 'V', image: aslImage('v'), video: aslVideo('v'), hint: 'Index and middle finger up, spread apart — peace sign.' },
        { signId: 'w', label: 'W', image: aslImage('w'), video: aslVideo('w'), hint: 'Three fingers up, spread — like a W.' },
        { signId: 'x', label: 'X', image: aslImage('x'), video: aslVideo('x'), hint: 'Index finger hooked like a hook.' },
        { signId: 'y', label: 'Y', image: aslImage('y'), video: aslVideo('y'), hint: 'Thumb and pinky out, others in a fist.' },
        { signId: 'z', label: 'Z', image: aslImage('z'), video: aslVideo('z'), hint: 'Trace a Z in the air with your index finger.' },
=======
        { signId: 's', label: 'S', image: require('../dataset/images/alphabet/s.jpg'), video: require('../dataset/videos/alphabet/s.mp4'), hint: 'Fist with thumb across the front of fingers.',gestureKey:'fist_thumb_front' },
        { signId: 't', label: 'T', image: require('../dataset/images/alphabet/t.jpg'), video: require('../dataset/videos/alphabet/t.mp4'), hint: 'Thumb between index and middle finger.',gestureKey:'thumb_between_index_middle' },
        { signId: 'u', label: 'U', image: require('../dataset/images/alphabet/u.jpg'), video: require('../dataset/videos/alphabet/u.mp4'), hint: 'Index and middle finger up together.',gestureKey:'index_middle_up_together' },
        { signId: 'v', label: 'V', image: require('../dataset/images/alphabet/v.jpg'), video: require('../dataset/videos/alphabet/v.mp4'), hint: 'Index and middle finger up, spread apart — peace sign.' ,gestureKey:'index_middle_up_apart'},
        { signId: 'w', label: 'W', image: require('../dataset/images/alphabet/w.jpg'), video: require('../dataset/videos/alphabet/w.mp4'), hint: 'Three fingers up, spread — like a W.',gestureKey:'three_fingers_up_spread' },
        { signId: 'x', label: 'X', image: require('../dataset/images/alphabet/x.jpg'), video: require('../dataset/videos/alphabet/x.mp4'), hint: 'Index finger hooked like a hook.',gestureKey:'index_hooked' },
        { signId: 'y', label: 'Y', image: require('../dataset/images/alphabet/y.jpg'), video: require('../dataset/videos/alphabet/y.mp4'), hint: 'Thumb and pinky out, others in a fist.',gestureKey:'thumb_pinky_out_fist_rest' },
        { signId: 'z', label: 'Z', image: require('../dataset/images/alphabet/z.jpg'), video: require('../dataset/videos/alphabet/z.mp4'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      ],
    },
    {
      lessonId: 'lesson-5',
      title: 'Numbers 1 – 10',
      description: 'Count from 1 to 10 in ASL',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
<<<<<<< HEAD
        { signId: '1', label: '1', image: aslImage('1'), video: aslVideo('1'), hint: 'Index finger points up.' },
        { signId: '2', label: '2', image: aslImage('2'), video: aslVideo('2'), hint: 'Index and middle fingers up.' },
        { signId: '3', label: '3', image: aslImage('3'), video: aslVideo('3'), hint: 'Thumb, index, and middle fingers up.' },
        { signId: '4', label: '4', image: aslImage('4'), video: aslVideo('4'), hint: 'Four fingers up, thumb tucked.' },
        { signId: '5', label: '5', image: aslImage('5'), video: aslVideo('5'), hint: 'All five fingers spread open.' },
        { signId: '6', label: '6', image: aslImage('6'), video: aslVideo('6'), hint: 'Pinky and thumb touch, other fingers up.' },
        { signId: '7', label: '7', image: aslImage('7'), video: aslVideo('7'), hint: 'Ring finger and thumb touch.' },
        { signId: '8', label: '8', image: aslImage('8'), video: aslVideo('8'), hint: 'Middle finger and thumb touch.' },
        { signId: '9', label: '9', image: aslImage('9'), video: aslVideo('9'), hint: 'Index finger and thumb touch — like an O.' },
        { signId: '10', label: '10', image: aslImage('10'), video: aslVideo('10'), hint: 'Thumb up, shake slightly side to side.' },
=======
        { signId: '1', label: '1', image: require('../dataset/images/number/1.jpg'), video: require('../dataset/videos/number/1.mp4'), hint: 'Index finger points up.',gestureKey:'index_up' },
        { signId: '2', label: '2', image: require('../dataset/images/number/2.jpg'), video: require('../dataset/videos/number/2.mp4'), hint: 'Index and middle fingers up.',gestureKey:'index_middle_up' },
        { signId: '3', label: '3', image: require('../dataset/images/number/3.jpg'), video: require('../dataset/videos/number/3.mp4'), hint: 'Thumb, index, and middle fingers up.',gestureKey:'thumb_index_middle_up' },
        { signId: '4', label: '4', image: require('../dataset/images/number/4.jpg'), video: require('../dataset/videos/number/4.mp4'), hint: 'Four fingers up, thumb tucked.',gestureKey:'four_up_thumb_tucked' },
        { signId: '5', label: '5', image: require('../dataset/images/number/5.jpg'), video: require('../dataset/videos/number/5.mp4'), hint: 'All five fingers spread open.',gestureKey:'five_spread_open' },
        { signId: '6', label: '6', image: require('../dataset/images/number/6.jpg'), video: require('../dataset/videos/number/6.mp4'), hint: 'Pinky and thumb touch, other fingers up.',gestureKey:'pinky_thumb_touch' },
        { signId: '7', label: '7', image: require('../dataset/images/number/7.jpg'), video: require('../dataset/videos/number/7.mp4'), hint: 'Ring finger and thumb touch.',gestureKey:'ring_thumb_touch' },
        { signId: '8', label: '8', image: require('../dataset/images/number/8.jpg'), video: require('../dataset/videos/number/8.mp4'), hint: 'Middle finger and thumb touch.',gestureKey:'middle_thumb_touch' },
        { signId: '9', label: '9', image: require('../dataset/images/number/9.jpg'), video: require('../dataset/videos/number/9.mp4'), hint: 'Index finger and thumb touch — like an O.',gestureKey:'index_thumb_touch_o_shape' },
        { signId: '10', label: '10', image: require('../dataset/images/number/10.jpg'), video: require('../dataset/videos/number/10.mp4'), hint: 'Thumb up, shake slightly side to side.',gestureKey:'thumb_up_shake' },
>>>>>>> b24f91a1fd335f1304f0dc9d0bd09accbea2e373
      ],
    },
    ],
   },
// Level 2
{
    levelId: 'level-2',
    title: 'Greetings and Introduction',
    level: 2,
    completed:0,
    total:8,
    lessons: [
    {
      lessonId: 'lesson-1',
      title: 'Letters A – F',
      description: 'Learn the first 6 letters of ASL',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'a', label: 'A', image: require('../dataset/images/alphabet/a.jpg'), video: require('../dataset/videos/alphabet/a.mp4'), hint: 'Make a fist with your thumb resting on the side.', gestureKey: 'fist_thumb_side' },
        { signId: 'b', label: 'B', image: require('../dataset/images/alphabet/b.jpg'), video: require('../dataset/videos/alphabet/b.mp4'), hint: 'Hold four fingers straight up, thumb tucked across palm.',gestureKey: 'four_fingers_up_thumb_across' },
        { signId: 'c', label: 'C', image: require('../dataset/images/alphabet/c.jpg'), video: require('../dataset/videos/alphabet/c.mp4'), hint: 'Curve your hand like the letter C.',gestureKey:'curved_hand_c_shape' },
        { signId: 'd', label: 'D', image: require('../dataset/images/alphabet/d.jpg'), video: require('../dataset/videos/alphabet/d.mp4'), hint: 'Index finger up, other fingers touch the thumb.',gestureKey:'index_up_rest_touch_thumb' },
        { signId: 'e', label: 'E', image: require('../dataset/images/alphabet/e.jpg'), video: require('../dataset/videos/alphabet/e.mp4'), hint: 'Curl all fingers down, thumb tucked under.',gestureKey:'fingers_curled_thumb_under' },
        { signId: 'f', label: 'F', image: require('../dataset/images/alphabet/f.jpg'), video: require('../dataset/videos/alphabet/f.mp4'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
      ],
    },
    {
      lessonId: 'lesson-2',
      title: 'Letters G – L',
      description: 'Learn the next 6 letters of ASL',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'g', label: 'G', image: require('../dataset/images/alphabet/g.jpg'), video: require('../dataset/videos/alphabet/g.mp4'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'h', label: 'H', image: require('../dataset/images/alphabet/h.jpg'), video: require('../dataset/videos/alphabet/h.mp4'), hint: 'Index and middle finger point sideways together.',gestureKey:'index_middle_sideways' },
        { signId: 'i', label: 'I', image: require('../dataset/images/alphabet/i.jpg'), video: require('../dataset/videos/alphabet/i.mp4'), hint: 'Pinky finger up, others in a fist.',gestureKey:'pinky_up_fist_res' },
        { signId: 'j', label: 'J', image: require('../dataset/images/alphabet/j.jpg'), video: require('../dataset/videos/alphabet/j.mp4'), hint: 'Like I, but trace a J in the air with your pinky.',gestureKey:'pinky_trace_j'},
        { signId: 'k', label: 'K', image: require('../dataset/images/alphabet/k.jpg'), video: require('../dataset/videos/alphabet/k.mp4'), hint: 'Index up, middle angled out, thumb between them.',gestureKey:'index_up_middle_out_thumb_between' },
        { signId: 'l', label: 'L', image: require('../dataset/images/alphabet/l.jpg'), video: require('../dataset/videos/alphabet/l.mp4'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
      ],
    },
    {
      lessonId: 'lesson-3',
      title: 'Letters M – R',
      description: 'Learn letters M through R',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 'm', label: 'M', image: require('../dataset/images/alphabet/m.jpg'), video: require('../dataset/videos/alphabet/m.mp4'), hint: 'Three fingers folded over the thumb.',gestureKey:'three_fingers_over_thumb' },
        { signId: 'n', label: 'N', image: require('../dataset/images/alphabet/n.jpg'), video: require('../dataset/videos/alphabet/n.mp4'), hint: 'Two fingers folded over the thumb.',gestureKey:'two_fingers_over_thumb' },
        { signId: 'o', label: 'O', image: require('../dataset/images/alphabet/o.jpg'), video: require('../dataset/videos/alphabet/o.mp4'), hint: 'All fingers curve to meet the thumb — like an O.' ,gestureKey:'curved_hand_o_shape'},
        { signId: 'p', label: 'P', image: require('../dataset/images/alphabet/p.jpg'), video: require('../dataset/videos/alphabet/p.mp4'), hint: 'Like K but pointing downward.',gestureKey:'k_shape_downward' },
        { signId: 'q', label: 'Q', image: require('../dataset/images/alphabet/q.jpg'), video: require('../dataset/videos/alphabet/q.mp4'), hint: 'Like G but pointing downward.',gestureKey:'g_shape_downward' },
        { signId: 'r', label: 'R', image: require('../dataset/images/alphabet/r.jpg'), video: require('../dataset/videos/alphabet/r.mp4'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
      ],
    },
    {
      lessonId: 'lesson-4',
      title: 'Letters S – Z',
      description: 'Complete the alphabet!',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 's', label: 'S', image: require('../dataset/images/alphabet/s.jpg'), video: require('../dataset/videos/alphabet/s.mp4'), hint: 'Fist with thumb across the front of fingers.',gestureKey:'fist_thumb_front' },
        { signId: 't', label: 'T', image: require('../dataset/images/alphabet/t.jpg'), video: require('../dataset/videos/alphabet/t.mp4'), hint: 'Thumb between index and middle finger.',gestureKey:'thumb_between_index_middle' },
        { signId: 'u', label: 'U', image: require('../dataset/images/alphabet/u.jpg'), video: require('../dataset/videos/alphabet/u.mp4'), hint: 'Index and middle finger up together.',gestureKey:'index_middle_up_together' },
        { signId: 'v', label: 'V', image: require('../dataset/images/alphabet/v.jpg'), video: require('../dataset/videos/alphabet/v.mp4'), hint: 'Index and middle finger up, spread apart — peace sign.' ,gestureKey:'index_middle_up_apart'},
        { signId: 'w', label: 'W', image: require('../dataset/images/alphabet/w.jpg'), video: require('../dataset/videos/alphabet/w.mp4'), hint: 'Three fingers up, spread — like a W.',gestureKey:'three_fingers_up_spread' },
        { signId: 'x', label: 'X', image: require('../dataset/images/alphabet/x.jpg'), video: require('../dataset/videos/alphabet/x.mp4'), hint: 'Index finger hooked like a hook.',gestureKey:'index_hooked' },
        { signId: 'y', label: 'Y', image: require('../dataset/images/alphabet/y.jpg'), video: require('../dataset/videos/alphabet/y.mp4'), hint: 'Thumb and pinky out, others in a fist.',gestureKey:'thumb_pinky_out_fist_rest' },
        { signId: 'z', label: 'Z', image: require('../dataset/images/alphabet/z.jpg'), video: require('../dataset/videos/alphabet/z.mp4'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
      ],
    },
    {
      lessonId: 'lesson-5',
      title: 'Numbers 1 – 10',
      description: 'Count from 1 to 10 in ASL',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: '1', label: '1', image: require('../dataset/images/number/1.jpg'), video: require('../dataset/videos/number/1.mp4'), hint: 'Index finger points up.',gestureKey:'index_up' },
        { signId: '2', label: '2', image: require('../dataset/images/number/2.jpg'), video: require('../dataset/videos/number/2.mp4'), hint: 'Index and middle fingers up.',gestureKey:'index_middle_up' },
        { signId: '3', label: '3', image: require('../dataset/images/number/3.jpg'), video: require('../dataset/videos/number/3.mp4'), hint: 'Thumb, index, and middle fingers up.',gestureKey:'thumb_index_middle_up' },
        { signId: '4', label: '4', image: require('../dataset/images/number/4.jpg'), video: require('../dataset/videos/number/4.mp4'), hint: 'Four fingers up, thumb tucked.',gestureKey:'four_up_thumb_tucked' },
        { signId: '5', label: '5', image: require('../dataset/images/number/5.jpg'), video: require('../dataset/videos/number/5.mp4'), hint: 'All five fingers spread open.',gestureKey:'five_spread_open' },
        { signId: '6', label: '6', image: require('../dataset/images/number/6.jpg'), video: require('../dataset/videos/number/6.mp4'), hint: 'Pinky and thumb touch, other fingers up.',gestureKey:'pinky_thumb_touch' },
        { signId: '7', label: '7', image: require('../dataset/images/number/7.jpg'), video: require('../dataset/videos/number/7.mp4'), hint: 'Ring finger and thumb touch.',gestureKey:'ring_thumb_touch' },
        { signId: '8', label: '8', image: require('../dataset/images/number/8.jpg'), video: require('../dataset/videos/number/8.mp4'), hint: 'Middle finger and thumb touch.',gestureKey:'middle_thumb_touch' },
        { signId: '9', label: '9', image: require('../dataset/images/number/9.jpg'), video: require('../dataset/videos/number/9.mp4'), hint: 'Index finger and thumb touch — like an O.',gestureKey:'index_thumb_touch_o_shape' },
        { signId: '10', label: '10', image: require('../dataset/images/number/10.jpg'), video: require('../dataset/videos/number/10.mp4'), hint: 'Thumb up, shake slightly side to side.',gestureKey:'thumb_up_shake' },
      ],
       },
    ],
   },

];

// Map lessonId → LessonData 
export const LESSON_MAP: Record<string, Lesson> = {};

LESSON_LEVELS.forEach((level) => {
  level.lessons.forEach((lesson) => {
    // Key format: "level-1_lesson-1" since all levels have lesson-1
    LESSON_MAP[`${level.levelId}_${lesson.lessonId}`] = lesson;
  });
});