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
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(1);

    async function getProductsService(pageSize: number, pageIndex: number) {
        const res = await getProductsPaging(pageSize, pageIndex);
        if (res) {
            // setLoading(false);
            const productsData = res?.data;
            const productsItems = productsData?.items;
            setProducts(productsItems.map((item: { id: string; details: { displayPrice: number; images: { imageUrl: string }[] }[]; productName: string; brand: string; }) => (
                {
                    id: item.id,
                    image: item.details[0]?.images[0]?.imageUrl,
                    name: item.productName,
                    brand: item.brand,
                    price: item.details[0]?.displayPrice * 1000,
                }
            )));
            setTotalPages(productsData.lastPage);
            setTotalItems(productsData.total);
        }
    }

    useEffect(() => {
        getProductsService(pageSize, pageIndex);
    }, [pageSize, pageIndex]);

    return (
        <div className="">
            <div className="text-xl font-bold py-5">Product List</div>
            <DataTable columns={columns} data={products} />
            <div className="flex justify-between text-sm font-medium">
                <div className="">{totalItems} Products</div>
                <ProductsPagination
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

export default StaffProducts