import { editQuotationService } from "../service";

export const editQuotation = (token: string, data: any) => {
    return editQuotationService(token, data);
};
