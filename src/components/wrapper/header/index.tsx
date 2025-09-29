import { Button, Typography } from '@material-tailwind/react';
import { useAtomValue } from 'jotai';
import authStore from '@/store/auth';
import { Outlet } from 'react-router';
import Navbar from '@/components/navbar';

const HeaderWrapper = () => {
  const user = useAtomValue(authStore.user);
  return (
    <div className="flex h-screen flex-col gap-4">
      <div className="flex flex-row justify-between items-center px-8 py-4 bg-white shadow-lg">
        <Typography type="h5" className=" font-semibold text-cyan-800">
          Hawwary Staff
        </Typography>
        <div className="flex flex-row justify-end items-center gap-4">
          <Typography type="h6" className="text-cyan-800">
            Hi, {user?.name}
          </Typography>
          <Button color="secondary" className="cursor-pointer" size="sm">
            Logout
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 h-full pb-8 px-8">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderWrapper;
