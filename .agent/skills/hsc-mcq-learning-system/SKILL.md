---
name: hsc-mcq-learning-system
description: Spaced-repetition MCQ learning engine, Quiz Maker Pro architecture, and HSC English textbook curriculum system. Use when designing, building, or modifying quiz, exam, flashcard, or vocabulary learning features.
---

# HSC MCQ Learning & Quiz Maker System Guide

## 1. Spaced Repetition MCQ Algorithm

### Invariant Rules
1. **3 Consecutive Correct Requirement**: Every question must be answered correctly 3 consecutive times to move from `Learning` or `Mistake` to `Done` (Mastered).
2. **Spacing Buffer (3-4 Questions Gap)**: A repeated question must NEVER appear back-to-back. It must be scheduled at `currentIndex + 4` (with 3-4 other questions in between).
3. **100% Mastery Guarantee**: An exam cannot end until `doneCount === totalUniqueQuestions`. If the active queue runs out of scheduled questions, dynamically re-queue all remaining non-done items.
4. **"Not Sure" Mechanism**: "Not sure" counts as a mistake for queue scheduling, but provides instant positive feedback showing the textbook explanation and pronunciation.

## 2. Official 12 HSC Units & Lessons
1. **Unit One: Education and Life** (L1: The Parrot's Tale, L2: Education and Technology, L3: Children in School, L4: Civic Engagement)
2. **Unit Two: Art and Craft** (L1: What is Beauty?, L2: Folk Music, L3: Art, L4: Craft)
3. **Unit Three: Myths and Literature** (L1: Myths of Bengal, L2: Icarus, L3: The Legend of Gazi, L4: Khona)
4. **Unit Four: History** (L1: Three Speeches, L2: Great Women)
5. **Unit Five: Human Rights** (L1: Are We Aware-I, L2: Are We Aware-II, L3: Rights to Health & Education, L4: Coal Miners, L5: Frederick Douglass)
6. **Unit Six: Dreams** (L1: What is a Dream?, L2: Dreams in Literature)
7. **Unit Seven: Youthful Achievers** (L1: Brojen Das, L2: Scaling a Mountain Peak, L3: The Unbeaten Girls)
8. **Unit Eight: Relationships** (L1: Family Relationship, L2: Warmth in Relationships, L3: A Mother in Mannville, L4: Love)
9. **Unit Nine: Adolescence** (L1: Storm & Stresses, L2: Problems in Bangladesh, L3: Story of Shilpi, L4: Say No to Bullying)
10. **Unit Ten: Lifestyle** (L1: Manners, L2: Etiquette Netiquette, L3: Food & Culture, L4: Fitness, L5: Consumerism)
11. **Unit Eleven: Peace and Conflict** (L1: Situations of Conflict, L2: Old Man at Bridge, L3: Stories From Gaza, L4: Peace in Literature, L5: Opinions through images)
12. **Unit Twelve: Environment and Nature** (L1: Water Water Everywhere, L2: Greta Effect, L3: Endangered Species, L4: Environmental Justice, L5: Scientific Method)

## 3. Quiz Maker Features
- Web Audio API sound synthesizer for correct/wrong audio feedback.
- Official printable/downloadable Certificate of Mastery upon 100% completion.
- Admin portal for controlling timers, option shuffling, and CSV data export.
