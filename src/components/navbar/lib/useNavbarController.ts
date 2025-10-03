import { useLocation, useNavigate } from "react-router";
import { useMemo } from "react";


const useNavbarController = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const menu = useMemo(() => {
    return [
      {
        label: 'Home',
        path: '/',
      },
      {
        label: 'Operasional',
        path: '/operasional',
      },
    ];
  }, [pathname]);

  // Normalize pathname untuk menangani kasus "/home" yang seharusnya sama dengan "/"
  const normalizedPathname = pathname.startsWith('/home') ? '/' : pathname.startsWith('/operasional') ? '/operasional' : pathname;

  return {
    navigate,
    pathname: normalizedPathname,
    menu,
  };
};

export default useNavbarController;