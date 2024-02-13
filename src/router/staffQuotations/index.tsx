import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from './components/Table/column.tsx'
import { QuotationsProps } from "./types/index.ts";
import { getQuotationsPaging } from "./usecase";
import QuotationsPagination from "./components/QuotationsPagination";

interface Props {
    // define your props here
}

const StaffQuotations: React.FC<Props> = () => {
    const [quotations, setQuotations] = useState<QuotationsProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getQuotationsService(pageSize: number, pageIndex: number) {
        const res = await getQuotationsPaging(pageSize, pageIndex);
        if (res) {
            const quotationsData = res?.data;
            // setLoading(false);
            setQuotations(quotationsData.items);
            setTotalPages(quotationsData.lastPage);
            setTotalItems(quotationsData.total);
        }
    }

    useEffect(() => {
        getQuotationsService(pageSize, pageIndex);
    }, [pageSize, pageIndex]);

    return (
        <div className="mx-auto ">
            <div className="text-xl font-bold py-5">Quotation List</div>
            <DataTable columns={columns} data={quotations} />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Quotations</div>
                <QuotationsPagination
                    totalPages={totalPages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default StaffQuotations