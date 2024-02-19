import { get, post, remove } from "./ApiCaller";

export const packageApi = {
  getAllPackages: (pageSize: number, pageIndex: number) => {
    return get(`/Packages?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOnePackage: (id: string) => {
    return get(`/Packages/${id}`);
  },
};
const token =
  "Bearer " +
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1eXN0YWZmQGRvbXVzLmNvbSIsInN1YiI6ImM3MTNhYWNjLTM1ODItNDU5OC04NjcwLTIyNTkwZDgzNzE3OSIsIm5hbWUiOiJkdXlzdGFmZkBkb211cy5jb20iLCJyb2xlIjpbIkNsaWVudCIsIlN0YWZmIl0sIm5iZiI6MTcwODE4NzgzMCwiZXhwIjoxNzA4MTg4NzMwLCJpYXQiOjE3MDgxODc4MzAsImlzcyI6Imh0dHA6Ly8yMy4xMDIuMjI2LjExODo0NDMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ.b2S6g3aNMzhI6bma0nl_8Rnk2DgJomRZXrlgFNC5pKs";
export const packageStaffApi = {
  deletePackage: (id: string) => {
    return remove(`/Packages/${id}`, {}, {}, { Authorization: token });
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
  getPackageById: (id: number) => {
    return get(`/Packages/${id}`);
  },
  getAllPackages: () => {
    return get(`/Packages`);
  },
};
