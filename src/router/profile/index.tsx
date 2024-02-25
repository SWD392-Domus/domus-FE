import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
    // define your props here
}

const StaffProfile: React.FC<Props> = (props) => {
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    const [profile, setProfile] = useState();
    const formSchema = z.object({
        name: z.string().nonempty({
            message: "Name is required.",
        }),
        phone: z
            .string()
            .min(10)
            .max(15)
            .regex(/^\+?\d+$/, {
                message: "Invalid phone number format.",
            }),
        address: z.string().nonempty({
            message: "Address is required.",
        }),
        sex: z.string(),
        role: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            sex: "",
            role: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-full flex items-start justify-between mt-5"
            >
                <Card className="w-[28%] flex flex-col items-center justify-center border h-[80%] p-4">
                    <div className="relative">
                        <Avatar className="w-56 h-56 ">
                            <AvatarImage
                                src="https://avatars.githubusercontent.com/u/101063286?v=4"
                                alt="Avatar"
                            />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                    </div>

                    <h1 className="font-sans text-2xl mb-2">Nguyen Duc Bao</h1>

                    <h2 className="font-sans text-m mb-2">
                        nguyenducbaodh3@gmail.com
                    </h2>
                    <div className="flex items-center  mb-2">
                        <Label className=" mr-2">Phone: </Label>
                        <p className="font-sans text-sm text-center">
                            0838631706
                        </p>
                    </div>
                    <div className="flex items-center  mb-2">
                        <Label className=" mr-2">Role: </Label>
                        <p className="font-sans text-sm text-center font-bold">
                            Staff
                        </p>
                    </div>
                    <Button type="submit">Edit</Button>
                </Card>
                <Card className="w-[68%] flex flex-col items-start justify-start h-[90%] border p-10">
                    <Label className="mb-4">Staff Information</Label>
                    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3 w-full">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Sale made
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    $45,231.89
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    sale made by this staff
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Profit
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect
                                        width="20"
                                        height="14"
                                        x="2"
                                        y="5"
                                        rx="2"
                                    />
                                    <path d="M2 10h20" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +12,234
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +19% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Contract signed
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+203</div>
                                <p className="text-xs text-muted-foreground">
                                    +101 since last hour
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <Label className="mb-4">Personal Information</Label>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="shadcn@gmail.com"
                                        {...field}
                                        className="text-black mb-4"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between w-full">
                        <div className="w-[48%]">
                            <FormField
                                control={form.control}
                                name="sex"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                                            Sex:
                                        </FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Sex" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Sex
                                                        </SelectLabel>
                                                        <SelectItem value="Male">
                                                            Male
                                                        </SelectItem>
                                                        <SelectItem value="Female">
                                                            Female
                                                        </SelectItem>
                                                        <SelectItem value="Other">
                                                            Other
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[48%]">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                                            Role:
                                        </FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Sex" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Role
                                                        </SelectLabel>
                                                        <SelectItem value="Client">
                                                            Client
                                                        </SelectItem>
                                                        <SelectItem value="Staff">
                                                            Staff
                                                        </SelectItem>
                                                        <SelectItem value="Admin">
                                                            Admin
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                                    Phone
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="0838631706"
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="border-yellowCustom text-white mb-2 text-m">
                                    Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="20A Le Lai"
                                        {...field}
                                        className="text-black mb-4"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Label className="text-m  mb-2">Password: </Label>
                    <div className="flex justify-between w-full">
                        <Input
                            className="text-m mb-2 w-[78%]"
                            value={"20 A Le Lai"}
                            type="password"
                            readOnly
                        />
                        <Button variant={"secondary"} type="submit">
                            Change Password
                        </Button>
                    </div>
                </Card>
            </form>
        </Form>
    );
};

export default StaffProfile;
