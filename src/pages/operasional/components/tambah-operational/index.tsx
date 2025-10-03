import { Typography, IconButton, Button } from '@material-tailwind/react';
import { CiCircleRemove } from 'react-icons/ci';
import useTambahOperational from '../../libs/useTambahOperational';
import InputWithLabel from '@/components/input-with-label';
import DefaultTextArea from '@/components/default-text-area';

const TambahOperational = () => {
  const {
    onClose,
    operationalForm,
    setOperationalForm,
    handleCreateOperational,
    operationalDetail,
  } = useTambahOperational();

  return (
    <div className="flex flex-col border bg-white border-gray-300 rounded-[10px] p-4 pb-6 gap-4 min-h-[82vh] max-h-[82vh] w-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <Typography type="h4">
          {operationalDetail ? 'Edit Operational' : 'Tambah Operational'}
        </Typography>
        <IconButton
          className="cursor-pointer h-fit rounded-full"
          size="sm"
          color="secondary"
          onClick={onClose}
        >
          <CiCircleRemove className="w-full h-full" />
        </IconButton>
      </div>
      <div className="flex flex-col mt-4 gap-4 overflow-y-auto flex-1">
        <InputWithLabel
          required
          label="Nama Operational"
          placeholder="masukan nama operational"
          value={operationalForm.name}
          onChange={e => setOperationalForm({ ...operationalForm, name: e.target.value })}
        />
        <InputWithLabel
          label="Biaya"
          value={operationalForm.amount ? operationalForm.amount.toLocaleString('id-ID') : ''}
          placeholder="masukan biaya"
          onChange={e => {
            const numericValue = e.target.value.replace(/\./g, '');
            setOperationalForm({
              ...operationalForm,
              amount: Number(numericValue) || 0,
            });
          }}
        />
        <DefaultTextArea
          label="Deskripsi"
          value={operationalForm.description}
          placeholder="masukan deskripsi operational"
          onChange={e => setOperationalForm({ ...operationalForm, description: e.target.value })}
        />
        <Button
          className="cursor-pointer"
          color="secondary"
          onClick={() => {
            handleCreateOperational();
          }}
        >
          {operationalDetail ? 'Edit Operasional' : 'Tambah Operasional'}
        </Button>
      </div>
    </div>
  );
};

export default TambahOperational;
