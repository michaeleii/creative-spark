import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { projectKeys } from "./projects-query-keys";
import type { InferRequestType, InferResponseType } from "hono";

export type RequestType = InferRequestType<
  typeof client.api.projects.templates.$get
>["query"];

export type ResponseType = InferResponseType<
  typeof client.api.projects.templates.$get,
  200
>;

export function useGetTemplates({ page, limit }: RequestType) {
  const query = useQuery({
    queryKey: projectKeys.templates({ page, limit }),
    queryFn: async () => {
      const response = await client.api.projects.templates.$get({
        query: { page, limit },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    },
  });
  return query;
}
