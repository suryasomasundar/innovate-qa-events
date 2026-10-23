/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use the standard Vercel Next.js runtime so Clerk authentication and
  // member-profile features can run while public pages remain statically optimized.
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
