'use client';

import { FunctionComponent } from 'react';
import './style.scss';

type Props = {
  color: string;
};

export const EmsLoadingIndicator: FunctionComponent<Props> = (props) => {
  return (
    <div className="ems-loader mr-3 flex gap-1">
      <div className={`loader1 size-1 rounded-full ${props.color}`}></div>
      <div className={`loader2 size-1 rounded-full ${props.color}`}></div>
      <div className={`loader3 size-1 rounded-full ${props.color}`}></div>
    </div>
  );
};
