/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/blog' : '';

const nextConfig = {
  basePath,
  output: 'export',

  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '/**/*',
      },
    ],
    unoptimized: true,
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

export { isProduction, basePath };
export default nextConfig;
