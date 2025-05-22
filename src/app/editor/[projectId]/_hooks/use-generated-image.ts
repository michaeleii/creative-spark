import { useMutation } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.ai.generate.$post>;
type RequestType = InferRequestType<
  typeof client.api.ai.generate.$post
>["json"];

export function useGenerateImage() {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai.generate.$post({ json });
      return response.json();
    },
  });
  return mutation;
}
