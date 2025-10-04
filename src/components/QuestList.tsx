import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuest } from '@/contexts/QuestContext';
import { CheckCircle2, Trash2, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const PRIORITY_COLORS = {
  low: 'border-l-4 border-l-success',
  medium: 'border-l-4 border-l-gold',
  high: 'border-l-4 border-l-destructive',
};

export const QuestList = () => {
  const { state, completeQuest, deleteQuest } = useQuest();
  const { quests } = state;

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Active Quests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {quests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No active quests</p>
            <p className="text-xs mt-1">Add your first quest to begin your journey!</p>
          </div>
        ) : (
          <motion.div layout className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {quests.map((quest) => (
                <motion.div
                  key={quest.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className={cn(
                    'bg-secondary/50 rounded-lg p-4 transition-all hover:bg-secondary',
                    PRIORITY_COLORS[quest.priority]
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{quest.name}</h4>
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 bg-accent/20 text-accent rounded">
                          {quest.category}
                        </span>
                        <span className="text-xp font-semibold">{quest.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  {quest.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(quest.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => completeQuest(quest.id)}
                      className="flex-1 bg-success hover:bg-success/80"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteQuest(quest.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
