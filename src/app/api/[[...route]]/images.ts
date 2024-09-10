import { Hono } from "hono";
import { unsplash } from "@/lib/unsplash";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = [
  "317103", // animals
  "317099", // nature
  "317101", // landscapes
  "317102", // cityscapes
];

const app = new Hono().get("/", async (c) => {
  const images = await unsplash.photos.getRandom({
    collectionIds: DEFAULT_COLLECTION_IDS,
    count: DEFAULT_COUNT,
  });
  if (images.errors) {
    return c.json({ error: "Something went wrong" }, 400);
  }
  let response = images.response;
  if (!Array.isArray(response)) {
    response = [response];
  }
  return c.json({ images: response });
});

export default app;
