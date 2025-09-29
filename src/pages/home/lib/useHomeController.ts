import useGetTransaksi from "@/hooks/transaksi/useGetTransaksi";
import { useState } from "react";
import type { IGetTransaksiRequestParams } from "@/interface/transaksi/request";


const useHomeController = () => {
    const [filter, setFilter] = useState<IGetTransaksiRequestParams>({
        page: 1,
        per_page: 10,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
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