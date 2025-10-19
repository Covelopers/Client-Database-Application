/** @type {import('next').NextConfig} */
module.exports = {
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // This is important - tells Next.js where to find pages
  // Might need to adjust based on your structure
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Add this to help with the symlink issue
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    // This can help with Windows symlink issues
    config.resolve.symlinks = false;
    return config;
  },
};