import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";

import { Card } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { Textarea } from "@/components/ui/Textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    EnvelopeClosedIcon,
    HomeIcon,
    MobileIcon,
    PaperPlaneIcon,
    PlusIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DataTable } from "./components/ProductTable";
import { column } from "./components/ProductTable/column";
import { serviceColums } from "./components/ServiceTable/column";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/Dialog";
interface Props {
    // define your props here
}

import UserList from "./components/UserList";
import { useNavigate, useParams } from "react-router-dom";
import { getQuotationById } from "./usecase/getQuotationById";
import { ServiceProps } from "../staffQuotationDetail/types";
import { QuotationDetailInfo } from "../staffQuotationDetail/slice";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { createContract } from "./usecase/createContract";
import { toast } from "@/components/ui/Toast/use-toast";
import Loading from "@/components/PublicComponents/Loading";

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

const StaffContractCreate: React.FC<Props> = () => {
    // const signatureRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isUpdated, SetUpdated] = useState(false);
    const [products, setProducts] = useState<QuotationDetailInfo[]>([]);
    const [services, setServices] = useState<ServiceProps[]>([]);

    const [selectedUser, setSelectedUser] = useState<User>();
    const [contracter, setContracter] = useState<User>();
    const { quotationId, versionId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getQuotationById(
                quotationId as string,
                versionId as string
            );

            setProducts(res.data.data.products);
            setServices(res.data.data.services);
            setSelectedUser(res.data.data.customer);
            setContracter(res.data.data.staff);

            SetUpdated(true);
        };
        fetchData();
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
    let status = "create";
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = {
            name: values.contractName,
            description: values.description,
            startDate: new Date().toISOString(),
            attachments: "",
            clientId: selectedUser?.id,
            contractorId: contracter?.id,
            quotationRevisionId: versionId,
            signature: "",
        };
        try {
            const res = await createContract(data);
            if (res.data.isSuccess) {
                toast({
                    variant: "success",
                    title: "Create Contract Successfully",
                    description: "Please try again later.",
                });
                navigate("/staff/contracts", { replace: true });
            } else {
                toast({
                    variant: "destructive",
                    title: res.data.messages[0],
                    description: "Please try again later.",
                });
            }
        } catch {
            toast({
                variant: "destructive",
                title: "Action Unsuccessfully.",
                description: "Something was wrong please try again later.",
            });
        }
    };

    return (
        <>
            {isUpdated && (
                <Card className="w-full flex flex-col justify-center items-center border mt-4">
                    <h1 className="text-4xl">Create Contract</h1>
                    <div className="mt-4 w-full justify-end flex">
                        <Tabs defaultValue="create" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger
                                    value="create"
                                    disabled={status != "create"}
                                >
                                    Create
                                </TabsTrigger>
                                <TabsTrigger value="Sent" disabled>
                                    Sent
                                </TabsTrigger>
                                <TabsTrigger value="Signned" disabled>
                                    Signned
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
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
                                    <Label className="text-md">
                                        Contractor
                                    </Label>
                                </div>
                            </div>
                            <div className="flex w-full justify-between mt-0">
                                <UserList
                                    open={open}
                                    setOpen={setOpen}
                                    setSelectedUser={setSelectedUser}
                                    selectedUser={selectedUser as User}
                                />
                                <Card
                                    className="w-[48%] border h-[200px] flex justify-center items-center hover:bg-slate-100 hover:text-black cursor-pointer"
                                    onClick={() => setOpen(true)}
                                >
                                    {!selectedUser ? (
                                        <PlusIcon width={100} height={100} />
                                    ) : (
                                        <div className="w-full p-4">
                                            {" "}
                                            <div className="flex items-center">
                                                <Avatar className="mr-4">
                                                    <AvatarImage
                                                        src={
                                                            selectedUser.profileImage
                                                        }
                                                    />
                                                </Avatar>
                                                <Label className="text-md">
                                                    {selectedUser.fullName ||
                                                        "N/A"}
                                                </Label>
                                            </div>
                                            <div className="ml-4 mt-4">
                                                <div className="text-md flex items-center mb-2">
                                                    <EnvelopeClosedIcon
                                                        width={20}
                                                        height={20}
                                                        className="mr-2"
                                                    />{" "}
                                                    {selectedUser.email}
                                                </div>
                                                <div className="text-md flex items-center mb-2">
                                                    <MobileIcon
                                                        width={20}
                                                        height={20}
                                                        className="mr-2"
                                                    />
                                                    {selectedUser.phoneNumber}
                                                </div>
                                                <div className="text-md flex items-center">
                                                    <HomeIcon
                                                        width={20}
                                                        height={20}
                                                        className="mr-2"
                                                    />
                                                    {selectedUser.address}
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
                                <div className="text-md mb-2 font-medium">
                                    Work
                                </div>
                                <div className="text-sm mb-2 font-medium">
                                    Product List
                                </div>
                                <DataTable columns={column} data={products} />
                                <div className="text-sm mb-2 font-medium mt-2">
                                    Services List
                                </div>
                                <DataTable
                                    columns={serviceColums}
                                    data={services}
                                />
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
                                            Get started with dozens of web
                                            components and interactive elements.
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
                                            Get started with dozens of web
                                            components and interactive elements.
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
                                            Get started with dozens of web
                                            components and interactive elements.
                                        </p>
                                    </div>
                                </li>
                            </ol>
                            <div className="w-full flex justify-between  items-center">
                                <div className="w-full">
                                    <h1 className="text-xl">Summary</h1>
                                    <div className="w-full h-[1px] bg-slate-400"></div>
                                    <div className="flex justify-between">
                                        <h1 className="text-md">
                                            Product total
                                        </h1>
                                        <h1 className="text-md">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                calculateTotalPrice(products)
                                            )}
                                        </h1>
                                    </div>

                                    <div className="flex justify-between ">
                                        <h1 className="text-md">
                                            Service total
                                        </h1>
                                        <h1 className="text-md">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                calculateTotalPrice(services)
                                            )}
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
                                                calculateTotalPrice(products) +
                                                calculateTotalPrice(
                                                    services
                                                )
                                            )}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end"></div>
                            {/* <div className="flex flex-col items-center">
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                                className: "border border-gray-400 mt-4",
                            }}
                        />
                        <div className="flex mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={clearSignature}
                            >
                                Clear
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={saveSignature}
                            >
                                Save
                            </button>
                        </div>
                    </div> */}
                            <div className="flex justify-center">
                                {/* <Dialog>
                                    <DialogTrigger asChild> */}
                                <Button className="flex" type="submit">
                                    <PaperPlaneIcon className="mr-2" />
                                    Send
                                </Button>
                                {/* </DialogTrigger>
                                    <DialogContent className="sm:max-w-[800px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Contract Creation
                                            </DialogTitle>
                                            <DialogDescription>
                                                <h1 className="mt-4 mb-4 text-black">
                                                    Are you sure you want to
                                                    create this
                                                    <strong> contract ?</strong>
                                                </h1>
                                                <h1 className="mt-4 mb-4 text-black">
                                                    This will sent a contract to
                                                    the client through the
                                                    client through this
                                                    <strong>
                                                        {" "}
                                                        app and Email.
                                                    </strong>
                                                    Please contact the client to
                                                    fullfill the contract soon .
                                                </h1>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button className="bg-zinc-500">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    // onSubmit={onSubmit}
                                                    type="submit"
                                                    className="bg-yellowCustom text-black hover:text-white"
                                                >
                                                    Confirm
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog> */}
                            </div>
                        </form>
                    </Form>
                </Card>
            )}
            {!isUpdated && <Loading variant="dark" />}
        </>
    );
};

export default StaffContractCreate;
