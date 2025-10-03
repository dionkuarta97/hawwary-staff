import useDetailOperationalController from '../../libs/useDetailOperationalController';
import Loading from '@/components/loading';
import { Typography, Button } from '@material-tailwind/react';
import { IconButton } from '@material-tailwind/react';
import { CiCircleRemove } from 'react-icons/ci';
import LabelWithValue from '@/components/label-with-value';
import { Badge } from 'flowbite-react';
import { format } from 'date-fns';
import ModalConfirm from '@/components/modal-confrim';

const DetailOperational = () => {
  const {
    data,
    isLoading,
    onClose,
    navigate,
    isOpen,
    setIsOpen,
    updateStatus,
    setUpdateStatus,
    handleUpdateStatus,
  } = useDetailOperationalController();
  console.log(data);
  return (
    <div className="flex flex-col border bg-white border-gray-300 rounded-[10px] p-4 pb-6 gap-4 min-h-[82vh] max-h-[82vh] w-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <Typography type="h4">Detail Operational</Typography>
        <IconButton
          className="cursor-pointer h-fit rounded-full"
          size="sm"
          color="secondary"
          onClick={onClose}
        >
          <CiCircleRemove className="w-full h-full" />
        </IconButton>
      </div>

      {isLoading && <Loading />}
      <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pb-6">
        <LabelWithValue label="Nama" value={data?.data.name} />
        <LabelWithValue
          label="Amount"
          value={`Rp ${Number(data?.data.amount).toLocaleString('id-ID')}`}
        />
        <LabelWithValue label="Description" value={data?.data.description} />
        <LabelWithValue
          label="Status"
          content={
            <Badge
              className="w-fit"
              color={
                data?.data.status === 'success'
                  ? 'success'
                  : data?.data.status === 'failed'
                    ? 'failure'
                    : 'warning'
              }
            >
              {data?.data.status.toUpperCase()}
            </Badge>
          }
        />
        <LabelWithValue
          label="Tanggal"
          value={format(data?.data.created_at || new Date(), 'dd MMMM yyyy, HH:mm')}
        />
        {data?.data.status === 'pending' && (
          <div className="flex flex-col mt-4 gap-2">
            <Button
              color="warning"
              className="cursor-pointer "
              onClick={() => {
                navigate(`/operasional/edit-operasional/${data?.data.id}`, {
                  state: { operationalDetail: data?.data },
                });
              }}
            >
              Edit
            </Button>
            <div className="flex w-full flex-row gap-2">
              <Button
                color="success"
                onClick={() => {
                  setUpdateStatus({
                    title: 'Sukses',
                    message: 'Apakah Anda yakin ingin mengubah status menjadi sukses?',
                    onAccept: () => {
                      handleUpdateStatus('success');
                    },
                    onDecline: () => {
                      setIsOpen(false);
                    },
                  });
                  setIsOpen(true);
                }}
                className=" w-full cursor-pointer"
              >
                Sukses
              </Button>
              <Button
                color="error"
                onClick={() => {
                  setUpdateStatus({
                    title: 'Gagal',
                    message: 'Apakah Anda yakin ingin mengubah status menjadi gagal?',
                    onAccept: () => {
                      handleUpdateStatus('failed');
                    },
                    onDecline: () => {
                      setIsOpen(false);
                    },
                  });
                  setIsOpen(true);
                }}
                className=" w-full cursor-pointer"
              >
                Gagal
              </Button>
            </div>
          </div>
        )}
      </div>
      <ModalConfirm
        title={updateStatus.title}
        message={updateStatus.message}
        onAccept={() => {
          updateStatus.onAccept();
        }}
        onDecline={() => {
          updateStatus.onDecline();
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default DetailOperational;
