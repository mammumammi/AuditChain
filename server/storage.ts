import { db } from "./db";
import {
  auditMetrics,
  systemHealth,
  securityAlerts,
  type AuditMetric,
  type SystemHealth,
  type SecurityAlert,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getAuditMetrics(): Promise<AuditMetric[]>;
  getSystemHealth(): Promise<SystemHealth | undefined>;
  getSecurityAlerts(): Promise<SecurityAlert[]>;
  resolveSecurityAlert(id: number): Promise<SecurityAlert>;
}

export class DatabaseStorage implements IStorage {
  async getAuditMetrics(): Promise<AuditMetric[]> {
    return await db.select().from(auditMetrics).orderBy(desc(auditMetrics.timestamp)).limit(100);
  }

  async getSystemHealth(): Promise<SystemHealth | undefined> {
    const health = await db.select().from(systemHealth).orderBy(desc(systemHealth.timestamp)).limit(1);
    return health[0];
  }

  async getSecurityAlerts(): Promise<SecurityAlert[]> {
    return await db.select().from(securityAlerts).orderBy(desc(securityAlerts.timestamp)).limit(50);
  }

  async resolveSecurityAlert(id: number): Promise<SecurityAlert> {
    const [updated] = await db.update(securityAlerts)
      .set({ resolved: true })
      .where(eq(securityAlerts.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
