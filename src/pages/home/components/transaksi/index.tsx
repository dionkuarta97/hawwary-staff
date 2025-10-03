import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import receipt from '@/assets/receipt.png';

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
      <div className="flex flex-col items-center mt-10 justify-center gap-4">
        <img src={receipt} alt="receipt" className="w-full h-full rounded-md object-contain" />
        <Typography className="text-center text-gray-500" type="h5">
          Fitur untuk mengelola transaksi
        </Typography>
      </div>
    </div>
  );
};

export default Transaksi;
