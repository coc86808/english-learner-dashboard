---
name: browser-visual-automation
description: Visual browser automation workflow. Use when you need to open a browser, see the screen (take screenshots), click elements, fill inputs, test UI interactions, or verify visual layouts on web pages.
---

# Browser Visual Automation Skill (See & Click)

This skill provides step-by-step guidance for visual browser automation using Puppeteer tools to open web pages, observe the visual state, and interact with elements.

---

## 1. Core Tool Chain

| Action | Primary Tool | Description |
| :--- | :--- | :--- |
| **Open Browser / Page** | puppeteer_navigate | Navigates to target URL and waits for page load |
| **See Screen (Screenshot)** | puppeteer_screenshot | Captures full-page or element screenshot |
| **Locate Elements** | puppeteer_evaluate | Inspects DOM selectors, coordinates, and text |
| **Click Element** | puppeteer_click | Triggers mouse click on CSS selector or coordinates |
| **Type / Fill Form** | puppeteer_fill | Enters text into inputs and search bars |
| **Hover / Focus** | puppeteer_hover | Triggers mouse hover state for menus/dropdowns |

---

## 2. Closed-Loop 'See & Click' Execution Cycle

Always follow the 4-phase observation loop:

1. **Open / Navigate**: Call puppeteer_navigate with target URL (e.g., https://english-learner-dashboard.vercel.app or http://localhost:5173).
2. **See Screen (Screenshot)**: Call puppeteer_screenshot to view the current rendered UI. Use puppeteer_evaluate to inspect dynamic text, button IDs, and classes.
3. **Locate & Click**: Execute puppeteer_click on the target button, link, or tab using a precise CSS selector. If ambiguous, query elements by text in puppeteer_evaluate and trigger .click().
4. **Verify Result**: Take a follow-up screenshot to verify the action succeeded (e.g., modal opened, route changed, answer highlighted).

---

## 3. Standard UI Test Scenarios (English Learner Dashboard)

### Scenario A: Testing MCQ Exam & Selection
1. Navigate to /exam.
2. Take screenshot of the Unit/Lesson list.
3. Click on targeted lesson card or 'MCQ পরীক্ষা' button.
4. Verify exam interface loads with question, 4 options, and timer.
5. Click an option and verify feedback animation (green correct / red wrong).

### Scenario B: Testing 3D Flashcards Flip
1. Navigate to /flashcards.
2. Take screenshot of front card.
3. Click card or 'Flip Card' button.
4. Take screenshot of back card (Bangla meaning, synonyms, example sentence).

### Scenario C: Mobile Responsive Inspection
1. Call puppeteer_screenshot with width: 375, height: 812 to simulate smartphone view.
2. Verify MobileBottomNav icons, hamburger menu, and touch targets.
