
export interface Pagination<T>
{
  currentPage: number
  totalItems: number
  totalPages: number
  data: T
}

export class PagingParams
{
  pageNumber = 1 
  pageSize = 10

  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}