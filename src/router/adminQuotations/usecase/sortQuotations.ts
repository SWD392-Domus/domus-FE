import { sortQuotationsService } from "../service";

export const sortQuotations = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await sortQuotationsService(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
  if (response.status === 200) {
    const quotationsData = response?.data?.data;
    const quotationsItems = quotationsData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        quotationName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        quotationName: item.quotationName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = quotationsData?.lastPage;
    const total = quotationsData?.total;

    return {
      quotationsItems,
      lastPage,
      total,
    };
  }
};
