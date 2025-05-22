import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { projectKeys } from "./projects-query-keys";
import type { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$get"],
  200
>;

export function useGetProject(id: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await client.api.projects[":id"].$get({ param: { id } });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      return response.json();
    },
  });
  return query;
}
