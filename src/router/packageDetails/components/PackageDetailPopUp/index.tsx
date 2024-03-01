import React from "react";
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
import Slider from './ImagesPackageSlider';
// import { ProductDetailProps, PackageImageProps, ServiceProps } from './types';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
    Card,
    CardContent,
    // CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
// import { FaCartArrowDown } from "react-icons/fa6";
import selector from "@/router/packageDetails/slice/selector";
import { useDispatch, useSelector } from "react-redux";
// import ProductCartInPopUp from "./ProductCartInPopUp";

interface Props {
    // packageA: any;
    // updatedS: number;
    // setUpdatedS: any;
}

const PackageDetailPopUp: React.FC<Props> = (props) => {
    const name: any = useSelector(selector.name);
    const services: any = useSelector(selector.services);
    const packageImages: any = useSelector(selector.packageImages);
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
        <DialogContent className="sm:max-w-[1200px] sm:max-h-[700px] overflow-y-scroll">
            {/* <DialogHeader>
                <DialogTitle>Delete?</DialogTitle>
                <DialogDescription>
                    Are you really sure that you want to Delete?
                    This action cannot be reverted!
                </DialogDescription>
            </DialogHeader> */}
            <>
                <div className="my-7 text-2xl font-semibold">
                    Package - {name}
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
                                                        {services?.map((service: any) =>
                                                            <div className="flex flex-row justify-between">
                                                                <div className='font-semibold'>{service.name}</div>
                                                                <div>{new Intl.NumberFormat("en-US", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }).format(service.price)}</div>
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
                                <Slider images={packageImages?.map((item: any) => item?.imageUrl)} />
                            </div>
                        </div>
                        {/* <ProductCartInPopUp></ProductCartInPopUp> */}
                    </div>
                </div>
            </>
            <DialogFooter>
                <DialogClose>
                    {/* <ConfirmDeleteButton id={props.id}></ConfirmDeleteButton> */}
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default PackageDetailPopUp;
