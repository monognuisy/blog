import type { Metadata } from 'next';
import '../styles/global.scss';
import 'katex/dist/katex.min.css'; // Apply KaTeX style
import Header from './_components/common/Header';
import Footer from './_components/common/Footer';
import GoToTopButton from './_components/common/GoToTopButton';
import QueryProvider from './_providers/QueryProvider';

export const metadata: Metadata = {
  title: 'monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
  icons: {
    icon: `/icons/favicon-32x32`,
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
    <html lang="en">
      <head>
        <link rel="icon" href={`/icons/favicon.ico`} sizes="any" />
        <link rel="apple-touch-icon" href={`/icons/apple-touch-icon.png`} />
      </head>
      <body className="">
        <QueryProvider>
          <Header />
          <section className="w-full mx-auto mb-auto h-full">
            {children}
          </section>
          <GoToTopButton />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
