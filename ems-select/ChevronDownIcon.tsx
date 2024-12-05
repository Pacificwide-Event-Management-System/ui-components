import { Select, SelectProps } from 'antd';
import clsx from 'clsx';
import ChevronDownIcon from './ChevronDownIcon';
import './EmsSelect.css';

function EmsSelect(props: SelectProps) {
  return (
    <Select
      {...props}
      suffixIcon={<ChevronDownIcon />}
      className={clsx(
        'h-10 !text-base text-neutral-1',
        props.disabled ? '[&_.ant-select-selector]:!bg-neutral-7' : '',
        props.className,
      )}
    />
  );
}

export default EmsSelect;
