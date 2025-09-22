import { Navigate, Outlet } from 'react-router';
import useLoginWrapperController from './lib/useLoginWrapperController';

const LoginWrapper = () => {
  const { isNotAuthenticated } = useLoginWrapperController();
  return <>{isNotAuthenticated ? <Outlet /> : <Navigate to="/" />}</>;
};

export default LoginWrapper;
