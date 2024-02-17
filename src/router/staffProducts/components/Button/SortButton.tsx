import { sortProducts } from "../../usecase/sortProducts"
import { Button } from "@/components/ui/Button/Button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ProductsProps } from "../../types";
interface Props {
    sortField: string;
    pageIndex: number;
    pageSize: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
}

export const SortButton: React.FC<Props> = (props) => {
    return (
        < CaretSortIcon className="ml-1 h-4 w-4 cursor-pointer"
            onClick={() => sortProducts(props.pageSize, props.pageIndex, props.sortField, true)
                .then(
                    res => {
                        props.setTotalPages(res?.total);
                        props.setProducts(res?.productsItems);
                    }
                )
            } />
    )
}