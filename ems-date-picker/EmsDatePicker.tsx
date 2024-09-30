'use client';
import { DatePickerFormat } from '@/libs/constants/dateConstant';
import { DatePicker } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
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
  minDate?: Date;
  maxDate?: Date;
  defaultValue?: any;
};

// Custom components
function EmsDatePicker(props: Props) {
  return (
    <DatePicker
    format={DatePickerFormat}
    allowClear={false}
      className={clsx(
        'flex !h-10 w-full items-center rounded-lg border border-neutral-5 px-3 !text-base text-neutral-1 !outline-[0] hover:border-primary-2',
        'active:border-primary-3 active:[box-shadow:none]',
        'disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
      )}
      value={props.value}
      onChange={(value) => props.onChange(value)}
      autoComplete={props.autoComplete ?? 'off'}
      required={props.required}
      placeholder={props.placeholder}
      disabled={props.disabled}
      minDate={props.minDate ? dayjs(props.minDate) : undefined}
      maxDate={props.maxDate ? dayjs(props.maxDate) : undefined}
    />
  );
}

export default EmsDatePicker;
