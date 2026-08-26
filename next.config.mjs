import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  register: true,
  additionalPrecacheEntries: [{ url: "/~offline", revision: process.env.VERCEL_GIT_COMMIT_SHA ?? "v1" }],
});

export default withSerwist({
  reactStrictMode: true,
});
