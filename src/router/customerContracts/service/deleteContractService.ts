import { contractStaffApi } from "@/utils/api/contractApi";

export const deleteContractService = async (id: string, token: string) => {
  return contractStaffApi.deleteContract(id, token);
};
