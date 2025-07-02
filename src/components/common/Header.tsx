import Image from 'next/image';
import Link from 'next/link';
import DarkmodeToggleButton from '../header/DarkmodeToggleButton';
import ScrollProgressBar from '../header/ScrollProgressBar';
import SearchBar from '../header/SearchBar';
import SlugPath from '../header/SlugPath';

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-20 w-full bg-white/50 backdrop-blur dark:bg-dark-bg/50">
      <div className="mx-auto flex max-w-[80rem] px-4 py-3 2xl:max-w-[96rem]">
        <section className="flex flex-grow items-center gap-3">
          <Link href={'/'} className="h-6 w-6 md:h-7 md:w-7">
            <Image
              src={`/images/logo.webp`}
              alt="Logo"
              width={32}
              height={32}
              className="block dark:hidden"
              unoptimized
            />
            <Image
              src={`/images/logo-dark.webp`}
              alt="Logo"
              width={32}
              height={32}
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
