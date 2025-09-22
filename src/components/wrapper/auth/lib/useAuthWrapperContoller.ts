import authStore from "@/store/auth";
import { useAtomValue } from "jotai";

const useAuthWrapperContoller = () => {
    const token = useAtomValue(authStore.token);   
    
    const isAuthenticated = !!token;
  return {
    isAuthenticated,
  };
};

export default useAuthWrapperContoller;