// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.mxmcdn.net',
        pathname: '/images-storage/*'
      }
    ],
    domains: ['s.mxmcdn.net']
  }
}

module.exports = nextConfig
