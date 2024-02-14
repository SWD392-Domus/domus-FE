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
            // setLoading(false);
            const quotationsData = res?.data;
            // const quotationsItems = quotationsData?.items;
            // setQuotations(quotationsItems.map(
            //     (item: {
            //         id: string,
            //         expireAt: string,
            //         staffName: string,
            //         customerName: string,
            //         status: string
            //     }) => (
            //         {
            //             id: item.id,
            //             expireAt: item.expireAt,
            //             staffName: item.staffName,
            //             customerName: item.customerName,
            //             status: item.status,
            //         }
            //     )));
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