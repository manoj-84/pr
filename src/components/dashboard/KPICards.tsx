import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { plantKpiData, formatINR, formatNumber } from "@/data/mock-data";
import { HiHeart, HiCurrencyDollar, HiBolt, HiClock, HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};

const getHealthColor = (score: number) => {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

export function KPICards({ plantId, dateFilter }: { plantId: string; dateFilter: string }) {
  const metrics = plantKpiData[plantId]?.[dateFilter.toLowerCase()] ?? plantKpiData[plantId]?.today;

  if (!metrics) return <p>No KPI data available</p>;

  const cards = [
    {
      label: "Plant Health Score",
      value: metrics.healthScore,
      suffix: "/ 100",
      icon: HiHeart,
      color: getHealthColor(metrics.healthScore),
      trend: null,
    },
    {
      label: `Revenue Impact (${dateFilter})`,
      value: formatINR(metrics.revenueLostMTD),
      subtitle: `Recovered: ${formatINR(metrics.revenueRecoveredMTD)}`,
      icon: HiCurrencyDollar,
      color: "text-destructive",
      trend: metrics.revenueDeviationPct,
    },
    {
      label: "Expected vs Actual",
      value: `${formatNumber(metrics.actualKWh)} kWh`,
      subtitle: `Expected: ${formatNumber(metrics.expectedKWh)} kWh`,
      icon: HiBolt,
      color: "text-primary",
      trend: metrics.deviationPct,
    },
    {
      label: "Availability",
      value: `${metrics.availabilityPct}%`,
      subtitle: `Downtime: ${metrics.downtimeHours}h`,
      icon: HiClock,
      color: "text-success",
      trend: null,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={cardVariants}>
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {card.label}
                </span>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${card.color}`}>
                  {card.value}
                </span>
                {card.suffix && (
                  <span className="text-sm text-muted-foreground">{card.suffix}</span>
                )}
                {card.trend !== null && (
                  <span className={`flex items-center text-xs font-medium ${card.trend < 0 ? "text-destructive" : "text-success"}`}>
                    {card.trend < 0 ? <HiArrowTrendingDown className="h-3 w-3 mr-0.5" /> : <HiArrowTrendingUp className="h-3 w-3 mr-0.5" />}
                    {Math.abs(card.trend)}%
                  </span>
                )}
              </div>
              {card.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
