/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
