import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ThemeProvider } from "@/hooks/use-theme";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Performance from "./pages/Performance";
import Financial from "./pages/Financial";
import Energy from "./pages/Energy";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import Alerts from "./pages/Alerts";
import Plants from "./pages/Plants";
import SettingsPage from "./pages/SettingsPage";
import PlantDetail from "./pages/PlantDetail";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/" />;
};

const AppLayout = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Index />} />
              <Route path="performance" element={<Performance />} />
              <Route path="financial" element={<Financial />} />
              <Route path="energy" element={<Energy />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="admin" element={<Admin />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="plants" element={<Plants />} /> {/* dashboard plants */}
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Top-level Plants route (optional, for /plants) */}
            <Route
              path="/plants"
              element={
                <ProtectedRoute>
                  <Plants />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoute>
                  <Performance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/financial"
              element={
                <ProtectedRoute>
                  <Financial />
                </ProtectedRoute>
              }
            />

            <Route
              path="/energy"
              element={
                <ProtectedRoute>
                  <Energy />
                </ProtectedRoute>
              }
            />

            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <Alerts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/maintenance"
              element={
                <ProtectedRoute>
                  <Maintenance />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Plant detail route */}
            <Route
              path="/plants/:plantId/*"
              element={
                <ProtectedRoute>
                  <PlantDetail />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
