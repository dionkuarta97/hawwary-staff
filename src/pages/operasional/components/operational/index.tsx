import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import operational from '@/assets/operational.png';

const Operational = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full  w-full">
      <Button
        className="cursor-pointer"
        size="lg"
        onClick={() => navigate('/operasional/tambah-operasional')}
      >
        Tambah Operasional
      </Button>
      <div className="flex flex-col items-center mt-10 justify-center gap-4">
        <img
          src={operational}
          alt="operational"
          className="w-full h-full rounded-md object-contain"
        />
        <Typography className="text-center text-gray-500" type="h5">
          Fitur untuk mengelola operasional
        </Typography>
      </div>
    </div>
  );
};

export default Operational;
