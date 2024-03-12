import { articleStaffApi } from "@/utils/api/ArticleApi";

export const getAllArticlesService = async () => {
  return articleStaffApi.getAllArticles();
};
