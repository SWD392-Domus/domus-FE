import { getArticlesPagingService } from "../service";

export const getArticlesPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const response = await getArticlesPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex
  );

  if (response.status === 200) {
    const articlesData = response?.data?.data;
    const articlesItems = articlesData?.items?.map(
      (item: {
        id: string;
        name: string;
        discount: number;
        services: { name: string }[];
        articleImages: string[];
      }) => ({
        id: item?.id,
        image: item?.articleImages[0],
        name: item?.name,
        discount: item?.discount,
        serviceName: item?.services[0]?.name,
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
