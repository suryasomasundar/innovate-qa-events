/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Deploying to root domain, no basePath needed
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
