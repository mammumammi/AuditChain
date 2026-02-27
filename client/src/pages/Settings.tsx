import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalSquare, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold glow-text">SYSTEM SETTINGS</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">
          Configure node connections and threshold parameters.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2 text-primary">
              <TerminalSquare className="w-5 h-5" />
              Node Configuration
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Blockchain RPC endpoint connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">RPC Endpoint URL</Label>
              <Input 
                defaultValue="https://mainnet.infura.io/v3/YOUR-PROJECT-ID" 
                className="font-mono bg-background/50 border-primary/20 focus-visible:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-mono text-xs text-muted-foreground">Anchoring Smart Contract Address</Label>
              <Input 
                defaultValue="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" 
                className="font-mono bg-background/50 border-primary/20 focus-visible:border-primary"
              />
            </div>
            <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg bg-background/30">
              <div className="space-y-0.5">
                <Label className="font-mono text-sm text-foreground">Auto-Anchor Mode</Label>
                <p className="text-xs text-muted-foreground">Automatically anchor aggregated blocks every 10 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="border-primary/30 text-foreground font-mono">
            <RotateCcw className="w-4 h-4 mr-2" />
            RESET
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Save className="w-4 h-4 mr-2" />
            SAVE CONFIGURATION
          </Button>
        </div>
      </div>
    </div>
  );
}
