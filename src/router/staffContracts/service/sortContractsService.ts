import { contractStaffApi } from "@/utils/api/contractApi";

export const sortContractsService = async (
  pageSize: number,
  pageIndex: number,
  sortField: string,
  sortKeyword: boolean,
  token: string
) => {
  return contractStaffApi.sortContracts(
    pageSize,
    pageIndex,
    sortField,
    sortKeyword,
    token
  );
};
