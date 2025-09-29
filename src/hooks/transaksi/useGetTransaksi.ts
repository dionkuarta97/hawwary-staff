import axiosInstance from "@/axios";
import type { ISuccessPaginationResponse } from "@/interface/response/successWithPaginate";
import type { ITransaksiResponse } from "@/interface/transaksi/response";
import type { IGetTransaksiRequestParams } from "@/interface/transaksi/request";
import { useQuery } from "@tanstack/react-query";


const getTransaksi = async (params: IGetTransaksiRequestParams) : Promise<ISuccessPaginationResponse<ITransaksiResponse[]>> => {
  const response = await axiosInstance.get('/staff/transaksi', { params });
  return response.data;
};

const useGetTransaksi = (params: IGetTransaksiRequestParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ['transaksi' , params],
    queryFn: () => getTransaksi(params),
  });
  return { data, isLoading };
};

export default useGetTransaksi;