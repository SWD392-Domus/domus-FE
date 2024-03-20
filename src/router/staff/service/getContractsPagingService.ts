import { contractStaffApi } from "@/utils/api/contractApi";

export const getContractsPagingService = async (
  searchField: string,
  searchValue: string,
  sortField: string,
  descending: boolean,
  pageSize: number,
  pageIndex: number,
  token: string
) => {
  return contractStaffApi.getContractsPaging(
    searchField,
    searchValue,
    sortField,
    descending,
    pageSize,
    pageIndex,
    token
  );
};
