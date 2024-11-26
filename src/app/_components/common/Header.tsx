import Image from 'next/image';
import SearchBar from '../header/SearchBar';
import SlugPath from '../header/SlugPath';
import { basePath } from '@/../next.config.mjs';
import Link from 'next/link';
import ScrollProgressBar from '../header/ScrollProgressBar';

const Header = () => {
  const logoSize = 28;

  return (
    <header className="w-full bg-white/50 shadow-lg backdrop-blur-md sticky top-0 left-0 z-20">
      <div className="flex py-3 max-w-[1200px] px-4 mx-auto">
        <section className="flex-grow flex items-center gap-3">
          <Link href={'/'} style={{ minWidth: logoSize, minHeight: logoSize }}>
            <Image
              src={`${basePath}/images/logo.webp`}
              alt="Logo"
              width={logoSize}
              height={logoSize}
            />
          </Link>
          <SlugPath />
        </section>
        <section className="flex gap-6">
          <SearchBar />
        </section>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
