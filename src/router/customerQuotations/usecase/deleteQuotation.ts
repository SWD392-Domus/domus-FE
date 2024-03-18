import { deleteQuotationService } from "../service";

export const deleteQuotation = async (id: string) => {
  const token = ("Bearer " + localStorage.getItem("Token")) as string;
  const response = await deleteQuotationService(id, token);
  return response.status;
};
