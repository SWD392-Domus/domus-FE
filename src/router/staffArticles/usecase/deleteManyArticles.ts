import { deleteManyArticlesService } from "../service";

export const deleteManyArticles = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyArticlesService(ids, token);
  return response.status;
};
