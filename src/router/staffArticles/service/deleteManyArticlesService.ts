import { articleStaffApi } from "@/utils/api/ArticleApi";

export const deleteManyArticlesService = async (
  ids: string[],
  token: string
) => {
  return articleStaffApi.deleteManyArticles(ids, token);
};
