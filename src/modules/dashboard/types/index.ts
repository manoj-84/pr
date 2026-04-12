// Dashboard TypeScript Types & Interfaces

export interface PlantSummary {
  plantId: string;
  plantName: string;
  totalCapacityKW: number;
  currentOutputKW: number;
  todayEnergyKWh: number;
  monthEnergyKWh: number;
  performanceRatio: number;   // 0–1
  status: 'online' | 'offline' | 'degraded';
  lastUpdated: string;        // ISO timestamp
}

export interface DashboardFilters {
  plantId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
