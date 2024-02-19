import { searchPackagesService } from "../service";

export const searchPackages = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string
) => {
  const response = await searchPackagesService(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword
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
