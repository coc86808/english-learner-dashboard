import { hscUnits } from '../data/hscUnitsData';

/**
 * Format a URL-friendly slug for a unit
 * e.g. "UNIT-1_Education_and_Life" or "UNIT-10_Manners_and_Etiquette"
 */
export function formatUnitSlug(unit) {
  if (!unit) return '';
  const num = (unit.unitNumber || `Unit ${unit.number || 1}`)
    .replace(/\s+/g, '-')
    .toUpperCase();
  const cleanTitle = (unit.unitTitle || '')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return cleanTitle ? `${num}_${cleanTitle}` : num;
}

/**
 * Format a URL-friendly slug for a lesson
 * e.g. "lesson_1" or "lesson_2"
 */
export function formatLessonSlug(lesson) {
  if (!lesson) return '';
  const numMatch = (lesson.number || '').match(/(\d+)/);
  if (numMatch) {
    return `lesson_${numMatch[1]}`;
  }
  const cleanTitle = (lesson.title || '')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return cleanTitle || 'lesson_1';
}

/**
 * Match a unit from any slug or URL parameter
 * Handles:
 * - "UNIT-1Education_and _Life"
 * - "UNIT-1_Education_and_Life"
 * - "unit-1"
 * - "unit1"
 * - "1"
 */
export function matchUnitFromSlug(slug, unitsList = hscUnits) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug).trim();
  const clean = decoded.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Direct ID match (e.g. "unit-1", "unit1")
  const byId = unitsList.find(
    (u) => u.id.replace(/[^a-z0-9]/g, '') === clean
  );
  if (byId) return byId;

  // 2. Unit number extraction (e.g. "unit-1", "unit 1", "unit1", "1")
  const numMatch = decoded.match(/unit[-_\s]*(\d+)/i) || decoded.match(/^(\d+)$/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    const byNum = unitsList.find(
      (u) => u.number === num || u.id === `unit-${num}`
    );
    if (byNum) return byNum;
  }

  // 3. Match by unit title substring
  const byTitle = unitsList.find((u) => {
    const uTitleClean = u.unitTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean.includes(uTitleClean) || uTitleClean.includes(clean);
  });
  if (byTitle) return byTitle;

  return null;
}

/**
 * Match a lesson from any slug or URL parameter within a unit
 * Handles:
 * - "lesson_1", "lesson-1", "lesson1"
 * - "l1", "1"
 * - "the_parrots_tale"
 */
export function matchLessonFromSlug(slug, unit) {
  if (!slug || !unit || !Array.isArray(unit.lessons)) return null;
  const decoded = decodeURIComponent(slug).trim();
  const clean = decoded.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Direct ID match (e.g. "u1-l1", "u1l1")
  const byId = unit.lessons.find(
    (l) => l.id.replace(/[^a-z0-9]/g, '') === clean
  );
  if (byId) return byId;

  // 2. Extract lesson number (e.g. "lesson_1", "lesson-1", "l1", "1")
  const numMatch =
    decoded.match(/lesson[-_\s]*(\d+)/i) ||
    decoded.match(/l(\d+)/i) ||
    decoded.match(/^(\d+)$/);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    const byNum = unit.lessons.find((l) => {
      const lNumMatch = (l.number || '').match(/(\d+)/);
      return lNumMatch && parseInt(lNumMatch[1], 10) === num;
    });
    if (byNum) return byNum;
  }

  // 3. Match by lesson title substring
  const byTitle = unit.lessons.find((l) => {
    const lTitleClean = (l.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean.includes(lTitleClean) || lTitleClean.includes(clean);
  });
  if (byTitle) return byTitle;

  return null;
}
