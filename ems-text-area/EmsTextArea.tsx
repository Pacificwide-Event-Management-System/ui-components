import { TextAreaProps } from 'antd/es/input';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';

type Props = {
  id?: string;
  label?: string;
  helperText?: string;
  textInputClassName?: string;
  disableResize?: boolean;
};

// Custom components
function EmsTextArea(props: Props & TextAreaProps) {
  return (
    <>
      {props.label && (
        <div className="mb-1 block">
          <label className="text-neutral-3" htmlFor={props.id}>
            {props.label}
          </label>
        </div>
      )}
      <TextArea
        {...props}
        className={clsx(
          'block w-full rounded-lg border !px-3 !py-2 !text-base text-neutral-1 !outline-[0] hover:border-primary-2 active:border-primary-3 active:[box-shadow:none]',
          'disabled:border-none disabled:!bg-neutral-7 disabled:!text-neutral-3 disabled:hover:border-neutral-5',
          // 'focus:shadow-[0px_0px_0px_3px_#FC50554D] focus:ring-0',
          props.helperText ? 'border-accent-red' : 'border-neutral-5',
          props.textInputClassName,
        )}
        id={props.id}
        autoComplete={props.autoComplete ?? 'off'}
        color={props.helperText ? 'failure' : ''}
        style={{ resize: props.disableResize ? 'none' : 'vertical' }}
      />
      {props.helperText && (
        <label className="mt-2 text-sm text-accent-red">{props.helperText}</label>
      )}
    </>
  );
}

export default EmsTextArea;
