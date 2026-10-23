/** @type {import('next').NextConfig} */
const nextConfig = {
  // The production site is deployed from ./out through the FTP workflow.
  output: 'export',
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
  },
}

export default nextConfig
