import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const auditMetrics = pgTable("audit_metrics", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  actionType: text("action_type").notNull(), // 'login_attempt', 'data_modification', 'admin_access'
  count: integer("count").notNull(),
  anomalyScore: numeric("anomaly_score").notNull(),
  isAnchored: boolean("is_anchored").notNull().default(false),
  txHash: text("tx_hash"),
});

export const systemHealth = pgTable("system_health", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  status: text("status").notNull(), // 'healthy', 'degraded', 'error'
  anchoringDelayMs: integer("anchoring_delay_ms").notNull(),
  lastAnchorTime: timestamp("last_anchor_time").notNull(),
});

export const securityAlerts = pgTable("security_alerts", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  severity: text("severity").notNull(), // 'low', 'medium', 'high', 'critical'
  message: text("message").notNull(),
  resolved: boolean("resolved").notNull().default(false),
});

export const insertAuditMetricSchema = createInsertSchema(auditMetrics).omit({ id: true, timestamp: true });
export const insertSystemHealthSchema = createInsertSchema(systemHealth).omit({ id: true, timestamp: true });
export const insertSecurityAlertSchema = createInsertSchema(securityAlerts).omit({ id: true, timestamp: true });

export type AuditMetric = typeof auditMetrics.$inferSelect;
export type InsertAuditMetric = z.infer<typeof insertAuditMetricSchema>;

export type SystemHealth = typeof systemHealth.$inferSelect;
export type InsertSystemHealth = z.infer<typeof insertSystemHealthSchema>;

export type SecurityAlert = typeof securityAlerts.$inferSelect;
export type InsertSecurityAlert = z.infer<typeof insertSecurityAlertSchema>;
