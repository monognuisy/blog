import Image from 'next/image';
import { cn } from '@/lib/styles';

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
  if (!cover) {
    return (
      <div
        className={cn(
          'absolute aspect-video h-full w-full bg-gray-100 dark:bg-neutral-800',
          className,
        )}
      ></div>
    );
  }

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
