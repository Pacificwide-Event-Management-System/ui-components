//@ts-expect-error
import Close from '@/static/close.svg?component';
import Success from '@/static/success.svg';
import Upload from '@/static/upload.svg';
import Warning from '@/static/warning.svg';
import { Progress, UploadFile } from 'antd';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, ReactElement, useMemo } from 'react';
import EmsTypo from '../ems-typo/EmsTypo';

type Props = {
  originNode: ReactElement;
  file: UploadFile;
  fileList: object[];
  actions: { download: () => void; preview: () => void; remove: () => void };
  className?: string;
};

// Custom components
const EmsFileInputCard: FunctionComponent<Props> = ({
  className,
  originNode,
  file,
  fileList,
  actions,
}) => {
  const t = useTranslations();

  const getFileSizeWithUnit = (fileSize: number): string => {
    if (fileSize >= 1024 * 1024) {
      return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
    } else if (fileSize >= 1024) {
      return `${(fileSize / 1024).toFixed(2)} KB`;
    } else {
      return `${fileSize} Bytes`;
    }
  };

  const closeIcon = useMemo(
    () => (
      <span className="text-primary cursor-pointer" onClick={actions.remove}>
        <Close />
      </span>
    ),
    [file],
  );

  if ((file.status as any) === 'uploaded') {
    return (
      <div
        className={clsx(
          'inline-flex items-center gap-2 rounded-lg border border-neutral-6 bg-neutral-6 px-[6px] py-[2px]',
          className,
        )}
      >
        <EmsTypo variant="b2" className="text-neutral-2">
          {file.name}
        </EmsTypo>
        {closeIcon}
      </div>
    );
  }

  return (
    <div
      className={clsx('flex gap-3 rounded-lg border border-neutral-divider px-3 py-2', className)}
    >
      <div className="flex items-center justify-center">
        <div className="flex size-9 items-center justify-center">
          {file.status === 'uploading' && (
            <div className="">
              <Image src={Upload.src} alt="upload-icon" width={16.67} height={16.67} />
            </div>
          )}
          {file.status === 'done' && (
            <div className="">
              <Image src={Success.src} alt="success-icon" width={16.67} height={16.67} />
            </div>
          )}
          {file.status === 'error' && (
            <div className="">
              <Image src={Warning.src} alt="warning-icon" width={16.67} height={16.67} />
            </div>
          )}
          {file.status === 'removed' && (
            <div className="">
              <Image src={Warning.src} alt="warning-icon" width={16.67} height={16.67} />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between">
          {file.status === 'done' && file.url && (
            <Link href={file.url} target="_blank">
              <EmsTypo className="text-neutral-2" variant="b2">
                {file.name}
              </EmsTypo>
            </Link>
          )}
          {(file.status !== 'done' || !file.url) && (
            <EmsTypo className="text-neutral-2" variant="b2">
              {file.name}
            </EmsTypo>
          )}
          {closeIcon}
        </div>
        {file.status === 'uploading' && (
          <>
            <div className="flex justify-between">
              <EmsTypo className="text-neutral-3" variant="b4">
                {getFileSizeWithUnit(file.size)}
              </EmsTypo>
              <EmsTypo className="text-primary-3" variant="b4-bold">
                {Math.floor(file.percent)}%
              </EmsTypo>
            </div>
            <div>
              <Progress percent={file.percent} size="default" status="active" showInfo={false} />
            </div>
          </>
        )}
        {file.status === 'done' && (
          <EmsTypo className="flex text-neutral-3" variant="b4">
            {t('common.success')}
          </EmsTypo>
        )}
        {file.status === 'error' && (
          <EmsTypo className="flex text-accent-red" variant="b4">
            {t('common.upload_failed')}
          </EmsTypo>
        )}
      </div>
    </div>
  );
};

export default EmsFileInputCard;
