import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Card } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CalendarIcon,
    EnvelopeClosedIcon,
    HomeIcon,
    MobileIcon,
    PlusIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { DataTable } from "./components/ProductTable";
import { column } from "./components/ProductTable/column";
import { fakeData, serviceFakeData } from "./constants";
import { serviceColums } from "./components/ServiceTable/column";
import SignatureCanvas from "react-signature-canvas";
interface Props {
    // define your props here
}
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";

const StaffContractCreate: React.FC<Props> = (props) => {
    const signatureRef = useRef(null);

    const clearSignature = () => {
        signatureRef.current.clear();
    };

    const saveSignature = () => {
        const signatureData = signatureRef.current.toDataURL();
        // You can save or process the signature data here
        console.log(signatureData);
    };
    const formSchema = z.object({
        contractName: z.string().nonempty({
            message: "Contract Name is Required",
        }),
        description: z.string().nonempty({
            message: "Description is Required",
        }),
        startDate: z.date({
            required_error: "Expired date  is required.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contractName: "",
            description: "",
            startDate: new Date(),
        },
    });
    const onSubmit = () => {};
    return (
        <Card className="w-full flex flex-col justify-center items-center border mt-4">
            <h1 className="text-4xl">Create Contract</h1>
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
                                        placeholder="shadcn"
                                        {...field}
                                        className="text-white mb-4"
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
                                        placeholder="shadcn"
                                        {...field}
                                        className="text-white mb-4"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-md">
                                    Start Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card className="w-[48%] border h-[200px] flex justify-center items-center hover:bg-slate-100 hover:text-black cursor-pointer">
                                    <PlusIcon width={100} height={100} />
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click
                                        save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="name"
                                            className="text-right"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value="Pedro Duarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="username"
                                            className="text-right"
                                        >
                                            Username
                                        </Label>
                                        <Input
                                            id="username"
                                            value="@peduarte"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                                    domus-coop@gmail.com
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
                        <DataTable columns={column} data={fakeData} />
                        <div className="text-sm mb-2 font-medium mt-2">
                            Services List
                        </div>
                        <DataTable
                            columns={serviceColums}
                            data={serviceFakeData}
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
                        <Button> Submit</Button>
                    </div>
                </form>
            </Form>
        </Card>
    );
};

export default StaffContractCreate;
