/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["node-ical"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
