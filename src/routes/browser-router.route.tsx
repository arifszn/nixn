import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { webRoutes } from '@/routes/web.route';
import ErrorPage from '@/pages/errors/error.page';
import AuthLayout from '@/components/layout/auth.layout';
import LoginPage from '@/pages/auth/login.page';
import Redirect from '@/components/common/redirect.common';
import RequireAuth from '@/routes/require-auth.route';
import BaseLayout from '@/components/layout/base.layout';
import NotFoundPage from '@/pages/errors/not-found.page';
import SignupPage from '@/pages/auth/signup.page';
import { RouteHandle } from '@/interfaces/route.interface';
import loadable from '@loadable/component';
import Progressbar from '@/components/progressbar';

const errorElement = <ErrorPage />;
const fallbackElement = <Progressbar />;

const DashboardPage = loadable(() => import('@/pages/dashboard.page'), {
  fallback: fallbackElement,
});

const ProductListPage = loadable(
  () => import('@/pages/products/products.page'),
  {
    fallback: fallbackElement,
  },
);

const ViewProductPage = loadable(
  () => import('@/pages/products/view-product.page'),
  {
    fallback: fallbackElement,
  },
);

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
      element: <DashboardPage />,
      handle: {
        title: 'Dashboard',
        breadcrumb: [
          {
            title: 'Dashboard',
            url: webRoutes.dashboard,
          },
        ],
      } as RouteHandle,
    },
    {
      path: webRoutes.products,
      element: <ProductListPage />,
      handle: {
        title: 'Products',
        breadcrumb: [
          {
            title: 'Dashboard',
            url: webRoutes.dashboard,
          },
          {
            title: 'Products',
            url: webRoutes.products,
          },
        ],
      } as RouteHandle,
    },
    {
      path: webRoutes.productDetails,
      element: <ViewProductPage />,
      handle: {
        title: 'Product Details',
        breadcrumb: [
          {
            title: 'Dashboard',
            url: webRoutes.dashboard,
          },
          {
            title: 'Products',
            url: webRoutes.products,
          },
          {
            title: 'Product Details',
          },
        ],
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
