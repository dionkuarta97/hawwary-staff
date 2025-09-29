import Loading from '@/components/loading';
import Filter from './components/filter';
import useHomeController from './lib/useHomeController';
import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';

const Home = () => {
  const { transaksi, filter, setFilter, isLoading } = useHomeController();
  console.log(transaksi);
  return (
    <div className="flex flex-row h-full w-full gap-8">
      <div className="w-2/3 flex flex-col gap-2 h-full">
        <Filter filter={filter} setFilter={setFilter} />
        {isLoading && <Loading />}
        {!transaksi ||
          (transaksi.metadata.total === 0 && (
            <div className="flex justify-center items-center h-full w-full">
              <Typography type="h6" className="text-gray-500">
                Belum ada Transaksi
              </Typography>
            </div>
          ))}
      </div>
      <div className="w-1/3 flex flex-col  h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
