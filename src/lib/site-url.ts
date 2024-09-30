function getSiteUrl() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return `https://creative-spark.vercel.app`;
    case "preview":
      return `https://${process.env.VERCEL_PROJECT_PREVIEW_URL}`;
    default:
      return "http://localhost:3000";
  }
}

export const siteUrl = getSiteUrl();
