import { hscUnits } from './hscUnitsData';

export const mockSubjects = hscUnits.map((u) => ({
  id: u.id,
  name: `${u.unitNumber}: ${u.unitTitleBn}`,
  nameEn: `${u.unitNumber}: ${u.unitTitle}`,
  progress: u.progress,
  totalTopics: u.lessons.length,
  completedTopics: Math.round((u.lessons.length * u.progress) / 100),
  subtopics: u.lessons.map((l) => ({
    name: `${l.number}: ${l.title} (${l.titleBn})`,
    progress: l.progress
  }))
}));

export const mockRecentExams = [
  {
    id: 'exam-1',
    title: 'Unit 1: Education and Life - Mega Vocab Test',
    date: '২৯ আগস্ট ২০২৬',
    dateEn: '29 Aug 2026',
    score: '৪/৫',
    scoreRaw: '4/5',
    category: 'UNIT 1: EDUCATION',
    status: 'completed',
    accuracy: '80%',
    totalQuestions: 5
  },
  {
    id: 'exam-2',
    title: 'Unit 4: History & Speeches Board MCQ',
    subtitle: 'Lesson 1: Three Speeches',
    date: '২৭ আগস্ট ২০২৬',
    dateEn: '27 Aug 2026',
    score: '৫/৫',
    scoreRaw: '5/5',
    category: 'HSC 1ST PAPER',
    status: 'completed',
    accuracy: '100%',
    totalQuestions: 5
  },
  {
    id: 'exam-3',
    title: 'Unit 5: Human Rights & Street Children',
    subtitle: 'Lesson 1: Amerigo',
    date: '২৬ আগস্ট ২০২৬',
    dateEn: '26 Aug 2026',
    score: '৩/৫',
    scoreRaw: '3/5',
    category: 'HSC BOARD EXAM',
    status: 'completed',
    accuracy: '60%',
    totalQuestions: 5
  },
  {
    id: 'exam-4',
    title: 'Unit 6: Dreams in Literature',
    subtitle: 'Dream Poems',
    date: '২৫ আগস্ট ২০২৬',
    dateEn: '25 Aug 2026',
    score: '৪/৫',
    scoreRaw: '4/5',
    category: 'UNIT 6: DREAMS',
    status: 'completed',
    accuracy: '80%',
    totalQuestions: 5
  }
];

export const mockStreakDays = [
  { day: 'শনি', dayEn: 'Sat', active: true, today: true },
  { day: 'রবি', dayEn: 'Sun', active: false },
  { day: 'সোম', dayEn: 'Mon', active: false },
  { day: 'মঙ্গল', dayEn: 'Tue', active: false },
  { day: 'বুধ', dayEn: 'Wed', active: true },
  { day: 'বৃহ', dayEn: 'Thu', active: true },
  { day: 'শুক্র', dayEn: 'Fri', active: true },
];

export const mockDailyPoints = [
  { day: 'Sat', dayBn: 'শনি', points: 120, date: 'Aug 29' },
  { day: 'Sun', dayBn: 'রবি', points: 0, date: 'Aug 24' },
  { day: 'Mon', dayBn: 'সোম', points: 25, date: 'Aug 25' },
  { day: 'Tue', dayBn: 'মঙ্গল', points: 40, date: 'Aug 26' },
  { day: 'Wed', dayBn: 'বুধ', points: 70, date: 'Aug 27' },
  { day: 'Thu', dayBn: 'বৃহ', points: 95, date: 'Aug 28' },
  { day: 'Fri', dayBn: 'শুক্র', points: 150, date: 'Aug 29' },
];

export const mockQuickQuestions = [
  {
    id: 1,
    subject: 'Unit 1: Education and Life',
    question: 'What is the closest synonym of the textbook word "Emancipation"?',
    options: ['Liberation / Freedom', 'Enslavement', 'Persecution', 'Hesitation'],
    correct: 0,
    explanation: '"Emancipation" means the process of being set free from legal, social, or political restrictions.'
  },
  {
    id: 2,
    subject: 'Unit 4: History',
    question: 'What is the antonym of "Apartheid"?',
    options: ['Segregation', 'Racial Integration / Equality', 'Discrimination', 'Chauvinism'],
    correct: 1,
    explanation: '"Apartheid" means racial segregation; its antonym is integration and equality.'
  },
  {
    id: 3,
    subject: 'Unit 5: Human Rights',
    question: 'The word "Vulnerable" best translates to which Bengali meaning?',
    options: ['নিরাপদ', 'অরক্ষিত / বিপদের ঝুঁকিতে থাকা', 'অহংকারী', 'সাহসী'],
    correct: 1,
    explanation: '"Vulnerable" means exposed to the possibility of being attacked or harmed (অরক্ষিত).'
  }
];
