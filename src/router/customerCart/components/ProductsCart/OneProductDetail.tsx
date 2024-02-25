import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from '../Tooltip/index.tsx';
import { getProductDetailById } from "../../usecase";
import { actions } from "../../slice/index.ts";
import { useDispatch } from "react-redux";

interface Props {
    productIdQuan: any;
}

const OneProductDetail: React.FC<Props> = (props) => {
    const [updated, setUpdated] = useState(false);
    const [product, setProduct] = useState<any>({});
    const dispatch = useDispatch();
    async function getProductDetailByIdService(productId: string) {
        const res = await getProductDetailById(
            productId
        );
        setProduct(res);
        setUpdated(true);
    }

    useEffect(() => {
        getProductDetailByIdService(props.productIdQuan.id);
    }, []);

    function handleRemoveProduct(productId: string) {
        dispatch(actions.deleteProduct(productId))
    }

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
                            <h1 className="font-semibold">{new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                            }).format(product?.displayPrice * 1000)}</h1>
                            <div className="flex justify-end items-center gap-4">
                                <div className="hover:bg-slate-50 p-2 rounded-lg" onClick={() => handleRemoveProduct(product?.id)}>Remove</div>
                                <QuantityInput quan={props.productIdQuan.quantity} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default OneProductDetail;
