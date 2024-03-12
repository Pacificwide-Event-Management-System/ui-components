'use client';
import { DatePicker } from 'antd';
import { HTMLInputTypeAttribute } from 'react';

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
    <div className={props.className}>
      <DatePicker
        value={props.value}
        autoComplete={props.autoComplete ?? 'off'}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
        color={props.helperText ? 'failure' : ''}
        disabled={props.disabled}
      />
    </div>
  );
}

export default EmsDatePicker;
