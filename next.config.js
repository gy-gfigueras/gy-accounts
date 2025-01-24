/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignorar warnings específicos
    ignoreBuildErrors: true,
  },
  // Silenciar warnings específicos
  onDemandEntries: {
    // Silenciar warnings de cookies
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    // Desactivar warnings de cookies en rutas de API
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["localhost:3000"],
      allowedHeaders: ["content-type", "authorization"],
      allowedMethods: ["GET", "POST"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "api.gycoding.com",
      },
    ],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Excluir rutas de API de la exportación estática
    const pathMap = {
      ...defaultPathMap,
      // Excluir rutas de API
      "/api/auth/[auth0]": { page: "/api/auth/[auth0]" },
      "/api/auth/get": { page: "/api/auth/get" },
      "/api/auth/update": { page: "/api/auth/update" },
    };
    return pathMap;
  },
};

module.exports = nextConfig;
