import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuest } from '@/contexts/QuestContext';
import { Sparkles } from 'lucide-react';
import { xpForLevel } from '@/lib/utils';
import { Skill } from '@/types/quest';

export const SkillsPanel = () => {
  const { state } = useQuest();
  const skills: Skill[] = Object.values(state.skills);

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No skills yet</p>
            <p className="text-xs mt-1">Complete quests to discover skills!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => {
              const requiredXp = xpForLevel(skill.level);
              const progress = (skill.xp / requiredXp) * 100;
              return (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold text-sm">{skill.name}</h4>
                    <span className="text-xs text-muted-foreground">Lvl {skill.level}</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-secondary" />
                  <div className="text-xs text-muted-foreground text-right">
                    {Math.round(skill.xp)} / {requiredXp} XP
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
