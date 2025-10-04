export interface Quest {
  id: number;
  name: string;
  category: string;
  xp: number;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  completed: boolean;
  completedAt?: string;
}

export interface Skill {
  name: string;
  level: number;
  xp: number;
}

export interface PlayerStats {
  level: number;
  xp: number;
  gold: number;
  streak: number;
  questsCompleted: number;
  totalXpGained: number;
  totalGoldEarned: number;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number; // in hours, Infinity for permanent
  effect: {
    type: 'xp_boost' | 'gold_boost';
    value: number; // multiplier (e.g., 0.5 = 50% boost)
    category?: string;
  };
  icon: string;
}

export interface ActiveBuff {
  id: string;
  expiresAt: number | null; // null for permanent buffs
}

export interface Reward {
  id: number;
  name: string;
  cost: number;
}

export interface AppState {
  player: PlayerStats;
  quests: Quest[];
  completedQuests: Quest[];
  skills: Record<string, Skill>;
  rewards: Reward[];
  activeBuffs: ActiveBuff[];
  characterName: string;
  characterClass: 'warrior' | 'mage' | 'ranger';
}
