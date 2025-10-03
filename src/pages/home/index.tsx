import Loading from '@/components/loading';
import Filter from './components/filter';
import useHomeController from './lib/useHomeController';
import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';
import DataTransaksi from './components/data-transaksi';
import LabelWithValue from '@/components/label-with-value';

const Home = () => {
  const { transaksi, filter, setFilter, isLoading } = useHomeController();

  return (
    <div className="flex flex-row h-full w-full gap-8">
      <div className="w-2/3 flex flex-col gap-2 h-full">
        <div className="flex flex-row w-full justify-between gap-4 items-center">
          <div className="w-[40%]">
            <Filter filter={filter} setFilter={setFilter} />
          </div>
          <div className="flex w-[60%] h-full justify-end flex-row gap-4">
            <div className="h-full shadow-lg min-w-[60%] flex flex-col items-start bg-white rounded-md p-4">
              <div className="flex flex-col gap-1 w-full">
                <LabelWithValue
                  label="Pending"
                  variant="inline"
                  value={`Rp ${Number(transaksi?.metadata.statistics?.pending || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Sukses"
                  variant="inline"
                  value={`Rp ${Number(transaksi?.metadata.statistics?.success || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Gagal"
                  variant="inline"
                  value={`Rp ${Number(transaksi?.metadata.statistics?.failed || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Modal (sukses)"
                  variant="inline"
                  value={`Rp ${Number(transaksi?.metadata.statistics?.total_modal || 0).toLocaleString('id-ID')}`}
                />
              </div>
            </div>
            <div className="h-full shadow-lg flex flex-col items-start justify-between bg-white rounded-md p-4">
              <Typography className="text-gray-400 font-medium" type="h5">
                Total Transaksi
              </Typography>
              <div className="w-full flex justify-end">
                <Typography className="text-gray-700 text-right font-semibold" type="h3">
                  {transaksi?.metadata.total}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <Loading />}
        {!transaksi ||
          (transaksi.metadata.total === 0 && (
            <div className="flex justify-center items-center h-full w-full">
              <Typography type="h6" className="text-gray-500">
                Belum ada Transaksi
              </Typography>
            </div>
          ))}
        {!isLoading && transaksi && transaksi.metadata.total > 0 && (
          <DataTransaksi
            data={transaksi.metadata.data}
            page={transaksi.metadata.current_page}
            per_page={transaksi.metadata.per_page}
            total_page={transaksi.metadata.last_page}
            onPageChange={page => setFilter({ ...filter, page: page })}
          />
        )}
      </div>
      <div className="w-1/3 flex flex-col  h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
