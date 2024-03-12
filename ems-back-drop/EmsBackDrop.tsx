'use client';
import { usePromiseTracker } from 'react-promise-tracker';

export const EmsBackDrop = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="backdrop-blue absolute top-0 z-[999999] flex size-screen items-center justify-center">
        {/* <Spinner aria-label="Loading" /> */}
      </div>
    )
  );
};
