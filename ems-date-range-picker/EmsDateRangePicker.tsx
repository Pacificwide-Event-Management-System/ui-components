'use client';
import { DatePicker } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import './EmsDateRangePicker.scss';

type Props = {
  placeholder?: [string, string];
  disabled?: boolean;
  value?: any;
  autoComplete?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  minDate?: Date;
};

// Custom components
const EmsDateRangePicker: FunctionComponent<Props> = (props) => {
  return (
    <DatePicker.RangePicker
      minDate={dayjs(props.minDate)}
      format={'MM/DD/YYYY'}
      allowClear={false}
      className={clsx(
        'flex !h-10 w-full items-center rounded-lg border border-neutral-5 px-3 !text-base text-neutral-1 !outline-[0] hover:border-primary-2',
        'active:border-primary-3 active:[box-shadow:none]',
        'disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
        'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
        'overflow-hidden',
      )}
      value={props.value}
      onChange={(value) => props.onChange(value)}
      autoComplete={props.autoComplete ?? 'off'}
      required={props.required}
      placeholder={props.placeholder}
      separator={'-'}
      disabled={props.disabled}
    />
  );
};

export default EmsDateRangePicker;
