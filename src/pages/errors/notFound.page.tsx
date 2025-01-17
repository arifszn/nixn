import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { webRoutes } from '@/routes/web.route';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          404
        </h1>
        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl md:text-4xl text-muted-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, the page you visited does not exist.
        </p>
        <Button asChild className="mt-8">
          <Link to={webRoutes.home}>Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
