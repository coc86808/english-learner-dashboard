import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(walk(fullPath));
    else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html')) results.push(fullPath);
  });
  return results;
}

const files = walk('src');
const bgClasses = new Set();
const borderClasses = new Set();
const hoverBgClasses = new Set();
const fromClasses = new Set();
const viaClasses = new Set();
const toClasses = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');

  // Match all arbitrary bg classes including /opacity
  const reBg = /(?:^|\s|\b)((?:hover:)?bg-\[#[a-fA-F0-9]+\](?:\/[0-9]+)?)/g;
  let m;
  while ((m = reBg.exec(content)) !== null) {
    const cls = m[1];
    if (cls.startsWith('hover:')) {
      hoverBgClasses.add(cls);
    } else {
      bgClasses.add(cls);
    }
  }

  // Match all arbitrary border classes including /opacity
  const reBorder = /(?:^|\s|\b)((?:hover:)?border-\[#[a-fA-F0-9]+\](?:\/[0-9]+)?)/g;
  while ((m = reBorder.exec(content)) !== null) {
    borderClasses.add(m[1]);
  }

  // Match gradients
  const reGrad = /(?:^|\s|\b)((?:from|via|to)-\[#[a-fA-F0-9]+\](?:\/[0-9]+)?)/g;
  while ((m = reGrad.exec(content)) !== null) {
    const cls = m[1];
    if (cls.startsWith('from-')) fromClasses.add(cls);
    if (cls.startsWith('via-')) viaClasses.add(cls);
    if (cls.startsWith('to-')) toClasses.add(cls);
  }
});

function esc(cls) {
  let isHover = false;
  let raw = cls;
  if (raw.startsWith('hover:')) {
    isHover = true;
    raw = raw.replace('hover:', '');
  }
  let out = raw
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/#/g, '\\#')
    .replace(/\//g, '\\/');
  return isHover ? `.hover\\:${out}:hover` : `.${out}`;
}

const darkCanvasClasses = Array.from(bgClasses).filter(c => c.startsWith('bg-[#0')).sort();
const darkCardClasses = Array.from(bgClasses).filter(c => 
  c.startsWith('bg-[#1') && 
  !['bg-[#10b981]', 'bg-[#15803d]', 'bg-[#16A34A]', 'bg-[#1b8a43]', 'bg-[#1d63d8]'].includes(c)
).sort();
const darkBorderClasses = Array.from(borderClasses).filter(c => 
  c.startsWith('border-[#0') || c.startsWith('border-[#1') || c.startsWith('border-[#2')
).sort();
const darkHoverClasses = Array.from(hoverBgClasses).filter(c => 
  c.startsWith('hover:bg-[#0') || 
  c.startsWith('hover:bg-[#1') || 
  c.startsWith('hover:bg-[#2')
).sort();

const darkFromClasses = Array.from(fromClasses).filter(c => 
  c.startsWith('from-[#0') || c.startsWith('from-[#1') || c.startsWith('from-[#2')
).sort();
const darkViaClasses = Array.from(viaClasses).filter(c => 
  c.startsWith('via-[#0') || c.startsWith('via-[#1') || c.startsWith('via-[#2')
).sort();
const darkToClasses = Array.from(toClasses).filter(c => 
  c.startsWith('to-[#0') || c.startsWith('to-[#1') || c.startsWith('to-[#2')
).sort();

console.log('Processed darkCanvasClasses:', darkCanvasClasses.length);
console.log('Processed darkCardClasses:', darkCardClasses.length);
console.log('Processed darkBorderClasses:', darkBorderClasses.length);
console.log('Processed darkHoverClasses:', darkHoverClasses.length);

let css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #0e111a;
    color: #e2e8f0;
    transition: background-color 0.25s ease, color 0.25s ease;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0e111a;
}

::-webkit-scrollbar-thumb {
  background: #1f2738;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2e384d;
}

/* Custom glow animations */
@keyframes flame-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(255, 87, 34, 0.6));
  }
}

.animate-flame {
  animation: flame-pulse 2s infinite ease-in-out;
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* ==========================================================================
   THEME PALETTE 1: SAGE & WARM CREAM (Authentic Botanical System)
   - Sage Green:       #8FA28A (Primary Accent & Interactive)
   - Light Sage:       #C7D3C0 (Hairlines, Borders & Dividers)
   - Warm Cream Canvas:#F7F4ED (Background & App Shell)
   - Warm Sand/Gold:   #C8A96B (Streaks, Trophies, XP & Milestones)
   - Contrast Surfaces:#FFFFFF (Clean Crisp Cards & Floating Arenas)
   - Inset Surfaces:   #F2EFE7 (Secondary Inset Containers)
   - Deep Forest Text: #1C281F (Headings & Bold Labels)
   - Forest Slate Text:#4F6352 (Body & Secondary Info)
   - Sage Muted Text:  #718574 (Subtitles & Meta Captions)
   ========================================================================== */

[data-theme="sage-cream"] {
  --theme-bg-main: #F7F4ED;
  --theme-bg-card: #FFFFFF;
  --theme-bg-elevated: #F2EFE7;
  --theme-border: #C7D3C0;
  --theme-primary: #8FA28A;
  --theme-primary-hover: #7A8D76;
  --theme-light-sage: #C7D3C0;
  --theme-ochre-gold: #C8A96B;
  --theme-text-title: #1C281F;
  --theme-text-body: #2B3A2E;
  --theme-text-muted: #556B58;
}

[data-theme="sage-cream"],
[data-theme="sage-cream"] body,
[data-theme="sage-cream"] #root,
[data-theme="sage-cream"] main {
  background-color: #F7F4ED !important;
  color: #2B3A2E !important;
}

/* 1. Main Canvas & Outer Backgrounds (Direct classes + Wildcard) */
${darkCanvasClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .bg-\\[\\#F7F9FC\\],
[data-theme="sage-cream"] .bg-slate-950,
[data-theme="sage-cream"] [class*="bg-[#0"] {
  background-color: #F7F4ED !important;
}

/* 2. All Card Arenas, Modals, Panels & Surfaces (Direct classes + Wildcard) */
${darkCardClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .bg-white,
[data-theme="sage-cream"] .bg-slate-900,
[data-theme="sage-cream"] .bg-slate-900\\/60,
[data-theme="sage-cream"] .bg-slate-900\\/80,
[data-theme="sage-cream"] .bg-slate-800,
[data-theme="sage-cream"] .bg-slate-800\\/30,
[data-theme="sage-cream"] .bg-slate-800\\/80,
[data-theme="sage-cream"] .bg-slate-700,
[data-theme="sage-cream"] .bg-slate-700\\/60,
[data-theme="sage-cream"] [class*="bg-[#1"] {
  background-color: #FFFFFF !important;
}

/* 3. Inset & Secondary Sub-Containers */
[data-theme="sage-cream"] .bg-\\[\\#F8FAFC\\],
[data-theme="sage-cream"] .bg-slate-50,
[data-theme="sage-cream"] .bg-slate-100,
[data-theme="sage-cream"] .bg-slate-200,
[data-theme="sage-cream"] .bg-\\[\\#090d15\\],
[data-theme="sage-cream"] .bg-\\[\\#161c2b\\],
[data-theme="sage-cream"] .bg-\\[\\#10141f\\],
[data-theme="sage-cream"] .bg-\\[\\#182133\\],
[data-theme="sage-cream"] .bg-\\[\\#141b29\\],
[data-theme="sage-cream"] .bg-\\[\\#192233\\],
[data-theme="sage-cream"] .bg-\\[\\#1f293d\\] {
  background-color: #F2EFE7 !important;
}

/* 4. Primary Sage Green Accents (#8FA28A) */
[data-theme="sage-cream"] .bg-\\[\\#2563EB\\],
[data-theme="sage-cream"] .bg-\\[\\#1d63d8\\],
[data-theme="sage-cream"] .bg-\\[\\#0284c7\\],
[data-theme="sage-cream"] .bg-emerald-500,
[data-theme="sage-cream"] .bg-emerald-600 {
  background-color: #8FA28A !important;
  color: #FFFFFF !important;
}

[data-theme="sage-cream"] .hover\\:bg-\\[\\#1D4ED8\\]:hover,
[data-theme="sage-cream"] .hover\\:bg-emerald-600:hover,
[data-theme="sage-cream"] .hover\\:bg-emerald-500:hover {
  background-color: #7A8D76 !important;
}

[data-theme="sage-cream"] .text-\\[\\#2563EB\\],
[data-theme="sage-cream"] .text-emerald-400,
[data-theme="sage-cream"] .text-emerald-300,
[data-theme="sage-cream"] .text-emerald-500 {
  color: #436440 !important;
}

[data-theme="sage-cream"] .border-\\[\\#2563EB\\],
[data-theme="sage-cream"] .border-emerald-500,
[data-theme="sage-cream"] .border-emerald-400,
[data-theme="sage-cream"] .border-emerald-500\\/30,
[data-theme="sage-cream"] .border-emerald-500\\/40,
[data-theme="sage-cream"] .border-emerald-500\\/50,
[data-theme="sage-cream"] .border-emerald-400\\/40,
[data-theme="sage-cream"] .border-emerald-400\\/60 {
  border-color: #8FA28A !important;
}

/* Primary Action Tints & Pills */
[data-theme="sage-cream"] .bg-\\[\\#EFF6FF\\],
[data-theme="sage-cream"] .bg-blue-50,
[data-theme="sage-cream"] .bg-blue-50\\/60,
[data-theme="sage-cream"] .bg-blue-500\\/10,
[data-theme="sage-cream"] .bg-blue-500\\/20,
[data-theme="sage-cream"] .bg-emerald-500\\/10,
[data-theme="sage-cream"] .bg-emerald-500\\/15,
[data-theme="sage-cream"] .bg-emerald-500\\/20,
[data-theme="sage-cream"] .bg-emerald-950\\/20,
[data-theme="sage-cream"] .bg-emerald-950\\/30,
[data-theme="sage-cream"] .bg-emerald-950\\/40,
[data-theme="sage-cream"] .bg-emerald-950\\/50,
[data-theme="sage-cream"] .bg-emerald-950\\/60,
[data-theme="sage-cream"] .bg-emerald-950\\/80,
[data-theme="sage-cream"] .bg-emerald-950\\/90,
[data-theme="sage-cream"] .bg-emerald-950\\/95,
[data-theme="sage-cream"] .bg-\\[\\#064e3b\\] {
  background-color: rgba(143, 162, 138, 0.18) !important;
  color: #2F472D !important;
}

/* 5. Warm Ochre Gold Accents (#C8A96B) */
[data-theme="sage-cream"] .bg-\\[\\#F59E0B\\],
[data-theme="sage-cream"] .bg-\\[\\#C8A96B\\],
[data-theme="sage-cream"] .bg-\\[\\#d97706\\],
[data-theme="sage-cream"] .bg-amber-500,
[data-theme="sage-cream"] .bg-amber-600,
[data-theme="sage-cream"] .bg-orange-500 {
  background-color: #C8A96B !important;
  color: #FFFFFF !important;
}

[data-theme="sage-cream"] .text-\\[\\#F59E0B\\],
[data-theme="sage-cream"] .text-amber-400,
[data-theme="sage-cream"] .text-amber-300,
[data-theme="sage-cream"] .text-orange-400,
[data-theme="sage-cream"] .text-yellow-400 {
  color: #967430 !important;
}

[data-theme="sage-cream"] .fill-\\[\\#F59E0B\\] {
  fill: #C8A96B !important;
}

[data-theme="sage-cream"] .border-amber-500,
[data-theme="sage-cream"] .border-amber-500\\/30,
[data-theme="sage-cream"] .border-amber-500\\/40,
[data-theme="sage-cream"] .border-amber-500\\/50,
[data-theme="sage-cream"] .border-orange-500\\/30 {
  border-color: #C8A96B !important;
}

[data-theme="sage-cream"] .bg-\\[\\#FFFBEB\\],
[data-theme="sage-cream"] .bg-amber-500\\/10,
[data-theme="sage-cream"] .bg-amber-500\\/15,
[data-theme="sage-cream"] .bg-amber-500\\/20,
[data-theme="sage-cream"] .bg-orange-500\\/20 {
  background-color: rgba(200, 169, 107, 0.22) !important;
  color: #6E511A !important;
}

/* 6. Hairline Borders -> Light Sage (#C7D3C0) */
${darkBorderClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .border-\\[\\#E5E7EB\\],
[data-theme="sage-cream"] .border-\\[\\#E2E8F0\\],
[data-theme="sage-cream"] .border-\\[\\#F1F5F9\\],
[data-theme="sage-cream"] .border-slate-800,
[data-theme="sage-cream"] .border-slate-700,
[data-theme="sage-cream"] .border-slate-300,
[data-theme="sage-cream"] .border-slate-200,
[data-theme="sage-cream"] .border-blue-100,
[data-theme="sage-cream"] [class*="border-[#1"],
[data-theme="sage-cream"] [class*="border-[#2"] {
  border-color: #C7D3C0 !important;
}

/* 7. Hover Background States */
${darkHoverClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .hover\\:bg-slate-800:hover,
[data-theme="sage-cream"] .hover\\:bg-slate-900:hover,
[data-theme="sage-cream"] .hover\\:bg-slate-50:hover,
[data-theme="sage-cream"] .hover\\:bg-slate-100:hover,
[data-theme="sage-cream"] .hover\\:bg-\\[\\#F8FAFC\\]:hover {
  background-color: #E8E4D8 !important;
}

/* 8. Typography Headings & Body */
[data-theme="sage-cream"] .text-white,
[data-theme="sage-cream"] .text-slate-100,
[data-theme="sage-cream"] .text-slate-200,
[data-theme="sage-cream"] .text-\\[\\#172033\\] {
  color: #1C281F !important;
}

[data-theme="sage-cream"] .text-slate-300,
[data-theme="sage-cream"] .text-slate-400,
[data-theme="sage-cream"] .text-\\[\\#64748B\\] {
  color: #4F6352 !important;
}

[data-theme="sage-cream"] .text-slate-500,
[data-theme="sage-cream"] .text-slate-600 {
  color: #718574 !important;
}

/* 9. Form Inputs, Selects & Textareas Specificity Fix */
[data-theme="sage-cream"] input,
[data-theme="sage-cream"] textarea,
[data-theme="sage-cream"] select,
[data-theme="sage-cream"] input[class*="bg-"],
[data-theme="sage-cream"] textarea[class*="bg-"],
[data-theme="sage-cream"] select[class*="bg-"] {
  background-color: #FFFFFF !important;
  border-color: #C7D3C0 !important;
  color: #1C281F !important;
}

[data-theme="sage-cream"] option {
  background-color: #FFFFFF !important;
  color: #1C281F !important;
}

[data-theme="sage-cream"] input::placeholder,
[data-theme="sage-cream"] textarea::placeholder {
  color: #8C9F8E !important;
}

/* 10. Table Styling */
[data-theme="sage-cream"] thead,
[data-theme="sage-cream"] thead.bg-\\[\\#065f46\\] {
  background-color: #8FA28A !important;
  color: #FFFFFF !important;
}
[data-theme="sage-cream"] tbody tr:nth-child(even) {
  background-color: #FAF8F2 !important;
}
[data-theme="sage-cream"] tbody tr:nth-child(odd) {
  background-color: #FFFFFF !important;
}
[data-theme="sage-cream"] tbody tr:hover {
  background-color: #EFECE3 !important;
}
[data-theme="sage-cream"] .divide-\\[\\#1b2537\\] > :not([hidden]) ~ :not([hidden]) {
  border-color: #C7D3C0 !important;
}

/* 11. Gradients for Banners, 3D Flashcards & Overlays */
${darkFromClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .from-emerald-950\\/40,
[data-theme="sage-cream"] .from-emerald-900\\/40 {
  --tw-gradient-from: #FFFFFF !important;
}

${darkViaClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')} {
  --tw-gradient-stops: var(--tw-gradient-from), #FAF8F2, var(--tw-gradient-to) !important;
}

${darkToClasses.map(c => `[data-theme="sage-cream"] ${esc(c)}`).join(',\n')},
[data-theme="sage-cream"] .to-\\[\\#0f172a\\],
[data-theme="sage-cream"] .to-\\[\\#0c101a\\] {
  --tw-gradient-to: #F7F4ED !important;
}

/* 12. Header & Navigation */
[data-theme="sage-cream"] header {
  background-color: rgba(247, 244, 237, 0.95) !important;
  border-bottom-color: #C7D3C0 !important;
}

[data-theme="sage-cream"] nav {
  background-color: rgba(247, 244, 237, 0.96) !important;
  border-top-color: #C7D3C0 !important;
}

[data-theme="sage-cream"] .ring-\\[\\#0c0f17\\] {
  --tw-ring-color: #F7F4ED !important;
}

/* 13. Card Shadows & Scrollbars */
[data-theme="sage-cream"] .shadow-card {
  box-shadow: 0 4px 20px -2px rgba(143, 162, 138, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.04) !important;
}

[data-theme="sage-cream"] ::-webkit-scrollbar-track {
  background: #F7F4ED;
}
[data-theme="sage-cream"] ::-webkit-scrollbar-thumb {
  background: #C7D3C0;
}
[data-theme="sage-cream"] ::-webkit-scrollbar-thumb:hover {
  background: #8FA28A;
}

/* ==========================================================================
   THEME PALETTE 2: SAGE FOREST DARK
   Dark aesthetic honoring the same palette colors
   ========================================================================== */
[data-theme="sage-dark"] {
  --theme-bg-main: #111813;
  --theme-bg-card: #18231C;
  --theme-bg-elevated: #141D17;
  --theme-border: #2D4032;
  --theme-primary: #8FA28A;
  --theme-primary-hover: #A3B69E;
  --theme-ochre-gold: #C8A96B;
  --theme-text-title: #F7F4ED;
  --theme-text-body: #C7D3C0;
  --theme-text-muted: #8EAA94;
}

[data-theme="sage-dark"],
[data-theme="sage-dark"] body,
[data-theme="sage-dark"] #root,
[data-theme="sage-dark"] main {
  background-color: #111813 !important;
  color: #F7F4ED !important;
}

${darkCanvasClasses.map(c => `[data-theme="sage-dark"] ${esc(c)}`).join(',\n')},
[data-theme="sage-dark"] .bg-\\[\\#F7F9FC\\] {
  background-color: #111813 !important;
}

${darkCardClasses.map(c => `[data-theme="sage-dark"] ${esc(c)}`).join(',\n')},
[data-theme="sage-dark"] .bg-white {
  background-color: #18231C !important;
}

[data-theme="sage-dark"] .bg-\\[\\#F8FAFC\\] {
  background-color: #141D17 !important;
}

${darkBorderClasses.map(c => `[data-theme="sage-dark"] ${esc(c)}`).join(',\n')},
[data-theme="sage-dark"] .border-\\[\\#E5E7EB\\],
[data-theme="sage-dark"] .border-\\[\\#E2E8F0\\],
[data-theme="sage-dark"] .border-\\[\\#F1F5F9\\],
[data-theme="sage-dark"] .border-slate-300,
[data-theme="sage-dark"] .border-slate-200 {
  border-color: #2D4032 !important;
}

[data-theme="sage-dark"] .text-white,
[data-theme="sage-dark"] .text-slate-100,
[data-theme="sage-dark"] .text-\\[\\#172033\\] {
  color: #F7F4ED !important;
}

[data-theme="sage-dark"] .text-slate-200,
[data-theme="sage-dark"] .text-slate-300 {
  color: #C7D3C0 !important;
}

[data-theme="sage-dark"] .text-slate-400,
[data-theme="sage-dark"] .text-slate-500,
[data-theme="sage-dark"] .text-\\[\\#64748B\\] {
  color: #8EAA94 !important;
}

[data-theme="sage-dark"] .text-emerald-400,
[data-theme="sage-dark"] .text-emerald-300 {
  color: #9EC098 !important;
}

[data-theme="sage-dark"] .bg-emerald-500,
[data-theme="sage-dark"] .bg-emerald-600,
[data-theme="sage-dark"] .bg-\\[\\#2563EB\\] {
  background-color: #8FA28A !important;
  color: #111813 !important;
}

[data-theme="sage-dark"] .border-emerald-500,
[data-theme="sage-dark"] .border-emerald-500\\/30,
[data-theme="sage-dark"] .border-emerald-500\\/40 {
  border-color: #8FA28A !important;
}

[data-theme="sage-dark"] .text-amber-400,
[data-theme="sage-dark"] .text-amber-300 {
  color: #E2C485 !important;
}

[data-theme="sage-dark"] .bg-amber-500,
[data-theme="sage-dark"] .bg-amber-600 {
  background-color: #C8A96B !important;
  color: #111813 !important;
}

/* ==========================================================================
   THEME PALETTE 3: CYBER DARK (Default Cyber-Academic Theme)
   Deep Navy & Emerald Accent
   ========================================================================== */
[data-theme="cyber-dark"] .bg-\\[\\#F7F9FC\\] {
  background-color: #0c0f17 !important;
}
[data-theme="cyber-dark"] .bg-\\[\\#F8FAFC\\] {
  background-color: #0e1320 !important;
}
[data-theme="cyber-dark"] .bg-white {
  background-color: #111723 !important;
}
[data-theme="cyber-dark"] .border-\\[\\#E5E7EB\\],
[data-theme="cyber-dark"] .border-\\[\\#E2E8F0\\],
[data-theme="cyber-dark"] .border-\\[\\#F1F5F9\\],
[data-theme="cyber-dark"] .border-slate-200,
[data-theme="cyber-dark"] .border-slate-300 {
  border-color: #1f2738 !important;
}
[data-theme="cyber-dark"] .text-\\[\\#172033\\] {
  color: #ffffff !important;
}
[data-theme="cyber-dark"] .text-\\[\\#64748B\\] {
  color: #94a3b8 !important;
}

/* ==========================================================================
   THEME PALETTE 4: PURE BLACK OLED
   High Contrast Pitch Black
   ========================================================================== */
[data-theme="pure-black"],
[data-theme="pure-black"] body,
[data-theme="pure-black"] #root,
[data-theme="pure-black"] main {
  background-color: #000000 !important;
}

${darkCanvasClasses.map(c => `[data-theme="pure-black"] ${esc(c)}`).join(',\n')},
${darkCardClasses.map(c => `[data-theme="pure-black"] ${esc(c)}`).join(',\n')},
[data-theme="pure-black"] .bg-\\[\\#F7F9FC\\],
[data-theme="pure-black"] .bg-\\[\\#F8FAFC\\],
[data-theme="pure-black"] .bg-white {
  background-color: #000000 !important;
}

${darkBorderClasses.map(c => `[data-theme="pure-black"] ${esc(c)}`).join(',\n')},
[data-theme="pure-black"] .border-\\[\\#E5E7EB\\],
[data-theme="pure-black"] .border-\\[\\#E2E8F0\\],
[data-theme="pure-black"] .border-\\[\\#F1F5F9\\],
[data-theme="pure-black"] .border-slate-200,
[data-theme="pure-black"] .border-slate-700,
[data-theme="pure-black"] .border-slate-800 {
  border-color: #27272a !important;
}

[data-theme="pure-black"] .text-\\[\\#172033\\] {
  color: #ffffff !important;
}
[data-theme="pure-black"] .text-\\[\\#64748B\\] {
  color: #a1a1aa !important;
}
`;

fs.writeFileSync('src/index.css', css);
console.log('Successfully generated complete src/index.css with length:', css.length);
