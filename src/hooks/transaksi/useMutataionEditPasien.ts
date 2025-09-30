import axiosInstance from "@/axios";
import type { ICreatePasienRequestBody } from "@/interface/transaksi/request";
import { useMutation } from "@tanstack/react-query";


const postEditPasien = async (data: ICreatePasienRequestBody & { id: number }) => {
  const response = await axiosInstance.put(`/staff/pasien/${data.id}`, data);
  return response.data;
};

const useMutationEditPasien = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postEditPasien
  });
  return { editPasien : mutateAsync, isPending };
};
export default useMutationEditPasien;