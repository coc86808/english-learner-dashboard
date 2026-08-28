export const mockSubjects = [
  {
    id: 'bangla',
    name: 'বাংলা',
    nameEn: 'Bangla',
    progress: 12,
    totalTopics: 18,
    completedTopics: 2,
    subtopics: [
      { name: 'বাংলা ব্যাকরণ (সন্ধি ও সমাস)', progress: 25 },
      { name: 'বাংলা ১ম পত্র (গদ্য ও পদ্য)', progress: 10 },
      { name: 'বাগধারা ও প্রবাদ প্রবচন', progress: 0 },
    ]
  },
  {
    id: 'gk',
    name: 'সাধারণ জ্ঞান',
    nameEn: 'General Knowledge',
    progress: 1,
    totalTopics: 30,
    completedTopics: 1,
    subtopics: [
      { name: 'বাংলাদেশ বিষয়াবলী', progress: 5 },
      { name: 'আন্তর্জাতিক বিষয়াবলী', progress: 0 },
      { name: 'সাম্প্রতিক তথ্য ও গবেষণা', progress: 0 },
    ]
  },
  {
    id: 'statistics',
    name: 'পরিসংখ্যান',
    nameEn: 'Statistics',
    progress: 8,
    totalTopics: 12,
    completedTopics: 1,
    subtopics: [
      { name: 'কেন্দ্রীয় প্রবণতার পরিমাপ', progress: 20 },
      { name: 'সম্ভাবনা ও বিস্তার পরিমাপ', progress: 0 },
    ]
  },
  {
    id: 'accounting',
    name: 'হিসাববিজ্ঞান',
    nameEn: 'Accounting',
    progress: 30,
    totalTopics: 16,
    completedTopics: 5,
    subtopics: [
      { name: 'হিসাব সমীকরণ ও দাখিলা', progress: 60 },
      { name: 'রেওয়ামিল ও কার্যপত্র', progress: 30 },
      { name: 'আর্থিক বিবরণী বিশ্লেষণ', progress: 0 },
    ]
  },
  {
    id: 'agriculture',
    name: 'কৃষিশিক্ষা',
    nameEn: 'Agriculture Studies',
    progress: 11,
    totalTopics: 14,
    completedTopics: 2,
    subtopics: [
      { name: 'কৃষি প্রযুক্তি ও যন্ত্রপাতি', progress: 25 },
      { name: 'ফসল উৎপাদন পদ্ধতি', progress: 10 },
    ]
  }
];

export const mockRecentExams = [
  {
    id: 'exam-1',
    title: 'BBA (IBA) Admission Test 2022-2023',
    date: '২৯ আগস্ট ২০২৬',
    dateEn: '29 Aug 2026',
    score: '০.৭৫/৯৫',
    scoreRaw: '0.75/95',
    category: 'BBA (IBA) ADMISSION TEST 2022-2023',
    status: 'completed',
    accuracy: '12%',
    totalQuestions: 95
  },
  {
    id: 'exam-2',
    title: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা',
    subtitle: '১ম পত্র',
    date: '১৭ আগস্ট ২০২৬',
    dateEn: '17 Aug 2026',
    score: '০/২',
    scoreRaw: '0/2',
    category: 'HSC',
    status: 'completed',
    accuracy: '0%',
    totalQuestions: 2
  },
  {
    id: 'exam-3',
    title: 'English',
    subtitle: 'English Admission',
    date: '১৬ আগস্ট ২০২৬',
    dateEn: '16 Aug 2026',
    score: '৩/৫',
    scoreRaw: '3/5',
    category: 'HSC',
    status: 'completed',
    accuracy: '60%',
    totalQuestions: 5
  },
  {
    id: 'exam-4',
    title: 'IELTS Grammar & Vocab Booster Test',
    subtitle: 'English Mastery',
    date: '১৫ আগস্ট ২০২৬',
    dateEn: '15 Aug 2026',
    score: '১৮/২০',
    scoreRaw: '18/20',
    category: 'ADMISSION',
    status: 'completed',
    accuracy: '90%',
    totalQuestions: 20
  }
];

export const mockStreakDays = [
  { day: 'শনি', dayEn: 'Sat', active: false },
  { day: 'রবি', dayEn: 'Sun', active: false },
  { day: 'সোম', dayEn: 'Mon', active: false },
  { day: 'মঙ্গল', dayEn: 'Tue', active: false },
  { day: 'বুধ', dayEn: 'Wed', active: true },
  { day: 'বৃহ', dayEn: 'Thu', active: true },
  { day: 'শুক্র', dayEn: 'Fri', active: true, today: true },
];

export const mockDailyPoints = [
  { day: 'Sat', dayBn: 'শনি', points: 15, date: 'Aug 23' },
  { day: 'Sun', dayBn: 'রবি', points: 0, date: 'Aug 24' },
  { day: 'Mon', dayBn: 'সোম', points: 25, date: 'Aug 25' },
  { day: 'Tue', dayBn: 'মঙ্গল', points: 40, date: 'Aug 26' },
  { day: 'Wed', dayBn: 'বুধ', points: 70, date: 'Aug 27' },
  { day: 'Thu', dayBn: 'বৃহ', points: 95, date: 'Aug 28' },
  { day: 'Fri', dayBn: 'শুক্র', points: 120, date: 'Aug 29' },
];

export const mockQuickQuestions = [
  {
    id: 1,
    subject: 'English Vocabulary',
    question: 'What is the synonym of the word "Meticulous"?',
    options: ['Careless', 'Diligent / Thorough', 'Speedy', 'Hesitant'],
    correct: 1,
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise.'
  },
  {
    id: 2,
    subject: 'English Grammar',
    question: 'Choose the correct preposition: "She is confident ___ her victory."',
    options: ['with', 'in', 'of', 'for'],
    correct: 2,
    explanation: 'The adjective "confident" takes the preposition "of" (confident of something).'
  },
  {
    id: 3,
    subject: 'বাংলা ব্যাকরণ',
    question: 'কোনটি শুদ্ধ বানান?',
    options: ['মরিচীকা', 'মরীচিকা', 'মরিচিকা', 'মরীচীকা'],
    correct: 1,
    explanation: 'সঠিক বানান হলো "মরীচিকা" (ম + র দীর্ঘ-ঈ কার + চ হ্রস্ব-ই কার + কা)।'
  }
];
