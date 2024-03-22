import Letter_A from '@/static/letter-avatar/a';
import Letter_B from '@/static/letter-avatar/b';
import Letter_C from '@/static/letter-avatar/c';
import Letter_D from '@/static/letter-avatar/d';
import Letter_Default from '@/static/letter-avatar/default';
import Letter_E from '@/static/letter-avatar/e';
import Letter_F from '@/static/letter-avatar/f';
import Letter_G from '@/static/letter-avatar/g';
import Letter_H from '@/static/letter-avatar/h';
import Letter_I from '@/static/letter-avatar/i';
import Letter_J from '@/static/letter-avatar/j';
import Letter_K from '@/static/letter-avatar/k';
import Letter_L from '@/static/letter-avatar/l';
import Letter_M from '@/static/letter-avatar/m';
import Letter_N from '@/static/letter-avatar/n';
import Letter_O from '@/static/letter-avatar/o';
import Letter_P from '@/static/letter-avatar/p';
import Letter_Q from '@/static/letter-avatar/q';
import Letter_R from '@/static/letter-avatar/r';
import Letter_S from '@/static/letter-avatar/s';
import Letter_T from '@/static/letter-avatar/t';
import Letter_U from '@/static/letter-avatar/u';
import Letter_V from '@/static/letter-avatar/v';
import Letter_W from '@/static/letter-avatar/w';
import Letter_X from '@/static/letter-avatar/x';
import Letter_Y from '@/static/letter-avatar/y';
import Letter_Z from '@/static/letter-avatar/z';
import { AvatarProps } from 'antd';
import React, { memo, useMemo } from 'react';
// import './LetterAvatar.scss';

interface LetterAvatarProps {
  letter: string;
  size?: number;
}

const LetterAvatar: React.FC<LetterAvatarProps & AvatarProps> = ({ letter, size, ...props }) => {
  // const getBackgroundClassName = useMemo(() => {
  //   let result = `background-letter-avatar background-letter-avatar--default`;
  //   if (letter) {
  //     const normalizedLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  //     const letterCode = normalizedLetter[0].toLowerCase();
  //     const isLetterCodeValid = /^[a-zA-Z]$/.test(letterCode);

  //     if (isLetterCodeValid) {
  //       result = `background-letter-avatar background-letter-avatar--${letterCode.toLowerCase()}`;
  //     }
  //   }

  //   return result;
  // }, [letter]);

  const letterCode = useMemo(() => {
    let result = null;
    if (letter) {
      const normalizedLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const letterCode = normalizedLetter[0].toLowerCase();
      const isLetterCodeValid = /^[a-zA-Z]$/.test(letterCode);

      if (isLetterCodeValid) {
        result = letterCode;
      }
    }

    return result;
  }, [letter]);

  switch (letterCode) {
    case 'a':
      return <Letter_A size={size} />;
    case 'b':
      return <Letter_B size={size} />;
    case 'c':
      return <Letter_C size={size} />;
    case 'd':
      return <Letter_D size={size} />;
    case 'e':
      return <Letter_E size={size} />;
    case 'f':
      return <Letter_F size={size} />;
    case 'g':
      return <Letter_G size={size} />;
    case 'h':
      return <Letter_H size={size} />;
    case 'i':
      return <Letter_I size={size} />;
    case 'j':
      return <Letter_J size={size} />;
    case 'k':
      return <Letter_K size={size} />;
    case 'l':
      return <Letter_L size={size} />;
    case 'm':
      return <Letter_M size={size} />;
    case 'n':
      return <Letter_N size={size} />;
    case 'o':
      return <Letter_O size={size} />;
    case 'p':
      return <Letter_P size={size} />;
    case 'q':
      return <Letter_Q size={size} />;
    case 'r':
      return <Letter_R size={size} />;
    case 's':
      return <Letter_S size={size} />;
    case 't':
      return <Letter_T size={size} />;
    case 'u':
      return <Letter_U size={size} />;
    case 'v':
      return <Letter_V size={size} />;
    case 'w':
      return <Letter_W size={size} />;
    case 'x':
      return <Letter_X size={size} />;
    case 'y':
      return <Letter_Y size={size} />;
    case 'z':
      return <Letter_Z size={size} />;
    default:
      return <Letter_Default size={size} />;
  }
};

export default memo(LetterAvatar);
