import { QuestProvider } from '@/contexts/QuestContext';
import { PlayerCard } from '@/components/PlayerCard';
import { QuestList } from '@/components/QuestList';
import { AddQuestForm } from '@/components/AddQuestForm';
import { SkillsPanel } from '@/components/SkillsPanel';
import { PowerUpsShop } from '@/components/PowerUpsShop';
import { RewardsShop } from '@/components/RewardsShop';
import { CompletedQuestLog } from '@/components/CompletedQuestLog';
import { Analytics } from '@/components/Analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sword, ScrollText, Store, Sparkles, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <QuestProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-safe">
        {/* Header */}
        <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-primary/20 px-4 py-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
              QuestLog RPG
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Level up your life, one quest at a time</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <PlayerCard />
              <SkillsPanel />
              <CompletedQuestLog />
            </div>
            <div className="space-y-6">
              <AddQuestForm />
              <QuestList />
            </div>
            <div className="space-y-6">
              <PowerUpsShop />
              <RewardsShop />
              <Analytics />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <Tabs defaultValue="quests" className="w-full">
              <TabsList className="w-full grid grid-cols-5 mb-6 bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="player" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Sword className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="quests" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <ScrollText className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="shop" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Store className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Sparkles className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BarChart3 className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="player" className="space-y-6">
                <PlayerCard />
              </TabsContent>

              <TabsContent value="quests" className="space-y-6">
                <AddQuestForm />
                <QuestList />
              </TabsContent>

              <TabsContent value="shop" className="space-y-6">
                <PowerUpsShop />
                <RewardsShop />
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <SkillsPanel />
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <CompletedQuestLog />
                <Analytics />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </QuestProvider>
  );
};

export default Index;
