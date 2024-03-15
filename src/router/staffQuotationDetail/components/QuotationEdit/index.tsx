import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Calendar } from "@/components/ui/Calendar";
// import { Card } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
// import { toast } from "@/components/ui/Toast/use-toast";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CalendarIcon,
    EnvelopeClosedIcon,
    HomeIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import UserList from "../UserList";
import { useDispatch,  } from "react-redux";
import { actions } from "../../slice";
// import selector from "../../slice/selector";

interface Props {
    expireAt: any;
    customer: any;
    isEdit: boolean;
    setEdit: any;
    setUpdate: any;
}
const FormSchema = z.object({
    expireDate: z.date({
        required_error: "Expired date  is required.",
    }),
});
const QuotationEdit: React.FC<Props> = ({
    expireAt,
    customer,
    // isEdit,
    setEdit,
    // setUpdate,
}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    useEffect(() => {
        if (expireAt) {
            form.setValue("expireDate", new Date(expireAt)); // Set initial value for expireDate
        }
    }, [expireAt]);
    function onSubmit(data: z.infer<typeof FormSchema>) {
        const expireDateData = new Date(data.expireDate);
        dispatch(actions.setDate(expireDateData.toISOString() as any));
        setEdit(false);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
            >
                <div className="flex flex-row flex-wrap w-full">
                    <div className="left-side-3 basis-1/3 ">
                        <div className="text-md font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                            Sales Information
                        </div>
                        <div className="text-md mb-1 ">
                            <div className="flex flex-row">
                                <FormField
                                    control={form.control}
                                    name="expireDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Expire Date</FormLabel>
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
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
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
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                                new Date(
                                                                    "1900-01-01"
                                                                )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right-side-3 basis-2/3 font-sans text-md">
                        <div className="text-md font-semibold mr-5 mb-1 pb-1 border-solid border-b-2 border-zinc-400">
                            Customer Information
                        </div>
                        <UserList open={open} setOpen={setOpen} />
                        <div onClick={() => setOpen(true)}>
                            <div className=" flex flex-row mb-1">
                                <Avatar className="mr-2">
                                    <AvatarImage
                                        className=""
                                        src={customer.profileImage}
                                    />
                                    <AvatarFallback>C</AvatarFallback>
                                </Avatar>
                                <span className="my-auto font-medium font-sans text-md">
                                    {customer.fullName}
                                </span>
                            </div>
                            <div className="user-info-body text-md">
                                <div className="mail-info flex flex-row mb-1">
                                    <HomeIcon className="my-auto mr-2" />
                                    <span className="font-sans text-md">
                                        {customer.address
                                            ? customer.address
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                            <div className="user-info-body text-md">
                                <div className="mail-info flex flex-row mb-1">
                                    <EnvelopeClosedIcon className="my-auto mr-2" />
                                    <span className="">{customer.email}</span>
                                </div>
                            </div>
                            <div className="user-info-body text-md">
                                <div className="phone-info flex flex-row mb-1">
                                    <PersonIcon className="my-auto mr-2" />
                                    <span className="">
                                        {customer.phoneNumber}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="mt-4">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default QuotationEdit;
