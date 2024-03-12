import { articleStaffApi } from "@/utils/api/ArticleApi";

export const sortArticlesService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return articleStaffApi.sortArticles(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
