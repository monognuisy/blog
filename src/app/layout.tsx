import type { Metadata, Viewport } from 'next';
import '../styles/global.scss';
import 'katex/dist/katex.min.css'; // Apply KaTeX style
import { ThemeProvider } from 'next-themes';
import Footer from '../components/common/Footer';
import GoToTopButton from '../components/common/GoToTopButton';
import Header from '../components/common/Header';
import ThemeColorSetter from '../components/common/ThemeColorSetter';
import QueryProvider from '../providers/QueryProvider';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(
    isProduction ? process.env.NEXT_PUBLIC_URI! : 'http://localhost:3000',
  ),
  title: '블로그 홈 | monognuisy blog',
  description: '웹 개발, 인공지능 등 다양한 프로그래밍 관련 개발 블로그입니다.',
  alternates: {
    canonical: isProduction
      ? process.env.NEXT_PUBLIC_URI!
      : 'http://localhost:3000',
  },
  openGraph: {
    title: '블로그 홈 | monognuisy blog',
    description:
      '웹 개발, 인공지능 등 다양한 프로그래밍 관련 개발 블로그입니다.',
    url: `${process.env.NEXT_PUBLIC_URI}`,
    siteName: 'monognuisy blog',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: `/images/cover/blog-cover.webp`,
        width: 1200,
        height: 630,
        alt: 'monognuisy blog cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '블로그 홈 | monognuisy blog',
    description:
      '웹 개발, 인공지능 등 다양한 프로그래밍 관련 개발 블로그입니다.',
    images: [`/images/cover/blog-cover.webp`],
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`,
  },
  icons: {
    icon: `/icons/favicon-32x32.png`,
    shortcut: `/icons/favicon.ico`,
    apple: `/icons/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head></head>
      <body className="antialiased" suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider attribute="class">
            <ThemeColorSetter />
            <div className="min-h-[100dvh] dark:bg-dark-bg dark:text-dark-text">
              <Header />
              <section className="mx-auto mb-auto h-full w-full dark:bg-dark-bg">
                {children}
              </section>
              <GoToTopButton />
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
