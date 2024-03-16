import { getArticlesPagingService } from "../service/getArticlesPagingService";

export const getArticlesPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getArticlesPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );

  if (response.status === 200) {
    const articlesData = response?.data?.data;
    const articlesItems = articlesData?.items?.map(
      (item: {
        id: string;
        articleCategory: { name: string };
        title: string;
        content: string;
        articleImages: [];
      }) => ({
        id: item?.id,
        articleCategory: item?.articleCategory,
        title: item?.title,
        content: item?.content,
        articleImages: item?.articleImages,
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
