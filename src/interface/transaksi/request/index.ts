export interface IGetTransaksiRequestParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: 'pending' | 'sukses' | 'gagal';
  start_date?: string;
  end_date?: string;
  order?: 'asc' | 'desc';
}

export interface IGetPasienRequestParams {
  search?: string | null;
  no_rm?: number | null;
}

export interface IGetDokterRequestParams {
  search?: string | null;
}

export interface IGetDantelRequestParams {
  search?: string | null;
}

export interface ICreatePasienRequestBody {
  no_rm: number;
  nama: string;
  domisili: string;
  jenis_kelamin: string;
  tanggal_lahir?: string;
  no_hp?: string;
  nik?: string;
}

export interface ICreateTransaksiRequestBody {
  "pasien_id" : number,
  "docter_id" : number,
  "dantel_id" : number,
  "total_amount" : number,
  "net_amount" : number,
  "description" : string,
  "modal" : {
   "name" : string,
   "amount" : number,
   "description" : string
  } | null
}