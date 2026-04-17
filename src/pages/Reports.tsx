import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiArrowDownTray, HiDocumentText } from "react-icons/hi2";
import { 
  generateMonthlyPerformancePDF, 
  generateSLACompliancePDF, 
  generateFinancialSummaryPDF 
} from "@/lib/pdfReports";

const reports = [
  { name: "Monthly Performance Report", type: "PDF", date: "Feb 2024", action: generateMonthlyPerformancePDF },
  { name: "SLA Compliance Report", type: "PDF", date: "Feb 2024", action: generateSLACompliancePDF },
  { name: "Financial Summary", type: "Excel", date: "Feb 2024", action: generateFinancialSummaryPDF },
  { name: "Annual PR Trend Analysis", type: "PDF", date: "FY 2023-24", file: "/files/annual-pr-trend-fy2023-24.pdf" },
  { name: "Inverter Health Report", type: "PDF", date: "Feb 2024", file: "/files/inverter-health-feb2024.pdf" },
  { name: "Grid Availability Summary", type: "Excel", date: "Feb 2024", file: "/files/grid-availability-feb2024.xlsx" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Reports</h1>
      <div className="space-y-2">
        {reports.map((r) => (
          <Card key={r.name} className="bg-card border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HiDocumentText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.type} • {r.date}</p>
                </div>
              </div>
              {r.action ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs"
                  onClick={() => r.action()}
                >
                  <HiArrowDownTray className="h-3.5 w-3.5 mr-1" /> Download
                </Button>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs"
                >
                  <a href={r.file} download>
                    <HiArrowDownTray className="h-3.5 w-3.5 mr-1" /> Download
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
