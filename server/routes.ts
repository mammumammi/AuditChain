import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.metrics.list.path, async (req, res) => {
    const metrics = await storage.getAuditMetrics();
    res.json(metrics);
  });

  app.get(api.metrics.stats.path, async (req, res) => {
    const metrics = await storage.getAuditMetrics();
    const totalEvents = metrics.reduce((sum, m) => sum + m.count, 0);
    const anchoredEvents = metrics.filter(m => m.isAnchored).reduce((sum, m) => sum + m.count, 0);
    const anomalyCount = metrics.filter(m => Number(m.anomalyScore) > 0.7).length;
    res.json({ totalEvents, anchoredEvents, anomalyCount });
  });

  app.get(api.health.get.path, async (req, res) => {
    const health = await storage.getSystemHealth();
    if (!health) {
      return res.status(404).json({ message: 'System health not found' });
    }
    res.json(health);
  });

  app.get(api.alerts.list.path, async (req, res) => {
    const alerts = await storage.getSecurityAlerts();
    res.json(alerts);
  });

  app.patch(api.alerts.resolve.path, async (req, res) => {
    try {
      const alert = await storage.resolveSecurityAlert(Number(req.params.id));
      res.json(alert);
    } catch (err) {
      res.status(404).json({ message: 'Alert not found' });
    }
  });

  return httpServer;
}
