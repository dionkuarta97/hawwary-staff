import axiosInstance from "@/axios";
import type { ICreatePasienRequestBody } from "@/interface/transaksi/request";
import { useMutation } from "@tanstack/react-query";


const postCreatePasien = async (data: ICreatePasienRequestBody) => {
  const response = await axiosInstance.post('/staff/pasien', data);
  return response.data;
};

const useMutationCreatePasien = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCreatePasien
  });
  return { createPasien : mutateAsync, isPending };
};
export default useMutationCreatePasien;