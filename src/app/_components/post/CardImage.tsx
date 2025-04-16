import Image from 'next/image';

type TCardImageProps = {
  className?: string;
  cover?: string;
  alt: string;
};

const CardImage = ({ className, cover, alt }: TCardImageProps) => {
  return (
    <Image
      src={cover ? `/images/cover/${cover}.webp` : '/images/sample-bg.webp'}
      priority
      alt={alt}
      fill
      sizes="100vw"
      className={className}
    />
  );
};

export default CardImage;
