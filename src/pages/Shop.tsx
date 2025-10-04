import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardsShop } from "@/components/RewardsShop"
import { PowerUpsShop } from "@/components/PowerUpsShop"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"

export default function Shop() {
  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="power-ups">Power-ups</TabsTrigger>
          </TabsList>
          <TabsContent value="rewards">
            <RewardsShop />
          </TabsContent>
          <TabsContent value="power-ups">
            <PowerUpsShop />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
