import { get, post, remove } from "./ApiCaller";

export const quotationStaffApi = {
  createQuotation: (data: any, token: string) => {
    return post(`/Quotations`, data, {}, { Authorization: token });
  },
  deleteQuotation: (id: string, token: string) => {
    return remove(`/Quotations/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyQuotations: (ids: string[], token: string) => {
    return remove(`/Quotations/multiple`, ids, {}, { Authorization: token });
  },
  searchQuotations: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string,
    token: string
  ) => {
    return post(
      `/Quotations/search`,
      {
        pageSize: pageSize,
        pageIndex: pageIndex,
        // conjunctionSearchInfos: [
        //   {
        //     fieldName: searchField,
        //     keyword: searchKeyword,
        //   },
        // ],
        disjunctionSearchInfos: [
          {
            fieldName: searchField,
            keyword: searchKeyword,
          },
        ],
      },
      {},
      { Authorization: token }
    );
  },
  sortQuotations: (
    pageSize: number,
    pageIndex: number,
    sortField: string,
    descending: boolean,
    token: string
  ) => {
    return post(
      `/Quotations/search`,
      {
        pageSize: pageSize,
        pageIndex: pageIndex,
        sortInfos: [
          {
            fieldName: sortField,
            priority: 0,
            descending: descending,
          },
        ],
      },
      {},
      { Authorization: token }
    );
  },
  getQuotationsPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Quotations/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
  getQuotationById: (id: string, token: string) => {
    return get(
      `/Quotations/${id}`,
      {},
      {
        Authorization: token,
      }
    );
  },
  getAllQuotations: () => {
    return get(`/Quotations`);
  },
};
