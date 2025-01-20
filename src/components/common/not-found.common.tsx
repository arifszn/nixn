import { PackageX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = ({
  backLink,
  backMessage,
}: {
  backLink: string;
  backMessage: string;
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="mx-auto mb-4 bg-muted rounded-full w-16 h-16 flex items-center justify-center">
            <PackageX className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">
          The item you&apos;re looking for doesn&apos;t seem to exist or may
          have been removed.
        </p>
        <Button asChild className="mt-8">
          <Link to={backLink}>{backMessage}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
