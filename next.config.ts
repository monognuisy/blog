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

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: 자체 + utterances 댓글 + JSON-LD 인라인 스크립트
              "script-src 'self' 'unsafe-inline' https://utteranc.es",
              // Styles: 자체 + Tailwind + KaTeX 인라인 스타일
              "style-src 'self' 'unsafe-inline'",
              // Images: 자체 + 외부 이미지 (블로그 포스트용) + data URIs
              "img-src 'self' https: data:",
              // Fonts: 자체 폰트만
              "font-src 'self'",
              // API 연결: 자체 + Supabase
              "connect-src 'self' https://*.supabase.co https://*.supabase.in",
              // Frames: utterances 댓글을 위한 GitHub
              'frame-src https://github.com https://utteranc.es',
              // 기본 보안 설정
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "media-src 'self'",
              "worker-src 'self'",
              // 업그레이드 가능한 요청은 HTTPS로
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export { isProduction, basePath };
export default nextConfig;
