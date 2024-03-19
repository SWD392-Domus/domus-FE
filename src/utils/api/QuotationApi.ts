import { get, post, put, remove } from "./ApiCaller";

export const quotationCustomerApi = {
  getMyQuotationPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/customer/quotations/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
};

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
  getMyQuotationPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/staff/quotations/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
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
        Authorization: `Bearer ${token}`,
      }
    );
  },
  getQuotationVersions: (id: string, token: string) => {
    return get(
      `/Quotations/${id}/revisions`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
  },
  getQuotationDetailByVersion: (
    quotationId: string,
    versionId: string,
    token: string
  ) => {
    return get(
      `/Quotations/${quotationId}/revisions/${versionId}`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
  },
  getAllQuotations: (token: string) => {
    return get(
      `/Quotations`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
  },
  editQuotation: (id: string, token: string, data: any) => {
    return put(
      `/Quotations/${id}`,
      data,
      {},
      { Authorization: `Bearer ${token}` }
    );
  },
  postNegotiative: (id: string, token: string, data: any) => {
    return post(
      `/Quotations/${id}/negotiations/messages`,
      data,
      {},
      { Authorization: `Bearer ${token}` }
    );
  },
  getChangelog: (id: string, token: string) => {
    return get(
      `/Quotations/${id}/negotiations`,
      {},
      { Authorization: `Bearer ${token}` }
    );
  },
  editQuotationStatus: (id: string, data: any, token: string) => {
    return put(
      `/Quotations/${id}/status`,
      data, // Wrap data in double quotes to match the provided cURL request
      {},
      { Authorization: `Bearer ${token}` }
    );
  },
};
