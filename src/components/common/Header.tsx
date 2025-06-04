import Image from 'next/image';
import SearchBar from '../header/SearchBar';
import SlugPath from '../header/SlugPath';
import Link from 'next/link';
import ScrollProgressBar from '../header/ScrollProgressBar';
import DarkmodeToggleButton from '../header/DarkmodeToggleButton';

const Header = () => {
  const logoSize = 28;

  return (
    <header className="dark:bg-dark-bg/50 w-full bg-white/50 shadow-lg backdrop-blur-md sticky top-0 left-0 z-20">
      <div className="flex py-3 max-w-[80rem] 2xl:max-w-[96rem] px-4 mx-auto">
        <section className="flex-grow flex items-center gap-3">
          <Link href={'/'} style={{ minWidth: logoSize, minHeight: logoSize }}>
            <Image
              src={`/images/logo.webp`}
              alt="Logo"
              width={logoSize}
              height={logoSize}
              className="block dark:hidden"
              unoptimized
            />
            <Image
              src={`/images/logo-dark.webp`}
              alt="Logo"
              width={logoSize}
              height={logoSize}
              className="hidden dark:block"
              unoptimized
            />
          </Link>
          <SlugPath />
        </section>
        <section className="flex gap-6">
          <DarkmodeToggleButton />
          <SearchBar />
        </section>
      </div>
      <ScrollProgressBar />
    </header>
  );
};

export default Header;
