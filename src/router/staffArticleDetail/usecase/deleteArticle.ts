import { deleteArticleService } from "../service";

export const deleteArticle = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteArticleService(id, token);
  return response.status;
};
