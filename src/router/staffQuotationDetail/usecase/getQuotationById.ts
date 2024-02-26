import { getQuotationByIdService } from "../service";
export const getQuotationById = async (id: string) => {
  const response = await getQuotationByIdService(id);
  if (response.status === 200) {
    return response.data.data;
  }
};
