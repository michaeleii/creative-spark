import type { RequestType } from "./use-get-templates";

export const projectKeys = {
  all: ["projects"] as const,
  detail: (id: string) => [...projectKeys.all, id] as const,
  templates: ({ page, limit }: RequestType) => [
    ...projectKeys.all,
    { page, limit },
  ],
};
