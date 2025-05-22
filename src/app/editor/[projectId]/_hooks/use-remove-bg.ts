import { useMutation } from "@tanstack/react-query";
import type { InferResponseType } from "hono";
import type { InferRequestType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>["json"];

export function useRemoveBG() {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["remove-bg"].$post({ json });
      return response.json();
    },
  });
  return mutation;
}
