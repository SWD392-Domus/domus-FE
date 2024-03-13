import { contractStaffApi } from "@/utils/api/contractApi";

export const searchContractsService = async (
  pageSize: number,
  pageIndex: number,
  searchField: string,
  searchKeyword: string,
  token: string
) => {
  return contractStaffApi.searchContracts(
    pageSize,
    pageIndex,
    searchField,
    searchKeyword,
    token
  );
};
