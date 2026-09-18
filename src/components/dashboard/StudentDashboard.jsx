import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

// Import All 11 Modular Dashboard Components
import WelcomeHero from './WelcomeHero';
import TopStatsSummary from './TopStatsSummary';
import DailyGoalCard from './DailyGoalCard';
import ContinueLearningCard from './ContinueLearningCard';
import RecommendedPractice from './RecommendedPractice';
import SkillProgress from './SkillProgress';
import WeakAreasSection from './WeakAreasSection';
import PersonalizedInsights from './PersonalizedInsights';
import AchievementsWidget from './AchievementsWidget';
import MiniLeaderboard from './MiniLeaderboard';
import RecentActivity from './RecentActivity';

// Custom Hook for State & Storage Integration
import { useDashboardState } from './useDashboardState';

/**
 * StudentDashboard Component (Central Command Center Coordinator)
 * 
 * Re-architected according to the Educational SaaS Visual Design System:
 * - Canvas Background: #F7F9FC
 * - Card Surfaces: #FFFFFF, 1px solid #E5E7EB, border-radius 22px-24px
 * - Primary CTA: #2563EB (hover #1D4ED8), Success: #16A34A, Amber: #F59E0B
 * - Responsive Multi-Breakpoint Architecture:
 *   - Desktop (>=1024px): 12-col grid (Hero + Stats, 8-col action column, 4-col analytics column)
 *   - Tablet (640px-1024px): Responsive 2-column balanced reflow
 *   - Mobile (<640px): Vertical stack prioritizing WelcomeHero → DailyGoal → ContinueLearning → RecommendedPractice → WeakAreas
 *   - Touch targets >= 44px, zero horizontal overflow
 */
export default function StudentDashboard({
  currentUser: propUser,
  lang = 'en',
  weakWords: propWeakWords,
  navigate = () => {},
  onOpenQuickPractice,
  onOpenMockExam,
  onOpenTextbook,
  onOpenWeakWords,
  onOpenLeaderboard,
  onOpenProgress,
  onOpenFlashcards,
  onOpenCertificates,
  onOpenNotes,
  className = ''
}) {
  const isBn = lang === 'bn';

  // 1. Initialize State Hook binding to all platform engines
  const dashboardState = useDashboardState(propUser, lang);

  const currentUser = propUser || dashboardState.currentUser;
  const weakWords = Array.isArray(propWeakWords)
    ? propWeakWords
    : dashboardState.weakWords;

  // 2. Navigation & Modal Action Handlers
  const handleContinueLearning = useCallback(() => {
    if (typeof onOpenMockExam === 'function') {
      onOpenMockExam(dashboardState.activeSession.unitId, dashboardState.activeSession.lessonId);
    } else {
      navigate('/exam');
    }
  }, [onOpenMockExam, navigate, dashboardState.activeSession]);

  const handleQuickPractice = useCallback(() => {
    if (typeof onOpenQuickPractice === 'function') {
      onOpenQuickPractice();
    } else {
      navigate('/practice');
    }
  }, [onOpenQuickPractice, navigate]);

  const handleReadPassage = useCallback((unitId, lessonId) => {
    if (typeof onOpenTextbook === 'function') {
      onOpenTextbook(unitId || dashboardState.activeSession.unitId, lessonId || dashboardState.activeSession.lessonId);
    } else {
      navigate('/textbook');
    }
  }, [onOpenTextbook, navigate, dashboardState.activeSession]);

  const handleLaunchPractice = useCallback((item) => {
    if (item.actionType === 'navigate_textbook') {
      handleReadPassage(item.unitId, item.lessonId);
    } else if (typeof onOpenQuickPractice === 'function') {
      onOpenQuickPractice();
    } else {
      navigate('/practice');
    }
  }, [handleReadPassage, onOpenQuickPractice, navigate]);

  const handlePracticeWord = useCallback((wordItem) => {
    if (typeof onOpenQuickPractice === 'function') {
      onOpenQuickPractice();
    } else {
      navigate('/practice');
    }
  }, [onOpenQuickPractice, navigate]);

  const handleOpenWeakWordsHub = useCallback(() => {
    if (typeof onOpenWeakWords === 'function') {
      onOpenWeakWords();
    } else {
      navigate('/weak-words');
    }
  }, [onOpenWeakWords, navigate]);

  const handleOpenFlashcards = useCallback(() => {
    if (typeof onOpenFlashcards === 'function') {
      onOpenFlashcards();
    } else {
      navigate('/flashcards');
    }
  }, [onOpenFlashcards, navigate]);

  const handleOpenLeaderboard = useCallback(() => {
    if (typeof onOpenLeaderboard === 'function') {
      onOpenLeaderboard();
    } else {
      navigate('/leaderboard');
    }
  }, [onOpenLeaderboard, navigate]);

  const handleOpenProgress = useCallback(() => {
    if (typeof onOpenProgress === 'function') {
      onOpenProgress();
    } else {
      navigate('/progress');
    }
  }, [onOpenProgress, navigate]);

  const handleOpenCertificates = useCallback(() => {
    if (typeof onOpenCertificates === 'function') {
      onOpenCertificates();
    } else {
      navigate('/certificates');
    }
  }, [onOpenCertificates, navigate]);

  const handleRetakeExam = useCallback((activity) => {
    if (typeof onOpenMockExam === 'function') {
      onOpenMockExam(activity?.unit, activity?.lesson);
    } else {
      navigate('/exam');
    }
  }, [onOpenMockExam, navigate]);

  return (
    <div 
      className={`min-h-full bg-[#F7F9FC] text-[#172033] font-sans antialiased overflow-x-hidden selection:bg-blue-100 selection:text-[#2563EB] ${className}`}
      data-testid="student-dashboard-command-center"
    >
      <div className="max-w-[1550px] mx-auto space-y-6 sm:space-y-7 pb-10">

        {/* 1. TOP HERO BANNER (Full Width across all breakpoints) */}
        <WelcomeHero
          userName={currentUser?.name}
          currentUser={currentUser}
          streakCount={dashboardState.streakCount}
          weeklyProgress={dashboardState.weeklyProgress}
          weeklyProgressPct={dashboardState.weeklyProgressPct}
          activeTopic={dashboardState.activeTopic}
          activeSession={dashboardState.activeSession}
          lang={lang}
          onContinueLearning={handleContinueLearning}
          onQuickPractice={handleQuickPractice}
        />

        {/* 2. TOP STATS SUMMARY (Full Width Glanceable KPIs) */}
        <TopStatsSummary
          dailyGoal={dashboardState.dailyGoal}
          completedToday={dashboardState.completedToday}
          streakCount={dashboardState.streakCount}
          accuracy={dashboardState.accuracy}
          totalQuestionsSolved={dashboardState.totalQuestionsSolved}
          lang={lang}
          onGoalClick={handleQuickPractice}
          onStreakClick={handleContinueLearning}
        />

        {/* 3. MAIN RESPONSIVE COMMAND CENTER GRID
            - Desktop (>=1024px): 12-Column Grid (8-col left, 4-col right)
            - Tablet (640px–1023px): 2-Column Balanced Reflow (md:grid-cols-2)
            - Mobile (<640px): 1-Column Sequential Stack (grid-cols-1)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Left Column: Action & Learning Loop */}
          <div className="col-span-1 md:col-span-1 lg:col-span-8 flex flex-col space-y-6">
            {/* 1. Featured Continue Learning Card (order-2 on mobile, order-1 on desktop) */}
            <div className="order-2 lg:order-1">
              <ContinueLearningCard
                session={dashboardState.activeSession}
                activeSession={dashboardState.activeSession}
                lang={lang}
                onContinueQuiz={handleContinueLearning}
                onResumeQuiz={handleContinueLearning}
                onReadPassage={handleReadPassage}
              />
            </div>

            {/* 2. Today's Daily Goal Card (order-1 on mobile, order-2 on desktop) */}
            <div className="order-1 lg:order-2">
              <DailyGoalCard
                completedToday={dashboardState.completedToday}
                dailyGoal={dashboardState.dailyGoal}
                streakCount={dashboardState.streakCount}
                lang={lang}
                onContinueGoal={handleQuickPractice}
                onUpdateGoal={dashboardState.setDailyGoal}
              />
            </div>

            {/* 3. Recommended Practice Drills (3 Cards) */}
            <div className="order-3">
              <RecommendedPractice
                items={dashboardState.recommendedPractices}
                lang={lang}
                onLaunchPractice={handleLaunchPractice}
                onStartPractice={handleLaunchPractice}
              />
            </div>

            {/* 4. Areas to Improve (Weak Words Revision) */}
            <div className="order-4">
              <WeakAreasSection
                weakWords={weakWords}
                lang={lang}
                onPracticeWord={handlePracticeWord}
                onPracticeWeakWords={handleQuickPractice}
                onReviewHub={handleOpenWeakWordsHub}
                onViewAllWeakWords={handleOpenWeakWordsHub}
                onOpenFlashcards={handleOpenFlashcards}
              />
            </div>
          </div>

          {/* Secondary Right Column: Analytics, Social & Recognition */}
          <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col space-y-6">
            {/* 1. 5 Core Competencies Skill Mastery Progress */}
            <SkillProgress
              lang={lang}
              overallReadiness={dashboardState.accuracy}
              onViewAnalytics={handleOpenProgress}
            />

            {/* 2. AI Personalized Coaching Insights */}
            <PersonalizedInsights
              lang={lang}
              accuracy={dashboardState.accuracy}
              streak={dashboardState.streakCount}
              completedToday={dashboardState.completedToday}
              dailyGoal={dashboardState.dailyGoal}
              onAction={handleQuickPractice}
            />

            {/* 3. Rewarding Achievements & Badges */}
            <AchievementsWidget
              streakCount={dashboardState.streakCount}
              totalQuestions={dashboardState.totalQuestionsSolved}
              masteredWordsCount={dashboardState.masteredWordsCount}
              accuracy={dashboardState.accuracy}
              testsCompleted={currentUser?.testsCompleted}
              lang={lang}
              onViewCertificates={handleOpenCertificates}
              onViewAll={handleOpenCertificates}
            />

            {/* 4. Mini Weekly Leaderboard Preview */}
            <MiniLeaderboard
              topStudents={dashboardState.topStudents}
              currentUserStudent={dashboardState.currentUserRank}
              currentUserRank={dashboardState.currentUserRank}
              currentUser={currentUser}
              lang={lang}
              onViewFullLeaderboard={handleOpenLeaderboard}
            />

            {/* 5. Recent Activity Timeline */}
            <RecentActivity
              activities={dashboardState.recentActivities}
              lang={lang}
              onRetakeExam={handleRetakeExam}
              onViewAll={handleOpenProgress}
              onStartQuiz={handleQuickPractice}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
