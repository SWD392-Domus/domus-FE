import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from './components/Table/column.tsx'
import { PackagesProps } from "./types/index.ts";
import { getPackagesPaging } from "./usecase";
import PackagesPagination from "./components/PackagesPagination"

interface Props {
    // define your props here
}

const StaffPackages: React.FC<Props> = () => {
    const [packages, setPackages] = useState<PackagesProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("packageName");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getPackagesService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number) {
        const res = await getPackagesPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setPackages(res.packagesItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getPackagesService(
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
            <div className="text-xl font-bold py-5">Package List</div>
            <DataTable
                columns={columns}
                data={packages}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Packages</div>
                <PackagesPagination
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

export default StaffPackages