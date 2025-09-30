import axiosInstance from "@/axios";
import type { ICreateTransaksiRequestBody } from "@/interface/transaksi/request";
import { useMutation } from "@tanstack/react-query";


const postCreateTransaksi = async (data: ICreateTransaksiRequestBody) => {
  const response = await axiosInstance.post('/staff/transaksi', data);
  return response.data;
};

const useMutationCreateTransaksi = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCreateTransaksi
  });
  return { createTransaksi : mutateAsync, isPending };
};
export default useMutationCreateTransaksi;