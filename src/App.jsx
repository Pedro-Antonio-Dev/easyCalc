import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Module from './pages/Module/Module';
import LevelUpNotification from './components/LevelUpNotification/LevelUpNotification';
import { useProgress } from './useProgress';
import { usePlayer } from './usePlayer';

function App() {
  const [page, setPage] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);

  const {
    markQuestionAnswered,
    resetProgress,
    getModuleProgress,
    isQuestionAnswered,
    overallProgress,
    answeredQuestions,
    totalQuestions,
  } = useProgress();

  const { player, progress, awardXp, resetPlayer, levelUpNotification, dismissLevelUp } =
    usePlayer();

  function navigate(target, data) {
    setPage(target);
    if (data) setSelectedModule(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(moduleId, questionId) {
    markQuestionAnswered(moduleId, questionId);
    awardXp(`${moduleId}-${questionId}`);
  }

  function handleReset() {
    resetProgress();
    resetPlayer();
  }

  return (
    <div className="app">
      <Header onNavigate={navigate} player={player} progress={progress} />
      <main>
        {page === 'home' && (
          <Home
            onEnterModule={(mod) => navigate('module', mod)}
            overallProgress={overallProgress}
            answeredQuestions={answeredQuestions}
            totalQuestions={totalQuestions}
            getModuleProgress={getModuleProgress}
            resetProgress={handleReset}
          />
        )}
        {page === 'module' && (
          <Module
            module={selectedModule}
            onBack={() => navigate('home')}
            isQuestionAnswered={isQuestionAnswered}
            onAnswer={handleAnswer}
            moduleProgress={selectedModule ? getModuleProgress(selectedModule.id) : 0}
          />
        )}
      </main>
      <Footer />
      {levelUpNotification && (
        <LevelUpNotification level={levelUpNotification} onDismiss={dismissLevelUp} />
      )}
    </div>
  );
}

export default App;
