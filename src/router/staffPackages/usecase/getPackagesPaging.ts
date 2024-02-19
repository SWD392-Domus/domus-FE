import { getPackagesPagingService } from "../service";

export const getPackagesPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const response = await getPackagesPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex
  );

  if (response.status === 200) {
    const packagesData = response?.data?.data;
    const packagesItems = packagesData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        packageName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        packageName: item.packageName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = packagesData?.lastPage;
    const total = packagesData?.total;

    return {
      packagesItems,
      lastPage,
      total,
    };
  }
};
