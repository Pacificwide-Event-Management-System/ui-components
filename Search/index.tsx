'use client';

import EmsTextField from '@/app/_components/ems-text-field/EmsTextField';
import SearchIcon from '@/static/speaker-event/SearchIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';

type Props = {
  placeholder?: string;
  className?: string;
};

const Search = (props: Props) => {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const defaultSearch = searchParams.get('q')?.toString();
  const [searchValue, setSearchValue] = useState(defaultSearch);
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

  useEffect(() => {
    const search = searchParams.get('q')?.toString();
    if (
      (search === null || typeof search === 'undefined' || search.trim() === '') &&
      searchValue !== ''
    ) {
      setSearchValue('');
    }
  }, [searchParams]);

  return (
    <div className={clsx('w-[330px]', props.className)}>
      <EmsTextField
        prefix={
          <div className="mr-2">
            <SearchIcon />
          </div>
        }
        type="text"
        onPressEnter={onSearch}
        maxLength={255}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder={props.placeholder || t('common.search_name_or_email')}
        defaultValue={defaultSearch}
      />
    </div>
  );
};

export default memo(Search);
