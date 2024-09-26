import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { projectKeys } from "./projects-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"]
>["param"];

export function useDuplicateProject() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].duplicate.$post({
        param,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: () => {
      toast.error("Failed to duplicate project");
    },
  });
  return mutation;
}
