/**
 * User and Student Database
 * Only real registered accounts are stored here.
 * 3 verified real accounts: Mohammad Nasim, Riad Sarkar (Dhaka College), Master Admin (Sakin)
 */

export const usersList = [
  {
    id: 'usr-nasim',
    name: 'Mohammad Nasim',
    email: 'mohammad.nasim@gmail.com',
    phone: '',
    college: 'Dhaka College',
    hscBatch: 'HSC 2026',
    streak: 0,
    points: 0,
    testsCompleted: 0,
    masteredWordsCount: 0,
    status: 'Active',
    role: 'Student',
    joinedDate: '01 Sep 2026',
    avatar: ''
  },
  {
    id: 'usr-riad',
    name: 'Riad Sarkar',
    email: 'riad.sarkar@gmail.com',
    phone: '',
    college: 'Dhaka College',
    hscBatch: 'HSC 2026',
    streak: 0,
    points: 0,
    testsCompleted: 0,
    masteredWordsCount: 0,
    status: 'Active',
    role: 'Student',
    joinedDate: '01 Sep 2026',
    avatar: ''
  },
  {
    id: 'usr-admin',
    name: 'Sakin',
    email: 'sakin@gmail.com',
    phone: '+880 1711-000000',
    college: 'Learner Hub Management',
    hscBatch: 'Admin Team',
    streak: 0,
    points: 0,
    testsCompleted: 0,
    masteredWordsCount: 0,
    status: 'Active',
    role: 'Admin',
    joinedDate: '01 Aug 2026',
    avatar: ''
  }
];

export default usersList;
