import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { Textarea } from "@/components/ui/Textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    EnvelopeClosedIcon,
    HomeIcon,
    MobileIcon,
    PlusIcon,
} from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { DataTable } from "./components/ProductTable";
import { column } from "./components/ProductTable/column";
// import { fakeData, serviceFakeData } from "./constants";
import { serviceColums } from "./components/ServiceTable/column";

interface Props {
    // define your props here
}

import { useParams } from "react-router-dom";
// import { getQuotationById } from "./usecase/getQuotationById";
import {
    // ProductDetailProps,
    ServiceProps,
} from "../staffQuotationDetail/types";
import { QuotationDetailInfo } from "../staffQuotationDetail/slice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getContractDetail } from "./usecase/getContractDetail";
import { toast } from "@/components/ui/Toast/use-toast";
import { Button } from "@/components/ui/Button/Button";
import { contractApi } from "@/utils/api/contractApi";

type User = {
    id: string;
    email: string;
    userName: string;
    fullName: string | null;
    gender: string | null;
    address: string | null;
    phoneNumber: string | null;
    profileImage: string;
};

const StaffContractDetail: React.FC<Props> = () => {
    // const signatureRef = useRef(null);
    const [products, setProducts] = useState<QuotationDetailInfo[]>([]);
    const [services, setServices] = useState<ServiceProps[]>([]);

    const [selectedUser, setSelectedUser] = useState<User>();
    // const [selectedContractor, setSelectedContractor] = useState<User>();
    const [signature, setSignature] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [status, setStatus] = useState("");
    const { contractId } = useParams();
    const handleCancel = async () => {
        const token = `Bearer ${localStorage.getItem("Token")}`;
        const res = await contractApi.cancelContract(
            contractId as string,
            token
        );
        if (res.status == 200) {
            if (res.data.isSuccess) {
                toast({
                    variant: "success",
                    title: "Cancel Contract successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: res.data.messages[0].content,
                    description: "There was a problem with your request.",
                });
            }
        } else {
            toast({
                variant: "destructive",
                title: "Cancel contract unsuccessfully",
                description: "There was a problem with your request.",
            });
        }
    };

    useEffect(() => {
        // const fetchData = async () => {
        //     const res = await getQuotationById(quotationId as string);
        //     setProducts(res.data.data.products);
        //     setServices(res.data.data.services);
        //     setSelectedUser(res.data.data.customer);
        //     setTotalPrice(res.data.data.totalPrice);
        // };
        // fetchData();
        const fetchContract = async () => {
            const res = await getContractDetail(contractId as string);

            if (res.data.isSuccess) {
                const {
                    name,
                    description,
                    client,
                    // contractor,
                    quotationRevision,
                    status,
                    serviceQuotations,
                    signature,
                    fullName,
                } = res.data.data;
                form.setValue("contractName", name);
                form.setValue("description", description);
                // setSelectedContractor(contractor);
                setSelectedUser(client);
                setProducts(quotationRevision.productDetailQuotationRevisions);
                setServices(serviceQuotations);
                setStatus(`${status}`);

                setSignature(signature);
                setFullName(fullName);
            } else {
                toast({
                    variant: "destructive",
                    title: res.data.messages[0].content,
                    description: "There was a problem with your request.",
                });
            }
        };
        fetchContract();
    }, []);

    const formSchema = z.object({
        contractName: z.string().nonempty({
            message: "Contract Name is Required",
        }),
        description: z.string().nonempty({
            message: "Description is Required",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contractName: "",
            description: "",
        },
    });
    function calculateTotalPrice(items: any) {
        let totalPrice = 0;

        for (let i = 0; i < items.length; i++) {
            if (items[i].quantity) {
                totalPrice += items[i].price * items[i].quantity;
            } else {
                totalPrice += items[i].price;
            }
        }

        return totalPrice;
    }

    const onSubmit = () => {};
    return (
        <Card className="w-full flex flex-col justify-center items-center border mt-4">
            <h1 className="text-4xl font-medium">Contract Detail</h1>
            <div className="mt-4 w-full justify-end flex">
                {status && (
                    <Tabs defaultValue={status} className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value={"0"} disabled={status != "0"}>
                                Sent
                            </TabsTrigger>
                            <TabsTrigger value={"1"} disabled={status != "1"}>
                                Signed
                            </TabsTrigger>
                            <TabsTrigger value={"2"} disabled={status != "2"}>
                                Canceled
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full p-20"
                >
                    <FormField
                        control={form.control}
                        name="contractName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="border-yellowCustom text-back mb-2 text-md">
                                    Contract Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name..."
                                        {...field}
                                        className="text-black mb-4"
                                        readOnly
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="border-yellowCustom text-back mb-2 text-md">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description..."
                                        {...field}
                                        className="text-black mb-4"
                                        readOnly
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex w-full justify-between">
                        <div className="w-[48%] text-md">
                            <Label className="text-md">Client</Label>
                        </div>
                        <div className="w-[48%]">
                            <Label className="text-md">Contractor</Label>
                        </div>
                    </div>
                    <div className="flex w-full justify-between mt-0">
                        <Card className="w-[48%] border h-[200px] flex justify-center items-center hover:bg-slate-100 hover:text-black cursor-pointer">
                            {!selectedUser ? (
                                <PlusIcon width={100} height={100} />
                            ) : (
                                <div className="w-full p-4">
                                    {" "}
                                    <div className="flex items-center">
                                        <Avatar className="mr-4">
                                            <AvatarImage
                                                src={selectedUser.profileImage}
                                            />
                                        </Avatar>
                                        <Label className="text-md">
                                            {selectedUser.fullName || "N/A"}
                                        </Label>
                                    </div>
                                    <div className="ml-4 mt-4">
                                        <div className="text-md flex items-center mb-2">
                                            <EnvelopeClosedIcon
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />{" "}
                                            {selectedUser.email || "N/A"}
                                        </div>
                                        <div className="text-md flex items-center mb-2">
                                            <MobileIcon
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />
                                            {selectedUser.phoneNumber || "N/A"}
                                        </div>
                                        <div className="text-md flex items-center">
                                            <HomeIcon
                                                width={20}
                                                height={20}
                                                className="mr-2"
                                            />
                                            {selectedUser.address || "N/A"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                        <Card className="w-[48%] border h-[200px] p-4">
                            <div className="flex items-center">
                                <Avatar className="mr-4">
                                    <AvatarImage src="https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </Avatar>
                                <Label className="text-md">
                                    Domus Interior Construction
                                </Label>
                            </div>
                            <div className="ml-4 mt-4">
                                <div className="text-md flex items-center mb-2">
                                    <EnvelopeClosedIcon
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />{" "}
                                    domus@gmail.com
                                </div>
                                <div className="text-md flex items-center mb-2">
                                    <MobileIcon
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />
                                    0838631706
                                </div>
                                <div className="text-md flex items-center">
                                    <HomeIcon
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />
                                    20 Tran Phu Street, District 1
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <div className="text-md mb-2 font-medium">Work</div>
                        <div className="text-sm mb-2 font-medium">
                            Product List
                        </div>
                        <DataTable columns={column} data={products} />
                        <div className="text-sm mb-2 font-medium mt-2">
                            Services List
                        </div>
                        <DataTable columns={serviceColums} data={services} />
                    </div>

                    <ol className="items-center sm:flex">
                        <li className="relative mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                    <svg
                                        className="w-2.5 h-2.5 text-black dark:text-blue-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Gathering Products
                                </h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                    Released on December 2, 2021
                                </time> */}
                                <p className="text-sm  font-normal text-gray-500 dark:text-gray-400">
                                    Get started with dozens of web components
                                    and interactive elements.
                                </p>
                            </div>
                        </li>
                        <li className="relative mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                    <svg
                                        className="w-2.5 h-2.5 text-black dark:text-blue-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Start Construction
                                </h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                    Released on December 23, 2021
                                </time> */}
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Get started with dozens of web components
                                    and interactive elements.
                                </p>
                            </div>
                        </li>
                        <li className="relative mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                    <svg
                                        className="w-2.5 h-2.5 text-black dark:text-blue-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Finish Construction
                                </h3>
                                {/* <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                    Released on January 5, 2022
                                </time> */}
                                <p className="text-sm  font-normal text-gray-500 dark:text-gray-400">
                                    Get started with dozens of web components
                                    and interactive elements.
                                </p>
                            </div>
                        </li>
                    </ol>
                    <div className="w-full flex justify-between  items-center">
                        <div className="w-full">
                            <h1 className="text-xl">Summary</h1>
                            <div className="w-full h-[1px] bg-slate-400"></div>
                            <div className="flex justify-between">
                                <h1 className="text-md">Product total</h1>
                                <h1 className="text-md">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(calculateTotalPrice(products))}
                                </h1>
                            </div>

                            <div className="flex justify-between ">
                                <h1 className="text-md">Service total</h1>
                                <h1 className="text-md">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(calculateTotalPrice(services))}
                                </h1>
                            </div>
                            <div className="w-full h-[1px] bg-slate-400"></div>
                            <div className="flex justify-between ">
                                <h1 className="text-xl">Total</h1>
                                <h1 className="text-xl">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(
                                        calculateTotalPrice(services) +
                                            calculateTotalPrice(products)
                                    )}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-variant text-black h-9 border-2 border-zinc-500 bg-zinc-50 rounded hover:text-white pl-2">
                                    Cancel
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Cancel Confirmation?
                                    </DialogTitle>
                                    <DialogDescription>
                                        Are you really sure that you want to
                                        cancel this contract? This action cannot
                                        be reverted!
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button className="bg-zinc-500">
                                        Exit
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        className="bg-red-600"
                                    >
                                        Cancel
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl">Signature</h1>
                            {signature && (
                                <>
                                    {" "}
                                    <img
                                        src={signature}
                                        alt="signature"
                                        className="w-[60%]"
                                    />
                                    <h1 className="font-dancingScirpt font-medium text-2xl">
                                        {fullName}
                                    </h1>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </Form>
        </Card>
    );
};

export default StaffContractDetail;
