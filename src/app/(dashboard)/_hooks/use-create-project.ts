import { useMutation } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.projects.$post, 200>;
type RequestType = InferRequestType<typeof client.api.projects.$post>["json"];

export function useCreateProject() {
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
      // TODO: invalidate projects query
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });
  return mutation;
}
