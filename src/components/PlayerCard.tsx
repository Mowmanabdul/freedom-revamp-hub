import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useQuest } from '@/contexts/QuestContext';
import { Coins, Flame } from 'lucide-react';

const xpForLevel = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1));

export const PlayerCard = () => {
  const { state, updateCharacterName } = useQuest();
  const { player, characterName, characterClass } = state;
  const requiredXp = xpForLevel(player.level);
  const xpProgress = (player.xp / requiredXp) * 100;

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start mb-4">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold">
            {characterName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <Input
              value={characterName}
              onChange={(e) => updateCharacterName(e.target.value)}
              className="text-xl font-bold bg-transparent border-0 border-b-2 border-primary/30 focus-visible:ring-0 focus-visible:border-primary px-0 h-auto py-1"
            />
            <p className="text-sm text-accent font-semibold capitalize mt-1">{characterClass}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Level {player.level}</span>
            <span className="text-xp font-semibold">{Math.round(player.xp)} / {requiredXp} XP</span>
          </div>
          <Progress value={xpProgress} className="h-3 bg-secondary">
            <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${xpProgress}%` }} />
          </Progress>

          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-gold" />
              <span className="font-bold text-gold">{Math.round(player.gold)} G</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-streak" />
              <span className="font-bold text-streak">{player.streak} 🔥</span>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50 text-sm">
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>Quests: <span className="text-foreground font-semibold">{player.questsCompleted}</span></div>
              <div>Total XP: <span className="text-xp font-semibold">{Math.round(player.totalXpGained)}</span></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
