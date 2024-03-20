import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from "./components/Table/column.tsx";
import { QuotationsProps } from "./types/index.ts";
import { getQuotationsPaging } from "./usecase";
import QuotationsPagination from "./components/QuotationsPagination";

interface Props {
    // define your props here
}

const AdminQuotations: React.FC<Props> = () => {
    const [quotations, setQuotations] = useState<QuotationsProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("id");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("expireAt");
    const [descending, setDescending] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getQuotationsService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number
    ) {
        const res = await getQuotationsPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setQuotations(res.quotationsItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getQuotationsService(
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
            <div className="text-xl font-bold py-5">Quotation List</div>
            <DataTable
                columns={columns}
                data={quotations}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Quotations</div>
                <QuotationsPagination
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

export default AdminQuotations;
