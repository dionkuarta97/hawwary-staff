import type { IGetPasienResponse, ITransaksiResponse } from '@/interface/transaksi/response';
import { Button, Menu, Spinner, Typography } from '@material-tailwind/react';
import DefaultAccordion from '@/components/default-accordion';
import { format } from 'date-fns';
import SelectWithSearch from '@/components/select-with-search';
import useFormTransaksi from '../../lib/useFormTransaksi';
import InputWithLabel from '@/components/input-with-label';
import DefaultTextArea from '@/components/default-text-area';

interface IFormTransaksiProps {
  pasienDetail: IGetPasienResponse;
  onPressBack: () => void;
  onEdit: () => void;
  transaksiDetail?: ITransaksiResponse;
}

const FormTransaksi = ({
  pasienDetail,
  onPressBack,
  onEdit,
  transaksiDetail,
}: IFormTransaksiProps) => {
  const {
    setSearchDocter,
    docter,
    isLoadingDocter,
    setSelectedDocter,
    selectedDocter,
    setSearchDantel,
    dantel,
    isLoadingDantel,
    setSelectedDantel,
    selectedDantel,
    form,
    setForm,
    modal,
    setModal,
    disableButton,
    handleCreateTransaksi,
    isPendingCreateTransaksi,
  } = useFormTransaksi(pasienDetail.id, transaksiDetail, onPressBack);
  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-row items-center justify-between">
        <Button onClick={onPressBack} color="secondary" className="cursor-pointer">
          Back
        </Button>
      </div>
      <div className="flex flex-col gap-4 pb-16 px-2 overflow-y-auto flex-1">
        <DefaultAccordion
          title={
            <Typography type="p">
              Data Pasien <span className="font-bold">{pasienDetail.nama}</span>
            </Typography>
          }
          content={
            <div className="flex flex-col gap-2">
              <Typography type="p">No RM: {pasienDetail.no_rm}</Typography>
              <Typography type="p">Nama: {pasienDetail.nama}</Typography>
              <Typography type="p">Domisili: {pasienDetail.domisili}</Typography>
              <Typography type="p">
                Jenis Kelamin: {pasienDetail.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
              </Typography>
              <Typography type="p">
                Tanggal Lahir:{' '}
                {pasienDetail.tanggal_lahir
                  ? format(pasienDetail.tanggal_lahir, 'dd MMMM yyyy')
                  : '-'}
              </Typography>

              <Typography type="p">
                No HP: {pasienDetail.no_hp ? pasienDetail.no_hp : '-'}
              </Typography>
              <Typography type="p">NIK: {pasienDetail.nik ? pasienDetail.nik : '-'}</Typography>
              <Button
                onClick={() => {
                  onEdit();
                }}
                color="warning"
                className="cursor-pointer"
              >
                Edit
              </Button>
            </div>
          }
        />
        <SelectWithSearch
          label="Dokter"
          content={
            <>
              {isLoadingDocter ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : docter?.metadata?.total && docter?.metadata?.total > 0 ? (
                docter?.metadata?.data?.map(dokter => (
                  <Menu.Item
                    className={`cursor-pointer ${selectedDocter?.id === dokter.id ? 'bg-gray-100' : ''}`}
                    key={dokter.id}
                    onClick={() => {
                      setSelectedDocter(dokter);
                      setForm({ ...form, docter_id: dokter.id });
                    }}
                  >
                    {dokter.name}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item disabled>Dokter tidak ditemukan</Menu.Item>
              )}
            </>
          }
          onSearch={setSearchDocter}
          value={selectedDocter?.name || ''}
        />
        <SelectWithSearch
          label="Dantel"
          content={
            <>
              {isLoadingDantel ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : dantel?.metadata?.total && dantel?.metadata?.total > 0 ? (
                dantel?.metadata?.data?.map(dantel => (
                  <Menu.Item
                    className={`cursor-pointer ${selectedDantel?.id === dantel.id ? 'bg-gray-100' : ''}`}
                    key={dantel.id}
                    onClick={() => {
                      setSelectedDantel(dantel);
                      setForm({ ...form, dantel_id: dantel.id });
                    }}
                  >
                    {dantel.name}
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item disabled>Dantel tidak ditemukan</Menu.Item>
              )}
            </>
          }
          onSearch={setSearchDantel}
          value={selectedDantel?.name || ''}
        />
        <InputWithLabel
          label="Biaya"
          value={form.total_amount ? form.total_amount.toLocaleString('id-ID') : ''}
          placeholder="masukan biaya"
          onChange={e => {
            const numericValue = e.target.value.replace(/\./g, '');
            setForm({
              ...form,
              total_amount: Number(numericValue) || 0,
            });
          }}
        />
        <DefaultTextArea
          label="Deskripsi"
          value={form.description}
          placeholder="masukan deskripsi transaksi"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        {!modal && (
          <div className="flex flex-col gap-1">
            <Typography className="text-sm font-medium text-gray-400">
              *tambahkan modal jika ada
            </Typography>
            <Button
              className="cursor-pointer"
              color="secondary"
              onClick={() => {
                setModal({ name: '', amount: 0, description: '' });
              }}
            >
              Tambah Modal
            </Button>
          </div>
        )}
        {modal && (
          <div className="flex flex-col gap-4">
            <InputWithLabel
              label="Nama Modal"
              value={modal?.name || ''}
              placeholder="masukan nama modal"
              onChange={e => setModal({ ...modal, name: e.target.value })}
            />
            <InputWithLabel
              label="Nominal Modal"
              value={modal?.amount ? modal?.amount.toLocaleString('id-ID') : ''}
              placeholder="masukan nominal modal"
              onChange={e => {
                const numericValue = e.target.value.replace(/\./g, '');
                setModal({ ...modal, amount: Number(numericValue) || 0 });
              }}
            />
            <DefaultTextArea
              label="Deskripsi Modal"
              value={modal?.description || ''}
              placeholder="masukan deskripsi modal"
              onChange={e => setModal({ ...modal, description: e.target.value })}
            />
            <Button
              className="cursor-pointer"
              color="secondary"
              onClick={() => {
                setModal(null);
                setForm({ ...form, modal: null, net_amount: form.total_amount });
              }}
            >
              Cancel Modal
            </Button>
          </div>
        )}
        <Button
          size="lg"
          className="cursor-pointer mt-4"
          disabled={disableButton}
          onClick={handleCreateTransaksi}
        >
          {isPendingCreateTransaksi ? <Spinner /> : 'Simpan'}
        </Button>
      </div>
    </div>
  );
};

export default FormTransaksi;
