import authStore from "@/store/auth";
import { useAtomValue } from "jotai";



const useLoginWrapperController = () => {
    const token = useAtomValue(authStore.token);
    const isNotAuthenticated = !token;
  return {
    isNotAuthenticated,
  };
};

export default useLoginWrapperController;