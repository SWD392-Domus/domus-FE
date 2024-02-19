import { get, post, remove } from "./ApiCaller";

export const productApi = {
  getAllProducts: (pageSize: number, pageIndex: number) => {
    return get(`/Products?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOneProduct: (id: string) => {
    return get(`/Products/${id}`);
  },
};
const tokenS = localStorage.getItem("Token") as string;

const token = "Bearer " + tokenS;
export const productStaffApi = {
  deleteProduct: (id: string) => {
    return remove(`/Products/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyProducts: (ids: string[]) => {
    return remove(`/Products/multiple`, ids, {}, { Authorization: token });
  },
  searchProducts: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string
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
    descending: boolean
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
};
