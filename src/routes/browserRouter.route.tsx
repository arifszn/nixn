import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { webRoutes } from '@/routes/web.route';
import ErrorPage from '@/pages/errors/error.page';
import AuthLayout from '@/components/layout/auth.layout';
import LoginPage from '@/pages/auth/login.page';
import Redirect from '@/components/common/redirect.common';
import RequireAuth from '@/routes/RequireAuth.route';
import BaseLayout from '@/components/layout/base.layout';
import NotFoundPage from '@/pages/errors/notFound.page';
import SignupPage from '@/pages/auth/signup.page';
import { RouteHandle } from '@/interfaces/route.interface';

const errorElement = <ErrorPage />;

const authRoutes: RouteObject = {
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

const protectedRoutes: RouteObject = {
  element: (
    <RequireAuth>
      <BaseLayout />
    </RequireAuth>
  ),
  errorElement,
  children: [
    {
      path: webRoutes.dashboard,
      element: (
        <>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </>
      ),
      handle: { title: 'Dashboard' } as RouteHandle,
    },
    {
      path: webRoutes.users,
      element: <div>Users</div>,
      handle: {
        title: 'Users',
      } as RouteHandle,
    },
    {
      path: webRoutes.products,
      element: <div>Products</div>,
      handle: {
        title: 'Products',
      } as RouteHandle,
    },
  ],
};

const fallbackRoute: RouteObject = {
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
