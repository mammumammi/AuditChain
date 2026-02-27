import { Link, useLocation } from "wouter";
import { Activity, ShieldAlert, Link as LinkIcon, Settings, TerminalSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "Security Alerts", url: "/alerts", icon: ShieldAlert },
  { title: "Blockchain Explorer", url: "/explorer", icon: LinkIcon },
  { title: "System Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r border-primary/20 bg-background/95 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg border border-primary/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <TerminalSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight text-foreground glow-text">AUDITCHAIN</h1>
            <p className="text-xs text-primary font-mono tracking-wider opacity-80">v2.4.1_SECURE</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/60 font-mono text-[10px] uppercase tracking-widest">
            Core Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        transition-all duration-300 font-mono text-sm
                        ${isActive 
                          ? "bg-primary/10 text-primary border-l-2 border-primary" 
                          : "text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-2 border-transparent"
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full py-2 px-3">
                        <item.icon className={`w-4 h-4 ${isActive ? "text-primary drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" : ""}`} />
                        <span>{item.title}</span>
                      </Link>
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
