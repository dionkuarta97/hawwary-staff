import type { ILoginRequest } from "@/interface/auth/request";
import type { ILoginResponse } from "@/interface/auth/response";
import type { ISuccessResponse } from "@/interface/response/success";
import axiosInstance from "@/axios";
import { useMutation } from "@tanstack/react-query";


const postLogin = async (data: ILoginRequest):Promise <ISuccessResponse<ILoginResponse>> => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
};

const useMutationLogin = () => {
    const { mutateAsync } = useMutation({
        mutationFn: postLogin
      });
      return {
        mutateAsync,
      };
};

export default useMutationLogin;