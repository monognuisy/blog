const isProduction = process.env.NODE_ENV === 'production';
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

  pageExtensions: ['ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

export { isProduction, basePath };
export default nextConfig;
