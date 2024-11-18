/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
// const basePath = isProduction ? '/blog' : '';
const basePath = '';

const nextConfig = {
  basePath,

  images: {
    remotePatterns: [
      {
        hostname: '*',
        pathname: '/**/*',
      },
    ],
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

export { isProduction, basePath };
export default nextConfig;
