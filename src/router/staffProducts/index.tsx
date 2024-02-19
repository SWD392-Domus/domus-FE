import React, { useEffect, useState } from "react";
import { DataTable } from "./components/Table/index.tsx";
import { columns } from './components/Table/column.tsx'
import { ProductsProps } from "./types/index.ts";
import { getProductsPaging } from "./usecase";
import ProductsPagination from "./components/ProductsPagination"

interface Props {
    // define your props here
}

const StaffProducts: React.FC<Props> = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("productName");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getProductsService(
        searchField: string,
        searchValue: string,
        sortField: string,
        descending: boolean,
        pageSize: number,
        pageIndex: number) {
        const res = await getProductsPaging(
            searchField,
            searchValue,
            sortField,
            descending,
            pageSize,
            pageIndex
        );
        if (res) {
            // setLoading(false);
            setProducts(res.productsItems);
            setTotalPages(res.lastPage);
            setTotalItems(res.total);
        }
    }

    useEffect(() => {
        getProductsService(
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
            <div className="text-xl font-bold py-5">Product List</div>
            <DataTable
                columns={columns}
                data={products}
                setSearchField={setSearchField}
                setSearchValue={setSearchValue}
                setSortField={setSortField}
                setDescending={setDescending}
            />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Products</div>
                <ProductsPagination
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

export default StaffProducts