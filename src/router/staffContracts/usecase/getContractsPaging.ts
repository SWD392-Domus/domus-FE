import { getContractsPagingService } from "../service";

export const getContractsPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getContractsPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );

  if (response.status === 200) {
    const contractsData = response?.data?.data;
    const contractsItems = contractsData?.items?.map(
      (item: {
        id: string;
        expireAt: string;
        staff: { profileImage: string; userName: string };
        customer: { profileImage: string; userName: string };
        totalPrice: number;
        status: string;
      }) => ({
        id: item?.id,
        expireAt: item?.expireAt,
        // staffAva: item?.staff?.profileImage,
        // staffName: item?.staff?.userName,
        staffName: item?.staff,
        // customerAva: item?.customer?.profileImage,
        // customerName: item?.customer?.userName,
        customerName: item?.customer,
        totalPrice: item?.totalPrice,
        status: item?.status,
      })
    );
    const lastPage = contractsData?.lastPage;
    const total = contractsData?.total;

    return {
      contractsItems,
      lastPage,
      total,
    };
  }
};
