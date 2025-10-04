import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Quest, Skill, Reward, PowerUp, ActiveBuff } from '@/types/quest';
import { toast } from 'sonner';
import { xpForLevel } from '@/lib/utils';

interface QuestContextType {
  state: AppState;
  addQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
  completeQuest: (id: number) => void;
  deleteQuest: (id: number) => void;
  buyReward: (id: number) => void;
  addReward: (reward: Omit<Reward, 'id'>) => void;
  deleteReward: (id: number) => void;
  buyPowerUp: (powerUp: PowerUp) => void;
  updateCharacterName: (name: string) => void;
  updateCharacterClass: (classType: 'warrior' | 'mage' | 'ranger') => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

const goldForQuest = (xp: number) => Math.ceil(xp / 8);

const PRIORITY_MULTIPLIER = {
  low: 1,
  medium: 1.5,
  high: 2,
};

const getDefaultState = (): AppState => ({
  player: {
    level: 1,
    xp: 0,
    gold: 0,
    streak: 0,
    questsCompleted: 0,
    totalXpGained: 0,
    totalGoldEarned: 0,
  },
  quests: [],
  completedQuests: [],
  skills: {},
  rewards: [],
  activeBuffs: [],
  characterName: 'Hero',
  characterClass: 'warrior',
});

export const QuestProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('questlog-state');
    return saved ? JSON.parse(saved) : getDefaultState();
  });

  useEffect(() => {
    localStorage.setItem('questlog-state', JSON.stringify(state));
  }, [state]);

  const checkLevelUp = (currentXp: number, currentLevel: number): { newLevel: number; newXp: number } => {
    let xp = currentXp;
    let level = currentLevel;
    let requiredXp = xpForLevel(level);

    while (xp >= requiredXp) {
      xp -= requiredXp;
      level++;
      requiredXp = xpForLevel(level);
    }

    return { newLevel: level, newXp: xp };
  };

  const addQuest = (quest: Omit<Quest, 'id' | 'completed'>) => {
    const newQuest: Quest = {
      ...quest,
      id: Date.now(),
      completed: false,
    };

    setState((prev) => ({
      ...prev,
      quests: [...prev.quests, newQuest],
      skills: {
        ...prev.skills,
        [quest.category]: prev.skills[quest.category] || { name: quest.category, level: 1, xp: 0 },
      },
    }));

    toast.success('Quest Added!', { description: `+${quest.xp} XP reward` });
  };

  const completeQuest = (id: number) => {
    setState((prev) => {
      const quest = prev.quests.find((q) => q.id === id);
      if (!quest) return prev;

      let finalXp = quest.xp * PRIORITY_MULTIPLIER[quest.priority];
      let goldGained = goldForQuest(finalXp);

      // Apply active buffs
      prev.activeBuffs.forEach((buff) => {
        const now = Date.now();
        if (buff.expiresAt && buff.expiresAt < now) return;

        // Simplified buff logic - you can expand this
        if (buff.id.includes('xp')) {
          finalXp *= 1.5;
        }
        if (buff.id.includes('gold')) {
          goldGained *= 1.5;
        }
      });

      const completedQuest: Quest = {
        ...quest,
        completed: true,
        completedAt: new Date().toISOString(),
      };

      const newPlayerXp = prev.player.xp + finalXp;
      const newPlayerLevel = checkLevelUp(newPlayerXp, prev.player.level);

      const skill = prev.skills[quest.category];
      const newSkillXp = (skill?.xp || 0) + finalXp;
      const newSkillLevel = skill ? checkLevelUp(newSkillXp, skill.level) : { newLevel: 1, newXp: 0 };

      if (newPlayerLevel.newLevel > prev.player.level) {
        toast.success(`🎉 Level Up!`, { description: `You reached level ${newPlayerLevel.newLevel}!` });
      }

      if (newSkillLevel.newLevel > (skill?.level || 0)) {
        toast.success(`⚔️ Skill Up!`, { description: `${quest.category} reached level ${newSkillLevel.newLevel}!` });
      }

      toast.success('Quest Complete!', {
        description: `+${Math.round(finalXp)} XP, +${Math.round(goldGained)} Gold`,
      });

      return {
        ...prev,
        quests: prev.quests.filter((q) => q.id !== id),
        completedQuests: [completedQuest, ...prev.completedQuests].slice(0, 50),
        player: {
          ...prev.player,
          xp: newPlayerLevel.newXp,
          level: newPlayerLevel.newLevel,
          gold: prev.player.gold + goldGained,
          questsCompleted: prev.player.questsCompleted + 1,
          totalXpGained: prev.player.totalXpGained + finalXp,
          totalGoldEarned: prev.player.totalGoldEarned + goldGained,
        },
        skills: {
          ...prev.skills,
          [quest.category]: {
            ...prev.skills[quest.category],
            level: newSkillLevel.newLevel,
            xp: newSkillLevel.newXp,
          },
        },
      };
    });
  };

  const deleteQuest = (id: number) => {
    setState((prev) => ({
      ...prev,
      quests: prev.quests.filter((q) => q.id !== id),
    }));
    toast.info('Quest deleted');
  };

  const addReward = (reward: Omit<Reward, 'id'>) => {
    setState((prev) => ({
      ...prev,
      rewards: [...prev.rewards, { ...reward, id: Date.now() }],
    }));
    toast.success('Reward added to shop!');
  };

  const buyReward = (id: number) => {
    setState((prev) => {
      const reward = prev.rewards.find((r) => r.id === id);
      if (!reward || prev.player.gold < reward.cost) {
        toast.error('Not enough gold!');
        return prev;
      }

      toast.success(`Purchased: ${reward.name}! 🎁`);
      return {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - reward.cost,
        },
      };
    });
  };

  const deleteReward = (id: number) => {
    setState((prev) => ({
      ...prev,
      rewards: prev.rewards.filter((r) => r.id !== id),
    }));
    toast.info('Reward removed');
  };

  const buyPowerUp = (powerUp: PowerUp) => {
    setState((prev) => {
      if (prev.player.gold < powerUp.cost) {
        toast.error('Not enough gold!');
        return prev;
      }

      const hasBuff = prev.activeBuffs.some((b) => b.id === powerUp.id);
      if (hasBuff && powerUp.duration === Infinity) {
        toast.error('You already own this power-up!');
        return prev;
      }

      const expiresAt = powerUp.duration === Infinity ? null : Date.now() + powerUp.duration * 60 * 60 * 1000;

      toast.success(`Purchased: ${powerUp.name}! ⚡`);
      return {
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - powerUp.cost,
        },
        activeBuffs: [...prev.activeBuffs, { id: powerUp.id, expiresAt }],
      };
    });
  };

  const updateCharacterName = (name: string) => {
    setState((prev) => ({ ...prev, characterName: name }));
  };

  const updateCharacterClass = (classType: 'warrior' | 'mage' | 'ranger') => {
    setState((prev) => ({ ...prev, characterClass: classType }));
  };

  return (
    <QuestContext.Provider
      value={{
        state,
        addQuest,
        completeQuest,
        deleteQuest,
        buyReward,
        addReward,
        deleteReward,
        buyPowerUp,
        updateCharacterName,
        updateCharacterClass,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error('useQuest must be used within QuestProvider');
  }
  return context;
};
