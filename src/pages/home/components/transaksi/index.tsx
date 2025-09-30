import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router';

const Transaksi = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full  w-full">
      <Button
        className="cursor-pointer"
        size="lg"
        onClick={() => navigate('/home/tambah-transaksi')}
      >
        Tambah Transaksi
      </Button>
    </div>
  );
};

export default Transaksi;
