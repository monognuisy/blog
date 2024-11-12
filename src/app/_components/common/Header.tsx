import Image from 'next/image';
import SearchBar from '../header/SearchBar';
import SlugPath from '../header/SlugPath';
import { basePath } from '@/../next.config.mjs';
import Link from 'next/link';

const Header = () => {
  const logoSize = 36;

  return (
    <header className="flex py-4 max-w-[1200px] px-4 mx-auto z-10">
      <section className="flex-grow flex items-center gap-3">
        <Link href={'https://monognuisy.github.io'}>
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
    </header>
  );
};

export default Header;
