import useGetOperational from '@/hooks/operational/useGetOperational';
import { useState } from 'react';
import type { IGetOperationalRequestParams } from '@/interface/operational/request';
import { format } from 'date-fns';

const useOperasionalController = () => {
  const [filter, setFilter] = useState<IGetOperationalRequestParams>({
    page: 1,
    no_modal: false,
    per_page: 10,
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
  });
  const { data: operational, isLoading } = useGetOperational(filter);

  return {
    operational,
    filter,
    setFilter,
    isLoading,
  };
};

export default useOperasionalController;
