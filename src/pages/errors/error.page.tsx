import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { webRoutes } from '@/routes/web.route';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl md:text-4xl text-muted-foreground">
          OPS!!
        </h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, something went wrong!
        </p>
        <Button asChild className="mt-8">
          <Link to={webRoutes.home}>Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
