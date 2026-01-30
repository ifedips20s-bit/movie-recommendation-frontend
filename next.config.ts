/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // PWA only enabled in production
});

const nextConfig = withPWA({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Keep your custom webpack modifications if any
    return config;
  },
});

module.exports = nextConfig;
