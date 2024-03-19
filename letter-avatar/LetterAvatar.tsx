import { Avatar, AvatarProps } from 'antd';
import clsx from 'clsx';
import React, { memo, useMemo } from 'react';
import './LetterAvatar.scss';

interface LetterAvatarProps {
  letter: string;
}

const LetterAvatar: React.FC<LetterAvatarProps & AvatarProps> = ({ letter, ...props }) => {
  const getBackgroundClassName = useMemo(() => {
    const normalizedLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const letterCode = normalizedLetter[0].toLowerCase();
    const isLetterCodeValid = /^[a-zA-Z]$/.test(letterCode);
    if (isLetterCodeValid) {
      return `background-letter-avatar background-letter-avatar--${letterCode.toLowerCase()}`;
    } else {
      return `background-letter-avatar background-letter-avatar--default`;
    }
  }, [letter]);

  return (
    <Avatar {...props} className={clsx(getBackgroundClassName, props.className)}>
      {letter[0].toUpperCase()}
    </Avatar>
  );
};

export default memo(LetterAvatar);
