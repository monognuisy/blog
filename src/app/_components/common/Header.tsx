import Image from 'next/image';
import SearchBar from '../header/SearchBar';

const Header = () => {
  const logoSize = 36;

  return (
    <header className="flex py-4 max-w-[1200px] px-4 mx-auto">
      <section className="flex-grow flex items-center gap-6">
        <Image
          src={'/images/logo.webp'}
          alt="Logo"
          width={logoSize}
          height={logoSize}
        />
        <p className="text-xl">/ blog / ai / linear-regression</p>
      </section>
      <section className="flex gap-6">
        <SearchBar />
      </section>
    </header>
  );
};

export default Header;
