import { Switch, SwitchProps } from 'antd';
import clsx from 'clsx';
import './EmsSwitch.scss';

interface Props {}

// Custom components
function EmsSwitch(props: Props & SwitchProps) {
  return (
    <>
      <Switch
        {...props}
        className={clsx(
          'ems-switch',
          {
            checked: props.checked,
          },
          props.className,
        )}
      ></Switch>
    </>
  );
}

export default EmsSwitch;
