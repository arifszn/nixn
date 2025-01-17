import { Navigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web.route';
import { useAuth } from '@/hooks/auth.hook';

const Redirect: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Navigate to={isAuthenticated ? webRoutes.dashboard : webRoutes.login} replace />
  );
};

export default Redirect;