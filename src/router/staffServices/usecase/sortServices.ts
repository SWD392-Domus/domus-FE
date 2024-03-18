import { sortServicesService } from "../service";

export const sortServices = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await sortServicesService(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
  if (response.status === 200) {
    const servicesData = response?.data?.data;
    const servicesItems = servicesData?.items?.map(
      (item: {
        id: string;
        details: { images: { imageUrl: string }[] }[];
        category: { name: string };
        serviceName: string;
        brand: string;
        description: string;
        totalQuantity: number;
      }) => ({
        id: item.id,
        image: item.details[0]?.images[0]?.imageUrl,
        category: item.category?.name,
        serviceName: item.serviceName,
        brand: item.brand,
        description: item.description,
        totalQuantity: item.totalQuantity,
      })
    );
    const lastPage = servicesData?.lastPage;
    const total = servicesData?.total;

    return {
      servicesItems,
      lastPage,
      total,
    };
  }
};
