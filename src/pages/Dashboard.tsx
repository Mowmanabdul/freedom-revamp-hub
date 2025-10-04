import { PlayerCard } from "@/components/PlayerCard";
import { QuestList } from "@/components/QuestList";
import { SkillsPanel } from "@/components/SkillsPanel";
import { AddQuestDialog } from "@/components/AddQuestDialog";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div />
                <AddQuestDialog />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <PlayerCard />
                    <QuestList />
                </div>
                <div className="lg:col-span-1">
                    <SkillsPanel />
                </div>
            </div>
        </div>
    )
}
