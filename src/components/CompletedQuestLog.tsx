import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuest } from '@/contexts/QuestContext';
import { CheckCircle2, Calendar } from 'lucide-react';

export const CompletedQuestLog = () => {
  const { state } = useQuest();
  const { completedQuests } = state;

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-success" />
          Completed Quests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {completedQuests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No completed quests yet</p>
            <p className="text-xs mt-1">Complete your first quest to see your history!</p>
          </div>
        ) : (
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-3">
              {completedQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-secondary/50 rounded-lg p-4 border-l-4 border-l-success"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{quest.name}</h4>
                      <span className="inline-block px-2 py-0.5 bg-accent/20 text-accent rounded text-xs mt-1">
                        {quest.category}
                      </span>
                    </div>
                    <span className="text-xs text-xp font-semibold">{quest.xp} XP</span>
                  </div>
                  {quest.completedAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(quest.completedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
