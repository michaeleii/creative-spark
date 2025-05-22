import { env } from "@/env";
import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: env.UNSPLASH_ACCESS_KEY,
});
