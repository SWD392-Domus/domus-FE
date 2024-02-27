import { getQuotationsPagingService } from "../service";

export const getQuotationsPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await getQuotationsPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );

  if (response.status === 200) {
    const quotationsData = response?.data?.data;
    const quotationsItems = quotationsData?.items?.map(
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
    const lastPage = quotationsData?.lastPage;
    const total = quotationsData?.total;

    return {
      quotationsItems,
      lastPage,
      total,
    };
  }
};
