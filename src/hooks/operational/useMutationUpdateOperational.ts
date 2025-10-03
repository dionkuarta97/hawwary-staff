import axiosInstance from "@/axios";
import type { IUpdateOperationalRequestBody } from "@/interface/operational/request";
import { useMutation } from "@tanstack/react-query";


const updateOperational = async (data: IUpdateOperationalRequestBody & { id: number }) => {
  const response = await axiosInstance.put(`/staff/operational/${data.id}`, data);
  return response.data;
};

const useMutationUpdateOperational = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateOperational
  });
  return { updateOperational : mutateAsync, isPending };
};
export default useMutationUpdateOperational;