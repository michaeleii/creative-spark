import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { projectKeys } from "./projects-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$delete"]
>["param"];

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });
  return mutation;
}
