import { motion } from "framer-motion";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { PlantMapOverview } from "@/components/dashboard/PlantMapOverview";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { GenerationSummary } from "@/components/dashboard/GenerationSummary";
import { QuickStats } from "@/components/dashboard/QuickStats";

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const S = ({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) => (
  <motion.div custom={i} variants={sectionVariants} initial="hidden" animate="visible" className={className}>
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <>
      <div className="space-y-4">
        <S i={0}>
          <h1 className="text-xl font-semibold text-foreground">Executive Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time plant overview • Rajasthan Solar Park</p>
        </S>

        {/* KPI Cards */}
        <S i={1}><KPICards /></S>

        {/* Quick Stats Row */}
        <S i={2}><QuickStats /></S>

        {/* Main Content: Chart + Sidebar */}
        <S i={3} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <PerformanceChart />
            <InverterGrid />
          </div>
          <div className="space-y-4">
            <WeatherWidget />
            <GenerationSummary />
            <PlantMapOverview />
          </div>
        </S>

        {/* Alerts Full Width */}
        <S i={4}><AlertsPanel /></S>
      </div>
    </>
  );
};

export default Index;
