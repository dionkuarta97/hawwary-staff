import axiosInstance from "@/axios";
import type { ISuccessPaginationResponse } from "@/interface/response/successWithPaginate";
import type { IGetPasienResponse } from "@/interface/transaksi/response";
import type { IGetPasienRequestParams } from "@/interface/transaksi/request";
import { useQuery } from "@tanstack/react-query";


const getPasien = async (params: IGetPasienRequestParams) : Promise<ISuccessPaginationResponse<IGetPasienResponse[]>> => {
  const response = await axiosInstance.get('/staff/pasien', { params });
  return response.data;
};

const useGetPasien = (params: IGetPasienRequestParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ['pasien' , params],
    queryFn: () => getPasien(params),
    enabled: !!params.search || !!params.no_rm,
  });
  return { data, isLoading };
};

export default useGetPasien;