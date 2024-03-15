import { get, put, remove } from "./ApiCaller";
let ownProfileURL = `/Users/self-profile`;
let allUserEndpoint = `/Users/all`;
export const userApi = {
  getOwnProfile: (token: string) => {
    return get(`${ownProfileURL}/${token}`);
  },
  changeProfile: (token: string, formData: HTMLElement | null | undefined) => {
    return put(
      `${ownProfileURL}/${token}`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },
  getAllUser: (token: string) => {
    return get(allUserEndpoint, {}, { Authorization: ` Bearer ${token}` });
  },
};

export const userAdminApi = {
  deleteUser: (id: string, token: string) => {
    return remove(`/Users/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyUsers: (ids: string[], token: string) => {
    return remove(`/Users/many`, ids, {}, { Authorization: token });
  },
  getUsersPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Users/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
};
