import React, { useEffect, useState } from "react";
import {
    DialogContent,
    DialogFooter,
    DialogClose
} from "@/components/ui/Dialog";
import Slider from './ImagesPackageSlider';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import selector from "@/router/packageDetails/slice/selector";
import selectorB from "./slice/selector";
import { actions } from "./slice";
import { Button } from "@/components/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { ComboBoxResponsive } from "./ComboBox";
import { toastError } from "@/components/Toast";
import { ToastAction } from "@/components/ui/Toast/toast";
import { useToast } from "@/components/ui/Toast/use-toast";
import { createQuotation } from "@/router/customerCart/usecase/createQuotation.ts";
import { useNavigate } from "react-router-dom";

interface Props {
}

const PackageDetailPopUp: React.FC<Props> = (props) => {
    const [updated, setUpdated] = useState(false);

    const packageA: any = useSelector(selector.packageA);
    const packageB: any = useSelector(selectorB.packageB);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.setPackageB(packageA));
        setUpdated(true);
    }, []);
    const { toast } = useToast();
    const navigate = useNavigate();
    const handleClick = async () => {
        console.log("packageB: ", packageB);

        if (packageB?.productDetails?.length < 4) {
            toast({
                variant: "destructive",
                title: "Fail to Request.",
                description: "Add at least 4 products!",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
        } else {
            try {
                const res = await createQuotation({
                    // expireAt: "2024-09-24T06:54:12.762Z",
                    packageId: packageB.id,
                    services: packageB.services.map((ser: any) => {
                        return {
                            serviceId: ser.id,
                            price: 0,
                        }
                    }),
                    productDetails: packageB.productDetails.map((productDetail: any) => {
                        return {
                            id: productDetail.id,
                            quantity: productDetail.quantity,
                            price: 0,
                        }
                    })
                });
                if (res === 200) {
                    toast({
                        variant: "success",
                        title: "Request Successfully.",
                        description: "A request was sent.",
                        action: <ToastAction altText="Close">Close</ToastAction>,
                    });
                    // localStorage.removeItem("cart");
                    setTimeout(() => {
                        navigate("/customer/settings/quotations");
                    }, 2000);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Fail to Request.",
                        description: "There was a problem with your request.",
                        action: (
                            <ToastAction altText="Try again">Try again</ToastAction>
                        ),
                    });
                }
            } catch (err) {
                // navigate("/login");
                toastError("Please Login first");
            }
        }
    };

    return (
        <>
            {updated &&
                <DialogContent className="sm:max-w-[1200px] sm:max-h-[700px] overflow-y-scroll">
                    <>
                        <div className="my-7 text-2xl font-semibold">
                            Package - {packageB?.name}
                        </div>
                        <div className="">
                            <div className="flex flex-row justify-between gap-10">
                                <div className="flex flex-col">
                                    <div
                                        className="w-auto h-auto flex  lg:justify-start lg:ml-4 lg:gap-2"
                                    >
                                        <div className="flex flex-col gap-2">
                                            {/* <div className="font-semibold md:text-2xl flex flex-col">
                                        <span className="text-sm font-thin">Estimated price: </span>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(packageA?.estimatedPrice)}
                                    </div> */}
                                            {/* <div className="font-semibold md:text-2xl flex flex-col">
                                        <span className="text-sm font-thin">Discount: </span>
                                        {packageA?.discount}%
                                    </div> */}
                                            <div className="h-auto pr-2 w-64">
                                                <Accordion type="single" defaultValue="item-1" collapsible>
                                                    <AccordionItem value="item-1">
                                                        <AccordionTrigger className='text-xl'>Services</AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-col gap-2 shrink">
                                                                {packageB?.services?.map((service: any) =>
                                                                    <div className="flex flex-row justify-between">
                                                                        <div className='font-semibold'>{service.name}</div>
                                                                        {/* <div>{new Intl.NumberFormat("en-US", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        }).format(service.price)}</div> */}
                                                                    </div>)}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-[300px]"
                                    >
                                        <Slider images={packageB?.packageImages?.map((item: any) => item?.imageUrl)} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-start">
                                        <ComboBoxResponsive
                                        // selectedStatus={
                                        //     selectedStatus as Status
                                        // }
                                        // setSelectedStatus={(
                                        //     value: Status | null
                                        // ) =>
                                        //     handleComboBoxChange(
                                        //         row.id,
                                        //         cell.column.id,
                                        //         value
                                        //     )
                                        // }
                                        // value={cellValue}
                                        ></ComboBoxResponsive>
                                    </div>
                                    <div className='h-[450px] w-[600px] overflow-scroll pr-5 flex flex-col gap-4 items-center pb-5'>
                                        {packageB?.productDetails?.map((productDetail: any) => (
                                            <div className="flex gap-5 items-center">
                                                <div className="w-[150px]">
                                                    <img
                                                        src={productDetail?.images[0]?.imageUrl}
                                                        className=""
                                                        alt={productDetail?.id}
                                                    />
                                                </div>
                                                <div className="w-[400px] flex flex-col justify-between">
                                                    <h1 className="font-semibold text-lg">
                                                        {productDetail?.productName}
                                                    </h1>
                                                    {/* <TooltipDes
                                                    description={productDetail?.description}
                                                ></TooltipDes> */}
                                                    <div className="flex justify-between items-center">
                                                        {/* <h1 className="font-semibold">
                                                        {new Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(productDetail?.displayPrice )}
                                                    </h1> */}
                                                        <div className="flex justify-end items-center gap-4">
                                                            <Button
                                                                className="bg-neutral-400 hover:bg-black p-2 rounded-lg"
                                                                onClick={() => { dispatch(actions.deleteProduct(productDetail?.id)); }
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                            <div className='flex gap-4 justify-center items-center border border-gray-300 rounded-full px-4 py-1'>
                                                                <button onClick={() => { dispatch(actions.decrementQuantity(productDetail?.id)) }} className="flex justify-center items-center ">
                                                                    <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>-</span>
                                                                </button>
                                                                <span
                                                                    className=" min-w-10 text-center"
                                                                >
                                                                    {productDetail?.quantity}
                                                                </span>
                                                                <button onClick={() => { dispatch(actions.incrementQuantity(productDetail?.id)) }} className="flex justify-center items-center ">
                                                                    <span className='text-2xl p-2 rounded-full hover:bg-slate-50'>+</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    <DialogFooter>
                        {packageB?.productDetails?.length >= 4
                            ?
                            <DialogClose>
                                <Button onClick={handleClick}>Request Quotation</Button>
                            </DialogClose>
                            : <div className="text-red-800 font-semibold">Add at least 4 Products!</div>}
                    </DialogFooter>
                </DialogContent>}
        </>
    );
};

export default PackageDetailPopUp;
