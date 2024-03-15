import { get, post, put, remove } from "./ApiCaller";

// export const serviceApi = {
//   getAllServices: (pageSize: number, pageIndex: number) => {
//     return get(`/Services?PageSize=${pageSize}&PageIndex=${pageIndex}`);
//   },
//   getOneService: (id: string) => {
//     return get(`/Services/${id}`);
//   },
// };

export const serviceStaffApi = {
  getAllServices: () => {
    return get(`/Services/all`);
  },
  updateService: (
    id: string,
    formData: HTMLElement | null | undefined,
    token: string
  ) => {
    return put(
      `/Services?id=${id}`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },

  deleteService: (id: string, token: string) => {
    return remove(`/Services/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyServices: (ids: string[], token: string) => {
    return remove(`/Services/many`, ids, {}, { Authorization: token });
  },
  searchServices: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string,
    token: string
  ) => {
    return post(
      `/Services/search`,
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
  sortServices: (
    pageSize: number,
    pageIndex: number,
    sortField: string,
    descending: boolean,
    token: string
  ) => {
    return post(
      `/Services/search`,
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
  getServicesPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Services/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
  getServiceById: (id: string) => {
    return get(`/Services/${id}`);
  },
};
