import Replicate from "replicate";
import { processEnv } from "./env";

export const replicate = new Replicate({
  auth: processEnv.REPLICATE_API_TOKEN,
});
