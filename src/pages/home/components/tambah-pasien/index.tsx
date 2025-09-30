import { Typography, IconButton, Button } from '@material-tailwind/react';
import { FaChevronLeft } from 'react-icons/fa';
import { CiCircleRemove } from 'react-icons/ci';
import InputWithLabel from '@/components/input-with-label';
import useTambahPasienController from '../../lib/useTambahPasienController';
import DefaultSelect from '@/components/default-select';
import DatePicker from '@/components/date-picker';
import { format } from 'date-fns';
import type { IGetPasienResponse } from '@/interface/transaksi/response';
interface ITambahPasienProps {
  onPressBack: () => void;
  onClose: () => void;
  pasienDetail?: IGetPasienResponse;
  onSuccess?: (id: number, no_rm: number) => void;
}

const TambahPasien = ({ onPressBack, onClose, pasienDetail, onSuccess }: ITambahPasienProps) => {
  const { pasienForm, setPasienForm, clearForm, handleCreatePasien } = useTambahPasienController(
    pasienDetail,
    onSuccess,
    onPressBack
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            clearForm();
            onPressBack();
          }}
        >
          <FaChevronLeft className="w-[20px] h-[20px]" />
        </div>
        <Typography type="h5">{pasienDetail ? 'Edit Pasien' : 'Tambah Pasien'}</Typography>
        <IconButton
          className="cursor-pointer h-fit rounded-full"
          size="sm"
          color="secondary"
          onClick={() => {
            clearForm();
            onClose();
          }}
        >
          <CiCircleRemove className="w-full h-full" />
        </IconButton>
      </div>
      <div className="flex flex-col mt-4 gap-4 overflow-y-auto flex-1">
        <InputWithLabel
          label="No RM"
          value={pasienForm.no_rm.toString()}
          disabled
          onChange={() => {}}
        />
        <InputWithLabel
          required
          label="Nama"
          placeholder="masukan nama pasien"
          value={pasienForm.nama}
          onChange={e => setPasienForm({ ...pasienForm, nama: e.target.value })}
        />
        <InputWithLabel
          required
          label="Domisili"
          placeholder="masukan domisili pasien"
          value={pasienForm.domisili}
          onChange={e => setPasienForm({ ...pasienForm, domisili: e.target.value })}
        />
        <DefaultSelect
          required
          label="Jenis Kelamin"
          options={[
            { label: 'Laki-laki', value: 'L' },
            { label: 'Perempuan', value: 'P' },
          ]}
          placeholder="pilih jenis kelamin"
          value={pasienForm.jenis_kelamin}
          onSelect={e => setPasienForm({ ...pasienForm, jenis_kelamin: e })}
        />
        <DatePicker
          label="Tanggal Lahir (optional)"
          placeholder="pilih tanggal lahir"
          value={pasienForm.tanggal_lahir ? new Date(pasienForm.tanggal_lahir) : null}
          onChange={e =>
            setPasienForm({ ...pasienForm, tanggal_lahir: format(e || new Date(), 'yyyy-MM-dd') })
          }
        />
        <InputWithLabel
          label="No HP (optional)"
          value={pasienForm.no_hp}
          placeholder="masukan no hp pasien"
          onChange={e => setPasienForm({ ...pasienForm, no_hp: e.target.value })}
        />
        <InputWithLabel
          label="NIK (optional)"
          value={pasienForm.nik}
          placeholder="masukan nik pasien"
          onChange={e => setPasienForm({ ...pasienForm, nik: e.target.value })}
        />
        <Button
          disabled={!pasienForm.nama || !pasienForm.domisili || !pasienForm.jenis_kelamin}
          className="cursor-pointer"
          onClick={() => {
            handleCreatePasien();
          }}
        >
          {pasienDetail ? 'Edit Pasien' : 'Tambah Pasien'}
        </Button>
      </div>
    </div>
  );
};

export default TambahPasien;
