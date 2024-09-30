function getSiteUrl() {
  switch (process.env.NODE_ENV) {
    case "production":
      return `https://creative-spark.vercel.app`;
    case "test":
      return `https://${process.env.VERCEL_PROJECT_PREVIEW_URL}`;
    default:
      return "http://localhost:3000";
  }
}

export const siteUrl = getSiteUrl();
