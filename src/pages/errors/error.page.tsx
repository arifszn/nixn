import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { webRoutes } from '@/routes/web.route';
import { ServerCrash } from 'lucide-react';
import PageTitle from '@/components/common/page-title.common';
import { APP_NAME } from '@/constants/config.constant';

const ErrorPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${APP_NAME} | Error`} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="mx-auto mb-4 bg-muted rounded-full w-16 h-16 flex items-center justify-center">
              <ServerCrash className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">Something went wrong!</p>
          <Button asChild className="mt-8">
            <Link to={webRoutes.home}>Go back home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
