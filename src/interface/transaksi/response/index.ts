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
  name: string;
}

export interface ITransaksiDantelResponse {
  id: number;
  name: string;
}

export interface ITransaksiOperationalResponse {
  id: number;
  transaksi_id: number;
  name: string;
  amount: string;
  description: string;
  status: 'pending' | 'success' | 'failed';
}


export interface IGetPasienResponse {
  id: number;
  no_rm: number;
  nama: string;
  domisili: string;
  tanggal_lahir: string;
  no_hp: string | null;
  nik: string | null;
  jenis_kelamin: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IGetNoRMResponse {
  no_rm: number;
}

export interface IGetDokterResponse {
  id: number;
  name: string;
}

export interface IGetDantelResponse {
  id: number;
  name: string;
}

export interface ICreateTransaksiResponse {
  tranksaksi: {
    pasien_id: number;
    docter_id: number;
    dantel_id: number;
    total_amount: number;
    net_amount: number;
    description: string;
    updated_at: string;
    created_at: string;
    id: number;
    pasien: {
    id: number;
    nama: string;
    no_rm: number;
    domisili: string;
    no_hp: string | null;
            },
    docter: {
    id: number;
    name: string;
            },
    dantel: {
    id: number;
    name: string;
            }
        },
    operational: ITransaksiOperationalResponse | null;
}