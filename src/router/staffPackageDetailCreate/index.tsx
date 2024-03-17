import { Button } from "@/components/ui/Button/Button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/Dialog";
import Slider from "./components/ImagesPackageSlider";
import { ProductDetailProps, PackageImageProps, ServiceProps } from "./types";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion/Accordion";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
// import { FaDeleteLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { createPackage, } from "./usecase";
import { useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "./slice/selector";
import { actions } from "./slice";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/components/ui/Toast/use-toast";
import { ToastAction } from "@/components/ui/Toast/toast";
import { Input } from "@/components/ui/Input";
import { PencilIcon } from "lucide-react";
import ProductsList from "./components/ProductsList";
import ServiceList from "./components/ServiceList";
import { Label } from "@/components/ui/Label";
// import { Label } from "@/components/ui/Label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props { }

const StaffPackageDetailCreate: React.FC<Props> = () => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const id: string = useSelector(selector.id);
    const name: string = useSelector(selector.name);
    // const description: string = useSelector(selector.description);
    const [desValue, setDesValue] = useState("");
    // const estimatedPrice: number = useSelector(selector.estimatedPrice);
    // const discount: number = useSelector(selector.discount);
    const services: ServiceProps[] = useSelector(selector.services);
    const productDetails: ProductDetailProps[] = useSelector(
        selector.productDetails
    );
    const packageImagesRedux: PackageImageProps[] = useSelector(
        selector.packageImages
    );
    const [packageImages, setPackageImages] = useState<PackageImageProps[]>([]);
    useEffect(() => {
        if (packageImagesRedux) {
            setPackageImages(packageImagesRedux);
        }
    }, [packageImagesRedux]);

    const { toast } = useToast();

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setUploadedImages(newFiles);
            const newImages = newFiles.map((file) => {
                return {
                    imageUrl: URL.createObjectURL(file),
                    id: "",
                    width: 0,
                    height: 0,
                };
            });
            //   dispatch(actions.updatePackageImages(newImages));
            setPackageImages(newImages);
        }
    };

    const formSchema = z.object({
        name: z.string().nonempty({ message: "Name is required" }),
        // discount: z
        //     .number({
        //         required_error: "Discount is required",
        //         invalid_type_error:
        //             "Discount must be a number between 0 and 100",
        //     })
        //     .lte(100)
        //     .nonnegative(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            // discount: discount,
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        // values.pictures.map((picture: string) =>
        //   formData.append("Images", picture)
        // )
        // formData.append("Images", values.pictures[0]);

        formData.append("Name", values.name);
        formData.append("Discount", "0");
        // formData.append("Discount", values.discount.toString());
        formData.append("Description", desValue);

        services.map((item) => {
            return formData.append("ServiceIds", item.id);
        });
        productDetails.map((item) => {
            for (let i = 0; i < item.quantity; i++) {
                formData.append("ProductDetailIds", item.id);
            }
        });
        uploadedImages.forEach((image) => {
            formData.append("Images", image);
        });

        const res = await createPackage(formData);
        if (res === 200) {
            toast({
                variant: "success",
                title: "Update Successfully.",
                description: "A package was updated.",
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
            dispatch(actions.resetPackage());
            navigate(`/staff/packages`);
        } else {
            toast({
                variant: "destructive",
                title: "Fail to Update.",
                description: "There was a problem with your request.",
                action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                ),
            });
            dispatch(actions.resetPackage());
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="my-7 text-2xl font-semibold">
                    Create new Package
                </div>
                {true && (
                    <div className="">
                        <div className="flex flex-row justify-between gap-10 min-h-[550px]">
                            <div className="flex flex-col">
                                <div
                                    className="w-auto h-auto flex justify-center items-center
      lg:justify-start lg:ml-4 lg:gap-2"
                                >
                                    <div className="w-[300px] shrink md:w-[600px] xl:w-[700px] mb-10">
                                        <Slider
                                            images={packageImages.map(
                                                (item: PackageImageProps) =>
                                                    item?.imageUrl
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[30%] flex flex-col gap-2 pl-4">
                                <div className="mb-7 font-semibold text-black text-xl md:text-4xl">
                                    Create {name}
                                </div>
                                {/* Package Name Input Start */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="border-yellowCustom text-xl text-black mb-2">
                                                Package Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={name}
                                                    {...field}
                                                    className="mb-4"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Package Name Input End*/}
                                {/* Package Discount Input Start */}
                                {/* <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="border-yellowCustom text-xl text-black mb-2">
                                                Discount
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    // placeholder={discount}
                                                    {...field}
                                                    className="mb-4"
                                                    type="number"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                                {/* Package Discount Input End*/}
                                {/* Package Name Input Start */}

                                <Label className="border-yellowCustom text-xl text-black mb-2">
                                    Package Images
                                </Label>
                                <Input
                                    id="picture"
                                    multiple
                                    type="file"
                                    onChange={handleAddImage}
                                />

                                {/* Package Name Input End*/}
                                <div className="h-auto flex justify-between gap-10">
                                    <div className="w-[70%]">
                                        <Accordion
                                            type="single"
                                            collapsible
                                            defaultValue="item-1"
                                        >
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    Services
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-col gap-2 shrink">
                                                        {Array.isArray(services) && services.map(
                                                            (
                                                                service: ServiceProps
                                                            ) => (
                                                                <div className="flex flex-row justify-between">
                                                                    <div className="font-semibold">
                                                                        {
                                                                            service.name
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        {new Intl.NumberFormat(
                                                                            "en-US",
                                                                            {
                                                                                style: "currency",
                                                                                currency:
                                                                                    "VND",
                                                                            }
                                                                        ).format(
                                                                            service.price
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="mt-4 bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2">
                                                <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>
                                                Services
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[700px]">
                                            <ServiceList data={services} />
                                            <DialogFooter></DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="mt-2">
                                    <Button
                                        variant={"yellowCustom"}
                                        className="cursor-pointer w-40"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mb-10 gap-4">
                            <div className="font-semibold text-xl">Description</div>
                            <div className='w-full'>
                                <ReactQuill className="" theme="snow" value={desValue} placeholder="Description..."
                                    onChange={setDesValue}
                                ></ReactQuill>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col gap-8 justify-center items-center px-2 w-[80%] rounded-md">
                                <div className="flex gap-10">
                                    <div className="text-2xl font-thin pb-4 border-b-2 border-slate-400">
                                        Products In This Package
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                className="my-auto bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2"
                                                type="button"
                                            >
                                                <PencilIcon className="h-3.5 pr-2 my-auto"></PencilIcon>
                                                Products
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[700px]">
                                            <DialogHeader>
                                                {name}'s Collection Products
                                            </DialogHeader>
                                            <ProductsList
                                                data={productDetails}
                                            />
                                            <DialogFooter>
                                                {/* <Button onClick={onCancle} className="bg-zinc-500" >Cancle</Button>
                        <Button onClick={onDelete} className="bg-red-600" >Delete</Button> */}
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 lg:grid-cols-4">
                                    {Array.isArray(productDetails) && productDetails.map(
                                        (product: ProductDetailProps) => {
                                            const imageUrl =
                                                product &&
                                                product.images &&
                                                product.images[0]?.imageUrl;
                                            return (
                                                <>
                                                    <Card className="w-[auto] h-[auto]">
                                                        <CardHeader className="w-full">
                                                            <div className="flex justify-center h-[200px]">
                                                                <img
                                                                    src={
                                                                        imageUrl
                                                                    }
                                                                    className="w-[288px] object-contain"
                                                                // loading="lazy"
                                                                />
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="overflow-hidden">
                                                            <CardTitle className="">
                                                                <h2 className="truncate">
                                                                    {
                                                                        product.productName
                                                                    }
                                                                </h2>
                                                            </CardTitle>
                                                            {/* <CardDescription className="pb-2 pt-1 shrink">
                            <p className="truncate">
                              {productDescription ? (
                                productDescription
                              ) : (
                                <p className="truncate">
                                  Materials
                                </p>
                              )}
                            </p>
                          </CardDescription> */}
                                                            {/* <CardTitle>
                                                                <p className="text-2xl truncate">
                                                                    {new Intl.NumberFormat(
                                                                        "en-US",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                "VND",
                                                                        }
                                                                    ).format(
                                                                        product.displayPrice *
                                                                        1000
                                                                    )}
                                                                </p>
                                                            </CardTitle> */}
                                                            <CardTitle>
                                                                <p className="truncate mt-2">
                                                                    Quantity: <span className='text-red-600'>{product.quantity}</span>
                                                                </p>
                                                            </CardTitle>
                                                        </CardContent>
                                                        <CardFooter className=""></CardFooter>
                                                    </Card>
                                                </>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default StaffPackageDetailCreate;
