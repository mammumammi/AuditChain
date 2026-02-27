import { db } from "../server/db";
import { auditMetrics, systemHealth, securityAlerts } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");
  
  // Seed Audit Metrics
  await db.insert(auditMetrics).values([
    { actionType: "login_attempt", count: 150, anomalyScore: "0.1", isAnchored: true, txHash: "0x123abc..." },
    { actionType: "data_modification", count: 20, anomalyScore: "0.2", isAnchored: true, txHash: "0x456def..." },
    { actionType: "admin_access", count: 5, anomalyScore: "0.8", isAnchored: false, txHash: null },
    { actionType: "failed_login", count: 45, anomalyScore: "0.9", isAnchored: true, txHash: "0x789ghi..." },
  ]);

  // Seed System Health
  await db.insert(systemHealth).values([
    { status: "healthy", anchoringDelayMs: 1200, lastAnchorTime: new Date() }
  ]);

  // Seed Security Alerts
  await db.insert(securityAlerts).values([
    { severity: "high", message: "Multiple failed logins from IP 192.168.1.100", resolved: false },
    { severity: "medium", message: "Unusual data access pattern detected", resolved: true },
    { severity: "critical", message: "Blockchain anchoring failed for 5 minutes", resolved: false },
  ]);

  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch(console.error);
