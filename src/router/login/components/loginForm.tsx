"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button/Button";
import Google from "@/assets/image/Google.png";
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
import { loginApi } from "@/utils/api/loginApi";
import { toastError, toastSuccess } from "@/components/Toast";
import { useNavigate } from "react-router-dom";
import { devEnvGoogleAuth } from "../constants";
// import { useDispatch } from "react-redux";
// import { actions } from "../slice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginForm({ className, ...props }: UserAuthFormProps) {
    // const dispatch = useDispatch();
    // const [userName, setUserName] = React.useState("");
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        window.location.replace(devEnvGoogleAuth);
    };
    const formSchema = z.object({
        email: z.string().email({
            message: "Invalid email format.",
        }),
        password: z
            .string()
            .min(8, {
                message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter.",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter.",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number.",
            })
            .regex(/[!@#$%^&*(),.?":{}|<>]/, {
                message:
                    "Password must contain at least one special character.",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await loginApi.login(values.email, values.password);
            if (res.status === 200) {
                console.log(res.data.data.token.token.accessToken);
                localStorage.setItem(
                    "Token",
                    res.data.data.token.token.accessToken
                );

                toastSuccess("Login Successfully");

                const roles: string[] = res.data.data.token.roles;
                if (roles.includes("Staff")) {
                    navigate("/staff");
                } else {
                    navigate("/home");
                }
            } else {
                for (const mess of res.data.messages) {
                    toastError(mess.content);
                }
            }
        } catch (error) {
            toastError("Login Error");
        }
    }
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="border-yellowCustom text-white mb-2">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email..."
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="border-yellowCustom text-white mb-2">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password..."
                                                type="password"
                                                {...field}
                                                className="text-white mb-4"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant={"yellowCustom"} type="submit">
                                Sign In with Email
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="relative flex justify-center text-xs uppercase">
                    <span className=" px-2 text-muted-foreground text-white">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                <img src={Google} width={25} className="mr-3" />
                Sign in with Google
            </Button>
        </div>
    );
}
