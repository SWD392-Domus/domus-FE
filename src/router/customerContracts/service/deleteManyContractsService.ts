import { contractStaffApi } from "@/utils/api/contractApi";

export const deleteManyContractsService = async (
  ids: string[],
  token: string
) => {
  return contractStaffApi.deleteManyContracts(ids, token);
};
