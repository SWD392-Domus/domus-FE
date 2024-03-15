import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from './components/Table/column.tsx'
import { ServicesProps } from "./types/index.ts";
import { getServicesPaging } from "./usecase";
import ServicesPagination from "./components/ServicesPagination"

interface Props {
    // define your props here
}

const StaffServices: React.FC<Props> = () => {
    const [services, setServices] = useState<ServicesProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getServicesService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number) {
        const res = await getServicesPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setServices(res.servicesItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getServicesService(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex);
    }, [searchField,
        searchValue,
        sortField,
        descending,
        pageSize,
        pageIndex]);

    return (
        <div className="">
            <div className="text-xl font-bold py-5">Service List</div>
            <DataTable
                columns={columns}
                data={services}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Services</div>
                <ServicesPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default StaffServices