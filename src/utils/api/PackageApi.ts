import { get, post, put, remove } from "./ApiCaller";

export const packageApi = {
  getAllPackages: (pageSize: number, pageIndex: number) => {
    return get(`/Packages?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOnePackage: (id: string) => {
    return get(`/Packages/${id}`);
  },
};
const tokenS = localStorage.getItem("Token") as string;

const token = "Bearer " + tokenS;

export const packageStaffApi = {
  createPackage: (formData: HTMLElement | null | undefined) => {
    return post(
      `/Packages`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },
  updatePackage: (id: string, formData: HTMLElement | null | undefined) => {
    return put(
      `/Packages?id=${id}`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },

  deletePackage: (id: string) => {
    return remove(`/Packages?id=${id}`, {}, {}, { Authorization: token });
  },
  deleteManyPackages: (ids: string[]) => {
    return remove(`/Packages/multiple`, ids, {}, { Authorization: token });
  },
  searchPackages: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string
  ) => {
    return post(
      `/Packages/search`,
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
  sortPackages: (
    pageSize: number,
    pageIndex: number,
    sortField: string,
    descending: boolean
  ) => {
    return post(
      `/Packages/search`,
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
  getPackagesPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number
  ) => {
    return get(
      `/Packages/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`
    );
  },
  getPackageById: (id: string) => {
    return get(`/Packages/${id}`);
  },
  getAllPackages: () => {
    return get(`/Packages`);
  },
};
