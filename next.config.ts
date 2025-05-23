import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['app', 'actions', 'components'],
  },
};

export default nextConfig;
