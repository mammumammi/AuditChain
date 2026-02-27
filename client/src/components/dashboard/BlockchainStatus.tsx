import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMetrics } from "@/hooks/use-metrics";
import { Hash, ExternalLink, ShieldCheck } from "lucide-react";
import { format } from "date-fns";

export function BlockchainStatus() {
  const { data: metrics, isLoading } = useMetrics();

  // Filter for anchored metrics only
  const anchoredMetrics = metrics?.filter(m => m.isAnchored && m.txHash) || [];

  return (
    <Card className="glass-panel h-full flex flex-col">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Recent Anchors
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-muted/20 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : anchoredMetrics.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground font-mono text-sm">
              No recent anchoring events detected.
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {anchoredMetrics.slice(0, 10).map((metric) => (
                <div key={metric.id} className="p-4 hover:bg-primary/5 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-mono text-[10px] bg-background border-primary/30 text-primary">
                      {metric.actionType}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">
                      {format(new Date(metric.timestamp), 'HH:mm:ss')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-background/50 border border-border/50 font-mono text-xs overflow-hidden">
                    <Hash className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span className="truncate text-muted-foreground group-hover:text-foreground transition-colors">
                      {metric.txHash}
                    </span>
                    <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-primary">
                      <ExternalLink className="w-3 h-3" />
                    </button>
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
