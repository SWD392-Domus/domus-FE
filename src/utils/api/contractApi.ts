import { get, post } from "./ApiCaller";

export const contractApi = {
    getContractDetail: (id: string, token: string) => {
        return get(`/Contract/${id}`, {}, { Authorization: `Bearer ${token}` });
    },
    createContract: (data: any, token: string) => {
        return post(
            "/Contract",
            data,
            {},
            { Authorization: `Bearer ${token}` }
        );
    },
    getContractPaging: (
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number,
        token: string
    ) => {
        return get(
            `/Contract/search?SearchField=${searchField}&SearchValue=${searchValue}&SortField=${sortField}&Descending=${descending}&PageSize=${pageSize}&PageIndex=${pageIndex}`,
            {},
            {
                Authorization: token,
            }
        );
    },
};
