import { CompletedQuestLog } from "@/components/CompletedQuestLog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon } from "lucide-react";

export default function History() {
    return (
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HistoryIcon className="w-5 h-5 text-primary" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CompletedQuestLog />
            </CardContent>
        </Card>
    )
}
