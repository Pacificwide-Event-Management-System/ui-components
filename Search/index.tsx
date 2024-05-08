'use client';

import EmsTextField from '@/app/_components/ems-text-field/EmsTextField';
import SearchIcon from '@/static/speaker-event/SearchIcon';
import { debounce } from 'lodash';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback } from 'react';

type Props = {
  placeholder?: string;
};

const Search = (props: Props) => {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const defaultSearch = searchParams.get('q')?.toString();
  const onSearch = useCallback(
    (event: any) => {
      const search = event?.target?.value;

      const params = new URLSearchParams(searchParams);
      params.set('q', search);
      params.set('page', '1');
      push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname],
  );
  return (
    <div className="w-[330px]">
      <EmsTextField
        prefix={
          <div className="mr-2">
            <SearchIcon />
          </div>
        }
        type="text"
        onPressEnter={onSearch}
        maxLength={255}
        placeholder={props.placeholder || t('common.search_name_or_email')}
        defaultValue={defaultSearch}
      />
    </div>
  );
};

export default memo(Search);
