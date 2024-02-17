import { Input } from "@/components/ui/Input"
import { searchProducts } from "../../usecase/searchProducts"
import { ProductsProps } from "../../types";
import { SearchByButton } from "../Button/SearchByButton";
import { useState } from "react";

interface Props {
    pageIndex: number;
    pageSize: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
}

export const SearchField: React.FC<Props> = (props) => {
    const [searchField, setSearchField] = useState("productName");
    return (
        <>
            <SearchByButton setSearchField={setSearchField}></SearchByButton>
            <Input
                placeholder="Search"
                onChange={(e) => searchProducts(props.pageSize, props.pageIndex, searchField, e.target.value)
                    .then(
                        res => {
                            props.setTotalPages(res?.lastPage);
                            props.setTotalItems(res?.total);
                            props.setProducts(res?.productsItems);
                        }
                    )}
                className="basis-1/2"
            />
        </>

    )
}