import type { Metadata, Viewport } from 'next';
import '../styles/global.scss';
import 'katex/dist/katex.min.css'; // Apply KaTeX style
import Header from './_components/common/Header';
import Footer from './_components/common/Footer';
import GoToTopButton from './_components/common/GoToTopButton';
import QueryProvider from './_providers/QueryProvider';
import CustomThemeProvider from './_providers/CustomThemeProvider';
import ThemeColorSetter from './_components/common/ThemeColorSetter';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export const metadata: Metadata = {
  title: 'monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`,
  },
  icons: {
    icon: `/icons/favicon-32x32.png`,
    shortcut: `/icons/favicon.ico`,
    apple: `/icons/apple-touch-icon.png`,
  },
  openGraph: {
    title: 'monognuisy blog',
    description: 'Technical blog about web development, programming, and more.',
    url: `${process.env.NEXT_PUBLIC_URI}`,
    siteName: 'monognuisy blog',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `/images/cover/blog-cover.webp`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href={`/icons/favicon.ico`} sizes="any" />
        <link rel="apple-touch-icon" href={`/icons/apple-touch-icon.png`} />
      </head>
      <body>
        <QueryProvider>
          <CustomThemeProvider>
            <ThemeColorSetter />
            <div className="min-h-[100dvh] dark:bg-dark-bg dark:text-dark-text">
              <Header />
              <section className="dark:bg-dark-bg w-full mx-auto mb-auto h-full">
                {children}
              </section>
              <GoToTopButton />
              <Footer />
            </div>
          </CustomThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
