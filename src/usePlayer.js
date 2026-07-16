import { useState, useCallback } from 'react';
import {
  calculateLevel,
  getLevelProgress,
  getInitialPlayer,
  PLAYER_STORAGE_KEY,
  XP_PER_QUESTION,
} from './utils/playerSystem';

function loadPlayer() {
  try {
    const stored = localStorage.getItem(PLAYER_STORAGE_KEY);
    if (!stored) return getInitialPlayer();
    const parsed = JSON.parse(stored);
    if (
      typeof parsed.xp !== 'number' ||
      typeof parsed.level !== 'number' ||
      !Array.isArray(parsed.answeredQuestions)
    ) {
      return getInitialPlayer();
    }
    return parsed;
  } catch {
    return getInitialPlayer();
  }
}

function savePlayer(player) {
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player));
}

export function usePlayer() {
  const [player, setPlayer] = useState(loadPlayer);
  const [levelUpNotification, setLevelUpNotification] = useState(null);

  /** Award XP for a question. No-op if question was already awarded. */
  const awardXp = useCallback((questionKey) => {
    setPlayer((prev) => {
      if (prev.answeredQuestions.includes(questionKey)) return prev;

      const newXp = prev.xp + XP_PER_QUESTION;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newXp);

      const updated = {
        xp: newXp,
        level: newLevel,
        answeredQuestions: [...prev.answeredQuestions, questionKey],
      };

      savePlayer(updated);

      if (newLevel > oldLevel) {
        setLevelUpNotification(newLevel);
      }

      return updated;
    });
  }, []);

  const resetPlayer = useCallback(() => {
    const fresh = getInitialPlayer();
    savePlayer(fresh);
    setPlayer(fresh);
  }, []);

  const dismissLevelUp = useCallback(() => {
    setLevelUpNotification(null);
  }, []);

  const progress = getLevelProgress(player.xp);

  return {
    player,
    progress,
    awardXp,
    resetPlayer,
    levelUpNotification,
    dismissLevelUp,
  };
}
