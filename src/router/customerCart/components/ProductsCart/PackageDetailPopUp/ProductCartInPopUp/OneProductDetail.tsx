import React, { useState, useEffect } from "react";
// import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from '@/router/customerCart/components/Tooltip/index.tsx';
import { getProductDetailById } from "@/router/customerCart/usecase";
// import { actions } from "../../slice/index.ts";
// import { useDispatch } from "react-redux";
// import { Button } from "@/components/ui/Button/Button.tsx";
import { RemoveButton } from "./RemoveButton";

interface Props {
    productIdQuan: any;
    updatedS: number;
    setUpdatedS: any;
}

const OneProductDetail: React.FC<Props> = (props) => {
    const [updated, setUpdated] = useState(false);
    const [product, setProduct] = useState<any>({});
    // const dispatch = useDispatch();
    async function getProductDetailByIdService(productId: string) {
        const res = await getProductDetailById(
            productId
        );
        setProduct(res);
        setUpdated(true);
    }

    useEffect(() => {
        getProductDetailByIdService(props.productIdQuan.id);
    }, [updated, props.updatedS, props.productIdQuan.id]);

    return (
        <>
            {updated &&
                <div className="flex gap-5 items-center">
                    <div className="w-[150px]">
                        <img src={product?.images[0]?.imageUrl} className="" alt={product?.id} />
                    </div>
                    <div className="w-[400px] flex flex-col justify-between">
                        <h1 className="font-semibold text-lg">{product?.productName}</h1>
                        <TooltipDes description={product?.description}></TooltipDes>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="font-semibold">{new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(product?.displayPrice * 1000)}</h1>
                                <h1 className="font-semibold">Quantity: <span className="text-red-600">0{props?.productIdQuan?.quantity}</span></h1>
                            </div>
                            <div className="flex justify-end items-center gap-4">
                                <RemoveButton></RemoveButton>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default OneProductDetail;
