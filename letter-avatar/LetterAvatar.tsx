import { Avatar, AvatarProps } from 'antd';
import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import './LetterAvatar.scss';

interface LetterAvatarProps {
  letter: string;
}

const LetterAvatar: React.FC<LetterAvatarProps & AvatarProps> = ({ letter, ...props }) => {
  const getBackgroundClassName = useMemo(() => {
    let result = `background-letter-avatar background-letter-avatar--default`;
    if (letter) {
      const normalizedLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const letterCode = normalizedLetter[0].toLowerCase();
      const isLetterCodeValid = /^[a-zA-Z]$/.test(letterCode);

      if (isLetterCodeValid) {
        result = `background-letter-avatar background-letter-avatar--${letterCode.toLowerCase()}`;
      }
    }

    return result;
  }, [letter]);

  return (
    <Avatar {...props} className={clsx(getBackgroundClassName, props.className)}>
      {letter ? letter[0].toUpperCase() : null}
    </Avatar>
  );
};

export default memo(LetterAvatar);
