import { getQuotationsPagingService } from "../service";

export const getQuotationsPaging = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number
) => {
  const response = await getQuotationsPagingService(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex
  );

  if (response.status === 200) {
    const quotationsData = response?.data?.data;
    const quotationsItems = quotationsData?.items?.map(
      (item: {
        id: string;
        expireAt: string;
        staff: { profileImage: string; name: string };
        customer: { profileImage: string; name: string };
        totalPrice: number;
        status: string;
      }) => ({
        id: item?.id,
        expireAt: item?.expireAt,
        staffAva: item?.staff?.profileImage,
        staffName: item?.staff?.name,
        customerAva: item?.customer?.profileImage,
        customerName: item?.customer?.name,
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
