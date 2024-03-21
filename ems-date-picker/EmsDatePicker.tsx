'use client';
import { DatePicker } from 'antd';
import clsx from 'clsx';
import { HTMLInputTypeAttribute } from 'react';
import './EmsDatePicker.scss';

type Props = {
  id?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  variant?: string;
  value?: Date;
  state?: string;
  disabled?: boolean;
  autoComplete?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (value: Date) => void;
  required?: boolean;
  format?: string;
  className?: string;
};

// Custom components
function EmsDatePicker(props: Props) {
  return (
    <DatePicker
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
      disabled={props.disabled}
    />
  );
}

export default EmsDatePicker;
