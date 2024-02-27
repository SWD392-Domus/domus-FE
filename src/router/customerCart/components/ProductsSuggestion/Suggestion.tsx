import { Input } from '@/components/ui/Input'
import { getProductsPaging } from "../../usecase/index.ts";
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard.tsx';
import { ProductsProps } from "../../types/index.ts";

const Suggestion: React.FC = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    // const [loading, setLoading] = useState(true);
    const [searchField, setSearchField] = useState("productName");
    const [searchValue, setSearchValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [descending, setDescending] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(100);
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
        <div className='flex flex-col gap-4'>
            <div className='mt-6'>
                <h1 className="font-semibold text-2xl">You might also <span className='text-yellowCustom'>like</span></h1>
            </div>

            <div className='pt-4'>
                <Input placeholder="Search By Name"
                    onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <ProductCard products={products} />
        </div>
    )
}

export default Suggestion