import { Button, IconButton, Input, Typography } from '@material-tailwind/react';
import { CiCircleRemove } from 'react-icons/ci';
import useTambahTransaksiController from '../../lib/useTambahTransaksiController';
import male from '@/assets/male-user.webp';
import female from '@/assets/female-user.webp';
import Loading from '@/components/loading';
import TambahPasien from '../tambah-pasien';
import FormTransaksi from '../form-transaksi';
import { useQueryClient } from '@tanstack/react-query';
const TambahTransaksi = () => {
  const queryClient = useQueryClient();
  const {
    onClose,
    handleSearch,
    pasien,
    isLoading,
    no_rm,
    setNo_rm,
    action,
    setAction,
    setId,
    id,
    isLoadingDetail,
    pasienDetail,
    search,
    setSearch,
  } = useTambahTransaksiController();

  return (
    <div className="flex flex-col border bg-white border-gray-300 rounded-[10px] p-4 pb-6 gap-4 min-h-[82vh] max-h-[82vh] w-full overflow-hidden">
      {!action && (
        <>
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
          {!id && (
            <div className="flex flex-row gap-2">
              <Input
                placeholder="masukan no rekam medis atau nama pasien"
                className="bg-white"
                value={search || no_rm || ''}
                onChange={handleSearch}
              />
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setNo_rm(null);
                  setSearch(null);
                }}
              >
                Clear
              </Button>
            </div>
          )}
          {isLoading || (isLoadingDetail && <Loading />)}
          {!id && pasien && pasien.metadata.total === 0 && (
            <div className="flex items-center justify-center h-full w-full flex-col gap-2">
              <Typography type="h6">Pasien tidak ditemukan</Typography>
              <Button
                color="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setAction('tambah');
                }}
              >
                Tambah Pasien
              </Button>
            </div>
          )}
          {!id && pasien && pasien.metadata.total > 0 && (
            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pb-6">
              {pasien.metadata.data.map((item, itemIndex) => (
                <div
                  onClick={() => {
                    setId(item.id);
                  }}
                  className="flex flex-row gap-4 bg-white p-2 items-center rounded-md shadow-md cursor-pointer hover:bg-gray-100"
                  key={`${item.id}-${itemIndex}`}
                >
                  <img
                    src={item.jenis_kelamin === 'L' ? male : female}
                    alt="user"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <Typography type="p">No RM: {item.no_rm}</Typography>
                    <Typography type="p">Nama: {item.nama}</Typography>
                    <Typography type="p">Domisili: {item.domisili}</Typography>
                  </div>
                </div>
              ))}
            </div>
          )}
          {id && pasienDetail && (
            <FormTransaksi
              pasienDetail={pasienDetail.data}
              onPressBack={() => setId(null)}
              onEdit={() => setAction('tambah')}
            />
          )}
        </>
      )}
      {action === 'tambah' && (
        <TambahPasien
          onPressBack={() => {
            queryClient.invalidateQueries({
              queryKey: ['pasien'],
              exact: false,
            });
            setAction(null);
          }}
          onClose={onClose}
          pasienDetail={pasienDetail?.data}
          onSuccess={(id: number, no_rm: number) => {
            setNo_rm(no_rm);
            setId(id);
            setSearch(null);
          }}
        />
      )}
    </div>
  );
};

export default TambahTransaksi;
