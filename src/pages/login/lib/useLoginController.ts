import { toast } from "@/components/toast";
import useMutationLogin from "@/hooks/auth/useMutationLogin";
import type { ILoginRequest } from "@/interface/auth/request";
import authStore from "@/store/auth";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router";


const useLoginController = () => {
    const { mutateAsync } = useMutationLogin();
    const navigate = useNavigate();
    const setToken = useSetAtom(authStore.token);
    const setUser = useSetAtom(authStore.user);
    const [loginForm, setLoginForm] = useState<ILoginRequest>({
        username: '',
        password: '',
      });
    const handleLogin = async () => {
        const response = await mutateAsync(loginForm, {
            onSuccess: (data) => {
              setToken(data.data.token);
              setUser(data.data.user);
              navigate('/', { replace: true });
              toast.success('Login successful',`Welcome to Hawwary ${data.data.user.name}`);
            },  
            onError: (error) => {
               toast.error('Login failed', error.message);
            },
        });
        return response;
    };
    const isDisabled = !loginForm.username || !loginForm.password;

    return {
        handleLogin,
        loginForm,
        setLoginForm,
        isDisabled,
    };
};

export default useLoginController;