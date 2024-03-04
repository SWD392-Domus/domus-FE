import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from "../Tooltip/index.tsx";
import { getProductDetailById } from "../../usecase";
import { actions } from "../../slice/index.ts";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/Button/Button.tsx";

interface Props {
    productIdQuan: any;
    updatedS: number;
    setUpdatedS: any;
}

const OneProductDetail: React.FC<Props> = (props) => {
    const [updated, setUpdated] = useState(false);
    const [product, setProduct] = useState<any>({});
    const dispatch = useDispatch();
    async function getProductDetailByIdService(productId: string) {
        const res = await getProductDetailById(productId);
        setProduct(res);
        setUpdated(true);
    }

    useEffect(() => {
        getProductDetailByIdService(props.productIdQuan.id);
    }, [updated, props.updatedS, props.productIdQuan.id]);

    function handleRemoveProduct(productId: string) {
        setUpdated(false);
        props.setUpdatedS(props.updatedS + 1);
        dispatch(actions.deleteProduct(productId));
    }

    return (
        <>
            {updated && (
                <div className="flex gap-5 items-center">
                    <div className="w-[150px]">
                        <img
                            src={product?.images[0]?.imageUrl}
                            className=""
                            alt={product?.id}
                        />
                    </div>
                    <div className="w-[400px] flex flex-col justify-between">
                        <h1 className="font-semibold text-lg">
                            {product?.productName}
                        </h1>
                        <TooltipDes
                            description={product?.description}
                        ></TooltipDes>
                        <div className="flex justify-between items-center">
                            {/* <h1 className="font-semibold">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(product?.displayPrice )}
                            </h1> */}
                            <div className="flex justify-end items-center gap-4">
                                <Button
                                    className="bg-neutral-400 hover:bg-black p-2 rounded-lg"
                                    onClick={() =>
                                        handleRemoveProduct(
                                            props?.productIdQuan?.id
                                        )
                                    }
                                >
                                    Remove
                                </Button>
                                <QuantityInput
                                    productIdQuan={props?.productIdQuan}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OneProductDetail;
