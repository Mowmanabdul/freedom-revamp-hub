import { Analytics as AnalyticsComponent } from "@/components/Analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

export default function Analytics() {
    return (
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <AnalyticsComponent />
            </CardContent>
        </Card>
    )
}
