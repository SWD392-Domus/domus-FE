import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from '../Tooltip/index.tsx';
import { getProductDetailById } from "../../usecase";

interface Props {
    productId: string;
}

const OneProductDetail: React.FC<Props> = (props) => {
    const [product, setProduct] = useState<any>({});

    async function getProductDetailByIdService(productId: string) {
        const res = await getProductDetailById(
            productId
        );
        setProduct(res);
    }

    useEffect(() => {
        getProductDetailByIdService(props.productId);
    }, []);

    return (
        <div className="flex gap-5 items-center">
            <div className="w-[150px]">
                {/* <img src={product.src} className="" alt={product.name} /> */}
            </div>
            <div className="w-[400px] flex flex-col justify-between">
                {/* <h1 className="font-semibold text-lg">{product.name}</h1> */}
                <TooltipDes description="a"></TooltipDes>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold">{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "VND",
                    }).format(product.displayPrice)}</h1>
                    <div className="flex justify-end items-center gap-4">
                        {/* <div className="hover:bg-slate-50 p-2 rounded-lg" onClick={() => handleRemoveProduct(product.id)}>Remove</div> */}
                        <QuantityInput
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneProductDetail;
