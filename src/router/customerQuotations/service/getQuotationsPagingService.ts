import { quotationStaffApi } from "@/utils/api/QuotationApi";

export const getQuotationsPagingService = async (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
) => {
    return quotationStaffApi.getMyQuotationPaging(
        searchField,
        searchValue,
        sortField,
        descending,
        pageSize,
        pageIndex,
        token
    );
};
