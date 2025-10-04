import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuest } from '@/contexts/QuestContext';
import { Gift, ShoppingCart, Trash2, PlusCircle } from 'lucide-react';

export const RewardsShop = () => {
  const { state, buyReward, addReward, deleteReward } = useQuest();
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardCost, setNewRewardCost] = useState('100');

  const handleAddReward = () => {
    if (!newRewardName.trim()) return;
    addReward({
      name: newRewardName.trim(),
      cost: parseInt(newRewardCost) || 100,
    });
    setNewRewardName('');
    setNewRewardCost('100');
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-gold" />
          Rewards Shop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {state.rewards.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No rewards yet</p>
            <p className="text-xs mt-1">Add custom rewards below!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {state.rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-sm">{reward.name}</p>
                  <p className="text-sm font-semibold text-gold">{reward.cost} G</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => buyReward(reward.id)}
                    disabled={state.player.gold < reward.cost}
                    className="bg-gold text-black hover:bg-gold/80"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteReward(reward.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 pt-4 border-t border-border/50">
          <h4 className="font-semibold text-sm">Add New Reward</h4>
          <Input
            placeholder="Reward name"
            value={newRewardName}
            onChange={(e) => setNewRewardName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Cost in gold"
            value={newRewardCost}
            onChange={(e) => setNewRewardCost(e.target.value)}
            min="1"
          />
          <Button onClick={handleAddReward} className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Reward
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
