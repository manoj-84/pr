import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } },
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedPlant, setSelectedPlant] = useState("p1");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
  const location = useLocation();

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
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 overflow-auto p-6"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </SidebarProvider>
  );
}
