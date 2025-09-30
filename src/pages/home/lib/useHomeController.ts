import useGetTransaksi from "@/hooks/transaksi/useGetTransaksi";
import { useState } from "react";
import type { IGetTransaksiRequestParams } from "@/interface/transaksi/request";
import { format } from "date-fns";

const useHomeController = () => {
    const [filter, setFilter] = useState<IGetTransaksiRequestParams>({
        page: 1,
        per_page: 10,
        start_date: format(new Date(), 'yyyy-MM-dd'),
        end_date: format(new Date(), 'yyyy-MM-dd'),
    });
  const { data: transaksi , isLoading } = useGetTransaksi(filter);

 return {
  transaksi,
  filter,
  setFilter,
  isLoading,
 };
};

export default useHomeController;