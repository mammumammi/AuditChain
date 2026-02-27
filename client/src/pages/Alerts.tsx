import { useState } from "react";
import { format } from "date-fns";
import { ShieldAlert, CheckCircle2, ShieldCheck, Search, Filter } from "lucide-react";
import { useAlerts, useResolveAlert } from "@/hooks/use-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Alerts() {
  const { data: alerts, isLoading } = useAlerts();
  const resolveAlert = useResolveAlert();
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("active");
  const [search, setSearch] = useState("");

  const filteredAlerts = alerts?.filter(alert => {
    if (filter === "active" && alert.resolved) return false;
    if (filter === "resolved" && !alert.resolved) return false;
    if (search && !alert.message.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold glow-text">SECURITY ALERTS</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            System threat detection and mitigation log.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search alerts..." 
              className="pl-9 bg-background/50 border-primary/20 w-full md:w-[250px] font-mono text-sm focus-visible:ring-primary/50 focus-visible:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex bg-background/50 border border-primary/20 rounded-md p-1">
            {(["all", "active", "resolved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono rounded-sm transition-all",
                  filter === f 
                    ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,240,255,0.1)]" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Card className="glass-panel min-h-[500px]">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-20 w-full rounded-xl bg-muted/20" />
              ))}
            </div>
          ) : filteredAlerts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground space-y-4">
              <ShieldCheck className="w-16 h-16 text-primary/30" />
              <p className="font-mono text-lg">No alerts found matching criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {filteredAlerts?.map((alert) => (
                <div 
                  key={alert.id}
                  className={cn(
                    "p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center transition-all hover:bg-white/[0.02]",
                    alert.resolved ? "opacity-60" : ""
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn(
                      "mt-1 p-2 rounded-lg border",
                      alert.severity === 'critical' ? 'bg-destructive/10 border-destructive/30 text-destructive' :
                      alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' :
                      'bg-blue-500/10 border-blue-500/30 text-blue-500'
                    )}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className={cn(
                          "font-mono text-[10px] uppercase shadow-none",
                          alert.severity === 'critical' ? 'border-destructive text-destructive' :
                          alert.severity === 'high' ? 'border-orange-500 text-orange-500' :
                          'border-blue-500 text-blue-500'
                        )}>
                          {alert.severity}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          {format(new Date(alert.timestamp), 'PPpp')}
                        </span>
                      </div>
                      <p className="text-foreground font-medium">{alert.message}</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto flex justify-end shrink-0">
                    {alert.resolved ? (
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1 py-1.5 px-3">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="font-mono text-xs">RESOLVED</span>
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-mono transition-all duration-300 w-full md:w-auto shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                        onClick={() => resolveAlert.mutate(alert.id)}
                        disabled={resolveAlert.isPending}
                      >
                        {resolveAlert.isPending && resolveAlert.variables === alert.id ? (
                          "PROCESSING..."
                        ) : (
                          "ACKNOWLEDGE THREAT"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
