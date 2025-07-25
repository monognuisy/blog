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
  title: 'monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
  openGraph: {
    title: 'monognuisy blog',
    description: 'Technical blog about web development, programming, and more.',
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
    title: 'monognuisy blog',
    description: 'Technical blog about web development, programming, and more.',
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
