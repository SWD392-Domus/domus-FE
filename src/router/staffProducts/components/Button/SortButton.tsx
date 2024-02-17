import { sortProducts } from "../../usecase/sortProducts"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ProductsProps } from "../../types";
interface Props {
    sortField: string;
    pageIndex: number;
    pageSize: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
    setProducts: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
}

export const SortButton: React.FC<Props> = (props) => {
    return (
        <div className="flex flex-col max-w-fit">
            <ChevronUp className="ml-1 h-2 w-2 cursor-pointer"
                onClick={() => sortProducts(props.pageSize, props.pageIndex, props.sortField, false)
                    .then(
                        res => {
                            props.setTotalPages(res?.lastPage);
                            props.setTotalItems(res?.total);
                            props.setProducts(res?.productsItems);
                        }
                    )
                } />
            <ChevronDown className="ml-1 h-2 w-2 cursor-pointer"
                onClick={() => sortProducts(props.pageSize, props.pageIndex, props.sortField, true)
                    .then(
                        res => {
                            props.setTotalPages(res?.lastPage);
                            props.setTotalItems(res?.total);
                            props.setProducts(res?.productsItems);
                        }
                    )
                } />
        </div>
    )
}