import Image from 'next/image';

type TCardImageProps = {
  className?: string;
  cover?: string;
  sizes?: string;
  alt: string;
  priority?: boolean;
};

const CardImage = ({
  className,
  cover,
  alt,
  sizes = '100vw',
  priority = false,
}: TCardImageProps) => {
  return (
    <Image
      src={cover ? `/images/cover/${cover}.webp` : '/images/sample-bg.webp'}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      quality={80}
      priority={priority}
    />
  );
};

export default CardImage;
