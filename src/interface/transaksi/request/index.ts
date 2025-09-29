export interface IGetTransaksiRequestParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: 'pending' | 'sukses' | 'gagal';
  start_date?: string;
  end_date?: string;
  order?: 'asc' | 'desc';
}

