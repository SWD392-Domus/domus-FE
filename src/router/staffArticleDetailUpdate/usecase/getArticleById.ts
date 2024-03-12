import { getArticleByIdService } from "../service";
// import { ArticleProps } from "../types";
export const getArticleById = async (id: string) => {
  const response = await getArticleByIdService(id);

  if (response.status === 200) {
    const resData = response.data.data;
    return resData;
  }
};
