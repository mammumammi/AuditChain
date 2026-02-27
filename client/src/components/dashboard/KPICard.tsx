import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  statusColor?: "primary" | "destructive" | "accent";
  delay?: number;
}

export function KPICard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend,
  statusColor = "primary",
  delay = 0 
}: KPICardProps) {
  
  const colorMap = {
    primary: "text-primary",
    destructive: "text-destructive",
    accent: "text-accent"
  };

  const bgMap = {
    primary: "bg-primary/10 border-primary/30",
    destructive: "bg-destructive/10 border-destructive/30",
    accent: "bg-accent/10 border-accent/30"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Card className="glass-panel overflow-hidden relative group">
        {/* Animated background gradient line */}
        <div className={cn(
          "absolute top-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity",
          statusColor === "primary" ? "bg-gradient-to-r from-transparent via-primary to-transparent" :
          statusColor === "destructive" ? "bg-gradient-to-r from-transparent via-destructive to-transparent" :
          "bg-gradient-to-r from-transparent via-accent to-transparent"
        )} />
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {title}
              </p>
              <div className="space-y-1">
                <h3 className={cn(
                  "text-3xl font-display font-bold tracking-tight",
                  statusColor === "destructive" ? "glow-text-destructive text-destructive" : "text-foreground"
                )}>
                  {value}
                </h3>
                {subtitle && (
                  <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    {trend === "up" && <span className="text-primary">↑</span>}
                    {trend === "down" && <span className="text-destructive">↓</span>}
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className={cn(
              "p-3 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110",
              bgMap[statusColor],
              colorMap[statusColor]
            )}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
