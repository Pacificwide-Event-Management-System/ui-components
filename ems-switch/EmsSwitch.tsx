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
        checkedChildren={<div className="h-[10px] w-[1px] bg-neutral-8"></div>}
        unCheckedChildren={<div className="h-[10px] w-[1px] bg-neutral-8"></div>}
      ></Switch>
    </>
  );
}

export default EmsSwitch;
