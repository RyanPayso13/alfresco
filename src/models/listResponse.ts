import { Pagination } from './pagination';
import { User } from './user';

export interface ListResponse {
  list: {
    pagination: Pagination,
    entries: Array<User>
  }
}
