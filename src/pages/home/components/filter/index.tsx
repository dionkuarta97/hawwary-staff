import DatePicker from '@/components/date-picker';
import DefaultSelect from '@/components/default-select';
import type { IGetTransaksiRequestParams } from '@/interface/transaksi/request';

interface IFilterProps {
  filter: IGetTransaksiRequestParams;
  setFilter: (filter: IGetTransaksiRequestParams) => void;
}

const Filter = ({ filter, setFilter }: IFilterProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <DatePicker
          label="Start Date"
          value={filter.start_date ? new Date(filter.start_date) : null}
          onChange={date =>
            setFilter({ ...filter, start_date: date ? date.toISOString() : undefined })
          }
        />
        <DatePicker
          minDate={filter.start_date ? new Date(filter.start_date) : undefined}
          label="End Date"
          value={filter.end_date ? new Date(filter.end_date) : null}
          onChange={date =>
            setFilter({ ...filter, end_date: date ? date.toISOString() : undefined })
          }
        />
      </div>
      <div className="flex flex-row gap-2">
        <DefaultSelect
          value={filter.order || 'newest'}
          options={[
            { label: 'Terbaru', value: 'newest' },
            { label: 'Terlama', value: 'oldest' },
          ]}
          placeholder="Urutkan Berdasarkan"
          onSelect={value => setFilter({ ...filter, order: value === 'newest' ? 'desc' : 'asc' })}
        />
        <DefaultSelect
          value={filter.status || 'all'}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'Sukses', value: 'sukses' },
            { label: 'Gagal', value: 'gagal' },
          ]}
          placeholder="Filter by Status"
          onSelect={value =>
            setFilter({
              ...filter,
              status: value === 'all' ? undefined : (value as 'pending' | 'sukses' | 'gagal'),
            })
          }
        />
      </div>
    </div>
  );
};

export default Filter;
