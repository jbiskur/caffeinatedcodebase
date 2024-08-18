/** @type {import("next").NextConfig} */

import * as withPWAInit from "@ducanh2912/next-pwa";
import removeImports from "next-remove-imports"
//
const withPWA = withPWAInit.default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    // disable: false,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true
    },
})

const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
         config.resolve.fallback.fs = false
         config.resolve.fallback.dns = false
         config.resolve.fallback.net = false
    }

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== "development",
  }
};

export default withPWA(removeImports(nextConfig));