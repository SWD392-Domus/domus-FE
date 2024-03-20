import { get, post, put, remove } from "./ApiCaller";

let ownProfileURL = `/Users/self-profile`;
let allUserEndpoint = `/Users/all`;
let UserEndpoint = `/Users`;
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
  getUserById: (id: string, token: string) => {
    return get(`${UserEndpoint}/${id}`, {}, { Authorization: token });
  },
  updateUser: (id: string, data: any, token: string) => {
    return put(
      `${UserEndpoint}/${id}`,
      data,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },
  createUser: (data: any, token: string) => {
    return post(
      UserEndpoint,
      data,
      {},
      {
        Authorization: token,
      }
    );
  },
};

export const userAdminApi = {
  getAllStaff: (token: string) => {
    return get(`/Users/staff`, {}, { Authorization: ` Bearer ${token}` });
  },
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
