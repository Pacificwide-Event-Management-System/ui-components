import EmsButton from '@/app/_components/ems-button/EmsButton';
import EmsTypo from '@/app/_components/ems-typo/EmsTypo';
import Empty_Item from '@/static/empty-item/empty-item.svg';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, memo } from 'react';

interface EmptyItemProps {
  page: string;
  item?: string;
  titleButton?: string;
  funcButton?: () => void;
  createLink?: string;
  isAttendeePage?: boolean;
  isManualEmailPage?: boolean;
}

const EmptyItem: FunctionComponent<EmptyItemProps> = ({
  page,
  titleButton,
  item,
  funcButton,
  createLink,
  isAttendeePage = false,
  isManualEmailPage = false,
}) => {
  const t = useTranslations();

  return (
    <div className="col m-auto mt-[142px] items-center justify-center">
      <div className="relative size-[200px]">
        <Image alt="Empty item img" src={Empty_Item.src} layout="fill" />
      </div>
      <EmsTypo className="!mb-3 !mt-10 !leading-7" variant="h5">
        {t('empty_item.title', { page: page?.toString() })}
      </EmsTypo>
      <EmsTypo className="!mb-10 block whitespace-break-spaces text-center" variant="b2">
        {isAttendeePage
          ? t('empty_item.attendee_desc')
          : isManualEmailPage
            ? t('empty_item.manual_email_desc')
            : t('empty_item.desc', { item: item?.toString() })}
      </EmsTypo>
      {createLink ? (
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
      )}
    </div>
  );
};

export default memo(EmptyItem);
