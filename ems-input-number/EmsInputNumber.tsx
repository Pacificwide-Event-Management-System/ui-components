'use client';
import { ConfigProvider, InputNumber, InputNumberProps } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import './EmsInputNumber.scss';

type Props = {
  label?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: (value: string) => void;
  required?: boolean;
};

function EmsInputNumber(props: Props & InputNumberProps) {
  const [value, setValue] = useState(props.value);

  const isNumeric = (value: string) => {
    return /^\d+$/.test(value);
  };

  const handleChange = (value: string) => {
    let isValid = true;
    if (!isNumeric(value)) isValid = false;
    if (props.min) {
      if (Number(value) < Number(props.min)) {
        isValid = false;
      }
    }
    if (props.max) {
      if (Number(value) > Number(props.max)) {
        isValid = false;
      }
    }
    if (isValid) {
      setValue(value);
      props.onChange(value);
    } else {
      setValue('');
      props.onChange('');
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeShadow: '0px 0px 0px 3px #FC50554D',
          },
        },
      }}
    >
      <InputNumber
        {...props}
        value={value}
        autoComplete={props.autoComplete ?? 'off'}
        onChange={handleChange}
        className={clsx(
          'flex !h-10 w-full items-center rounded-lg border border-neutral-5 !text-base text-neutral-1 !outline-[0] hover:border-primary-2',
          'active:border-primary-3 active:[box-shadow:none]',
          'disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
          'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
          'overflow-hidden',
          props.className,
        )}
      />
    </ConfigProvider>
  );
}

export default EmsInputNumber;
