function getSiteUrl() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    case "preview":
      return `https://${process.env.VERCEL_PROJECT_PREVIEW_URL}`;
    default:
      return "http://localhost:3000";
  }
}

export const siteUrl = getSiteUrl();
