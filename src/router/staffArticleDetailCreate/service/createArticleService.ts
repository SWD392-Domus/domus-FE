import { articleStaffApi } from "@/utils/api/ArticleApi";

export const createArticleService = async (formData: any, token: string) => {
  return articleStaffApi.createArticle(formData, token);
};
