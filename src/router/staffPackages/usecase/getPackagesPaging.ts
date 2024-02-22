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
        name: string;
        discount: number;
        services: { name: string }[];
        packageImages: string[];
      }) => ({
        id: item?.id,
        image: item?.packageImages[0],
        name: item?.name,
        discount: item?.discount,
        serviceName: item?.services[0]?.name,
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
