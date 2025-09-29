import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import AuthWrapper from '@/components/wrapper/auth';
import LoginWrapper from '@/components/wrapper/login';
import HeaderWrapper from '@/components/wrapper/header';
import Operasional from '@/pages/operasional';
import Transaksi from '@/pages/home/components/transaksi';
import TambahTransaksi from '@/pages/home/components/tambah-transaksi';
const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        element: <HeaderWrapper />,
        children: [
          {
            path: '/',
            element: <Home />,
            children: [
              {
                path: '/',
                element: <Transaksi />,
              },
              {
                path: '/home/tambah-transaksi',
                element: <TambahTransaksi />,
              },
            ],
          },
          {
            path: '/operasional',
            element: <Operasional />,
          },
        ],
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
