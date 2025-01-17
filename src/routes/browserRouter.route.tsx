import { createBrowserRouter } from 'react-router-dom';
import { webRoutes } from '@/routes/web.route';
import ErrorPage from '@/pages/errors/error.page';
import AuthLayout from '@/components/layout/auth.layout';
import LoginPage from '@/pages/auth/login.page';
import Redirect from '@/components/common/redirect.common';
import RequireAuth from '@/routes/RequireAuth.route';
import BaseLayout from '@/components/layout/base.layout';
import NotFoundPage from '@/pages/errors/notFound.page';
import SignupPage from '@/pages/auth/signup.page';

const errorElement = <ErrorPage />;

const authRoutes = {
  element: <AuthLayout />,
  errorElement,
  children: [
    {
      path: webRoutes.login,
      element: <LoginPage />,
    },
    {
      path: webRoutes.signup,
      element: <SignupPage />,
    },
  ],
};

const protectedRoutes = {
  element: (
    <RequireAuth>
      <BaseLayout />
    </RequireAuth>
  ),
  errorElement,
  children: [
    {
      path: webRoutes.dashboard,
      element: <div>Dashboard</div>,
    },
  ],
};

const fallbackRoute = {
  path: '*',
  element: <NotFoundPage />,
  errorElement,
};

export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Redirect />,
    errorElement,
  },
  authRoutes,
  protectedRoutes,
  fallbackRoute,
]);
