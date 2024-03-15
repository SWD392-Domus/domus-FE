import { get, post, put, remove } from "./ApiCaller";

export const articleApi = {
  getAllArticles: (pageSize: number, pageIndex: number) => {
    return get(`/Articles?PageSize=${pageSize}&PageIndex=${pageIndex}`);
  },
  getOneArticle: (id: string) => {
    return get(`/Articles/${id}`);
  },
  searchArticle: (
    pageSize: number,
    pageIndex: number,
    searchValue: string,
    searchField: string
  ) => {
    return get(
      `/Articles/search?PageSize=${pageSize}&PageIndex=${pageIndex}&SearchValue=${searchValue}&SearchField=${searchField}`
    );
  },
};

export const articleStaffApi = {
  createArticle: (formData: any, token: string) => {
    return post(`/Articles`, formData, {}, { Authorization: token });
  },
  updateArticle: (
    id: string,
    formData: HTMLElement | null | undefined,
    token: string
  ) => {
    return put(
      `/Articles?id=${id}`,
      formData,
      {},
      { Authorization: token, "Content-Type": "multipart/form-data" }
    );
  },

  deleteArticle: (id: string, token: string) => {
    return remove(`/Articles/${id}`, {}, {}, { Authorization: token });
  },
  deleteManyArticles: (ids: string[], token: string) => {
    return remove(`/Articles/many`, ids, {}, { Authorization: token });
  },
  searchArticles: (
    pageSize: number,
    pageIndex: number,
    searchField: string,
    searchKeyword: string,
    token: string
  ) => {
    return post(
      `/Articles/search`,
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
  sortArticles: (
    pageSize: number,
    pageIndex: number,
    sortField: string,
    descending: boolean,
    token: string
  ) => {
    return post(
      `/Articles/search`,
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
  getArticlesPaging: (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
  ) => {
    return get(
      `/Articles/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
      {},
      {
        Authorization: token,
      }
    );
  },
  getArticleById: (id: string) => {
    return get(`/Articles/${id}`);
  },
  getAllArticles: () => {
    return get(`/Articles`);
  },
};
