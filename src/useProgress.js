import { useState, useCallback } from 'react';
import { modules } from './data/modules';

const STORAGE_KEY = 'easycalc_progress';
const TOTAL_QUESTIONS = modules.reduce((acc, m) => acc + m.questoes.length, 0);

function getInitialProgress() {
  return { completedModules: [], completedQuestions: [] };
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getInitialProgress();
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.completedModules) || !Array.isArray(parsed.completedQuestions)) {
      return getInitialProgress();
    }
    return parsed;
  } catch {
    return getInitialProgress();
  }
}

function saveToStorage(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState(loadFromStorage);

  const markQuestionAnswered = useCallback((moduleId, questionId) => {
    setProgress((prev) => {
      const key = `${moduleId}-${questionId}`;
      if (prev.completedQuestions.includes(key)) return prev;

      const newCompletedQuestions = [...prev.completedQuestions, key];

      const mod = modules.find((m) => m.id === moduleId);
      const allDone =
        mod?.questoes.every((q) => newCompletedQuestions.includes(`${moduleId}-${q.id}`)) ?? false;

      const newCompletedModules =
        allDone && !prev.completedModules.includes(moduleId)
          ? [...prev.completedModules, moduleId]
          : prev.completedModules;

      const updated = {
        completedModules: newCompletedModules,
        completedQuestions: newCompletedQuestions,
      };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = getInitialProgress();
    saveToStorage(fresh);
    setProgress(fresh);
  }, []);

  function getModuleProgress(moduleId) {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod || mod.questoes.length === 0) return 0;
    const answered = mod.questoes.filter((q) =>
      progress.completedQuestions.includes(`${moduleId}-${q.id}`)
    ).length;
    return Math.round((answered / mod.questoes.length) * 100);
  }

  function isQuestionAnswered(moduleId, questionId) {
    return progress.completedQuestions.includes(`${moduleId}-${questionId}`);
  }

  const answeredQuestions = progress.completedQuestions.length;
  const overallProgress = Math.round((answeredQuestions / TOTAL_QUESTIONS) * 100);

  return {
    progress,
    markQuestionAnswered,
    resetProgress,
    getModuleProgress,
    isQuestionAnswered,
    overallProgress,
    answeredQuestions,
    totalQuestions: TOTAL_QUESTIONS,
  };
}
