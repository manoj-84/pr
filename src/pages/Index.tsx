import { motion } from "framer-motion";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { PlantMapOverview } from "@/components/dashboard/PlantMapOverview";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { GenerationSummary } from "@/components/dashboard/GenerationSummary";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { plants, inverters, alerts } from "@/data/mock-data";

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

interface IndexProps {
  plantId: string;
  dateFilter: string;
}

const Index = ({ plantId, dateFilter }: IndexProps) => {
  const plant = plants.find(p => p.id === plantId);

  if (!plant) {
    return <p className="text-muted-foreground">No plant data available.</p>;
  }

  const plantInverters = inverters.filter(inv => inv.plantId === plant.id);

  const inverterAlerts = plantInverters
    .filter(inv => inv.statusDetail)
    .map(inv => ({
      id: `auto-${inv.id}`,
      plantId: plant.id,
      severity: inv.status === "offline" ? "high" : "medium",
      message: `${inv.name}: ${inv.statusDetail}`,
      detectedAt: new Date().toLocaleTimeString(),
      slaMinutes: 60,
      slaRemaining: 45,
    }));

  const plantAlerts = [
    ...alerts.filter(alert => alert.plantId === plant.id),
    ...inverterAlerts,
  ];

  return (
    <div className="space-y-4">
      <S i={0}>
        <h1 className="text-xl font-semibold text-foreground">Executive Dashboard</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time plant overview • {plant.name}
        </p>
      </S>

      <S i={1}><KPICards plantId={plant.id} dateFilter={dateFilter} /></S>
      <S i={2}><QuickStats plantId={plant.id} dateFilter={dateFilter} /></S>

      <S i={3} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <PerformanceChart plant={plant} dateFilter={dateFilter} />
          <InverterGrid inverters={plantInverters} />
        </div>
        <div className="space-y-4">
          <WeatherWidget plantId={plant.id} dateFilter={dateFilter} />
          <GenerationSummary plantId={plant.id} />
          <PlantMapOverview plant={plant} />
        </div>
      </S>

      <S i={4}><AlertsPanel alerts={plantAlerts} /></S>
    </div>
  );
};

export default Index;
