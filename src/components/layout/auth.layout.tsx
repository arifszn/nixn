import { Ratio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth.hook';
import { webRoutes } from '@/routes/web.route';
import { useEffect } from 'react';
import { APP_NAME } from '@/constants/config.constant';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || webRoutes.dashboard;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Ratio className="size-4" />
          </div>
          {APP_NAME}
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
