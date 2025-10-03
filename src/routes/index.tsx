import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from '@/pages/home';
import Login from '@/pages/login';
import AuthWrapper from '@/components/wrapper/auth';
import LoginWrapper from '@/components/wrapper/login';
import HeaderWrapper from '@/components/wrapper/header';
import Operasional from '@/pages/operasional';
import Transaksi from '@/pages/home/components/transaksi';
import TambahTransaksi from '@/pages/home/components/tambah-transaksi';
import DetailTransaksi from '@/pages/home/components/detail-transaksi';
import OperationalComponent from '@/pages/operasional/components/operational';
import TambahOperational from '@/pages/operasional/components/tambah-operational';
import DetailOperational from '@/pages/operasional/components/detail-operational';
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
              {
                path: '/home/detail-transaksi/:id',
                element: <DetailTransaksi />,
              },
            ],
          },
          {
            path: '/operasional',
            element: <Operasional />,
            children: [
              {
                path: '/operasional',
                element: <OperationalComponent />,
              },
              {
                path: '/operasional/tambah-operasional',
                element: <TambahOperational />,
              },
              {
                path: '/operasional/detail-operational/:id',
                element: <DetailOperational />,
              },
              {
                path: '/operasional/edit-operasional/:id',
                element: <TambahOperational />,
              },
            ],
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
