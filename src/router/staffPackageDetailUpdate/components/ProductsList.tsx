import React from "react";
import { DataTable } from "./ProductComponents";
import { columns } from "./ProductComponents/column";
import { ProductDetailProps } from "../types";

interface Props {
    data: ProductDetailProps[];
}

const ProductsList: React.FC<Props> = (props) => {
    // console.log(props.data);
    return (
        <div className="flex flex-col w-full mb-2 mt-2">
            <DataTable columns={columns} data={props.data} />
        </div>
    );
};

export default ProductsList;
