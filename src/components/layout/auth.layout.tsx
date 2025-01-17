import { GalleryVerticalEnd } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {import.meta.env.VITE_APP_NAME}
        </a>
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
