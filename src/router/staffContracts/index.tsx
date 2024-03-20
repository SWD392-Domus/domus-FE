import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from "./components/Table/column.tsx";
// import { ContractsProps } from "./types/index.ts";
import { getContractsPaging } from "./usecase";
import ContractsPagination from "./components/ContractsPagination";

interface Props {
    // define your props here
}

const StaffContract: React.FC<Props> = () => {
    const [contracts, setContracts] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("signedAt");
    const [descending, setDescending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getContractsService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number
    ) {
        const res = await getContractsPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setContracts(res.contractsItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getContractsService(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
    }, [searchField, searchValue, sortField, descending, pageSize, pageIndex]);

    return (
        <div className="">
            <div className="text-xl font-bold py-5">Contract List</div>
            <DataTable
                columns={columns}
                data={contracts}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Contracts</div>
                <ContractsPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    );
};

export default StaffContract;
