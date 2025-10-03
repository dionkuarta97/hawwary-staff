import { useNavigate } from "react-router";
import { useSetAtom } from "jotai";
import authStore from "@/store/auth";


const useLogout = () => {
  const navigate = useNavigate();
  const setToken = useSetAtom(authStore.token);
  const setUser = useSetAtom(authStore.user);
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };
  return { logout };
};

export default useLogout;