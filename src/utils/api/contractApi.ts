import { get, post, remove } from "./ApiCaller";

export const contractStaffApi = {
  deleteContract: (id: string, token: string) => {
    return remove(`/Contract/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyContracts: (ids: string[], token: string) => {
    return remove(`/Contract/multiple`, ids, {}, { Authorization: token });
  },
  getContractsPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Contract/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
};

export const contractApi = {
  getContractDetail: (id: string, token: string) => {
    return get(`/Contract/${id}`, {}, { Authorization: `Bearer ${token}` });
  },
  createContract: (data: any, token: string) => {
    return post("/Contract", data, {}, { Authorization: `Bearer ${token}` });
  },
  getContractPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Contract/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
};
