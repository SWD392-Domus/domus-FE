import { searchArticlesService } from "../service";

export const searchArticles = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await searchArticlesService(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
  if (response.status === 200) {
    const articlesData = response?.data?.data;
    const articlesItems = articlesData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        articleName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        articleName: item.articleName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = articlesData?.lastPage;
    const total = articlesData?.total;

    return {
      articlesItems,
      lastPage,
      total,
    };
  }
};
