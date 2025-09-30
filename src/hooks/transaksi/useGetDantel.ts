import axiosInstance from "@/axios";
import type { ISuccessPaginationResponse } from "@/interface/response/successWithPaginate";
import type { IGetDantelResponse } from "@/interface/transaksi/response";
import type { IGetDantelRequestParams } from "@/interface/transaksi/request";
import { useQuery } from "@tanstack/react-query";


const getDantel = async (params: IGetDantelRequestParams) : Promise<ISuccessPaginationResponse<IGetDantelResponse[]>> => {
  const response = await axiosInstance.get('/staff/dantel', { params });
  return response.data;
};

const useGetDantel = (params: IGetDantelRequestParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ['dantel' , params],
    queryFn: () => getDantel(params),
  });
  return { data, isLoading };
};

export default useGetDantel;