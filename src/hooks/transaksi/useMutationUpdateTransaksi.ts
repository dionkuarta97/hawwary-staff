import axiosInstance from "@/axios";
import type { ICreateTransaksiRequestBody } from "@/interface/transaksi/request";
import type { ICreateTransaksiResponse } from "@/interface/transaksi/response";
import type { ISuccessResponse } from "@/interface/response/success";
import { useMutation } from "@tanstack/react-query";


const postUpdateTransaksi = async (data: ICreateTransaksiRequestBody & { id: number }) : Promise<ISuccessResponse<ICreateTransaksiResponse>> => {
  const response = await axiosInstance.put(`/staff/transaksi/${data.id}`, data);
  return response.data;
};

const useMutationUpdateTransaksi = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postUpdateTransaksi
  });
  return { updateTransaksi : mutateAsync, isPending };
};
export default useMutationUpdateTransaksi;