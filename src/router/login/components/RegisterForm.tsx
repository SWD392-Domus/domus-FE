"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button/Button";
import Google from "@/assets/image/Google.png";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label
                            className=" border-yellowCustom text-white mb-2"
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="text-white mb-4"
                        />
                        <Label
                            className=" border-yellowCustom text-white mb-2"
                            htmlFor="password"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="something secret..."
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="text-white mb-4"
                        />
                        <Label
                            className=" border-yellowCustom text-white mb-2"
                            htmlFor="password"
                        >
                            Confirm Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="something secret..."
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="text-white mb-4"
                        />
                    </div>
                    <Button disabled={isLoading} variant={"yellowCustom"}>
                        Sign up with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="relative flex justify-center text-xs uppercase">
                    <span className=" px-2 text-muted-foreground text-white">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                <img src={Google} width={25} className="mr-3" />
                Sign up with Google
            </Button>
        </div>
    );
}
