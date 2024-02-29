import { editQuotationService } from "../service";

export const editQuotation = (id: string, token: string, data: any) => {
    return editQuotationService(id, token, data);
};
