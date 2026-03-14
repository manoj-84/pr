import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedPlant, setSelectedPlant] = useState("p1");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
  const location = useLocation();
  const contentControls = useAnimationControls();

  useEffect(() => {
    contentControls.set({ opacity: 0.98, y: 4 });
    contentControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
    });
  }, [location.pathname, contentControls]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            selectedPlant={selectedPlant}
            onPlantChange={setSelectedPlant}
            selectedDateFilter={selectedDateFilter}
            onDateFilterChange={setSelectedDateFilter}
          />
          <motion.main
            initial={false}
            animate={contentControls}
            className="flex-1 overflow-auto p-6"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}
