import { deleteManyContractsService } from "../service";

export const deleteManyContracts = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyContractsService(ids, token);
  return response.status;
};
