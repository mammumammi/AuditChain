import { Activity, Zap, Server, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { BlockchainStatus } from "@/components/dashboard/BlockchainStatus";
import { AlertsWidget } from "@/components/dashboard/AlertsWidget";
import { useMetricStats } from "@/hooks/use-metrics";
import { useSystemHealth } from "@/hooks/use-health";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useMetricStats();
  const { data: health, isLoading: healthLoading } = useSystemHealth();

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold glow-text">SYSTEM OVERVIEW</h1>
        <p className="text-sm font-mono text-muted-foreground">
          Real-time auditing telemetry and blockchain synchronization status.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl glass-panel opacity-50" />
          ))
        ) : (
          <>
            <KPICard
              title="Total Events"
              value={stats?.totalEvents?.toLocaleString() || "0"}
              icon={<Activity className="w-6 h-6" />}
              subtitle="Last 24 hours"
              delay={0.1}
            />
            <KPICard
              title="Anchored Events"
              value={stats?.anchoredEvents?.toLocaleString() || "0"}
              icon={<ShieldCheck className="w-6 h-6" />}
              subtitle="Verified on-chain"
              statusColor="accent"
              delay={0.2}
            />
            <KPICard
              title="Anomalies Detected"
              value={stats?.anomalyCount || "0"}
              icon={<Zap className="w-6 h-6" />}
              subtitle="Require investigation"
              statusColor={stats?.anomalyCount && stats.anomalyCount > 0 ? "destructive" : "primary"}
              delay={0.3}
            />
            <KPICard
              title="System Status"
              value={health?.status.toUpperCase() || "UNKNOWN"}
              icon={<Server className="w-6 h-6" />}
              subtitle={health ? `Delay: ${health.anchoringDelayMs}ms` : "Syncing..."}
              statusColor={health?.status === "healthy" ? "primary" : "destructive"}
              delay={0.4}
            />
          </>
        )}
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ActivityChart />
      </motion.div>

      {/* Bottom Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <BlockchainStatus />
        <AlertsWidget />
      </motion.div>
    </div>
  );
}
