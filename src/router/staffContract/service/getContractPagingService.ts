import { quotationStaffApi } from "@/utils/api/QuotationApi";
import { contractApi } from "@/utils/api/contractApi";

export const getContractPagingService = async (
    searchField: string,
    searchValue: string,
    sortField: string,
    descending: boolean,
    pageSize: number,
    pageIndex: number,
    token: string
) => {
    return contractApi.getContractPaging(
        searchField,
        searchValue,
        sortField,
        descending,
        pageSize,
        pageIndex,
        token
    );
};
