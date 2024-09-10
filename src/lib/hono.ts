import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";
import { siteUrl } from "./site-url";

export const client = hc<AppType>(siteUrl);
