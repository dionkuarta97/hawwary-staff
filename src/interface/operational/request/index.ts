export interface IGetOperationalRequestParams {
    page?: number;
    per_page?: number;
    search?: string;
    status?: 'pending' | 'success' | 'failed';
    start_date?: string;
    end_date?: string;
    order?: 'asc' | 'desc';
    no_modal?: boolean;
  }

  export interface ICreateOperationalRequestBody {
    name : string,
    amount : number,
    description : string
  }

  export interface IUpdateOperationalRequestBody {
    name? : string,
    amount? : number,
    description ?: string,
    status? : 'success' | 'failed'
  }