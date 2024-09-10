import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { imageKeys } from "./images-query-keys";

export function useGetImages() {
  const query = useQuery({
    queryKey: imageKeys.all,
    queryFn: async () => {
      const response = await client.api.images.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    },
  });
  return query;
}
