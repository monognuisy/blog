import Image from 'next/image';
import SearchBar from '../header/SearchBar';
import SlugPath from '../header/SlugPath';

const Header = () => {
  const logoSize = 36;

  return (
    <header className="flex py-4 max-w-[1200px] px-4 mx-auto z-10">
      <section className="flex-grow flex items-center gap-3">
        <a href={'https://monognuisy.github.io'}>
          <Image
            src={'/images/logo.webp'}
            alt="Logo"
            width={logoSize}
            height={logoSize}
          />
        </a>
        <SlugPath />
      </section>
      <section className="flex gap-6">
        <SearchBar />
      </section>
    </header>
  );
};

export default Header;
