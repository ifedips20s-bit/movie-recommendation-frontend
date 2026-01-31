const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // disable Turbopack completely
  turbopack: false,
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // keep default Webpack config
    return config;
  },
});

module.exports = nextConfig;
