/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [{
      // Unsplash image pattern
      protocol: 'https',
      hostname: 'images.unsplash.com',
    }],
  },
};

export default nextConfig;
