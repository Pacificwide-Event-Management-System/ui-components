import EmsButton from '@/app/_components/ems-button/EmsButton';
import EmsTypo from '@/app/_components/ems-typo/EmsTypo';
import Empty_Item from '@/static/empty-item/empty-item.svg';
import Empty_Search from '@/static/empty-search/empty-search.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, memo, useMemo } from 'react';

interface EmptyItemProps {
  page: string;
  item?: string;
  titleButton?: string;
  funcButton?: () => void;
  createLink?: string;
  isAttendeePage?: boolean;
  isManualEmailPage?: boolean;
  afterSearch?: boolean;
  customViewAllTitle?: string;
  viewAll?: () => void;
}

const EmptyItem: FunctionComponent<EmptyItemProps> = ({
  page,
  titleButton,
  item,
  funcButton,
  createLink,
  isAttendeePage = false,
  isManualEmailPage = false,
  afterSearch,
  customViewAllTitle,
  viewAll,
}) => {
  const t = useTranslations();

  const commonTitle = useMemo(() => {
    return t(afterSearch ? 'empty_search.title' : 'empty_item.title', { page: page?.toString() });
  }, [afterSearch, page, t]);

  const commonDesc = useMemo(() => {
    return t(afterSearch ? 'empty_search.desc' : 'empty_item.desc', { item: item?.toString() });
  }, [afterSearch, item, t]);

  const commonViewAll = useMemo(() => {
    return customViewAllTitle
      ? customViewAllTitle
      : t('empty_search.view_all', { item: item?.toString() }) + 's';
  }, [customViewAllTitle, item, t]);

  return (
    <div className="col m-auto mt-[142px] items-center justify-center">
      <div className="relative size-[200px]">
        <Image
          alt="Empty item img"
          src={afterSearch ? Empty_Search.src : Empty_Item.src}
          layout="fill"
        />
      </div>
      <EmsTypo className="!mb-3 !mt-10 !leading-7" variant="h5">
        {commonTitle}
      </EmsTypo>
      <EmsTypo className="!mb-10 block whitespace-break-spaces text-center" variant="b2">
        {isAttendeePage
          ? afterSearch
            ? t('empty_search.attendee_desc')
            : t('empty_item.attendee_desc')
          : isManualEmailPage
            ? t('empty_item.manual_email_desc')
            : commonDesc}
      </EmsTypo>
      {afterSearch && (
        <EmsButton
          variant="primary"
          onClick={viewAll}
          label={commonViewAll}
          className="!px-[50px] !py-4"
        />
      )}

      {!afterSearch &&
        (createLink ? (
          <Link href={createLink}>
            <EmsButton variant="primary" label={titleButton} className="!px-[50px] !py-4" />
          </Link>
        ) : (
          titleButton && (
            <EmsButton
              variant="primary"
              onClick={funcButton}
              label={titleButton}
              className="!px-[50px] !py-4"
            />
          )
        ))}
    </div>
  );
};

export default memo(EmptyItem);
