import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import AuthWrapper from '@/components/wrapper/auth';
import LoginWrapper from '@/components/wrapper/login';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginWrapper />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={routes} />;
};

export default Routes;
