import axiosInstance from "@/axios";
import type { ISuccessPaginationResponse } from "@/interface/response/successWithPaginate";
import type { IGetOperationalResponse } from "@/interface/operational/response";
import type { IGetOperationalRequestParams } from "@/interface/operational/request";
import { useQuery } from "@tanstack/react-query";


const getOperational = async (params: IGetOperationalRequestParams) : Promise<ISuccessPaginationResponse<IGetOperationalResponse[], {
  total: string,
  pending: string,
  success: string;
  failed: string;
}>> => {
  const response = await axiosInstance.get('/staff/operational', { params });
  return response.data;
};

const useGetOperational = (params: IGetOperationalRequestParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ['operational' , params],
    queryFn: () => getOperational(params),
  });
  return { data, isLoading };
};

export default useGetOperational;