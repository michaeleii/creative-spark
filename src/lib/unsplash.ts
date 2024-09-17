import { processEnv } from "@/env";
import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: processEnv.UNSPLASH_ACCESS_KEY,
});
