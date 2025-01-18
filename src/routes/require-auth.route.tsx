import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth.hook';
import { webRoutes } from '@/routes/web.route';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={webRoutes.login} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;