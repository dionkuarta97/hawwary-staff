import { Outlet } from 'react-router';
import useOperasionalController from './libs/useOperasionalController';
import Filter from './components/filter';
import LabelWithValue from '@/components/label-with-value';
import { Typography } from '@material-tailwind/react';
import Loading from '@/components/loading';
import DataOperational from './components/data-operational';
const Operasional = () => {
  const { operational, filter, setFilter, isLoading } = useOperasionalController();
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
                  label="Total"
                  variant="inline"
                  value={`Rp ${Number(operational?.metadata.statistics?.total || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Pending"
                  variant="inline"
                  value={`Rp ${Number(operational?.metadata.statistics?.pending || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Sukses"
                  variant="inline"
                  value={`Rp ${Number(operational?.metadata.statistics?.success || 0).toLocaleString('id-ID')}`}
                />
                <LabelWithValue
                  label="Gagal"
                  variant="inline"
                  value={`Rp ${Number(operational?.metadata.statistics?.failed || 0).toLocaleString('id-ID')}`}
                />
              </div>
            </div>
            <div className="h-full shadow-lg flex flex-col items-start justify-between bg-white rounded-md p-4">
              <Typography className="text-gray-400 font-medium" type="h6">
                Total Operasional
              </Typography>
              <div className="w-full flex justify-end">
                <Typography className="text-gray-700 text-right font-semibold" type="h3">
                  {operational?.metadata.total}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Loading />}
        {!operational ||
          (operational.metadata.total === 0 && (
            <div className="flex justify-center items-center h-full w-full">
              <Typography type="h6" className="text-gray-500">
                Belum ada Operasional
              </Typography>
            </div>
          ))}
        {operational && operational.metadata.total > 0 && (
          <DataOperational
            data={operational.metadata.data}
            page={operational.metadata.current_page}
            per_page={operational.metadata.per_page}
            total_page={operational.metadata.last_page}
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

export default Operasional;
