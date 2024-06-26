'use client';

import { TimePicker } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { DisabledTimes } from 'rc-picker/lib/interface';

type Props = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  showMinute?: boolean;
  disabledTime?: (date: any, range?: 'start' | 'end') => DisabledTimes;
};

// Custom components
function EmsTimePicker(props: Props) {
  return (
    <TimePicker
      disabledTime={props.disabledTime}
      showSecond={false}
      allowClear={props.allowClear}
      showHour={true}
      showMinute={props.showMinute ?? true}
      showNow={props.showMinute !== false}
      minuteStep={5}
      autoComplete={props.autoComplete ?? 'off'}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.disabled}
      needConfirm={false}
      className={clsx(
        'block !h-10 w-full rounded-lg border border-neutral-5 !px-3 !py-2 !text-base text-neutral-1 !outline-[0] hover:border-primary-2',
        'active:border-primary-3 active:[box-shadow:none]',
        'disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
        'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
      )}
      value={props.value ? dayjs(props.value, 'HH:mm') : null}
      onChange={(value) => (value ? props.onChange(value.format('HH:mm')) : null)}
    />
  );
}

export default EmsTimePicker;
