"use client";
import { DateTimePickerFormat } from "@/libs/constants/dateConstant";
import { DatePicker, DatePickerProps } from "antd";
import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
import "./EmsDateTimePicker.scss";

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
  onChange?: (value: any) => void;
  required?: boolean;
  format?: string;
  className?: string;
};

// Custom components
function EmsDateTimePicker(props: Props & DatePickerProps) {
  return (
    <DatePicker
      {...props}
      format={DateTimePickerFormat}
      needConfirm={false}
      className={clsx(
        "flex !h-10 w-full items-center rounded-lg border border-neutral-5 px-3 !text-base text-neutral-1 !outline-[0] hover:border-primary-2",
        "active:border-primary-3 active:[box-shadow:none]",
        props.disabled && "border-neutral-divider !bg-neutral-7 !text-neutral-3 hover:border-neutral-5",
        "focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0",
        "overflow-hidden"
      )}
      value={props.value}
      onChange={(value) => {
        let valid = true;
        if (value && props.minDate && value < props.minDate) valid = false;
        if (value && props.maxDate && value > props.maxDate) valid = false;
        if (!valid) value = null;
        props.onChange(value);
      }}
      autoComplete={props.autoComplete ?? "off"}
      required={props.required}
      placeholder={props.placeholder}
      disabled={props.disabled}
      showTime={true}
      allowClear={true}
    />
  );
}

export default EmsDateTimePicker;
