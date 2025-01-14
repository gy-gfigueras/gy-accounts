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
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000'],
      allowedHeaders: ['content-type', 'authorization'],
      allowedMethods: ['GET', 'POST'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
    ],
  }
}

module.exports = nextConfig
