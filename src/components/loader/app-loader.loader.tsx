import { Loader2 } from 'lucide-react';

const defaultSpinner = <Loader2 className="animate-spin w-10 h-10" />;

export interface LoaderProps {
  text?: string;
  spinner?: React.ReactNode;
  blur?: boolean;
}

const AppLoader = ({
  text,
  spinner = defaultSpinner,
  blur = true,
}: LoaderProps) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${blur ? 'bg-gray-50/50 backdrop-blur-sm' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center space-x-4">
        <div className="opacity-50">{spinner}</div>
        {text && (
          <span className="text-lg font-medium text-gray-700 tracking-wide">
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default AppLoader;
