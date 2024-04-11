import { Pagination } from 'antd';
import clsx from 'clsx';
import { FunctionComponent, ReactNode, useCallback } from 'react';

type Props = {
  totalData: number;
  className?: string;
  options: number[];
  itemRender: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    element: ReactNode,
  ) => ReactNode;
  onPagingChange?: (page: number, pageSize: number) => void;

  currentPage?: number;
  pageSize?: number;
};

const InMemory: FunctionComponent<Props> = (props) => {
  const onChange = useCallback(
    (page, pageSize) => {
      props.onPagingChange?.(page, pageSize);
    },
    [props.onPagingChange],
  );

  return (
    <div className={clsx('flex h-8 gap-4', props.className)}>
      <Pagination
        itemRender={props.itemRender}
        showSizeChanger
        current={props.currentPage ? props.currentPage : 1}
        total={props.totalData}
        pageSizeOptions={props.options}
        pageSize={props.pageSize ? props.pageSize : props.options[0]}
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </div>
  );
};

export default InMemory;
