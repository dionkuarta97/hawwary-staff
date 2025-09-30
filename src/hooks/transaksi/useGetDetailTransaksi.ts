import axiosInstance from "@/axios";
import type { ISuccessResponse } from "@/interface/response/success";
import type { ITransaksiResponse } from "@/interface/transaksi/response";
import { useQuery } from "@tanstack/react-query";


const getDetailTransaksi = async (id: number | null) : Promise<ISuccessResponse<ITransaksiResponse>> => {
  const response = await axiosInstance.get(`/staff/transaksi/${id}`);
  return response.data;
};

const useGetDetailTransaksi = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['transaksi-detail' , id],
    queryFn: () => getDetailTransaksi(id),
    enabled: !!id && id !== null,
  });
  return { data, isLoading };
};

export default useGetDetailTransaksi;