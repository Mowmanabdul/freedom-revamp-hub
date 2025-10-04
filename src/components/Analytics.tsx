import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuest } from '@/contexts/QuestContext';
import { BarChart3, PieChart, TrendingUp, Clock } from 'lucide-react';
import { useMemo } from 'react';

export const Analytics = () => {
  const { state } = useQuest();
  const { completedQuests, skills, player } = state;

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    completedQuests.forEach((quest) => {
      stats[quest.category] = (stats[quest.category] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [completedQuests]);

  const last7Days = useMemo(() => {
    const days: Record<string, number> = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days[key] = 0;
    }

    completedQuests.forEach((quest) => {
      if (quest.completedAt) {
        const date = new Date(quest.completedAt);
        const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (days[key] !== undefined) {
          days[key]++;
        }
      }
    });

    return Object.entries(days);
  }, [completedQuests]);

  const hourlyStats = useMemo(() => {
    const hours: Record<number, number> = {};
    for (let i = 0; i < 24; i++) {
      hours[i] = 0;
    }

    completedQuests.forEach((quest) => {
      if (quest.completedAt) {
        const hour = new Date(quest.completedAt).getHours();
        hours[hour]++;
      }
    });

    const maxCount = Math.max(...Object.values(hours), 1);
    return Object.entries(hours).map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
      intensity: (count / maxCount) * 100,
    }));
  }, [completedQuests]);

  const topSkills = useMemo(() => {
    return Object.values(skills)
      .sort((a, b) => b.level - a.level)
      .slice(0, 5);
  }, [skills]);

  const maxInLast7Days = Math.max(...last7Days.map(([, count]) => count), 1);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-xp">{player.questsCompleted}</div>
            <div className="text-xs text-muted-foreground">Total Quests</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gold">{Math.round(player.totalGoldEarned)}</div>
            <div className="text-xs text-muted-foreground">Gold Earned</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{Math.round(player.totalXpGained)}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-streak">{player.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Activity */}
      <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5 text-primary" />
            7-Day Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {last7Days.map(([day, count]) => (
              <div key={day} className="flex items-center gap-3">
                <div className="w-16 text-xs text-muted-foreground">{day}</div>
                <div className="flex-1 bg-secondary rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full flex items-center px-2 transition-all"
                    style={{ width: `${(count / maxInLast7Days) * 100}%`, minWidth: count > 0 ? '2rem' : '0' }}
                  >
                    {count > 0 && <span className="text-xs font-semibold">{count}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PieChart className="w-5 h-5 text-accent" />
            Quest Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categoryStats.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No data yet
            </div>
          ) : (
            <div className="space-y-2">
              {categoryStats.map(([category, count]) => {
                const percentage = (count / completedQuests.length) * 100;
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Skills */}
      <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="w-5 h-5 text-primary" />
            Top Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topSkills.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No skills yet
            </div>
          ) : (
            <div className="space-y-3">
              {topSkills.map((skill, index) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">Level {skill.level}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hourly Heatmap */}
      <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-5 h-5 text-accent" />
            Time of Day Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-1">
            {hourlyStats.map((stat) => {
              const opacity = stat.count === 0 ? 0.1 : 0.3 + (stat.intensity / 100) * 0.7;
              return (
                <div
                  key={stat.hour}
                  className="aspect-square rounded-sm relative group cursor-pointer"
                  style={{
                    backgroundColor: `hsl(var(--primary))`,
                    opacity,
                  }}
                  title={`${stat.hour}:00 - ${stat.count} quests`}
                >
                  {stat.hour % 3 === 0 && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground whitespace-nowrap">
                      {stat.hour}h
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center mt-8 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0.1, 0.3, 0.5, 0.7, 1].map((opacity) => (
                <div
                  key={opacity}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: `hsl(var(--primary))`,
                    opacity,
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
