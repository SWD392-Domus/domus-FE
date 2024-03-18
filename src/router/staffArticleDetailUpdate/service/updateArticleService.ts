import { articleStaffApi } from "@/utils/api/ArticleApi";

export const updateArticleService = async (
  id: string,
  formData: any,
  token: string
) => {
  return articleStaffApi.updateArticle(id, formData, token);
};
