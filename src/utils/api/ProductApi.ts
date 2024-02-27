import { get, post, remove, put } from "./ApiCaller";

export const productApi = {
  getAllProducts: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOneProduct: (id: string) => {
    return get(`/Products/${id}`);
  },
  getAllInOneProduct: () => {
    return get(`/Products/all`);
  },
  searchProduct: (
    pageSize: number,
    pageIndex: number,
    searchValue: string,
    searchField: string
  ) => {
    return get(
      `/Products/search?PageSize=${pageSize}&PageIndex=${pageIndex}&SearchValue=${searchValue}&SearchField=${searchField}`
    );
  },
};

export const productStaffApi = {
  deleteProduct: (id: string, token: string) => {
    return remove(`/Products/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyProducts: (ids: string[], token: string) => {
    return remove(`/Products/multiple`, ids, {}, { Authorization: token });
  },
  searchProducts: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string,
    token: string
  ) => {
    return post(
      `/Products/search`,
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
  sortProducts: (
    pageSize: number,
    pageIndex: number,
    sortField: string,
    descending: boolean,
    token: string
  ) => {
    return post(
      `/Products/search`,
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
  getProductsPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number
  ) => {
    return get(
      `/Products/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`
    );
  },
  getProductById: (id: number) => {
    return get(`/Products/${id}`);
  },
  getAllProducts: () => {
    return get(`/Products`);
  },

  createProduct: (product: any, token: string) => {
    return post(`/Products`, product, {}, { Authorization: token });
  },
  updateProduct: (id: string, product: any, token: string) => {
    return put(`/Products/${id}`, product, {}, { Authorization: token });
  },
};
