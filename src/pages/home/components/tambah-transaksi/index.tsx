import { IconButton, Input, Typography } from '@material-tailwind/react';
import { CiCircleRemove } from 'react-icons/ci';
import useTambahTransaksiController from '../../lib/useTanbahTransaksiController';

const TambahTransaksi = () => {
  const { onClose } = useTambahTransaksiController();
  return (
    <div className="flex flex-col border border-gray-300 rounded-[20px] p-4 gap-4 h-full w-full">
      <div className="flex flex-row justify-between">
        <Typography type="h4">Tambah Transaksi</Typography>
        <IconButton
          className="cursor-pointer h-fit rounded-full"
          size="sm"
          color="secondary"
          onClick={onClose}
        >
          <CiCircleRemove className="w-full h-full" />
        </IconButton>
      </div>
      <Input placeholder="masukan nomor rekam medis" />
    </div>
  );
};

export default TambahTransaksi;
