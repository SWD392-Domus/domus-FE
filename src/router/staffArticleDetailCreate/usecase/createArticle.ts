import { createArticleService } from "../service";
// import { ArticleProps } from "../types";
export const createArticle = async (formData: any) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await createArticleService(formData, token);

  return response.status;
};
