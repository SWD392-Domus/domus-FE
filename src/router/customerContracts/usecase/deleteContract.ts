import { deleteContractService } from "../service";

export const deleteContract = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteContractService(id, token);
  return response.status;
};
