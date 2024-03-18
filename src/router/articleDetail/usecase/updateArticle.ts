import { updateArticleService } from "../service";
// import { ArticleProps } from "../types";
export const updateArticle = async (id: string, formData: any) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await updateArticleService(id, formData, token);

  return response.status;
};
