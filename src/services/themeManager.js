/**
 * Centralized Theme Manager for Learner Hub
 * Supports the user's requested Sage & Warm Cream palette:
 * Primary Sage: #8FA28A
 * Light Sage: #C7D3C0
 * Warm Cream / Canvas: #F7F4ED
 * Warm Sand / Ochre Gold: #C8A96B
 */

export const AVAILABLE_THEMES = [
  {
    id: 'sage-cream',
    nameEn: 'Sage & Warm Cream',
    nameBn: 'সেজ ও ওয়ার্ম ক্রিম',
    descEn: 'Authentic Botanical Palette (#8FA28A, #C7D3C0, #F7F4ED, #C8A96B)',
    descBn: 'আরামদায়ক সেজ গ্রিন ও ক্রিম প্যালেট',
    colors: ['#8FA28A', '#C7D3C0', '#F7F4ED', '#C8A96B'],
    hexSummary: '#8FA28A • #C7D3C0 • #F7F4ED • #C8A96B',
    type: 'light'
  },
  {
    id: 'sage-dark',
    nameEn: 'Sage Forest Dark',
    nameBn: 'সেজ ফরেস্ট ডার্ক',
    descEn: 'Dark Forest with Sage Green & Ochre Accents',
    descBn: 'ডার্ক ফরেস্ট ক্যানভাস ও সেজ গ্রিন',
    colors: ['#8FA28A', '#C7D3C0', '#131B15', '#C8A96B'],
    hexSummary: '#8FA28A • #131B15 • #C7D3C0 • #C8A96B',
    type: 'dark'
  },
  {
    id: 'cyber-dark',
    nameEn: 'Cyber Dark (Default)',
    nameBn: 'সাইবার ডার্ক (মূল)',
    descEn: 'Deep Navy & Emerald Accent',
    descBn: 'মূল ডার্ক নেভি ও এমারেল্ড থিম',
    colors: ['#10b981', '#06b6d4', '#0c0f17', '#f59e0b'],
    hexSummary: '#0C0F17 • #10B981 • #06B6D4 • #F59E0B',
    type: 'dark'
  },
  {
    id: 'pure-black',
    nameEn: 'Pure Black OLED',
    nameBn: 'পিওর ব্ল্যাক OLED',
    descEn: 'High Contrast Absolute Pitch Black',
    descBn: 'আল্ট্রা হাই-কনট্রাস্ট পিচ ব্ল্যাক',
    colors: ['#000000', '#10b981', '#334155', '#ffffff'],
    hexSummary: '#000000 • #10B981 • #334155 • #FFFFFF',
    type: 'dark'
  }
];

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'cyber-dark';
  try {
    const saved = localStorage.getItem('hsc_theme');
    if (saved && AVAILABLE_THEMES.some(t => t.id === saved)) return saved;
  } catch (e) {}
  // Default to Cyber-Academic Command (Rule 8 / DESIGN.md)
  return 'cyber-dark';
}

export function applyTheme(themeId) {
  if (typeof document === 'undefined') return themeId;
  const validTheme = AVAILABLE_THEMES.some(t => t.id === themeId) ? themeId : 'cyber-dark';
  
  // Set both html and body attributes for CSS targeting
  document.documentElement.setAttribute('data-theme', validTheme);
  if (document.body) {
    document.body.setAttribute('data-theme', validTheme);
  }

  try {
    localStorage.setItem('hsc_theme', validTheme);
  } catch (e) {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hsc_theme_changed', { detail: { theme: validTheme } }));
  }
  return validTheme;
}

// Automatically apply theme on initial script execution
if (typeof window !== 'undefined') {
  const initialTheme = getStoredTheme();
  applyTheme(initialTheme);
}
