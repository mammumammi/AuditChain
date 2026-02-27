import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useAlerts() {
  return useQuery({
    queryKey: [api.alerts.list.path],
    queryFn: async () => {
      const res = await fetch(api.alerts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch alerts");
      const data = await res.json();
      return parseWithLogging(api.alerts.list.responses[200], data, "alerts.list");
    },
  });
}

export function useResolveAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.alerts.resolve.path, { id });
      const res = await fetch(url, {
        method: api.alerts.resolve.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 404) throw new Error("Alert not found");
        throw new Error("Failed to resolve alert");
      }
      const data = await res.json();
      return parseWithLogging(api.alerts.resolve.responses[200], data, "alerts.resolve");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.alerts.list.path] });
    },
  });
}
