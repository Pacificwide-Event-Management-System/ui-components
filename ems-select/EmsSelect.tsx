import { Select, SelectProps } from 'antd';
import clsx from 'clsx';
import './EmsSelect.css';

function EmsSelect(props: SelectProps) {
  return (
    <Select
      {...props}
      className={clsx(
        'h-10 !text-base text-neutral-1',
        props.disabled ? '[&_.ant-select-selector]:!bg-neutral-7' : '',
        props.className,
      )}
    />
  );
}

export default EmsSelect;
