# E2E Test Infra: HSC English Learner Dashboard

## Test Philosophy
- Opaque-box, requirement-driven. Derived strictly from ORIGINAL_REQUEST.md.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Interaction + Real-World Workload Testing.

## Feature Inventory & Test Matrix
| # | Feature | Requirement Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|-------------------|:------:|:------:|:------:|:------:|
| 1 | 20+ Routing & Auth Guard | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 2 | Unified Navigation Suite | ORIGINAL_REQUEST §R1, R3 | 5 | 5 | ✓ | ✓ |
| 3 | Progress Dashboard (/progress) | ORIGINAL_REQUEST §R2.1 | 5 | 5 | ✓ | ✓ |
| 4 | Leaderboard (/leaderboard) | ORIGINAL_REQUEST §R2.2 | 5 | 5 | ✓ | ✓ |
| 5 | Textbook Reader (/textbook) | ORIGINAL_REQUEST §R2.3 | 5 | 5 | ✓ | ✓ |
| 6 | Certificates (/certificates) | ORIGINAL_REQUEST §R2.4 | 5 | 5 | ✓ | ✓ |
| 7 | Personal Notes & FAB (/notes) | ORIGINAL_REQUEST §R2.5 | 5 | 5 | ✓ | ✓ |
| 8 | Settings Page (/settings) | ORIGINAL_REQUEST §R2.6 | 5 | 5 | ✓ | ✓ |
| 9 | About & Contact (/about) | ORIGINAL_REQUEST §R2.7 | 5 | 5 | ✓ | ✓ |
| 10 | Enhanced Admin Sub-pages | ORIGINAL_REQUEST §R2.8 | 5 | 5 | ✓ | ✓ |
| 11 | Landing Page Visual Redesign | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 12 | Dashboard Action Cards & Ring | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 13 | HSC Exam Interface & Animations | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 14 | 3D Flashcards & Confetti | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 15 | Vocabulary Bank Table | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 16 | Admin Layout & Tables | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 17 | Core Rules (Master Admin, Weak Words) | AGENTS.md / GEMINI.md | 5 | 5 | ✓ | ✓ |
| 18 | Production Build & Deployment | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test Suite Runner: Node.js / Vite build and Puppeteer E2E validation script in `scripts/test_e2e_suite.mjs`
- Test Output: JSON and Markdown summary report

## Coverage Thresholds
- Tier 1: Feature Coverage (≥5 tests per feature)
- Tier 2: Boundary & Corner Cases (≥5 tests per feature)
- Tier 3: Cross-Feature Combinations (Pairwise matrix)
- Tier 4: Real-World Scenarios (Student full journey, Admin moderation journey, Offline fallback)
