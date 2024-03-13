import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface IEmsImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string;
  alt?: string;
}
export default function EmsImage({
  src,
  alt = 'Admin Portal',
  fill,
  className,
  ...restProps
}: IEmsImageProps) {
  const [isError, setIsError] = useState(false);

  const onError = () => {
    setIsError(true);
  };
  if (!src || isError) {
    return (
      <Image
        src={require('@/static/speaker-event/Avatar.png')}
        className={className}
        {...restProps}
        alt={alt}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        fill
        className={clsx('object-cover object-center', className)}
        onError={onError}
        {...restProps}
        alt={alt}
      />
    );
  }
  return <Image src={src} onError={onError} className={className} alt={alt} {...restProps} />;
}
