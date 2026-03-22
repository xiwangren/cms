/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['stable-diamond-8f35298ae9.media.strapiapp.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '107.23.182.26',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
