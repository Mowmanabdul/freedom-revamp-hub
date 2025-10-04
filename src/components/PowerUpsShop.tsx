import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuest } from '@/contexts/QuestContext';
import { PowerUp } from '@/types/quest';
import { Zap, TrendingUp, Coins as CoinsIcon } from 'lucide-react';

const POWER_UPS: PowerUp[] = [
  {
    id: 'xp_boost_2h',
    name: 'XP Surge',
    description: '+50% XP for 2 hours',
    cost: 100,
    duration: 2,
    effect: { type: 'xp_boost', value: 0.5 },
    icon: 'trending-up',
  },
  {
    id: 'gold_boost_2h',
    name: 'Golden Touch',
    description: '+50% Gold for 2 hours',
    cost: 100,
    duration: 2,
    effect: { type: 'gold_boost', value: 0.5 },
    icon: 'coins',
  },
  {
    id: 'xp_boost_24h',
    name: 'XP Mastery',
    description: '+50% XP for 24 hours',
    cost: 400,
    duration: 24,
    effect: { type: 'xp_boost', value: 0.5 },
    icon: 'zap',
  },
];

const ICON_MAP = {
  'trending-up': TrendingUp,
  'coins': CoinsIcon,
  'zap': Zap,
};

export const PowerUpsShop = () => {
  const { state, buyPowerUp } = useQuest();

  const hasBuff = (id: string) => state.activeBuffs.some((b) => b.id === id);

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Power-Ups Shop
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {POWER_UPS.map((powerUp) => {
            const Icon = ICON_MAP[powerUp.icon as keyof typeof ICON_MAP];
            const isActive = hasBuff(powerUp.id);
            const canAfford = state.player.gold >= powerUp.cost;

            return (
              <div
                key={powerUp.id}
                className="bg-secondary/50 rounded-lg p-4 border-l-4 border-l-accent"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{powerUp.name}</h4>
                    <p className="text-xs text-muted-foreground">{powerUp.description}</p>
                    <p className="text-sm font-semibold text-gold mt-1">{powerUp.cost} G</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => buyPowerUp(powerUp)}
                    disabled={isActive || !canAfford}
                    className="bg-accent hover:bg-accent/80 flex-shrink-0"
                  >
                    {isActive ? 'Active' : 'Buy'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-xs text-center text-muted-foreground">
            Power-ups boost your quest rewards temporarily. Stack them for maximum gains!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
