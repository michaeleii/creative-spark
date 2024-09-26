import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { projectKeys } from "./projects-query-keys";
import type { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.projects)["$get"],
  200
>;

export function useGetProjects() {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: projectKeys.all,
    queryFn: async ({ pageParam }) => {
      if (typeof pageParam === "number") {
        const response = await client.api.projects.$get({
          query: { page: pageParam.toString(), limit: "8" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      } else {
        throw new Error("Page is not a number");
      }
    },
  });
  return query;
}
