import LeftArrow from '@/static/left-arrow.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { FunctionComponent } from 'react';

interface BackIconButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackIconButton: FunctionComponent<BackIconButtonProps> = ({ onClick, className }) => {
  return (
    <div
      className={clsx(
        'flex size-9 cursor-pointer items-center justify-center rounded-full border border-neutral-6 bg-neutral-8',
        className,
      )}
      onClick={onClick}
    >
      <Image
        className="cursor-pointer"
        alt="back-icon"
        src={LeftArrow.src}
        width={16}
        height={16}
      />
    </div>
  );
};

export default BackIconButton;
