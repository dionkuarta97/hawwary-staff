import axiosInstance from "@/axios";
import type { ICreateOperationalRequestBody } from "@/interface/operational/request";
import { useMutation } from "@tanstack/react-query";


const postCreateOperational = async (data: ICreateOperationalRequestBody) => {
  const response = await axiosInstance.post('/staff/operational', data);
  return response.data;
};

const useMutationCreateOperational = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCreateOperational
  });
  return { createOperational : mutateAsync, isPending };
};
export default useMutationCreateOperational;