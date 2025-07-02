import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = '';

const nextConfig: NextConfig = {
  basePath,

  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '/**/*',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

export { isProduction, basePath };
export default nextConfig;
