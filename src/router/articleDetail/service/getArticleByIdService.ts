import { articleStaffApi } from "@/utils/api/ArticleApi";

export const getArticleByIdService = async (id: string) => {
  return articleStaffApi.getArticleById(id);
};
