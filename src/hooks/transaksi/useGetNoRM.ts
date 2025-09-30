import axiosInstance from "@/axios";
import type { ISuccessResponse } from "@/interface/response/success";
import type { IGetNoRMResponse } from "@/interface/transaksi/response";
import { useQuery } from "@tanstack/react-query";


const getNoRM = async () : Promise<ISuccessResponse<IGetNoRMResponse>> => {
  const response = await axiosInstance.get(`/staff/pasien/no-rm`);
  return response.data;
};

const useGetNoRM = () => {
    const { data, isLoading } = useQuery({
    queryKey: ['no-rm'],
    queryFn: () => getNoRM(),
    staleTime: 0,
    gcTime: 0,
  });
  return { data, isLoading };
};

export default useGetNoRM;