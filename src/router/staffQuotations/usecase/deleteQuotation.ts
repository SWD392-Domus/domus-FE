import { deleteQuotationService } from "../service";

export const deleteQuotation = async (id: string) => {
  const response = await deleteQuotationService(id);
  return response.status;
};
