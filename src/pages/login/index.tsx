import { Button, Input, Typography } from '@material-tailwind/react';
import { CiLock, CiUser } from 'react-icons/ci';
import useLoginController from './lib/useLoginController';

const LoginForm = () => {
  const { loginForm, setLoginForm, handleLogin, isDisabled } = useLoginController();
  return (
    <div className="flex flex-col items-center gap-[40px] justify-center h-screen">
      <Typography type="h3" className="text-2xl font-semibold text-cyan-800">
        Hawwary Staff
      </Typography>
      <div className="flex  flex-col bg-white border shadow-lg border-gray-300 rounded-[20px] px-8 py-10 w-1/4 items-center justify-center gap-4">
        <form
          id="login-form"
          onSubmit={e => {
            e.preventDefault();
            handleLogin();
          }}
          className="flex flex-col gap-4 w-full"
        >
          <Input
            placeholder="Username"
            value={loginForm.username}
            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
          >
            <Input.Icon placement="end">
              <CiUser className="w-full h-full" />
            </Input.Icon>
          </Input>
          <Input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
          >
            <Input.Icon className="cursor-pointer" placement="end">
              <CiLock className="w-full h-full" />
            </Input.Icon>
          </Input>
          <Button type="submit" className="w-full" disabled={isDisabled}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
