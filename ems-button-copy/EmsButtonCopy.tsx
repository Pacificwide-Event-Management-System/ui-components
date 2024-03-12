import { CopyIcon } from '@/static/icons';
import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import './EmsButtonCopy.scss';

interface Props {
  text?: string;
}

const EmsButtonCopy: FunctionComponent<Props> = ({ text }) => {
  const [status, setStatus] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 5000);
  };

  return (
    <button
      className={clsx(status === true ? 'btn-copied' : 'btn-copy')}
      type="button"
      onClick={handleCopy}
    >
      <span className="icon-copy">
        <CopyIcon />
      </span>
      <span className="icon-copied">
        <CopyIcon color="rgba(51, 49, 51, 1)" />
      </span>
    </button>
  );
};

export default EmsButtonCopy;
