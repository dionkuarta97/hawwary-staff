export interface ITransaksiResponse {
  id: number;
  pasien_id: number;
  docter_id: number;
  dantel_id: number;
  total_amount: string;
  net_amount: string;
  description: string;
  status: 'pending' | 'sukses' | 'gagal';
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pasien: ITransaksiPasienResponse;
  docter: ITransaksiDocterResponse;
  dantel: ITransaksiDantelResponse;
  operational: ITransaksiOperationalResponse | null;
}

export interface ITransaksiPasienResponse {
  id: number;
  nama: string;
  no_rm: number;
  domisili: string;
  no_hp: string | null;
  nik: string | null;
  tanggal_lahir: string;
  jenis_kelamin: string;
}

export interface ITransaksiDocterResponse {
  id: number;
  nama: string;
}

export interface ITransaksiDantelResponse {
  id: number;
  nama: string;
}

export interface ITransaksiOperationalResponse {
  id: number;
  transaksi_id: number;
  nama: string;
  amount: string;
  description: string;
  status: 'pending' | 'success' | 'failed';
}
