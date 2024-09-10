import { createApi } from "unsplash-js";
import { processEnv } from "./env";

export const unsplash = createApi({
  accessKey: processEnv.UNSPLASH_ACCESS_KEY,
});
