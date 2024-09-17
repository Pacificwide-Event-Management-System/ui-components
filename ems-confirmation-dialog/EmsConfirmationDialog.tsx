import { Modal, ModalSizes } from 'flowbite-react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import EmsButton from '../ems-button/EmsButton';
import { EmsLoadingIndicator } from '../ems-loading-indicator/EmsLoadingIndicator';
import EmsTypo from '../ems-typo/EmsTypo';

interface EmsConfirmationDialogProps {
  title: string;
  message: string | React.ReactNode;
  cancelLabel?: string;
  okLabel?: string;
  variant?: 'delete';
  size?: keyof ModalSizes;
  onConfirm?: () => Promise<any>;
}

interface EmsConfirmationDialogContainerProps extends EmsConfirmationDialogProps {
  resolve: (value: unknown) => void;
}

const EmsConfirmationDialog = (props: EmsConfirmationDialogContainerProps) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (props.onConfirm) {
      setLoading(true);
      await props.onConfirm();
    }
    setDialogOpen(false);
    removeDialog();
    props.resolve(true);
  };

  const onDismiss = () => {
    setDialogOpen(false);
    removeDialog();
    props.resolve(false);
  };

  const onCloseDialog = () => {
    setDialogOpen(false);
    removeDialog();
    props.resolve(undefined);
    console.log('test');
  };

  return (
    <Modal show={dialogOpen} size={props.size} onClose={onCloseDialog} popup className="z-[1020]">
      <Modal.Header className="p-6">
        <EmsTypo variant="h5" className="!mb-0">
          {props.title}
        </EmsTypo>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="mb-8 whitespace-pre-line text-lg font-normal">{props.message}</p>
          <div className="flex justify-between gap-4">
            <EmsButton
              onClick={onDismiss}
              variant="neutral"
              label={props.cancelLabel ?? 'Cancel'}
              className="w-1/2 rounded-[0.5rem]"
            />
            {!props.variant && (
              <EmsButton
                onClick={onConfirm}
                loading={loading}
                variant="primary"
                label={props.okLabel ?? 'Ok'}
                className="w-1/2 rounded-[0.5rem]"
              />
            )}
            {props.variant == 'delete' && (
              <button
                onClick={onConfirm}
                className="flex w-1/2 items-center justify-center rounded-[0.5rem] bg-accent-red text-neutral-8"
              >
                {loading && <EmsLoadingIndicator color="bg-neutral-8" />}
                <span>{props.okLabel ?? 'Ok'}</span>
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const getConfirmation = (
  props: EmsConfirmationDialogProps,
): Promise<undefined | boolean> => {
  return new Promise((resolve, reject) => {
    addDialog({ resolve, ...props });
  });
};

function addDialog(props: EmsConfirmationDialogProps & { resolve: (value: unknown) => void }) {
  const body = document.getElementsByTagName('body')[0];
  const div = document.createElement('div');
  div.setAttribute('id', 'getValue-container');
  body.appendChild(div);
  const root = ReactDOM.createRoot(div);
  root.render(<EmsConfirmationDialog {...props} />);
}

function removeDialog() {
  const div = document.getElementById('getValue-container');
  const body = document.getElementsByTagName('body')[0];
  body.removeChild(div);
}
