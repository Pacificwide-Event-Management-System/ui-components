import { Input, InputProps } from "antd";
import clsx from "clsx";

interface Props extends InputProps {
  textInputClassName?: string;
}

// Custom components
const EmsTextField = ({
  textInputClassName,
  autoComplete,
  ...restProps
}: Props) => {
  console.log(restProps, "restProps");
  return (
    <Input
      {...restProps}
      className={clsx(
        "inline-flex !h-10 w-full rounded-lg border border-neutral-5 !px-3 !py-2 !text-base text-neutral-1 !outline-[0] hover:border-primary-2",
        "active:border-primary-3 active:[box-shadow:none]",
        "disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5",
        // 'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
        textInputClassName
      )}
      autoComplete={autoComplete ?? "off"}
    />
  );
};

export default EmsTextField;
