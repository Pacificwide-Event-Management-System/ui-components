import { Pagination } from 'antd';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
};

const UrlParams: FunctionComponent<Props> = (props) => {
  const t = useTranslations();

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
        itemRender={props.itemRender}
        showSizeChanger
        defaultCurrent={defaultPage ? defaultPage : 1}
        total={props.totalData}
        pageSizeOptions={props.options}
        pageSize={pageSizeParam ? pageSizeParam : props.options[0]}
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </div>
  );
};

export default UrlParams;
