import axiosInstance from "@/axios";
import { useMutation } from "@tanstack/react-query";


const patchUpdateStatusTransaksi = async (data: { id: number, status: 'sukses' | 'gagal' }) => {
  const response = await axiosInstance.patch(`/staff/transaksi/${data.id}/status`, data);
  return response.data;
};

const useMutationUpdateStatusTransaksi = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: patchUpdateStatusTransaksi
  });
  return { updateStatusTransaksi : mutateAsync, isPending };
};
export default useMutationUpdateStatusTransaksi;