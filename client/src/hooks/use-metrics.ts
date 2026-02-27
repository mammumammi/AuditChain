import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useMetrics() {
  return useQuery({
    queryKey: [api.metrics.list.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch metrics");
      const data = await res.json();
      return parseWithLogging(api.metrics.list.responses[200], data, "metrics.list");
    },
  });
}

export function useMetricStats() {
  return useQuery({
    queryKey: [api.metrics.stats.path],
    queryFn: async () => {
      const res = await fetch(api.metrics.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch metric stats");
      const data = await res.json();
      return parseWithLogging(api.metrics.stats.responses[200], data, "metrics.stats");
    },
  });
}
