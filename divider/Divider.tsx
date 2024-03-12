import { Divider as AntDivider, DividerProps } from 'antd';
import clsx from 'clsx';
import { FunctionComponent } from 'react';

const Divider: FunctionComponent<DividerProps> = ({ className, children, ...props }) => {
  return (
    <AntDivider {...props} className={clsx(className)}>
      {children}
    </AntDivider>
  );
};

export default Divider;
