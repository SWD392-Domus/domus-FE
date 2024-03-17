import { getServicesPagingService } from "../service";

export const getServicesPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getServicesPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );

  if (response.status === 200) {
    const servicesData = response?.data?.data;
    const servicesItems = servicesData?.items?.map(
      (item: {
        id: string;
        name: string;
        price: number;
        monetaryUnit: string;
      }) => ({
        id: item?.id,
        name: item?.name,
        price: item?.price,
        monetaryUnit: item?.monetaryUnit,
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
