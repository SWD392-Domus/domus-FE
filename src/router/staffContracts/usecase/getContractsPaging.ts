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
        name: string;
        signedAt: string;
        client: { userName: string; profileImage: string };
        contractor: { userName: string; profileImage: string };
        status: number;
        signature: string;
      }) => ({
        id: item?.id,
        name: item?.name,
        signedAt: item?.signedAt,
        // staffAva: item?.staff?.profileImage,
        // staffName: item?.staff?.userName,
        staffName: item?.contractor,
        // customerAva: item?.customer?.profileImage,
        // customerName: item?.customer?.userName,
        customerName: item?.client,
        status: item?.status,
        signature: item?.signature,
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
