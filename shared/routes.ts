import { z } from 'zod';
import { auditMetrics, systemHealth, securityAlerts } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  metrics: {
    list: {
      method: 'GET' as const,
      path: '/api/metrics' as const,
      responses: {
        200: z.array(z.custom<typeof auditMetrics.$inferSelect>()),
      },
    },
    stats: {
      method: 'GET' as const,
      path: '/api/metrics/stats' as const,
      responses: {
        200: z.object({
          totalEvents: z.number(),
          anchoredEvents: z.number(),
          anomalyCount: z.number(),
        }),
      },
    }
  },
  health: {
    get: {
      method: 'GET' as const,
      path: '/api/health/latest' as const,
      responses: {
        200: z.custom<typeof systemHealth.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  alerts: {
    list: {
      method: 'GET' as const,
      path: '/api/alerts' as const,
      responses: {
        200: z.array(z.custom<typeof securityAlerts.$inferSelect>()),
      },
    },
    resolve: {
      method: 'PATCH' as const,
      path: '/api/alerts/:id/resolve' as const,
      responses: {
        200: z.custom<typeof securityAlerts.$inferSelect>(),
        404: errorSchemas.notFound,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
