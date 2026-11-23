/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // Static export must run from any path: Vercel serves it at "/", but the
  // Arweave copy lives under /<manifest-id>/ on a path gateway.
  assetPrefix: "./",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lanyard.cnrad.dev",
      },
    ],
  },
};

module.exports = nextConfig;
