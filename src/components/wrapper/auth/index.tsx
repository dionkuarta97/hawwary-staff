import useAuthWrapperContoller from './lib/useAuthWrapperContoller';

import { Navigate, Outlet } from 'react-router';

const AuthWrapper = () => {
  const { isAuthenticated } = useAuthWrapperContoller();
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default AuthWrapper;
