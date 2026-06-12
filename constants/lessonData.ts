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
        { signId: 'a', label: 'A', image: aslImage('a'), video: aslVideo('a'), hint: 'Make a fist with your thumb resting on the side.', gestureKey: 'fist_thumb_side'  },
        { signId: 'b', label: 'B', image: aslImage('b'), video: aslVideo('b'), hint: 'Hold four fingers straight up, thumb tucked across palm.',gestureKey: ' four_fingers_up_thumb_across' },
        { signId: 'c', label: 'C', image: aslImage('c'), video: aslVideo('c'), hint: 'Curve your hand like the letter C.',gestureKey:'curved_hand_c_shape' },
        { signId: 'd', label: 'D', image: aslImage('d'), video: aslVideo('d'), hint: 'Index finger up, other fingers touch the thumb.', gestureKey:'index_up_rest_touch_thumb' },
        { signId: 'e', label: 'E', image: aslImage('e'), video: aslVideo('e'), hint: 'Curl all fingers down, thumb tucked under.',gestureKey:'fingers_curled_thumb_under' },
        { signId: 'f', label: 'F', image: aslImage('f'), video: aslVideo('f'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
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
        { signId: 'g', label: 'G', image: aslImage('g'), video: aslVideo('g'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'h', label: 'H', image: aslImage('h'), video: aslVideo('h'), hint: 'Index and middle finger point sideways together.',gestureKey:'index_middle_sideways' },
        { signId: 'i', label: 'I', image: aslImage('i'), video: aslVideo('i'), hint: 'Pinky finger up, others in a fist.',gestureKey:'pinky_up_fist_res' },
        { signId: 'j', label: 'J', image: aslImage('j'), video: aslVideo('j'), hint: 'Like I, but trace a J in the air with your pinky.',gestureKey:'pinky_trace_j'},
        { signId: 'k', label: 'K', image: aslImage('k'), video: aslVideo('k'), hint: 'Index up, middle angled out, thumb between them.',gestureKey:'index_up_middle_out_thumb_between' },
        { signId: 'l', label: 'L', image: aslImage('l'), video: aslVideo('l'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
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
        { signId: 'm', label: 'M', image: aslImage('m'), video: aslVideo('m'), hint: 'Three fingers folded over the thumb.',gestureKey:'three_fingers_over_thumb' },
        { signId: 'n', label: 'N', image: aslImage('n'), video: aslVideo('n'), hint: 'Two fingers folded over the thumb.',gestureKey:'two_fingers_over_thumb' },
        { signId: 'o', label: 'O', image: aslImage('o'), video: aslVideo('o'), hint: 'All fingers curve to meet the thumb — like an O.' ,gestureKey:'curved_hand_o_shape'},
        { signId: 'p', label: 'P', image: aslImage('p'), video: aslVideo('p'), hint: 'Like K but pointing downward.',gestureKey:'k_shape_downward' },
        { signId: 'q', label: 'Q', image: aslImage('q'), video: aslVideo('q'), hint: 'Like G but pointing downward.',gestureKey:'g_shape_downward' },
        { signId: 'r', label: 'R', image: aslImage('r'), video: aslVideo('r'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
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
        { signId: 's', label: 'S', image: aslImage('s'), video: aslVideo('s'), hint: 'Fist with thumb across the front of fingers.',gestureKey:'fist_thumb_front' },
        { signId: 't', label: 'T', image: aslImage('t'), video: aslVideo('t'), hint: 'Thumb between index and middle finger.',gestureKey:'thumb_between_index_middle' },
        { signId: 'u', label: 'U', image: aslImage('u'), video: aslVideo('u'), hint: 'Index and middle finger up together.',gestureKey:'index_middle_up_together' },
        { signId: 'v', label: 'V', image: aslImage('v'), video: aslVideo('v'), hint: 'Index and middle finger up, spread apart — peace sign.' ,gestureKey:'index_middle_up_apart'},
        { signId: 'w', label: 'W', image: aslImage('w'), video: aslVideo('w'), hint: 'Three fingers up, spread — like a W.',gestureKey:'three_fingers_up_spread' },
        { signId: 'x', label: 'X', image: aslImage('x'), video: aslVideo('x'), hint: 'Index finger hooked like a hook.',gestureKey:'index_hooked' },
        { signId: 'y', label: 'Y', image: aslImage('y'), video: aslVideo('y'), hint: 'Thumb and pinky out, others in a fist.',gestureKey:'thumb_pinky_out_fist_rest' },
        { signId: 'z', label: 'Z', image: aslImage('z'), video: aslVideo('z'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
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
        { signId: '1', label: '1', image: aslImage('1'), video: aslVideo('1'), hint: 'Index finger points up.',gestureKey:'index_up' },
        { signId: '2', label: '2', image: aslImage('2'), video: aslVideo('2'), hint: 'Index and middle fingers up.',gestureKey:'index_middle_up' },
        { signId: '3', label: '3', image: aslImage('3'), video: aslVideo('3'), hint: 'Thumb, index, and middle fingers up.',gestureKey:'thumb_index_middle_up' },
        { signId: '4', label: '4', image: aslImage('4'), video: aslVideo('4'), hint: 'Four fingers up, thumb tucked.',gestureKey:'four_up_thumb_tucked' },
        { signId: '5', label: '5', image: aslImage('5'), video: aslVideo('5'), hint: 'All five fingers spread open.',gestureKey:'five_spread_open' },
        { signId: '6', label: '6', image: aslImage('6'), video: aslVideo('6'), hint: 'Pinky and thumb touch, other fingers up.',gestureKey:'pinky_thumb_touch' },
        { signId: '7', label: '7', image: aslImage('7'), video: aslVideo('7'), hint: 'Ring finger and thumb touch.',gestureKey:'ring_thumb_touch' },
        { signId: '8', label: '8', image: aslImage('8'), video: aslVideo('8'), hint: 'Middle finger and thumb touch.',gestureKey:'middle_thumb_touch' },
        { signId: '9', label: '9', image: aslImage('9'), video: aslVideo('9'), hint: 'Index finger and thumb touch — like an O.',gestureKey:'index_thumb_touch_o_shape' },
        { signId: '10', label: '10', image: aslImage('10'), video: aslVideo('10'), hint: 'Thumb up, shake slightly side to side.',gestureKey:'thumb_up_shake' },
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
    total:4,
    lessons:  [
    {
      lessonId: 'lesson-1',
      title: 'Greeting phrases',
      description: 'Learn basic greeting phrases used daily',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Hello', label: 'Hello', image: aslImage('Hello'), video: aslVideo('Hello'), hint: 'Make a fist with your thumb resting on the side.', gestureKey: 'fist_thumb_side'  },
        { signId: 'Good', label: 'Good', image: aslImage('Good'), video: aslVideo('Good'), hint: 'Hold four fingers straight up, thumb tucked across palm.',gestureKey: ' four_fingers_up_thumb_across' },
        { signId: 'Morning', label: 'Morning', image: aslImage('Morning'), video: aslVideo('Morning'), hint: 'Curve your hand like the letter C.',gestureKey:'curved_hand_c_shape' },
        { signId: 'Good Morning', label: 'Good Morning', image: aslImage('Good_Morning'), video: aslVideo('Good_Morning'), hint: 'Index finger up, other fingers touch the thumb.', gestureKey:'index_up_rest_touch_thumb' },
        { signId: 'Good Afternoon', label: 'Good Afternoon', image: aslImage('Good_Afternoon'), video: aslVideo('Good_Afternoon'), hint: 'Curl all fingers down, thumb tucked under.',gestureKey:'fingers_curled_thumb_under' },
        { signId: 'Good Evening', label: 'Good Evening', image: aslImage('Good_Evening'), video: aslVideo('Good_Evening'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Good Night', label: 'Good Night', image: aslImage('Good_Night'), video: aslVideo('Good_Night'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Welcome', label: 'Welcome', image: aslImage('Welcome'), video: aslVideo('Welcome'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Bye Bye', label: 'Bye Bye', image: aslImage('Bye_Bye'), video: aslVideo('Bye_Bye'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'See you later', label: 'See you later', image: aslImage('See_you_later'), video: aslVideo('See_you_later'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        ],
    },
    {
      lessonId: 'lesson-2',
      title: 'Polite Expressions',
      description: 'Learn some polite expressions',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Please', label: 'Please', image: aslImage('Please'), video: aslVideo('Please'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Thank you', label: 'Thank you', image: aslImage('Thank_you'), video: aslVideo('Thank_you'), hint: 'Index and middle finger point sideways together.',gestureKey:'index_middle_sideways' },
        { signId: 'You\'re welcome', label: 'You\'re welcome', image: aslImage('You\'re_welcome'), video: aslVideo('You\'re_welcome'), hint: 'Pinky finger up, others in a fist.',gestureKey:'pinky_up_fist_res' },
        { signId: 'Excuse me', label: 'Excuse me', image: aslImage('Excuse_me'), video: aslVideo('Excuse_me'), hint: 'Like I, but trace a J in the air with your pinky.',gestureKey:'pinky_trace_j'},
        { signId: 'Sorry', label: 'Sorry', image: aslImage('Sorry'), video: aslVideo('Sorry'), hint: 'Index up, middle angled out, thumb between them.',gestureKey:'index_up_middle_out_thumb_between' },
        { signId: 'Yes', label: 'Yes', image: aslImage('Yes'), video: aslVideo('Yes'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'No', label: 'No', image: aslImage('No'), video: aslVideo('No'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Maybe', label: 'Maybe', image: aslImage('Maybe'), video: aslVideo('Maybe'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Okay', label: 'Okay', image: aslImage('Okay'), video: aslVideo('Okay'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Sure', label: 'Sure', image: aslImage('Sure'), video: aslVideo('Sure'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
      ],
    },
    {
      lessonId: 'lesson-3',
      title: 'Who are you?',
      description: 'Learn basic pronouns and phrases',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 'I', label: 'I', image: aslImage('I_'), video: aslVideo('I_'), hint: 'Three fingers folded over the thumb.',gestureKey:'three_fingers_over_thumb' },
        { signId: 'You', label: 'You', image: aslImage('You'), video: aslVideo('You'), hint: 'Two fingers folded over the thumb.',gestureKey:'two_fingers_over_thumb' },
        { signId: 'He', label: 'He', image: aslImage('He'), video: aslVideo('He'), hint: 'All fingers curve to meet the thumb — like an O.' ,gestureKey:'curved_hand_o_shape'},
        { signId: 'She', label: 'She', image: aslImage('She'), video: aslVideo('She'), hint: 'Like K but pointing downward.',gestureKey:'k_shape_downward' },
        { signId: 'We', label: 'We', image: aslImage('We'), video: aslVideo('We'), hint: 'Like G but pointing downward.',gestureKey:'g_shape_downward' },
        { signId: 'They', label: 'They', image: aslImage('They'), video: aslVideo('They'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'Name', label: 'Name', image: aslImage('Name'), video: aslVideo('Name'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'My name is', label: 'My name is', image: aslImage('My_name_is'), video: aslVideo('My_name_is'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'What is your name?', label: 'What is your name? ', image: aslImage('What_is_your_name'), video: aslVideo('What_is_your_name'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'Nice to meet you', label: 'Nice to meet you', image: aslImage('Nice_to_meet_you'), video: aslVideo('Nice_to_meet_you'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'How', label: 'How', image: aslImage('How'), video: aslVideo('How'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'How are you?', label: 'How are you?', image: aslImage('How_are_you'), video: aslVideo('How_are_you'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        { signId: 'I am fine', label: 'I am fine', image: aslImage('I_am_fine'), video: aslVideo('I_am_fine'), hint: 'Cross your index and middle fingers.' ,gestureKey:'index_middle_crossed'},
        
      ],
    },
    {
      lessonId: 'lesson-4',
      title: 'About yourself',
      description: 'Learn some words',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 'Deaf', label: 'Deaf', image: aslImage('Deaf'), video: aslVideo('Deaf'), hint: 'Fist with thumb across the front of fingers.',gestureKey:'fist_thumb_front' },
        { signId: 'Hearing', label: 'Hearing', image: aslImage('Hearing'), video: aslVideo('Hearing'), hint: 'Thumb between index and middle finger.',gestureKey:'thumb_between_index_middle' },
        { signId: 'Interpreter', label: 'Interpreter', image: aslImage('Interpreter'), video: aslVideo('Interpreter'), hint: 'Index and middle finger up together.',gestureKey:'index_middle_up_together' },
        { signId: 'Student', label: 'Student', image: aslImage('Student'), video: aslVideo('Student'), hint: 'Index and middle finger up, spread apart — peace sign.' ,gestureKey:'index_middle_up_apart'},
        { signId: 'Teacher', label: 'Teacher', image: aslImage('Teacher'), video: aslVideo('Teacher'), hint: 'Three fingers up, spread — like a W.',gestureKey:'three_fingers_up_spread' },
        { signId: 'Age', label: 'Age', image: aslImage('Age'), video: aslVideo('Age'), hint: 'Index finger hooked like a hook.',gestureKey:'index_hooked' },
        { signId: 'Where are you from?', label: 'Where are you from?', image: aslImage('Where_are_you_from'), video: aslVideo('Where are_you_from'), hint: 'Thumb and pinky out, others in a fist.',gestureKey:'thumb_pinky_out_fist_rest' },
        { signId: 'Understand', label: 'Understand', image: aslImage('Understand'), video: aslVideo('Understand'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
        { signId: 'Repeat', label: 'Repeat', image: aslImage('Repeat'), video: aslVideo('Repeat'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
        { signId: 'Slow', label: 'Slow', image: aslImage('Slow'), video: aslVideo('Slow'), hint: 'Trace a Z in the air with your index finger.',gestureKey:'index_trace_z' },
      ],
    },
    ],
    },

    //Level 3
   {
    levelId: 'level-3',
    title: 'People Around Us',
    level: 3,
    completed:0,
    total:4,
    lessons:  [
    {
      lessonId: 'lesson-1',
      title: 'Immediate Family',
      description: 'Family Members',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Mother', label: 'Mother', image: aslImage('Mother'), video: aslVideo('Mother'), hint: 'Make a fist with your thumb resting on the side.', gestureKey: 'fist_thumb_side'  },
        { signId: 'Father', label: 'Father', image: aslImage('Father'), video: aslVideo('Father'), hint: 'Hold four fingers straight up, thumb tucked across palm.',gestureKey: ' four_fingers_up_thumb_across' },
        { signId: 'Sister', label: 'Sister', image: aslImage('Sister'), video: aslVideo('Sister'), hint: 'Curve your hand like the letter C.',gestureKey:'curved_hand_c_shape' },
        { signId: 'Brother', label: 'Brother', image: aslImage('Brother'), video: aslVideo('Brother'), hint: 'Index finger up, other fingers touch the thumb.', gestureKey:'index_up_rest_touch_thumb' },
        { signId: 'Baby', label: 'Baby', image: aslImage('Baby'), video: aslVideo('Baby'), hint: 'Curl all fingers down, thumb tucked under.',gestureKey:'fingers_curled_thumb_under' },
        { signId: 'Parents', label: 'Parents', image: aslImage('Parents'), video: aslVideo('Parents'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Daughter', label: 'Daughter', image: aslImage('Daughter'), video: aslVideo('Daughter'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Son', label: 'Son', image: aslImage('Son'), video: aslVideo('Son'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Wife', label: 'Wife', image: aslImage('Wife'), video: aslVideo('Wife'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Husband', label: 'Husband', image: aslImage('Husband'), video: aslVideo('Husband'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Grandmother', label: 'Grandmother', image: aslImage('Grandmother'), video: aslVideo('Grandmother'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Grandfather', label: 'Grandfather', image: aslImage('Grandfather'), video: aslVideo('Grandfather'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Child', label: 'Child', image: aslImage('Child'), video: aslVideo('Child'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        ],
    },
    {
      lessonId: 'lesson-2',
      title: 'Extended Family',
      description: 'Learn some relations',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Aunt', label: 'Aunt', image: aslImage('Aunt'), video: aslVideo('Aunt'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Uncle', label: 'Uncle', image: aslImage('Uncle'), video: aslVideo('Uncle'), hint: 'Index and middle finger point sideways together.',gestureKey:'index_middle_sideways' },
        { signId: 'Cousin', label: 'Cousin', image: aslImage('Cousin'), video: aslVideo('Cousin'), hint: 'Pinky finger up, others in a fist.',gestureKey:'pinky_up_fist_res' },
        { signId: 'Niece', label: 'Niece', image: aslImage('Niece'), video: aslVideo('Niece'), hint: 'Like I, but trace a J in the air with your pinky.',gestureKey:'pinky_trace_j'},
        { signId: 'Nephew', label: 'Nephew', image: aslImage('Nephew'), video: aslVideo('Nephew'), hint: 'Index up, middle angled out, thumb between them.',gestureKey:'index_up_middle_out_thumb_between' },
        { signId: 'Twins', label: 'Twins', image: aslImage('Twins'), video: aslVideo('Twins'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Step Mother', label: 'Step Mother', image: aslImage('Step_Mother'), video: aslVideo('Step_Mother'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Step Father', label: 'Step Father', image: aslImage('Step_Father'), video: aslVideo('Step_Father'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
        { signId: 'Family', label: 'Family', image: aslImage('Family'), video: aslVideo('Family'), hint: 'Index up, thumb out — like an L shape.',gestureKey:'index_up_thumb_out_lshape' },
      ],
    },
    {
      lessonId: 'lesson-3',
      title: 'Relationships',
      description: 'Learn words for other relationships',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Friend', label: 'Friend', image: aslImage('Friend'), video: aslVideo('Friend'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Bestfriend', label: 'Bestfriend', image: aslImage('Bestfriend'), video: aslVideo('Bestfriend'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Girlfriend', label: 'Girlfriend', image: aslImage('Girlfriend'), video: aslVideo('Girlfriend'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Boyfriend', label: 'Boyfriend', image: aslImage('Boyfriend'), video: aslVideo('Boyfriend'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Partner', label: 'Partner', image: aslImage('Partner'), video: aslVideo('Partner'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Neighbor', label: 'Neighbor', image: aslImage('Neighbor'), video: aslVideo('Neighbor'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Colleague', label: 'Colleague', image: aslImage('Colleague'), video: aslVideo('Colleague'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Enemy', label: 'Enemy', image: aslImage('Enemy'), video: aslVideo('Enemy'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Stranger', label: 'Stranger', image: aslImage('Stranger'), video: aslVideo('Stranger'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
      ],
    },
    {
      lessonId: 'lesson-4',
      title: 'Describing People',
      description: 'Learn words used for describing people',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Old', label: 'Old', image: aslImage('Old'), video: aslVideo('Old'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Young', label: 'Young', image: aslImage('Young'), video: aslVideo('Young'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Beautiful', label: 'Beautiful', image: aslImage('Beautiful'), video: aslVideo('Beautiful'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Handsome', label: 'Handsome', image: aslImage('Handsome'), video: aslVideo('Handsome'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Funny', label: 'Funny', image: aslImage('Funny'), video: aslVideo('Funny'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Kind', label: 'Kind', image: aslImage('Kind'), video: aslVideo('Kind'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Smart', label: 'Smart', image: aslImage('Smart'), video: aslVideo('Smart'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Shy', label: 'Shy', image: aslImage('Shy'), video: aslVideo('Shy'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Patient', label: 'Patient', image: aslImage('Patient'), video: aslVideo('Patient'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Generous', label: 'Generous', image: aslImage('Generous'), video: aslVideo('Generous'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Honest', label: 'Honest', image: aslImage('Honest'), video: aslVideo('Honest'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
      ],
    },
    ],
   },

   //Level 4
   {
    levelId: 'level-4',
    title: 'World around us',
    level: 4,
    completed:0,
    total:4,
    lessons:  [
    {
      lessonId: 'lesson-1',
      title: 'Colours',
      description: 'Learn basic colours\' names',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Red', label: 'Red', image: aslImage('Red'), video: aslVideo('Red'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Blue', label: 'Blue', image: aslImage('Blue'), video: aslVideo('Blue'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Green', label: 'Green', image: aslImage('Green'), video: aslVideo('Green'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Yellow', label: 'Yellow', image: aslImage('Yellow'), video: aslVideo('Yellow'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Orange', label: 'Orange', image: aslImage('Orange'), video: aslVideo('Orange'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Purple', label: 'Purple', image: aslImage('Purple'), video: aslVideo('Purple'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Pink', label: 'Pink', image: aslImage('Pink'), video: aslVideo('Pink'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Black', label: 'Black', image: aslImage('Black'), video: aslVideo('Black'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'White', label: 'White', image: aslImage('White'), video: aslVideo('White'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Brown', label: 'Brown', image: aslImage('Brown'), video: aslVideo('Brown'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Grey', label: 'Grey', image: aslImage('Grey'), video: aslVideo('Grey'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Gold', label: 'Gold', image: aslImage('Gold'), video: aslVideo('Gold'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Silver', label: 'Silver', image: aslImage('Silver'), video: aslVideo('Silver'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Light', label: 'Light', image: aslImage('Light'), video: aslVideo('Light'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        { signId: 'Dark', label: 'Dark', image: aslImage('Dark'), video: aslVideo('Dark'), hint: 'Index finger and thumb touch, other three fingers up.',gestureKey:'index_thumb_circle_three_up' },
        ],
    },
    {
      lessonId: 'lesson-2',
      title: 'Days and Months',
      description: 'Learn names of days and months',
      duration: '7 min',
      xp: 20,
      completed: false,
      signs: [
        { signId: 'Monday', label: 'Monday', image: aslImage('Monday'), video: aslVideo('Monday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Tuesday', label: 'Tuesday', image: aslImage('Tuesday'), video: aslVideo('Tuesday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Wednesday', label: 'Wednesday', image: aslImage('Wednesday'), video: aslVideo('Wednesday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Thursday', label: 'Thursday', image: aslImage('Thursday'), video: aslVideo('Thursday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Friday', label: 'Friday', image: aslImage('Friday'), video: aslVideo('Friday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Saturday', label: 'Saturday', image: aslImage('Saturday'), video: aslVideo('Saturday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Sunday', label: 'Sunday', image: aslImage('Sunday'), video: aslVideo('Sunday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'January', label: 'January', image: aslImage('January'), video: aslVideo('January'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'February', label: 'February', image: aslImage('February'), video: aslVideo('February'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'March', label: 'March', image: aslImage('March'), video: aslVideo('March'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'April', label: 'April', image: aslImage('April'), video: aslVideo('April'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'May', label: 'May', image: aslImage('May'), video: aslVideo('May'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'June', label: 'June', image: aslImage('June'), video: aslVideo('June'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'July', label: 'July', image: aslImage('July'), video: aslVideo('July'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'August', label: 'August', image: aslImage('August'), video: aslVideo('August'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'September', label: 'September', image: aslImage('September'), video: aslVideo('September'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'October', label: 'October', image: aslImage('October'), video: aslVideo('October'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'November', label: 'November', image: aslImage('November'), video: aslVideo('November'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'December', label: 'December', image: aslImage('December'), video: aslVideo('December'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
      ],
    },
    {
      lessonId: 'lesson-3',
      title: 'Time expressions',
      description: 'Learn basic time phrases',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 'Today', label: 'Today', image: aslImage('Today'), video: aslVideo('Today'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Tomorrow', label: 'Tomorrow', image: aslImage('Tomorrow'), video: aslVideo('Tomorrow'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Yesterday', label: 'Yesterday', image: aslImage('Yesterday'), video: aslVideo('Yesterday'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Now', label: 'Now', image: aslImage('Now'), video: aslVideo('Now'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Later', label: 'Later', image: aslImage('Later'), video: aslVideo('Later'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Soon', label: 'Soon', image: aslImage('Soon'), video: aslVideo('Soon'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Always', label: 'Always', image: aslImage('Always'), video: aslVideo('Always'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Never', label: 'Never', image: aslImage('Never'), video: aslVideo('Never'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Sometimes', label: 'Sometimes', image: aslImage('Sometimes'), video: aslVideo('Sometimes'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Morning2', label: 'Morning', image: aslImage('Morning2'), video: aslVideo('Morning2'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Afternoon', label: 'Afternoon', image: aslImage('Afternoon'), video: aslVideo('Afternoon'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Evening', label: 'Evening', image: aslImage('Evening'), video: aslVideo('Evening'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Night', label: 'Night', image: aslImage('Night'), video: aslVideo('Night'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Week', label: 'Week', image: aslImage('Week'), video: aslVideo('Week'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Month', label: 'Month', image: aslImage('Month'), video: aslVideo('Month'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Year', label: 'Year', image: aslImage('Year'), video: aslVideo('Year'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Hour', label: 'Hour', image: aslImage('Hour'), video: aslVideo('Hour'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Minute', label: 'Minute', image: aslImage('Minute'), video: aslVideo('Minute'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Past', label: 'Past', image: aslImage('Past'), video: aslVideo('Past'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Future', label: 'Future', image: aslImage('Future'), video: aslVideo('Future'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
      ],
    },
    {
      lessonId: 'lesson-4',
      title: 'About yourself',
      description: 'Learn some words',
      duration: '7 min',
      xp: 25,
      completed: false,
      signs: [
        { signId: 'Big', label: 'Big', image: aslImage('Big'), video: aslVideo('Big'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Small', label: 'Small', image: aslImage('Small'), video: aslVideo('Small'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Hot', label: 'Hot', image: aslImage('Hot'), video: aslVideo('Hot'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Cold', label: 'Cold', image: aslImage('Cold'), video: aslVideo('Cold'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Fast', label: 'Fast', image: aslImage('Fast'), video: aslVideo('Fast'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Slow2', label: 'Slow', image: aslImage('Slow2'), video: aslVideo('Slow2'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Easy', label: 'Easy', image: aslImage('Easy'), video: aslVideo('Easy'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Hard', label: 'Hard', image: aslImage('Hard'), video: aslVideo('Hard'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'New', label: 'New', image: aslImage('New'), video: aslVideo('New'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Old2', label: 'Old', image: aslImage('Old2'), video: aslVideo('Old2'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Clean', label: 'Clean', image: aslImage('Clean'), video: aslVideo('Clean'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Dirty', label: 'Dirty', image: aslImage('Dirty'), video: aslVideo('Dirty'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Full', label: 'Full', image: aslImage('Full'), video: aslVideo('Full'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Empty', label: 'Empty', image: aslImage('Empty'), video: aslVideo('Empty'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Loudness', label: 'Loudness', image: aslImage('Loudness'), video: aslVideo('Loudness'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Quiet', label: 'Quiet', image: aslImage('Quiet'), video: aslVideo('Quiet'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Heavy', label: 'Heavy', image: aslImage('Heavy'), video: aslVideo('Heavy'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Light_2', label: 'Light', image: aslImage('Light_2'), video: aslVideo('Light_2'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Right', label: 'Right', image: aslImage('Right'), video: aslVideo('Right'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
        { signId: 'Wrong', label: 'Wrong', image: aslImage('Wrong'), video: aslVideo('Wrong'), hint: 'Index finger and thumb point sideways.',gestureKey:'index_thumb_sideways' },
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