/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      // Unsplash image pattern
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'img.clerk.com',
    },
  {
      protocol: 'https',
      hostname: 'cdn-icons-png.flaticon.com',
  }],
  },
};

export default nextConfig;
