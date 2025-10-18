import type { NextConfig } from "next";

const repoName = process.env.NEXT_PUBLIC_GH_REPO ?? "";
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "*.ngrok-free.app"],
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
};

export default nextConfig;
