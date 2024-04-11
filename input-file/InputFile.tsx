import EmsTypo from '@/app/_components/ems-typo/EmsTypo';
import CloseIcon from '@/static/speaker-event/CloseIcon';
import { uniqueId } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

type InputFileProps = {
  setFiles: any;
  files: any;
  isMultiple: boolean;
  accept: string;
};

const InputFile = (props: InputFileProps) => {
  const t = useTranslations();
  const fileRef = useRef(null);

  const handleChooseFile = (e) => {
    const updatedFiles = [...e.target.files].map((item) => ({ file: item, id: uniqueId() }));
    props.setFiles([...props.files, ...updatedFiles]);
  };

  const removeFileByName = (fileId: string) => {
    const newFiles = props.files.filter((item) => item.id !== fileId);
    props.setFiles(newFiles);
  };

  return (
    <>
      <div className="flex divide-solid rounded-lg border border-neutral-5 bg-neutral-8 px-3">
        <EmsTypo
          variant="b2"
          className="inline-flex cursor-pointer items-center border-r py-[10px] pr-3"
          onClick={() => fileRef.current.click()}
        >
          {t('common.choose_files')}
        </EmsTypo>
        {props.files?.length ? (
          <div className="flex-1 overflow-hidden px-3 py-[10px]">
            {props.files?.map((item) => (
              <div
                key={item.id}
                className="mb-1 mr-1 inline-flex gap-2 rounded bg-neutral-6 px-[6px]"
              >
                <EmsTypo
                  variant="b2"
                  className="inline-flex items-center justify-center text-neutral-2"
                >
                  {item.file.name}
                </EmsTypo>
                <button
                  onClick={() => removeFileByName(item.id)}
                  type="button"
                  className="inline-flex size-6 items-center justify-center"
                >
                  <CloseIcon color="#A39D9E" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmsTypo variant="b2" className="inline-block py-[10px] pl-3 text-neutral-4">
            {t('common.no_file_chosen')}
          </EmsTypo>
        )}
      </div>
      <input
        multiple={props.isMultiple ? true : false}
        ref={fileRef}
        className="!hidden w-full rounded-lg border border-neutral-5"
        type="file"
        onChange={handleChooseFile}
        accept={props.accept}
      />
    </>
  );
};

export default InputFile;
