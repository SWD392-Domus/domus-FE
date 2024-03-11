import { contractStaffApi } from "@/utils/api/contractApi";

export const getAllContractsService = async () => {
  return contractStaffApi.getAllContracts();
};
