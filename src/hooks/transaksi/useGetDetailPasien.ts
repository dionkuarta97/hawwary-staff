import axiosInstance from "@/axios";
import type { ISuccessResponse } from "@/interface/response/success";
import type { IGetPasienResponse } from "@/interface/transaksi/response";
import { useQuery } from "@tanstack/react-query";


const getDetailPasien = async (id: number | null) : Promise<ISuccessResponse<IGetPasienResponse>> => {
  const response = await axiosInstance.get(`/staff/pasien/${id}`);
  return response.data;
};

const useGetDetailPasien = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['pasien-detail' , id],
    queryFn: () => getDetailPasien(id),
    enabled: !!id && id !== null,
  });
  return { data, isLoading };
};

export default useGetDetailPasien;