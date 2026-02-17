## Progressive MCQ Solver – Planner

### 1. Product Vision

- **Goal**: Make school study more fun, puzzle-like, and understanding-focused instead of rote learning.
- **Core idea**: Level-based MCQ and puzzle platform where students progress through topics, unlock harder levels, and see their growth.
- **Target audience**: School students aged **10–13** (approx. grades 5–8).

### 2. Key Concepts & Features (Brainstorm – Age 10–13)

- **Subjects & Topics**
  - Subjects (Math, Science, etc.).
  - Topics → Subtopics → Levels.
  - Each level has a curated set of MCQs and mini-puzzles.

- **Levels & Progression**
  - XP and stars per level (0–3 stars).
  - Unlock next level when accuracy and attempts threshold met.
  - Increasing difficulty curve per level.

- **Gamification**
  - Daily/weekly missions and streaks.
  - Badges (topic mastery, streaks, accuracy milestones).
  - Simple animations and sounds (toggleable).

- **Learning Focus**
  - Hints that encourage reasoning, not giving direct answers.
  - Clear, short explanations after each question (simple language, visuals where possible).
  - Weak-topic detection and revision recommendations.

- **Age 10–13 Specific Ideas**
  - Customizable avatar and nickname.
  - Friendly “guide” character that gives hints and encouragement.
  - Unlockable themes (colors/backgrounds) and stickers as rewards.
  - Very limited text on each screen; rely on icons and short phrases.

### 3. UX / UI Design Plan (Phase 1 – Age 10–13)

- **Style**
  - Bright, playful, but not “babyish”; rounded cards, simple but fun icons.
  - Mobile-first layout with big tap targets and large, legible fonts.
  - Clear separation of tappable elements and information sections.

- **Core Screens (Wireframe Targets)**
  - **Onboarding**
    - Choose grade/class (simple grade picker).
    - Select interested subjects using big icon buttons.
    - 3-step “how it works” walkthrough with illustrations.
  - **Home / Dashboard**
    - “Today’s mission” card (e.g., “Solve 8 Math puzzles”).
    - Subject cards with progress bars and current level.
    - Streak indicator and quick stats (questions solved today, stars).
  - **Subject / Level Map**
    - Visual level path (nodes/tiles for each level).
    - Each level shows stars, progress, and a “Play” button.
  - **Question Play Screen**
    - Question stem and optional image.
    - 4 option buttons.
    - Hint button, timer (optional / exam mode).
    - Feedback state (correct/incorrect, explanation).
  - **Review & Analytics**
    - Accuracy by topic presented with simple charts/bars.
    - Weak topics list with suggestions like “Try Level 1 again”.
    - Recent sessions presented as a simple history of “missions” completed.

> BRAINSTORM: Add any age 10–13 specific UX ideas (e.g., parent view toggle, simpler wording) here.

### 4. Frontend Plan

- **Tech stack (proposed)**
  - React + TypeScript.
  - UI styling with Tailwind CSS or a component library (e.g., Chakra UI).

- **Frontend modules**
  - Auth & onboarding UI.
  - Dashboard and subject/level views.
  - Question engine (MCQ flow, hints, feedback).
  - Progress and analytics views.
  - Settings (sound, theme, difficulty mode).

> TASK: Decide final stack and UI library, then scaffold the project.

### 5. Backend Plan

- **Tech stack (proposed)**
  - Node.js (Express/Nest) or Python (FastAPI/Django REST).

- **Core entities**
  - `User`, `Subject`, `Topic`, `Level`, `Question`, `AnswerOption`,
    `Attempt`, `Progress`, `Badge`.

- **Key APIs (v1)**
  - Auth: signup/login, refresh token.
  - Content: list subjects/topics/levels, fetch questions for a level.
  - Attempts: submit answer, save attempts, compute XP/stars.
  - Progress: get user progress, streaks, badges.

> BRAINSTORM: Note any special rules (e.g., adaptive mixing of difficulties, revision mode) here.

### 6. Progression & Difficulty Logic

- **Difficulty**
  - Per-question difficulty (1–5).
  - Level targets a range, e.g., Level 1: 1–2, Level 2: 2–3, etc.

- **Unlocking levels**
  - Minimum number of questions attempted.
  - Minimum accuracy (e.g., ≥ 70%) or stars earned.

- **Adaptive behavior (simple v1)**
  - Within a level, gradually increase difficulty based on recent streak.
  - Suggest revision set if accuracy drops below a threshold.

### 7. Implementation Phases

- **Phase 1 – Design (Current Phase – Age 10–13)**
  - ✅ Finalize target age range (**10–13**).
  - Decide theme/metaphor (e.g., quest map, galaxy, city-building).
  - Lock in frontend and backend stacks.
  - Create low-fidelity wireframes for:
    - Onboarding.
    - Home / Dashboard.
    - Subject / Level Map.
    - Question Play Screen.
    - Review & Analytics.

- **Phase 2 – Frontend MVP (Mock Data)**
  - Implement major screens with dummy JSON data.
  - Local state for progress and levels.

- **Phase 3 – Backend & Integration**
  - Design DB schema and implement APIs.
  - Connect frontend to real backend.

- **Phase 4 – Enhancements**
  - Better adaptivity, streaks, badges, teacher/parent view, mobile app.

### 8. Open Questions & Ideas

- **Age range**: Middle school, high school, or both (with different “skins”)?
- **Theme**: Quest map, galaxy, city-building, or something else?
- **Social features**: Leaderboards, friend challenges, or strictly personal progress?

> Use this section to jot down new ideas, questions, and decisions as we go.

