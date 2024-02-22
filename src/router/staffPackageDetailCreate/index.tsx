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
import { FaDeleteLeft } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { createPackage, getPackageById } from "./usecase";
import { useNavigate, useParams } from "react-router-dom";
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

interface Props {}

const StaffPackageDetailCreate: React.FC<Props> = () => {
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id: string = useSelector(selector.id);
    const name: string = useSelector(selector.name);
    // const estimatedPrice: number = useSelector(selector.estimatedPrice);
    const discount: number = useSelector(selector.discount);
    const services: ServiceProps[] = useSelector(selector.services);
    const productDetails: ProductDetailProps[] = useSelector(
        selector.productDetails
    );
    const packageImages: PackageImageProps[] = useSelector(
        selector.packageImages
    );
    const { toast } = useToast();

    const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setUploadedImages((prevImages) => [...prevImages, ...newFiles]);
        }
        const uploadFunc = async () => {
            if (uploadedImages.length === 0) {
                toast({
                    variant: "destructive",
                    title: "No images selected",
                    description: "Please select one or more images to upload.",
                });
                return;
            }
            const id = details.id;
            const formData = new FormData();
            uploadedImages.forEach((image) => {
                formData.append("images", image);
            });
            try {
                const res = await addPhoto(id, formData);
                if (res) {
                    toast({
                        variant: "success",
                        title: "Upload successful",
                        description: "Images uploaded successfully.",
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Upload failed",
                        description: "Failed to upload images.",
                    });
                }
            } catch (error) {
                console.error("Error uploading images:", error);
                toast({
                    variant: "destructive",
                    title: "Upload failed",
                    description: "An error occurred while uploading images.",
                });
            }
        };
    };

    const formSchema = z.object({
        name: z.string(),
        discount: z.coerce.number().lte(100).nonnegative(),
        pictures: z.any(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            discount: discount,
            pictures: undefined,
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        // values.pictures.map((picture: string) =>
        //   formData.append("Images", picture)
        // )
        // formData.append("Images", values.pictures[0]);

        formData.append("Name", values.name);
        formData.append("Discount", values.discount.toString());

        services.map((item) => {
            return formData.append("ServiceIds", item.id);
        });
        productDetails.map((item, index) => {
            formData.append("ProductDetailIds", item.id);
        });

        const res = await createPackage(formData);
        if (res === 200) {
            toast({
                variant: "success",
                title: "Update Successfully.",
                description: "A package was updated.",
                action: <ToastAction altText="Close">Close</ToastAction>,
            });
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
                                    Update {name}
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
                                <FormField
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
                                />
                                {/* Package Discount Input End*/}
                                {/* Package Name Input Start */}
                                <FormField
                                    control={form.control}
                                    name="pictures"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="border-yellowCustom text-xl text-black mb-2">
                                                Package Images
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="picture"
                                                    multiple
                                                    type="file"
                                                    onChange={handleAddImage}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
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
                                                        {services.map(
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
                        <div className="flex justify-center items-center">
                            <div className="flex flex-col gap-8 justify-center items-center px-2 w-[80%] rounded-md">
                                <div className="flex gap-10">
                                    <div className="text-2xl font-thin pb-4 border-b-2 border-slate-400">
                                        Products In This Package
                                    </div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button className="my-auto bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2">
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
                                    {productDetails.map(
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
                                                            <CardTitle>
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
