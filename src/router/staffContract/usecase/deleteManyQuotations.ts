import { deleteManyQuotationsService } from "../service";

export const deleteManyQuotations = async (ids: string[]) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteManyQuotationsService(ids, token);
  return response.status;
};
