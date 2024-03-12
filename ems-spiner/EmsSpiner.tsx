import { Spin, SpinProps } from 'antd';
import { FunctionComponent } from 'react';

interface EmsSpinerProps {}

const EmsSpiner: FunctionComponent<EmsSpinerProps & SpinProps> = (props) => {
  return <Spin {...props} size={props.size ?? 'large'} />;
};

export default EmsSpiner;
