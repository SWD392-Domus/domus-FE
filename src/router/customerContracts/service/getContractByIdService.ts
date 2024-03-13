import { contractStaffApi } from "@/utils/api/contractApi";

export const getContractByIdService = async (id: string, token: string) => {
  return contractStaffApi.getContractById(id, token);
};
