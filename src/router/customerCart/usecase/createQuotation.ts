import { createQuotationService } from "../service";
export const createQuotation = async (data: any) => {
  const response = await createQuotationService(data);

  return response.status;
};
