import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuestProvider } from "./contexts/QuestContext";
import { useIsMobile } from "./hooks/use-mobile";
import { NavSidebar } from "./components/NavSidebar";
import { Button } from "./components/ui/button";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

export type NavItem = "Dashboard" | "Shop" | "History" | "Analytics";

function App() {
  const [activePage, setActivePage] = useState<NavItem>("Dashboard");
  const [isMobileSheetOpen, setMobileSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Shop":
        return <Shop />;
      case "History":
        return <History />;
      case "Analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  const handlePageChange = (page: NavItem) => {
    setActivePage(page);
    if (isMobile) {
      setMobileSheetOpen(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <QuestProvider>
            <Sonner position="top-center" richColors />
            {isMobile ? (
              <div className="flex flex-col h-screen">
                <header className="flex items-center justify-between p-4 border-b">
                  <Sheet open={isMobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                      <NavSidebar activePage={activePage} setActivePage={handlePageChange} />
                    </SheetContent>
                  </Sheet>
                  <h1 className="text-xl font-bold">{activePage}</h1>
                </header>
                <main className="flex-1 overflow-y-auto p-4">
                  {renderPage()}
                </main>
              </div>
            ) : (
              <div className="flex h-screen bg-background">
                <NavSidebar activePage={activePage} setActivePage={handlePageChange} />
                <main className="flex-1 overflow-y-auto p-8">
                  {renderPage()}
                </main>
              </div>
            )}
          </QuestProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
