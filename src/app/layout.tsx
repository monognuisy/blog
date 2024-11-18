import type { Metadata } from 'next';
import '../styles/global.scss';
import 'katex/dist/katex.min.css'; // Apply KaTeX style
import Header from './_components/common/Header';
import Footer from './_components/common/Footer';
import GoToTopButton from './_components/common/GoToTopButton';
import QueryProvider from './_providers/QueryProvider';
import { basePath } from '@/../next.config.mjs';

export const metadata: Metadata = {
  title: 'monognuisy blog',
  description: 'Technical blog about web development, programming, and more.',
  icons: {
    icon: `${basePath}/icons/favicon-32x32`,
    shortcut: `${basePath}/icons/favicon.ico`,
    apple: `${basePath}/icons/apple-touch-icon.png`,
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
        <link rel="icon" href={`${basePath}/icons/favicon.ico`} sizes="any" />
        <link
          rel="apple-touch-icon"
          href={`${basePath}/icons/apple-touch-icon.png`}
        />
      </head>
      <body className="min-h-[100vh]">
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
