import { Typography } from 'antd';
import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';

interface EmsTypoProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'b1'
    | 'b1-bold'
    | 'b2'
    | 'b2-bold'
    | 'b3'
    | 'b3-bold'
    | 'b4'
    | 'b4-bold'
    | 'button-1'
    | 'button-2'
    | 'button-3';
  className?: string;
  onClick?: () => void;
}

const EmsTypo: FunctionComponent<EmsTypoProps & PropsWithChildren> = ({
  className,
  variant,
  children,
  onClick,
}) => {
  switch (variant) {
    default:
      return <Typography.Text onClick={onClick}>{children}</Typography.Text>;
    case 'h1': {
      return (
        <Typography.Title onClick={onClick} level={1} className={clsx('typo-h1', className)}>
          {children}
        </Typography.Title>
      );
    }
    case 'h2': {
      return (
        <Typography.Title onClick={onClick} level={2} className={clsx('typo-h2', className)}>
          {children}
        </Typography.Title>
      );
    }
    case 'h3': {
      return (
        <Typography.Title onClick={onClick} level={3} className={clsx('typo-h3', className)}>
          {children}
        </Typography.Title>
      );
    }
    case 'h4': {
      return (
        <Typography.Title onClick={onClick} level={4} className={clsx('typo-h4', className)}>
          {children}
        </Typography.Title>
      );
    }
    case 'h5': {
      return (
        <Typography.Title onClick={onClick} level={5} className={clsx('typo-h5', className)}>
          {children}
        </Typography.Title>
      );
    }
    case 'h6': {
      return <h6 className={clsx('typo-h6', className)}>{children}</h6>;
    }
    case 'b1': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b1', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b1-bold': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b1-bold', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b2': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b2', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b2-bold': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b2-bold', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b3': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b3', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b3-bold': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b3-bold', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b4': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b4', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'b4-bold': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-b4-bold', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'button-1': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-button-1', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'button-2': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-button-2', className)}>
          {children}
        </Typography.Text>
      );
    }
    case 'button-3': {
      return (
        <Typography.Text onClick={onClick} className={clsx('typo-button-3', className)}>
          {children}
        </Typography.Text>
      );
    }
  }
};

export default EmsTypo;
