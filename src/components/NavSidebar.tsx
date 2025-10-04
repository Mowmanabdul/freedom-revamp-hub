import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LayoutDashboard, ShoppingCart, History, LineChart, Settings } from "lucide-react";
import { NavItem } from "@/App";

interface NavSidebarProps {
  activePage: NavItem;
  setActivePage: (page: NavItem) => void;
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Shop", icon: ShoppingCart },
  { name: "History", icon: History },
  { name: "Analytics", icon: LineChart },
] as const;


export function NavSidebar({ activePage, setActivePage }: NavSidebarProps) {
  return (
    <aside className="w-full h-full flex flex-col p-4 border-r bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-primary">QuestLog</h1>
        <ModeToggle />
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={activePage === item.name ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActivePage(item.name)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
