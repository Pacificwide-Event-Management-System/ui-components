import { Modal, ModalProps } from 'antd';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface EmsModalProps extends ModalProps {}

const EmsModal: React.FC<EmsModalProps> = ({ ...props }) => {
  const titleClassName = useMemo(
    () =>
      '[&_.ant-modal-title]:text-h5 [&_.ant-modal-title]:font-bold [&_.ant-modal-title]:text-neutral-1',
    [],
  );

  const closeButtonClassName = useMemo(() => '[&_.ant-modal-close]:top-5', []);

  return (
    <Modal {...props} className={clsx(titleClassName, closeButtonClassName, clsx(props.className))}>
      {props.children}
    </Modal>
  );
};

export default EmsModal;
