import useDetailTransaksiController from '../../lib/useDetailTransaksiController';
import Loading from '@/components/loading';
import { Typography, IconButton, Button } from '@material-tailwind/react';
import { CiCircleRemove } from 'react-icons/ci';
import DefaultAccordion from '@/components/default-accordion';
import { format } from 'date-fns';
import LabelWithValue from '@/components/label-with-value';
import { Badge } from 'flowbite-react';
import FormTransaksi from '../form-transaksi';
import type { IGetPasienResponse } from '@/interface/transaksi/response';
import ModalConfirm from '@/components/modal-confrim';
import { toast } from '@/components/toast';

const DetailTransaksi = () => {
  const {
    data,
    isLoading,
    onClose,
    isEdit,
    setIsEdit,
    isOpen,
    setIsOpen,
    updateStatus,
    setUpdateStatus,
    updateStatusTransaksi,
    queryClient,
  } = useDetailTransaksiController();
  return (
    <div className="flex flex-col border border-gray-300 rounded-[20px] p-4 pb-6 gap-4 min-h-[82vh] max-h-[82vh] w-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <Typography type="h4">Detail Transaksi</Typography>
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
        {isEdit ? (
          <FormTransaksi
            pasienDetail={data?.data.pasien as IGetPasienResponse}
            onPressBack={() => setIsEdit(false)}
            onEdit={() => setIsEdit(true)}
            transaksiDetail={data?.data}
          />
        ) : (
          <>
            <LabelWithValue
              label="Total Harga"
              value={`Rp ${Number(data?.data.total_amount).toLocaleString('id-ID')}`}
            />
            <DefaultAccordion
              title={
                <Typography type="p">
                  Data Pasien <span className="font-bold">{data?.data.pasien.nama}</span>
                </Typography>
              }
              content={
                <div className="flex flex-col gap-2">
                  <LabelWithValue
                    variant="inline"
                    label="No RM"
                    value={data?.data.pasien.no_rm.toString()}
                  />
                  <LabelWithValue variant="inline" label="Nama" value={data?.data.pasien.nama} />
                  <LabelWithValue
                    variant="inline"
                    label="Domisili"
                    value={data?.data.pasien.domisili}
                  />
                  <LabelWithValue
                    variant="inline"
                    label="Jenis Kelamin"
                    value={data?.data.pasien.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  />
                  <LabelWithValue
                    variant="inline"
                    label="Tanggal Lahir"
                    value={
                      data?.data.pasien.tanggal_lahir
                        ? format(data?.data.pasien.tanggal_lahir, 'dd MMMM yyyy')
                        : '-'
                    }
                  />
                  <LabelWithValue
                    variant="inline"
                    label="No HP"
                    value={data?.data.pasien.no_hp ? data?.data.pasien.no_hp : '-'}
                  />
                  <LabelWithValue
                    variant="inline"
                    label="NIK"
                    value={data?.data.pasien.nik ? data?.data.pasien.nik : '-'}
                  />
                </div>
              }
            />
            {data?.data.operational && (
              <DefaultAccordion
                title={
                  <Typography type="p">
                    Modal{' '}
                    <span className="font-bold">
                      Rp {Number(data?.data.operational.amount).toLocaleString('id-ID')}
                    </span>
                  </Typography>
                }
                content={
                  <div className="flex flex-col gap-2">
                    <LabelWithValue
                      variant="inline"
                      label="Nama"
                      value={data?.data.operational.name}
                    />
                    <LabelWithValue
                      variant="inline"
                      label="Description"
                      value={data?.data.operational.description}
                    />
                  </div>
                }
              />
            )}

            <LabelWithValue label="Dokter" value={data?.data.docter.name} />
            <LabelWithValue label="Dantel" value={data?.data.dantel.name} />

            <LabelWithValue label="Deskripsi" value={data?.data.description} />
            <LabelWithValue
              label="Status"
              content={
                <Badge
                  className="w-fit"
                  color={
                    data?.data.status === 'sukses'
                      ? 'success'
                      : data?.data.status === 'gagal'
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
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
                <div className="flex w-full flex-row gap-2">
                  <Button
                    color="success"
                    onClick={() => {
                      setUpdateStatus({
                        title: 'Pembayaran',
                        message: 'Apakah Anda yakin ingin membayar transaksi ini?',
                        onAccept: () => {
                          updateStatusTransaksi(
                            { id: data?.data.id, status: 'sukses' },
                            {
                              onSuccess: () => {
                                setIsOpen(false);
                                toast.success('Berhasil', 'Transaksi berhasil diupdate');
                                queryClient.invalidateQueries({
                                  queryKey: ['transaksi-detail', data?.data.id],
                                });
                                queryClient.invalidateQueries({
                                  queryKey: ['transaksi'],
                                });
                              },
                              onError: () => {
                                setIsOpen(false);
                                toast.error('Gagal', 'Transaksi gagal diupdate');
                              },
                            }
                          );
                        },
                        onDecline: () => {
                          setIsOpen(false);
                        },
                        status: 'sukses',
                      });
                      setIsOpen(true);
                    }}
                    className=" w-full cursor-pointer"
                  >
                    Bayar
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setUpdateStatus({
                        title: 'Pembatalan',
                        message: 'Apakah Anda yakin ingin membatalkan transaksi ini?',
                        onAccept: () => {
                          updateStatusTransaksi(
                            { id: data?.data.id, status: 'gagal' },
                            {
                              onSuccess: () => {
                                setIsOpen(false);
                                toast.success('Berhasil', 'Transaksi berhasil diupdate');
                                queryClient.invalidateQueries({
                                  queryKey: ['transaksi-detail', data?.data.id],
                                });
                                queryClient.invalidateQueries({
                                  queryKey: ['transaksi'],
                                });
                              },
                              onError: () => {
                                setIsOpen(false);
                                toast.error('Gagal', 'Transaksi gagal diupdate');
                              },
                            }
                          );
                        },
                        onDecline: () => {
                          setIsOpen(false);
                        },
                        status: 'gagal',
                      });
                      setIsOpen(true);
                    }}
                    className=" w-full cursor-pointer"
                  >
                    Batalkan
                  </Button>
                </div>
              </div>
            )}
          </>
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

export default DetailTransaksi;
