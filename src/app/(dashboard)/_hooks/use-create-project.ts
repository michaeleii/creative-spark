import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";
import { projectKeys } from "./projects-query-keys";

type ResponseType = InferResponseType<typeof client.api.projects.$post, 200>;
type RequestType = InferRequestType<typeof client.api.projects.$post>["json"];

export function useCreateProject() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Project successfully created");
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });
  return mutation;
}
