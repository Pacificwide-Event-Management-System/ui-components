import clsx from 'clsx';
import { Component, FunctionComponent, MouseEventHandler } from 'react';
import { EmsLoadingIndicator } from '../ems-loading-indicator/EmsLoadingIndicator';

type Props = {
  id?: string;
  label?: string | React.ReactNode;
  extra?: string;
  placeholder?: string;
  typoVariant?: 'button-1' | 'button-2' | 'button-3';
  state?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'primary' | 'secondary' | 'neutral';
  loading?: boolean;
  required?: boolean;
  className?: string;
  icon?: Component;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

// Custom components
const EmsButton: FunctionComponent<Props> = (props) => {
  const getButtonClassName = () => {
    const common = 'rounded-lg !h-10 !p-3 text-[1rem] leading-4 flex items-center justify-center';
    let className = '';
    let hoverClassName = '';
    let focusClassName = '';
    let disabledClassName = '';
    let typoClassName = '';
    switch (props.variant) {
      case 'primary':
      default: {
        if (props.loading) {
          className = ' bg-primary-2 text-neutral-8 opacity-100';
          break;
        }
        className = ' bg-primary-3 text-neutral-8 opacity-100';
        hoverClassName = 'hover:bg-primary-4';
        focusClassName = 'focus:shadow focus:ring-button-focus-primary';
        disabledClassName = 'disabled:bg-primary-1 disabled:text-neutral-8';
        break;
      }
      case 'secondary': {
        if (props.loading) {
          className = 'bg-neutral-8 text-primary-3 border border-primary-3 opacity-100';
          break;
        }
        className = 'bg-neutral-8 text-primary-4 border border-primary-3 opacity-100';
        hoverClassName = 'hover:border-primary-4 hover:text-primary-4';
        focusClassName =
          'focus:text-primary-2 focus:border-primary-2 focus:ring-button-focus-secondary';
        disabledClassName = 'disabled:bg-primary-1 disabled:text-neutral-8';

        break;
      }
      case 'neutral': {
        if (props.loading) {
          className = 'bg-neutral-6 text-neutral-3 opacity-100';
          break;
        }
        className = 'bg-neutral-6 text-neutral-2 opacity-100';
        hoverClassName = 'hover:border-neutral-5 hover:text-neutral-1 hover:bg-neutral-5';
        focusClassName =
          'focus:ring focus:bg-neutral-6 focus:text-neutral-2 focus:ring-button-focus-neutral';
        disabledClassName =
          'disabled:border disabled:border-neutral-4 disabled:bg-neutral-8 disabled:text-neutral-4';
        break;
      }
    }

    switch (props.typoVariant) {
      case 'button-1':
      default: {
        typoClassName = 'tracking-button-1 !text-button-1 font-button leading-button';
        break;
      }
      case 'button-2': {
        typoClassName = 'tracking-button-2 !text-button-2 font-button leading-button';
        break;
      }
      case 'button-3': {
        typoClassName = 'tracking-button-3 !text-button-3 font-button leading-button';
        break;
      }
    }

    return clsx(
      common,
      className,
      hoverClassName,
      focusClassName,
      disabledClassName,
      typoClassName,
    );
  };

  const getLoaderColor = () => {
    switch (props.variant) {
      case 'primary':
      default:
        return 'bg-neutral-8';
      case 'secondary':
        return 'bg-primary-3';
      case 'neutral':
        return 'bg-neutral-3';
    }
  };

  return (
    <button
      className={clsx(getButtonClassName(), props.className)}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading && <EmsLoadingIndicator color={getLoaderColor()} />}
      {props.label}
    </button>
  );
};

export default EmsButton;
