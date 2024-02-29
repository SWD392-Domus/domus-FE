import React, { useState, useEffect } from "react";
import QuantityInput from "./QuantityInput.tsx";
import { TooltipDes } from '../Tooltip/index.tsx';
// import { getProductDetailById } from "../../usecase/index.ts";
// import { actions } from "../../slice/index.ts";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/Button/Button.tsx";
import { FaPencil } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/Dialog";
import PackageDetailPopUp from "./PackageDetailPopUp/index.tsx";

interface Props {
    packageA: any;
    // updatedS: number;
    // setUpdatedS: any;
}

const PackagePopUpTrigger: React.FC<Props> = (props) => {
    // const [updated, setUpdated] = useState(false);
    // const [product, setProduct] = useState<any>({});
    // const dispatch = useDispatch();
    // async function getProductDetailByIdService(productId: string) {
    //     const res = await getProductDetailById(
    //         productId
    //     );
    //     setProduct(res);
    //     setUpdated(true);
    // }

    // useEffect(() => {
    //     getProductDetailByIdService(props.productIdQuan.id);
    // }, [updated, props.updatedS, props.productIdQuan.id]);

    // function handleRemoveProduct(productId: string) {
    //     setUpdated(false);
    //     props.setUpdatedS(props.updatedS + 1);
    //     dispatch(actions.deleteProduct(productId))
    // }

    return (
        <>
            {/* {updated && */}
            <div className="font-semibold text-3xl py-4">Package</div>
            <div className="flex gap-5 items-center">
                <div className="w-[150px]">
                    <img src={props?.packageA?.packageImages[0]?.imageUrl} className="" alt="Package Image" />
                </div>
                <div className="w-[400px] flex flex-col justify-between">
                    <h1 className="font-semibold text-lg">{props?.packageA?.name}</h1>
                    {/* <TooltipDes description={props?.packageA?.description}></TooltipDes> */}
                    <h1 className="font-semibold mt-2">Discount: <span className="text-red-600">{props?.packageA?.discount}%</span></h1>

                    <div className="flex justify-between items-center">
                        <div className="font-semibold flex gap-1">
                            <h1>Estimated Price:</h1>
                            <span className="text-red-600">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(props.packageA.estimatedPrice)}
                            </span>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <div
                                    className="w-10 h-10 bg-yellowCustom flex justify-center items-center 
          rounded-full cursor-pointer hover:opacity-80"
                                >
                                    <FaPencil className="text-black" />
                                </div>
                            </DialogTrigger>
                            <PackageDetailPopUp></PackageDetailPopUp>
                        </Dialog>
                    </div>
                </div>
            </div>
            {/* } */}
        </>
    );
};

export default PackagePopUpTrigger;
