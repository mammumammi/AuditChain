import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAlerts, useResolveAlert } from "@/hooks/use-alerts";
import { ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function AlertsWidget() {
  const { data: alerts, isLoading } = useAlerts();
  const resolveAlert = useResolveAlert();

  const getSeverityStyles = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/50';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity.toLowerCase() === 'critical') return <AlertTriangle className="w-4 h-4 text-destructive" />;
    return <ShieldAlert className="w-4 h-4" />;
  };

  return (
    <Card className="glass-panel h-full flex flex-col">
      <CardHeader className="border-b border-border/50 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-destructive" />
          Active Threats
        </CardTitle>
        <Badge variant="outline" className="font-mono text-xs border-destructive/30 text-destructive bg-destructive/10">
          {alerts?.filter(a => !a.resolved).length || 0} Open
        </Badge>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="p-6 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : alerts?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground font-mono text-sm flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary/50" />
              <p>No active security alerts.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {alerts?.map((alert) => (
                <div 
                  key={alert.id} 
                  className={cn(
                    "p-4 transition-all duration-300",
                    alert.resolved ? "opacity-50 grayscale" : "hover:bg-accent/5 bg-background/30"
                  )}
                >
                  <div className="flex gap-3">
                    <div className="mt-1 shrink-0">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <Badge className={cn("font-mono text-[10px] uppercase shadow-none", getSeverityStyles(alert.severity))}>
                          {alert.severity}
                        </Badge>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {format(new Date(alert.timestamp), 'MMM dd HH:mm')}
                        </span>
                      </div>
                      <p className="text-sm font-medium leading-snug">
                        {alert.message}
                      </p>
                      
                      {!alert.resolved && (
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs font-mono border-primary/30 text-primary hover:bg-primary/20 w-full"
                            onClick={() => resolveAlert.mutate(alert.id)}
                            disabled={resolveAlert.isPending}
                          >
                            {resolveAlert.isPending && resolveAlert.variables === alert.id ? (
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 mr-2" />
                            )}
                            ACKNOWLEDGE
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
