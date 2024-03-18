import { editStatusQuotationService } from "../service";

export const editStatusQuotation = (id: string, data: any) => {
    return editStatusQuotationService(id, data);
};
