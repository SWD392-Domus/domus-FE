import React from 'react'
import { ProductsProps } from "../../types/index.ts";
// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
// } from "@/components/ui/Resizable"
import { TooltipDes } from '../Tooltip/index.tsx';
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
    products: ProductsProps[];
}

const ProductCard: React.FC<Props> = (props) => {
    return (
        <div className='h-[548px] w-[500px] overflow-scroll pr-5'>
            {props.products?.length ? props.products?.map((product: ProductsProps, index) => (
                <div className="flex gap-5 mb-3" key={index}>
                    <div className="basis-1/3">
                        <img src={product.image} className="" alt={product.productName} />
                    </div>
                    <div className="w-[300px] flex flex-col justify-around">
                        <h1 className="font-semibold text-lg">{product.productName}</h1>
                        <TooltipDes description={product.description}></TooltipDes>
                        <div className="flex justify-between">
                            <h1 className="font-semibold">{new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.displayPrice * 1000)}</h1>
                            <Link to={`/product/${product.id}`}>
                                <div
                                    className="w-10 h-10 bg-yellowCustom flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80"
                                >
                                    <FaCartArrowDown className="text-black" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )) : <>Loading...</>
            }
        </div>
    )
}

export default ProductCard