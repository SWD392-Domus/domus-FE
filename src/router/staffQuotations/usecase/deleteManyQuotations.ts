import { deleteManyQuotationsService } from "../service";

export const deleteManyQuotations = async (ids: string[]) => {
  const response = await deleteManyQuotationsService(ids);
  return response.status;
};
