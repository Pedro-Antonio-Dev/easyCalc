export const PLAYER_STORAGE_KEY = 'easycalc_player';
export const XP_PER_QUESTION = 100;

// Total XP required to REACH each level (index = level - 1)
const LEVEL_XP_TABLE = [
  0,     // Level 1
  500,   // Level 2
  1200,  // Level 3
  2000,  // Level 4
  3000,  // Level 5
  4500,  // Level 6
  6500,  // Level 7
  9000,  // Level 8
  12000, // Level 9
  16000, // Level 10
];

/** Returns total XP required to reach a given level. */
export function xpRequiredForLevel(level) {
  if (level <= 1) return 0;
  if (level <= LEVEL_XP_TABLE.length) return LEVEL_XP_TABLE[level - 1];

  // Beyond level 10: each step costs the previous step + 500 more
  let xp = LEVEL_XP_TABLE[LEVEL_XP_TABLE.length - 1];
  let stepCost = 4000; // cost of step 9→10
  for (let l = LEVEL_XP_TABLE.length + 1; l <= level; l++) {
    stepCost += 500;
    xp += stepCost;
  }
  return xp;
}

/** Calculates the current level from total XP. */
export function calculateLevel(xp) {
  let level = 1;
  while (xpRequiredForLevel(level + 1) <= xp) {
    level++;
    if (level >= 100) break;
  }
  return level;
}

/** Returns the total XP required to reach the next level. */
export function calculateXpForNextLevel(level) {
  return xpRequiredForLevel(level + 1);
}

/**
 * Returns a progress snapshot for the current XP value:
 * { level, xpInLevel, xpNeeded, percent, nextLevelXp }
 */
export function getLevelProgress(xp) {
  const level = calculateLevel(xp);
  const currentLevelXp = xpRequiredForLevel(level);
  const nextLevelXp = xpRequiredForLevel(level + 1);
  const xpInLevel = xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const percent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  return { level, xpInLevel, xpNeeded, percent, nextLevelXp };
}

export function addXp(currentXp, amount) {
  return currentXp + amount;
}

export function getInitialPlayer() {
  return { xp: 0, level: 1, answeredQuestions: [] };
}
