import axiosInstance from "@/axios";
import type { ISuccessResponse } from "@/interface/response/success";
import type { IGetOperationalResponse } from "@/interface/operational/response";
import { useQuery } from "@tanstack/react-query";


const getDetailOperational = async (id: number | null) : Promise<ISuccessResponse<IGetOperationalResponse>> => {
  const response = await axiosInstance.get(`/staff/operational/${id}`);
  return response.data;
};

const useGetDetailOperational = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['operational-detail', Number(id)],
    queryFn: () => getDetailOperational(id),
    enabled: !!id && id !== null,
  });
  return { data, isLoading };
};

export default useGetDetailOperational;