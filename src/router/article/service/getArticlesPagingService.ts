import { articleStaffApi } from "@/utils/api/ArticleApi";

export const getArticlesPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number,
  token: string
) => {
  return articleStaffApi.getArticlesPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );
};
