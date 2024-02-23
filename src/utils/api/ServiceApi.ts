import { get, post, put, remove } from "./ApiCaller";

// export const serviceApi = {
//   getAllServices: (pageSize: number, pageIndex: number) => {
//     return get(`/Services?PageSize=${pageSize}&PageIndex=${pageIndex}`);
//   },
//   getOneService: (id: string) => {
//     return get(`/Services/${id}`);
//   },
// };
const tokenS = localStorage.getItem("Token") as string;

const token = "Bearer " + tokenS;

export const serviceStaffApi = {
  getAllServices: () => {
    return get(`/Services/all`);
  },
  updateService: (id: string, formData: HTMLElement | null | undefined) => {
    return put(
      `/Services?id=${id}`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },

  deleteService: (id: string) => {
    return remove(`/Services?id=${id}`, {}, {}, { Authorization: token });
  },
  deleteManyServices: (ids: string[]) => {
    return remove(`/Services/multiple`, ids, {}, { Authorization: token });
  },
  searchServices: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string
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
    descending: boolean
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
    pageIndex: number
  ) => {
    return get(
      `/Services/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`
    );
  },
  getServiceById: (id: string) => {
    return get(`/Services/${id}`);
  },
};