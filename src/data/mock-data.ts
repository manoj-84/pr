// ─── Types ───────────────────────────────────────────────────────────────────

export interface Plant {
  id: string;
  name: string;
  location: string;
  capacity: number; // kWp
  healthScore: number;
  image: string;
  commissionedDate: string;
  panelCount: number;
  stringCount: number;
  inverterCount: number;
  area: string; // acres
}

export interface KPIData {
  healthScore: number;
  revenueLostMTD: number;
  revenueRecoveredMTD: number;
  revenueDeviationPct: number;
  expectedKWh: number;
  actualKWh: number;
  deviationPct: number;
  availabilityPct: number;
  downtimeHours: number;
}

export interface HourlyData {
  time: string;
  expected: number;
  actual: number;
  irradiance: number;
}

export interface Inverter {
  id: string;
  plantId: string; // NEW: link inverter to a plant
  name: string;
  status: "online" | "warning" | "offline";
  output: number; // kW
  temperature?: number;
  statusDetail?: string;
  dcVoltage?: number;   // NEW
  dcCurrent?: number;   // NEW
  acVoltage?: number;   // NEW
  phases?: number;      // NEW
  dailyEnergy?: number; // NEW
  monthlyEnergy?: number; // NEW
  uptimeToday?: number; // NEW (hours)
  lastMaintenance?: string; // NEW (e.g. "15 days ago")
}

export interface Alert {
  id: string;
  severity: "high" | "medium" | "low";
  message: string;
  detectedAt: string;
  slaMinutes: number;
  slaRemaining: number;
}

export interface PerformanceMetrics {
  pr: number;
  cuf: number;
  degradation: number;
  efficiency: number;
}

export interface StringData {
  name: string;
  output: number;
  expected: number;
  imbalance: number;
}

export interface FinancialData {
  monthlyRevenue: number;
  expectedRevenue: number;
  revenueGap: number;
  annualProjection: number;
  losses: { category: string; amount: number; percentage: number }[];
  cumulativeRevenue: { month: string; expected: number; actual: number }[];
}

export interface EnergyData {
  contractDemand: number;
  currentMaxDemand: number;
  riskLevel: "low" | "medium" | "high";
  powerFactor: number;
  pfTrend: { time: string; pf: number }[];
  loadProfile: { time: string; demand: number; peak: boolean }[];
  recommendations: string[];
}

export interface Fault {
  id: string;
  plantId: string,
  severity: "critical" | "major" | "minor";
  detectedAt: string;
  assignee: string;
  slaCountdown: string;
  status: "open" | "in-progress" | "resolved";
  description: string;
  resolutionHours: number;
}

export interface MaintenanceVisit {
  id: string;
  plantId: string; // NEW
  date: string;
  technician: string;
  type: "preventive" | "corrective";
  status: "completed" | "scheduled" | "overdue";
  checklist: number; // % complete
  notes: string;
}

export interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  irradiance: number;
  sunrise: string;
  sunset: string;
}

export interface WeeklyGen {
  day: string;
  gen: number; // kWh
}

export interface OpsData {
  activePowerMW: number;
  prPct: number;
  peakIrradiance: number;
  gridExportMWh: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const plants: Plant[] = [
  { id: "p1", name: "Rajasthan Solar Park", location: "Jodhpur, RJ", capacity: 5000, healthScore: 92, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", commissionedDate: "2020-03-15", panelCount: 12500, stringCount: 24, inverterCount: 8, area: "25" },
  { id: "p2", name: "Gujarat Sun Farm", location: "Kutch, GJ", capacity: 3200, healthScore: 78, image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80", commissionedDate: "2019-11-20", panelCount: 8000, stringCount: 16, inverterCount: 6, area: "16" },
  { id: "p3", name: "Karnataka PV Station", location: "Tumkur, KA", capacity: 2100, healthScore: 65, image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80", commissionedDate: "2021-07-08", panelCount: 5250, stringCount: 12, inverterCount: 4, area: "11" },
  { id: "p4", name: "Tamil Nadu Array", location: "Ramanathapuram, TN", capacity: 4500, healthScore: 88, image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80", commissionedDate: "2020-09-12", panelCount: 11250, stringCount: 20, inverterCount: 7, area: "22" },
];

export const plantKpiData: Record<string, Record<string, KPIData>> = {
  p1: { // Rajasthan Solar Park
    today: { healthScore: 92, revenueLostMTD: 200000, revenueRecoveredMTD: 150000, revenueDeviationPct: -2.5, expectedKWh: 20000, actualKWh: 19000, deviationPct: -5.0, availabilityPct: 97.2, downtimeHours: 1.5 },
    "7d": { healthScore: 91, revenueLostMTD: 1200000, revenueRecoveredMTD: 950000, revenueDeviationPct: -3.0, expectedKWh: 140000, actualKWh: 135000, deviationPct: -3.6, availabilityPct: 96.5, downtimeHours: 10.0 },
    "30d": { healthScore: 90, revenueLostMTD: 4800000, revenueRecoveredMTD: 3800000, revenueDeviationPct: -2.8, expectedKWh: 600000, actualKWh: 580000, deviationPct: -3.3, availabilityPct: 96.8, downtimeHours: 38.0 },
    custom: { healthScore: 89, revenueLostMTD: 2500000, revenueRecoveredMTD: 2000000, revenueDeviationPct: -3.1, expectedKWh: 300000, actualKWh: 290000, deviationPct: -3.4, availabilityPct: 97.0, downtimeHours: 20.0 },
  },
  p2: { // Gujarat Sun Farm
    today: { healthScore: 78, revenueLostMTD: 300000, revenueRecoveredMTD: 200000, revenueDeviationPct: -4.0, expectedKWh: 15000, actualKWh: 14000, deviationPct: -6.7, availabilityPct: 94.8, downtimeHours: 3.2 },
    "7d": { healthScore: 77, revenueLostMTD: 2100000, revenueRecoveredMTD: 1600000, revenueDeviationPct: -4.5, expectedKWh: 105000, actualKWh: 100000, deviationPct: -4.8, availabilityPct: 94.5, downtimeHours: 15.0 },
    "30d": { healthScore: 79, revenueLostMTD: 9000000, revenueRecoveredMTD: 7200000, revenueDeviationPct: -3.9, expectedKWh: 450000, actualKWh: 430000, deviationPct: -4.4, availabilityPct: 95.0, downtimeHours: 60.0 },
    custom: { healthScore: 80, revenueLostMTD: 4500000, revenueRecoveredMTD: 3500000, revenueDeviationPct: -4.2, expectedKWh: 220000, actualKWh: 210000, deviationPct: -4.5, availabilityPct: 95.2, downtimeHours: 25.0 },
  },
  p3: { // Karnataka PV Station
    today: { healthScore: 65, revenueLostMTD: 180000, revenueRecoveredMTD: 120000, revenueDeviationPct: -5.0, expectedKWh: 10000, actualKWh: 9500, deviationPct: -5.0, availabilityPct: 93.0, downtimeHours: 4.0 },
    "7d": { healthScore: 66, revenueLostMTD: 1260000, revenueRecoveredMTD: 950000, revenueDeviationPct: -4.8, expectedKWh: 70000, actualKWh: 67000, deviationPct: -4.3, availabilityPct: 93.5, downtimeHours: 18.0 },
    "30d": { healthScore: 67, revenueLostMTD: 5400000, revenueRecoveredMTD: 4200000, revenueDeviationPct: -4.5, expectedKWh: 300000, actualKWh: 285000, deviationPct: -5.0, availabilityPct: 94.0, downtimeHours: 75.0 },
    custom: { healthScore: 68, revenueLostMTD: 2700000, revenueRecoveredMTD: 2100000, revenueDeviationPct: -4.7, expectedKWh: 150000, actualKWh: 143000, deviationPct: -4.7, availabilityPct: 94.2, downtimeHours: 30.0 },
  },
  p4: { // Tamil Nadu Array
    today: { healthScore: 88, revenueLostMTD: 220000, revenueRecoveredMTD: 180000, revenueDeviationPct: -2.9, expectedKWh: 18000, actualKWh: 17500, deviationPct: -2.8, availabilityPct: 96.5, downtimeHours: 2.0 },
    "7d": { healthScore: 87, revenueLostMTD: 1540000, revenueRecoveredMTD: 1250000, revenueDeviationPct: -3.1, expectedKWh: 126000, actualKWh: 122000, deviationPct: -3.2, availabilityPct: 96.0, downtimeHours: 12.0 },
    "30d": { healthScore: 89, revenueLostMTD: 6600000, revenueRecoveredMTD: 5400000, revenueDeviationPct: -2.7, expectedKWh: 540000, actualKWh: 525000, deviationPct: -2.8, availabilityPct: 96.8, downtimeHours: 48.0 },
    custom: { healthScore: 90, revenueLostMTD: 3300000, revenueRecoveredMTD: 2700000, revenueDeviationPct: -2.8, expectedKWh: 270000, actualKWh: 262000, deviationPct: -3.0, availabilityPct: 97.0, downtimeHours: 22.0 },
  },
};

export const plantOpsData: Record<string, Record<string, OpsData>> = {
  p1: { // Rajasthan
    today: { activePowerMW: 4.58, prPct: 78.4, peakIrradiance: 950, gridExportMWh: 32.4 },
    "7d": { activePowerMW: 4.62, prPct: 77.9, peakIrradiance: 940, gridExportMWh: 225.0 },
    "30d": { activePowerMW: 4.55, prPct: 78.1, peakIrradiance: 960, gridExportMWh: 980.0 },
    custom: { activePowerMW: 4.60, prPct: 78.0, peakIrradiance: 945, gridExportMWh: 500.0 },
  },
  p2: { // Gujarat
    today: { activePowerMW: 3.20, prPct: 76.5, peakIrradiance: 920, gridExportMWh: 28.0 },
    "7d": { activePowerMW: 3.25, prPct: 76.8, peakIrradiance: 930, gridExportMWh: 200.0 },
    "30d": { activePowerMW: 3.18, prPct: 76.2, peakIrradiance: 915, gridExportMWh: 850.0 },
    custom: { activePowerMW: 3.22, prPct: 76.4, peakIrradiance: 925, gridExportMWh: 420.0 },
  },
  p3: { // Karnataka
    today: { activePowerMW: 2.10, prPct: 74.0, peakIrradiance: 910, gridExportMWh: 20.0 },
    "7d": { activePowerMW: 2.15, prPct: 74.5, peakIrradiance: 915, gridExportMWh: 150.0 },
    "30d": { activePowerMW: 2.08, prPct: 73.8, peakIrradiance: 905, gridExportMWh: 600.0 },
    custom: { activePowerMW: 2.12, prPct: 74.2, peakIrradiance: 912, gridExportMWh: 280.0 },
  },
  p4: { // Tamil Nadu
    today: { activePowerMW: 4.20, prPct: 77.0, peakIrradiance: 940, gridExportMWh: 30.0 },
    "7d": { activePowerMW: 4.25, prPct: 77.3, peakIrradiance: 945, gridExportMWh: 210.0 },
    "30d": { activePowerMW: 4.18, prPct: 76.9, peakIrradiance: 935, gridExportMWh: 880.0 },
    custom: { activePowerMW: 4.22, prPct: 77.1, peakIrradiance: 942, gridExportMWh: 450.0 },
  },
};

export const plantWeatherHistory: Record<string, WeatherData[]> = {
  p1: [ // Rajasthan Solar Park
    { condition: "Clear Sky", temperature: 34, humidity: 42, windSpeed: 12, irradiance: 880, sunrise: "06:12", sunset: "18:34" },
    { condition: "Sunny", temperature: 33, humidity: 40, windSpeed: 14, irradiance: 890, sunrise: "06:12", sunset: "18:34" },
    { condition: "Hot & Dry", temperature: 36, humidity: 38, windSpeed: 10, irradiance: 910, sunrise: "06:12", sunset: "18:34" },
    { condition: "Partly Cloudy", temperature: 32, humidity: 45, windSpeed: 15, irradiance: 860, sunrise: "06:12", sunset: "18:34" },
    { condition: "Clear Sky", temperature: 35, humidity: 41, windSpeed: 13, irradiance: 885, sunrise: "06:12", sunset: "18:34" },
    { condition: "Sunny", temperature: 34, humidity: 39, windSpeed: 12, irradiance: 895, sunrise: "06:12", sunset: "18:34" },
    { condition: "Clear Sky", temperature: 33, humidity: 40, windSpeed: 11, irradiance: 880, sunrise: "06:12", sunset: "18:34" },
  ],
  p2: [ // Gujarat Sun Farm
    { condition: "Clear Sky", temperature: 35, humidity: 48, windSpeed: 10, irradiance: 870, sunrise: "06:20", sunset: "18:40" },
    { condition: "Sunny", temperature: 34, humidity: 46, windSpeed: 12, irradiance: 880, sunrise: "06:20", sunset: "18:40" },
    { condition: "Humid", temperature: 36, humidity: 50, windSpeed: 9, irradiance: 860, sunrise: "06:20", sunset: "18:40" },
    { condition: "Partly Cloudy", temperature: 33, humidity: 47, windSpeed: 11, irradiance: 855, sunrise: "06:20", sunset: "18:40" },
    { condition: "Clear Sky", temperature: 34, humidity: 45, windSpeed: 10, irradiance: 875, sunrise: "06:20", sunset: "18:40" },
    { condition: "Sunny", temperature: 35, humidity: 49, windSpeed: 12, irradiance: 880, sunrise: "06:20", sunset: "18:40" },
    { condition: "Clear Sky", temperature: 34, humidity: 47, windSpeed: 11, irradiance: 870, sunrise: "06:20", sunset: "18:40" },
  ],
  p3: [ // Karnataka PV Station
    { condition: "Partly Cloudy", temperature: 30, humidity: 55, windSpeed: 8, irradiance: 820, sunrise: "06:05", sunset: "18:25" },
    { condition: "Cloudy", temperature: 29, humidity: 60, windSpeed: 7, irradiance: 800, sunrise: "06:05", sunset: "18:25" },
    { condition: "Rainy", temperature: 28, humidity: 65, windSpeed: 6, irradiance: 780, sunrise: "06:05", sunset: "18:25" },
    { condition: "Clear Sky", temperature: 31, humidity: 52, windSpeed: 9, irradiance: 830, sunrise: "06:05", sunset: "18:25" },
    { condition: "Partly Cloudy", temperature: 30, humidity: 54, windSpeed: 8, irradiance: 825, sunrise: "06:05", sunset: "18:25" },
    { condition: "Cloudy", temperature: 29, humidity: 59, windSpeed: 7, irradiance: 810, sunrise: "06:05", sunset: "18:25" },
    { condition: "Clear Sky", temperature: 30, humidity: 53, windSpeed: 8, irradiance: 820, sunrise: "06:05", sunset: "18:25" },
  ],
  p4: [ // Tamil Nadu Array
    { condition: "Sunny", temperature: 33, humidity: 50, windSpeed: 11, irradiance: 860, sunrise: "06:15", sunset: "18:45" },
    { condition: "Clear Sky", temperature: 32, humidity: 48, windSpeed: 12, irradiance: 870, sunrise: "06:15", sunset: "18:45" },
    { condition: "Humid", temperature: 34, humidity: 53, windSpeed: 10, irradiance: 850, sunrise: "06:15", sunset: "18:45" },
    { condition: "Partly Cloudy", temperature: 31, humidity: 49, windSpeed: 13, irradiance: 845, sunrise: "06:15", sunset: "18:45" },
    { condition: "Sunny", temperature: 33, humidity: 51, windSpeed: 11, irradiance: 860, sunrise: "06:15", sunset: "18:45" },
    { condition: "Clear Sky", temperature: 32, humidity: 47, windSpeed: 12, irradiance: 870, sunrise: "06:15", sunset: "18:45" },
    { condition: "Sunny", temperature: 33, humidity: 50, windSpeed: 11, irradiance: 860, sunrise: "06:15", sunset: "18:45" },
  ],
};

// Helper to compute averages
export function averageWeather(data: WeatherData[]): WeatherData {
  const len = data.length;
  const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / len);

  return {
    condition: "Average",
    temperature: avg(data.map(d => d.temperature)),
    humidity: avg(data.map(d => d.humidity)),
    windSpeed: avg(data.map(d => d.windSpeed)),
    irradiance: avg(data.map(d => d.irradiance)),
    sunrise: data[0].sunrise,
    sunset: data[0].sunset,
  };
}

export const plantWeeklyGeneration: Record<string, WeeklyGen[]> = {
  p1: [ // Rajasthan Solar Park
    { day: "Mon", gen: 16200 },
    { day: "Tue", gen: 17100 },
    { day: "Wed", gen: 15800 },
    { day: "Thu", gen: 17400 },
    { day: "Fri", gen: 16900 },
    { day: "Sat", gen: 17200 },
    { day: "Sun", gen: 15500 },
  ],
  p2: [ // Gujarat Sun Farm
    { day: "Mon", gen: 14000 },
    { day: "Tue", gen: 14500 },
    { day: "Wed", gen: 15200 },
    { day: "Thu", gen: 14800 },
    { day: "Fri", gen: 14300 },
    { day: "Sat", gen: 15000 },
    { day: "Sun", gen: 14500 },
  ],
  p3: [ // Karnataka PV Station
    { day: "Mon", gen: 12500 },
    { day: "Tue", gen: 13000 },
    { day: "Wed", gen: 12800 },
    { day: "Thu", gen: 13200 },
    { day: "Fri", gen: 12700 },
    { day: "Sat", gen: 13500 },
    { day: "Sun", gen: 10900 },
  ],
  p4: [ // Tamil Nadu Array
    { day: "Mon", gen: 16000 },
    { day: "Tue", gen: 16500 },
    { day: "Wed", gen: 17200 },
    { day: "Thu", gen: 16800 },
    { day: "Fri", gen: 16300 },
    { day: "Sat", gen: 17000 },
    { day: "Sun", gen: 16500 },
  ],
};

export const hourlyData: HourlyData[] = Array.from({ length: 13 }, (_, i) => {
  const hour = 6 + i;
  const peak = Math.sin(((hour - 6) / 12) * Math.PI);
  const expected = Math.round(peak * 4200 + 200);
  const actual = Math.round(expected * (0.85 + Math.random() * 0.15));
  return {
    time: `${hour.toString().padStart(2, "0")}:00`,
    expected,
    actual,
    irradiance: Math.round(peak * 950 + 50),
  };
});

export const inverters: Inverter[] = [
  //Rajasthan
  { id: "inv1", plantId: "p1", name: "INV-01", status: "online", output: 1100, temperature: 42, dcVoltage: 620, dcCurrent: 395, acVoltage: 415, phases: 3, dailyEnergy: 8800, monthlyEnergy: 265000, uptimeToday: 9.2, lastMaintenance: "15 days ago" },
  { id: "inv2", plantId: "p1", name: "INV-02", status: "online", output: 1180, temperature: 44, dcVoltage: 618, dcCurrent: 390, acVoltage: 415, phases: 3, dailyEnergy: 9400, monthlyEnergy: 280000, uptimeToday: 9.0, lastMaintenance: "12 days ago" },
  { id: "inv10", plantId: "p1", name: "INV-03", status: "warning", output: 900, temperature: 58, statusDetail: "Temp High", dcVoltage: 610, dcCurrent: 370, acVoltage: 415, phases: 3, dailyEnergy: 7200, monthlyEnergy: 220000, uptimeToday: 7.5, lastMaintenance: "20 days ago" },
  { id: "inv11", plantId: "p1", name: "INV-04", status: "online", output: 1150, temperature: 41, dcVoltage: 619, dcCurrent: 388, acVoltage: 415, phases: 3, dailyEnergy: 9200, monthlyEnergy: 275000, uptimeToday: 8.9, lastMaintenance: "18 days ago" },
  //Gujarat
  { id: "inv3", plantId: "p2", name: "INV-01", status: "online", output: 1400, temperature: 40, dcVoltage: 620, dcCurrent: 395, acVoltage: 415, phases: 3, dailyEnergy: 11200, monthlyEnergy: 320000, uptimeToday: 9.0, lastMaintenance: "15 days ago" },
  { id: "inv5", plantId: "p2", name: "INV-02", status: "online", output: 1350, temperature: 43, statusDetail: "Fuse Alert", dcVoltage: 618, dcCurrent: 390, acVoltage: 415, phases: 3, dailyEnergy: 10800, monthlyEnergy: 310000, uptimeToday: 8.5, lastMaintenance: "20 days ago" },
  //Karnataka
  { id: "inv4", plantId: "p3", name: "INV-01", status: "online", output: 850, temperature: 39, dcVoltage: 620, dcCurrent: 395, acVoltage: 415, phases: 3, dailyEnergy: 6800, monthlyEnergy: 210000, uptimeToday: 9.0, lastMaintenance: "12 days ago" },
  { id: "inv6", plantId: "p3", name: "INV-02", status: "offline", output: 0, temperature: 25, statusDetail: "Comm Fault", dcVoltage: 0, dcCurrent: 0, acVoltage: 0, phases: 3, dailyEnergy: 0, monthlyEnergy: 0, uptimeToday: 0, lastMaintenance: "18 days ago" },
  //Tamilnadu
  { id: "inv7", plantId: "p4", name: "INV-01", status: "online", output: 1380, temperature: 38, dcVoltage: 621, dcCurrent: 394, acVoltage: 415, phases: 3, dailyEnergy: 1835, monthlyEnergy: 53600, uptimeToday: 9.3, lastMaintenance: "14 days ago" },
  { id: "inv8", plantId: "p4", name: "INV-02", status: "online", output: 1420, temperature: 40, dcVoltage: 617, dcCurrent: 389, acVoltage: 415, phases: 3, dailyEnergy: 1810, monthlyEnergy: 53200, uptimeToday: 9.0, lastMaintenance: "16 days ago" },
  { id: "inv9", plantId: "p4", name: "INV-03", status: "online", output: 1350, temperature: 37, dcVoltage: 615, dcCurrent: 388, acVoltage: 415, phases: 3, dailyEnergy: 1790, monthlyEnergy: 52800, uptimeToday: 8.8, lastMaintenance: "20 days ago" },
];


export const alerts: Alert[] = [
  { 
    id: "a1", 
    severity: "high", 
    message: "INV-03 Communication Failure", // updated to match actual inverter
    detectedAt: "09:15", 
    slaMinutes: 60, 
    slaRemaining: 23 
  },
  { 
    id: "a2", 
    severity: "high", 
    message: "INV-03 String 4B Output Drop >20%", 
    detectedAt: "10:30", 
    slaMinutes: 120, 
    slaRemaining: 87 
  },
  { 
    id: "a3", 
    severity: "medium", 
    message: "INV-03 Temperature Warning (58°C)", 
    detectedAt: "11:45", 
    slaMinutes: 240, 
    slaRemaining: 198 
  },
];

export const performanceMetrics: PerformanceMetrics = {
  pr: 78.4,
  cuf: 22.1,
  degradation: 0.7,
  efficiency: 96.2,
};

export const stringData: StringData[] = [
  { name: "String 1A", output: 12.4, expected: 13.0, imbalance: 4.6 },
  { name: "String 1B", output: 12.8, expected: 13.0, imbalance: 1.5 },
  { name: "String 2A", output: 11.9, expected: 13.0, imbalance: 8.5 },
  { name: "String 2B", output: 12.6, expected: 13.0, imbalance: 3.1 },
  { name: "String 3A", output: 12.1, expected: 13.0, imbalance: 6.9 },
  { name: "String 3B", output: 12.9, expected: 13.0, imbalance: 0.8 },
  { name: "String 4A", output: 12.3, expected: 13.0, imbalance: 5.4 },
  { name: "String 4B", output: 9.8, expected: 13.0, imbalance: 24.6 },
];

export const financialData: FinancialData = {
  monthlyRevenue: 3250000,
  expectedRevenue: 3580000,
  revenueGap: 330000,
  annualProjection: 39800000,
  losses: [
    { category: "Downtime", amount: 145000, percentage: 44 },
    { category: "Deviation", amount: 98000, percentage: 30 },
    { category: "Grid Outage", amount: 52000, percentage: 16 },
    { category: "Maint. Delay", amount: 35000, percentage: 10 },
  ],
  cumulativeRevenue: [
    { month: "Apr", expected: 3500, actual: 3200 },
    { month: "May", expected: 7200, actual: 6800 },
    { month: "Jun", expected: 10500, actual: 9900 },
    { month: "Jul", expected: 14000, actual: 13100 },
    { month: "Aug", expected: 17200, actual: 16000 },
    { month: "Sep", expected: 20800, actual: 19200 },
    { month: "Oct", expected: 24000, actual: 22500 },
    { month: "Nov", expected: 27500, actual: 25800 },
    { month: "Dec", expected: 30800, actual: 28900 },
    { month: "Jan", expected: 34200, actual: 32100 },
    { month: "Feb", expected: 37000, actual: 34800 },
    { month: "Mar", expected: 39800, actual: 37200 },
  ],
};

export const energyData: EnergyData = {
  contractDemand: 2500,
  currentMaxDemand: 2340,
  riskLevel: "medium",
  powerFactor: 0.92,
  pfTrend: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    pf: 0.88 + Math.random() * 0.1,
  })),
  loadProfile: Array.from({ length: 96 }, (_, i) => {
    const hour = i / 4;
    const base = 1200 + Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 600;
    const demand = Math.round(base + Math.random() * 200);
    return {
      time: `${Math.floor(hour).toString().padStart(2, "0")}:${((i % 4) * 15).toString().padStart(2, "0")}`,
      demand,
      peak: demand > 2200,
    };
  }),
  recommendations: [
    "Install 15 kVAR capacitor bank to improve power factor to 0.97",
    "Shift compressor load (180 kW) to after 18:00 to reduce peak demand",
    "Enable battery discharge during 14:00–16:00 peak window",
    "Schedule EV charging to off-peak hours (22:00–06:00)",
  ],
};

export const faults: Fault[] = [
  { id: "F-2024-001", plantId: "p1", severity: "minor", detectedAt: "2024-03-02 09:15", assignee: "Ravi Kumar", slaCountdown: "0h 23m", status: "open", description: "INV-03 Temperature Warning" },
  { id: "F-2024-002", plantId: "p2", severity: "minor", detectedAt: "2024-03-02 10:30", assignee: "Priya Shah", slaCountdown: "1h 27m", status: "in-progress", description: "INV-03 String 4B Output Drop" },
  { id: "F-2024-003", plantId: "p3", severity: "critical", detectedAt: "2024-03-02 11:45", assignee: "Amit Patel", slaCountdown: "3h 18m", status: "open", description: "INV-02 Communication Failure" },
  { id: "F-2024-004", plantId: "p4", severity: "major", detectedAt: "2024-03-01 16:20", assignee: "Ravi Kumar", slaCountdown: "—", status: "resolved", description: "Grid Voltage Fluctuation", resolutionHours: 2.3 },
  { id: "F-2024-005", plantId: "p1", severity: "minor", detectedAt: "2024-03-01 14:00", assignee: "Priya Shah", slaCountdown: "—", status: "resolved", description: "Meter Data Delay", resolutionHours: 1.8 },
];

export const maintenanceVisits: MaintenanceVisit[] = [
  { id: "MV-001", plantId: "p1", date: "2024-02-28", technician: "Suresh M.", type: "preventive", status: "completed", checklist: 100, notes: "All panels cleaned. Inverter filters replaced." },
  { id: "MV-002", plantId: "p4", date: "2024-03-05", technician: "Rajesh K.", type: "preventive", status: "scheduled", checklist: 0, notes: "Quarterly inspection due." },
  { id: "MV-003", plantId: "p2", date: "2024-02-15", technician: "Suresh M.", type: "corrective", status: "completed", checklist: 100, notes: "Replaced fuse on String 2A combiner box." },
  { id: "MV-004", plantId: "p3", date: "2024-02-20", technician: "Amit P.", type: "preventive", status: "overdue", checklist: 60, notes: "Thermal imaging incomplete — camera malfunction." },

  // NEW scheduled visits for each plant
  { id: "MV-005", plantId: "p1", date: "2024-04-10", technician: "Anil K.", type: "preventive", status: "scheduled", checklist: 0, notes: "Filter inspection planned." },
  { id: "MV-006", plantId: "p2", date: "2024-04-12", technician: "Meena R.", type: "preventive", status: "scheduled", checklist: 0, notes: "Quarterly inspection due." },
  { id: "MV-007", plantId: "p3", date: "2024-04-15", technician: "Karthik S.", type: "corrective", status: "scheduled", checklist: 0, notes: "Inverter diagnostics scheduled." },
];


// ─── Helpers ─────────────────────────────────────────────────────────────────

export const formatINR = (val: number): string => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
};

export const formatNumber = (val: number): string => {
  return val.toLocaleString("en-IN");
};
