import { articleStaffApi } from "@/utils/api/ArticleApi";

export const deleteArticleService = async (id: string, token: string) => {
  return articleStaffApi.deleteArticle(id, token);
};
