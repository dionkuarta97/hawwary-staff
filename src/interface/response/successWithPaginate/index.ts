export interface ISuccessPaginationResponse<T> {
    success: true;
    message: string;
    metadata: {
      data: T;
      current_page: number;
      total: number;
      per_page: number;
      total_page: number;
    };
  }