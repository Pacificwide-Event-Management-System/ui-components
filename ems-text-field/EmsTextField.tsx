'use client';

import { Input, InputProps } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';

interface Props extends InputProps {
  textInputClassName?: string;
}

// Custom components
const EmsTextField = ({ textInputClassName, autoComplete, ...restProps }: Props) => {
  const { type } = restProps;
  const [inputValue, setInputValue] = useState('');

  const formatDisplayPhone = (value: string) => {
    // remove non-numeric, non-dash characters
    let phone = value.replace(/[^\d-]/g, ''); //
    // remove any leading zeros
    if (phone.length > 0) {
      // Format the phone number in the desired format
      phone = phone.replace(/^(\d{3})(\d{3})(\d{4,6})$/, '($1) $2-$3');
    }

    return phone;
  };

  const handleChange = (event) => {
    if (restProps.type === 'tel') {
      setInputValue(formatDisplayPhone(event.target.value));
    }
    restProps.onChange(event.target.value);
  };

  return (
    <Input
      {...restProps}
      className={clsx(
        'inline-flex !h-10 w-full rounded-lg border border-neutral-5 !px-3 !py-2 !text-base text-neutral-1 !outline-[0] hover:border-primary-2',
        'active:border-primary-3 active:[box-shadow:none]',
        'disabled:border-neutral-divider disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
        // 'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
        textInputClassName,
      )}
      autoComplete={autoComplete ?? 'off'}
      {...(type === 'tel' && { value: inputValue, onChange: handleChange })}
    />
  );
};

export default EmsTextField;
