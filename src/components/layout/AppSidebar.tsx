import {
  HiSquares2X2,
  HiHomeModern,
  HiChartBar,
  HiCurrencyDollar,
  HiBolt,
  HiExclamationTriangle,
  HiWrench,
  HiDocumentText,
  HiCog6Tooth,
  HiShieldCheck,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: HiSquares2X2 },
  { title: "Plants", url: "/plants", icon: HiHomeModern },
  { title: "Performance", url: "/performance", icon: HiChartBar },
  { title: "Financial", url: "/financial", icon: HiCurrencyDollar },
  { title: "Energy", url: "/energy", icon: HiBolt },
  { title: "Alerts", url: "/alerts", icon: HiExclamationTriangle },
  { title: "O&M / SLA", url: "/maintenance", icon: HiWrench },
  { title: "Reports", url: "/reports", icon: HiDocumentText },
  { title: "Settings", url: "/settings", icon: HiCog6Tooth },
  { title: "Admin", url: "/admin", icon: HiShieldCheck },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                key="logo-text"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                className="text-lg font-bold text-foreground tracking-tight overflow-hidden whitespace-nowrap"
              >
                The Voltaura
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              key={`label-${item.title}`}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0, transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] } }}
                              exit={{ opacity: 0, x: -6, transition: { duration: 0.12 } }}
                              className="overflow-hidden whitespace-nowrap"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
