import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { webRoutes } from '@/routes/web.route';
import { TriangleAlert } from 'lucide-react';
import PageTitle from '@/components/common/pageTitle.common';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageTitle title={`${import.meta.env.VITE_APP_NAME} | Not Found`} />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="flex justify-center">
          <TriangleAlert className="w-10 h-10 text-muted-foreground" />
        </div>
        <p className="mt-4 text-muted-foreground">
          Sorry, the page you visited does not exist.
        </p>
        <Button asChild className="mt-8">
          <Link to={webRoutes.home}>Go back home</Link>
        </Button>
      </div>
    </div>
    </>
  );
};

export default NotFoundPage;
