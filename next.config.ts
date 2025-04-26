import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'picsum.photos',
      pathname: '/seed/picsum/400/300'
    }],
  },
};

export default nextConfig;
