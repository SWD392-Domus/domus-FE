import { sortProductsService } from "../service";

export const sortProducts = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await sortProductsService(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
  if (response.status === 200) {
    const productsData = response?.data?.data;
    const productsItems = productsData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        productName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        productName: item.productName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = productsData?.lastPage;
    const total = productsData?.total;

    return {
      productsItems,
      lastPage,
      total,
    };
  }
};
