import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { projectKeys } from "./projects-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"]["$patch"]({
        json,
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
      // TODO: invalidate projects query
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });
  return mutation;
}
