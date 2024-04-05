'use client';

import EmsSelect from '@/app/_components/ems-select/EmsSelect';
import ArrowSort from '@/static/icons/ArrowSort';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

interface SortProps {
  options: any;
}

const Sort = (props: SortProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [orderDesc, setOrderDesc] = useState(
    searchParams.get('orderDesc')?.toString() == undefined
      ? true
      : searchParams.get('orderDesc')?.toString() === 'true'
        ? true
        : false,
  );
  const defaultValue = searchParams.get('order')?.toString();

  const handleSortOptionChange = useCallback(
    (value: any) => {
      const params = new URLSearchParams(searchParams);
      params.set('order', value);
      params.set('orderDesc', orderDesc ? orderDesc.toString() : 'false');
      push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname],
  );

  const handleSortDescChange = useCallback(() => {
    setOrderDesc(!orderDesc);
    const params = new URLSearchParams(searchParams);
    params.set('order', defaultValue ? defaultValue : props.options[0]?.value);
    params.set('orderDesc', (!orderDesc).toString());
    push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname]);
  return (
    <div className="flex items-center gap-3">
      <span className="text-neutral-1">{t('common.sort')}</span>
      <EmsSelect
        className="w-[196px]"
        onChange={handleSortOptionChange}
        placeholder={t('event_page.category')}
        options={props.options}
        defaultValue={defaultValue ? defaultValue : props.options[0]}
      />
      <div
        onClick={handleSortDescChange}
        className={clsx(
          'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-6 bg-neutral-8',
          orderDesc ? 'rotate-180' : '',
        )}
      >
        <ArrowSort />
      </div>
    </div>
  );
};

export default memo(Sort);
