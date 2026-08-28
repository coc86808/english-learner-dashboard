import { hscUnits } from './hscUnitsData';

export const mockSubjects = hscUnits.map((u) => ({
  id: u.id,
  name: `${u.unitNumber}: ${u.unitTitleBn}`,
  nameEn: `${u.unitNumber}: ${u.unitTitle}`,
  progress: 0,
  totalTopics: u.lessons.length,
  completedTopics: 0,
  subtopics: u.lessons.map((l) => ({
    name: `${l.number}: ${l.title} (${l.titleBn})`,
    progress: 0
  }))
}));

// Clean initial exams list with zero fake progress
export const mockRecentExams = [];

export const mockDailyPoints = [
  { day: 'Sat', points: 0, dayBn: 'শনি' },
  { day: 'Sun', points: 0, dayBn: 'রবি' },
  { day: 'Mon', points: 0, dayBn: 'সোম' },
  { day: 'Tue', points: 0, dayBn: 'মঙ্গল' },
  { day: 'Wed', points: 0, dayBn: 'বুধ' },
  { day: 'Thu', points: 0, dayBn: 'বৃহ' },
  { day: 'Fri', points: 0, dayBn: 'শুক্র' }
];

export const mockStreakDays = [
  { dayName: 'Sat', dayNameBn: 'শনি', active: false },
  { dayName: 'Sun', dayNameBn: 'রবি', active: false },
  { dayName: 'Mon', dayNameBn: 'সোম', active: false },
  { dayName: 'Tue', dayNameBn: 'মঙ্গল', active: false },
  { dayName: 'Wed', dayNameBn: 'বুধ', active: false },
  { dayName: 'Thu', dayNameBn: 'বৃহ', active: false },
  { dayName: 'Fri', dayNameBn: 'শুক্র', active: false }
];
