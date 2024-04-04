import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback } from 'react';

type Props = {
  totalData: number;
  className?: string;
  minSizePage?: 'optionMin10' | 'optionMin12' | 'optionMin20';
};

const PaginationCustom: FunctionComponent<Props> = (props) => {
  const t = useTranslations();

  let options;

  switch (props.minSizePage) {
    case 'optionMin10':
    default:
      options = [10, 20, 30, 40];
      break;
    case 'optionMin12':
      options = [12, 24, 36, 48];
      break;
    case 'optionMin20':
      options = [20, 40, 60, 80];
      break;
  }

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <span className="block rounded-lg border-transparent px-3 font-medium text-neutral-2 transition duration-200 hover:border-gray-100 hover:bg-gray-100 hover:text-neutral-2 hover:ease-in">
          {t('common.prev')}
        </span>
      );
    }
    if (type === 'next') {
      return (
        <span className="block rounded-lg border-transparent px-3 font-medium text-neutral-2 transition duration-200 hover:border-gray-100 hover:bg-gray-100 hover:text-neutral-2 hover:ease-in">
          {t('common.next')}
        </span>
      );
    }
    return originalElement;
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const defaultPage = Number(searchParams.get('page')?.toString());
  const pageSizeParam = Number(searchParams.get('pageSize')?.toString());

  const onChange = useCallback(
    (page, pageSize) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page);
      params.set('pageSize', pageSize);
      push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname],
  );

  return (
    <div className={clsx('flex h-8 gap-4', props.className)}>
      <Pagination
        itemRender={itemRender}
        showSizeChanger
        defaultCurrent={defaultPage ? defaultPage : 1}
        total={props.totalData}
        pageSizeOptions={options}
        pageSize={pageSizeParam ? pageSizeParam : options[0]}
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </div>
  );
};

export default PaginationCustom;
