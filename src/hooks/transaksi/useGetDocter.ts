import axiosInstance from "@/axios";
import type { ISuccessPaginationResponse } from "@/interface/response/successWithPaginate";
import type { IGetDokterResponse } from "@/interface/transaksi/response";
import type { IGetDokterRequestParams } from "@/interface/transaksi/request";
import { useQuery } from "@tanstack/react-query";


const getDocter = async (params: IGetDokterRequestParams) : Promise<ISuccessPaginationResponse<IGetDokterResponse[]>> => {
  const response = await axiosInstance.get('/staff/docter', { params });
  return response.data;
};

const useGetDocter = (params: IGetDokterRequestParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ['docter' , params],
    queryFn: () => getDocter(params),
  });
  return { data, isLoading };
};

export default useGetDocter;