import { articleStaffApi } from "@/utils/api/ArticleApi";

export const searchArticlesService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return articleStaffApi.searchArticles(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
