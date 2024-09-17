import { processEnv } from "@/env";
import Replicate from "replicate";

export const replicate = new Replicate({
  auth: processEnv.REPLICATE_API_TOKEN,
});
