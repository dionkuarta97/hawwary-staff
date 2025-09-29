import { Button } from '@material-tailwind/react';
import useNavbarController from './lib/useNavbarController';

const Navbar = () => {
  const { navigate, menu, pathname } = useNavbarController();
  return (
    <div className="flex flex-row gap-4">
      {menu.map(item => (
        <Button
          variant={item.path === pathname ? 'solid' : 'outline'}
          key={item.path}
          size="sm"
          className="cursor-pointer "
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
