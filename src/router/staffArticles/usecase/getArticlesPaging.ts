import { getArticlesPagingService } from "../service";

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
        title: string;
        articleImages: [];
        // description: number;
      }) => ({
        id: item?.id,
        title: item?.title,
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
