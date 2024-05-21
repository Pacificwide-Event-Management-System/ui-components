import type { PaginationProps } from 'antd';
import { useTranslations } from 'next-intl';
import { FunctionComponent, memo, useMemo } from 'react';
import InMemory from './inMemory';
import UrlParams from './urlParams';

type Props = {
  totalData: number;
  className?: string;
  minPageSizeTen?: boolean;
  minSizePage?: 'optionMin10' | 'optionMin12' | 'optionMin20';
  pagingType?: 'in-memory' | 'url';
  onPagingChange?: (page: number, pageSize: number) => void;
  currentPage?: number;
  pageSize?: number;
};

const PaginationCustom: FunctionComponent<Props> = (props) => {
  const t = useTranslations();

  const options = useMemo(() => {
    if (props.minPageSizeTen === true && !props.minSizePage) {
      return [10, 20, 30, 40];
    }

    switch (props.minSizePage) {
      case 'optionMin10':
      default:
        return [10, 20, 30, 40];
      case 'optionMin12':
        return [12, 24, 36, 48];
      case 'optionMin20':
        return [20, 40, 60, 80];
    }
  }, [props.minSizePage, props.minPageSizeTen]);

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <span className="block rounded-lg border-transparent px-3 font-medium text-neutral-2 transition duration-200 hover:border-gray-100 hover:bg-gray-100 hover:text-neutral-2 hover:ease-in disabled:!cursor-not-allowed disabled:!bg-inherit disabled:!text-neutral-4">
          {t('common.prev')}
        </span>
      );
    }
    if (type === 'next') {
      return (
        <span className="block rounded-lg border-transparent px-3 font-medium text-neutral-2 transition duration-200 hover:border-gray-100 hover:bg-gray-100 hover:text-neutral-2 hover:ease-in disabled:!cursor-not-allowed disabled:!bg-inherit disabled:!text-neutral-4">
          {t('common.next')}
        </span>
      );
    }
    return originalElement;
  };

  if (props.pagingType === 'in-memory') {
    return (
      <InMemory
        className={props.className}
        totalData={props.totalData}
        itemRender={itemRender}
        options={options}
        onPagingChange={props.onPagingChange}
        currentPage={props.currentPage}
        pageSize={props.pageSize}
      />
    );
  } else {
    return (
      <UrlParams
        className={props.className}
        itemRender={itemRender}
        totalData={props.totalData}
        options={options}
      />
    );
  }
};

export default memo(PaginationCustom);
