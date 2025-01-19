import { useEffect } from 'react';
import NProgress from 'nprogress';
import '@/components/progressbar/progressbar.css';

export interface ProgressBarProps {
  spinner?: boolean;
}

const Progressbar = ({ spinner = false }: ProgressBarProps) => {
  NProgress.configure({ showSpinner: spinner });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  });

  return <></>;
};

export default Progressbar;
