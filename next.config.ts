import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/id/***/***/***'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/40',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      }
    ],
  },
};

export default nextConfig;
